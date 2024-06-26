// authentication api

const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')

const User = require('../models/User')

// @route GET api/auth
// @desc Check if user is logged in
// @access Public

router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    if (!user) return res.status(400).json({ success: false, message: 'User not found' })

    return res.json({ success: true, user })
  } catch (error) {}
})

// @route POST api/auth/register
// @desc Register user
// @access public

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body.payload

    // simple validation
    if (!(username || password)) {
      return res.status(400).json({ success: false, message: 'Missing username and/or password' })
    }

    // check for existing user
    const user = await User.findOne({ username })
    if (user) return res.status(400).json({ success: false, message: 'Username already exist' })

    // hash and save password
    const hashedPassword = await argon2.hash(password)
    const newUser = new User({ username, password: hashedPassword })
    await newUser.save()

    res.json({
      success: true,
      message: 'User created successfully',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route POST api/auth/login
// @desc Login user
// @access public

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body.payload

    // simple validation
    if (!(username || password)) {
      return res.status(400).json({ success: false, message: 'Missing username and/or password' })
    }

    // check for existing user
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ success: false, message: 'Incorrect username or password' })
    }

    // check for password
    const passwordValid = await argon2.verify(user.password, password)
    if (!passwordValid) {
      return res.status(400).json({ success: false, message: 'Incorrect username and/or password' })
    }

    // return token
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '7d',
    })
    res.json({
      success: true,
      message: 'Login successfully',
      accessToken,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

module.exports = router
