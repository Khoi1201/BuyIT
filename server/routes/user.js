// user api

const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')

const User = require('../models/User')
const { param } = require('./auth')

// @route DELETE api/user
// @desc Delete user
// @access Private

router.put('/:username', verifyToken, async (req, res) => {
  try {
    const deleteUser = await User.findOneAndDelete(req.params.username)
    if (deleteUser)
      return res.status(200).json({ success: true, message: 'User deleted', deleteUser })
  } catch (error) {}
})

module.exports = router
