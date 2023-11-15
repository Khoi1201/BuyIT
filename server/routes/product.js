const express = require('express')
const verifyToken = require('../middleware/auth')
const router = express.Router()

const Product = require('../models/Product')

// @route POST api/products
// @desc Create product
// @access Private

router.post('/', verifyToken, async (req, res) => {
  const { title, price, description, url } = req.body

  // Simple validation
  if (!(title || price))
    return res.status(400).json({ success: false, message: 'Title and price are required' })

  try {
    const newProduct = new Product({
      title,
      price,
      description,
      url: url.startsWith('https://') || url.startsWith('http://') ? url : `https://${url}`,
      user: req.userId,
    })
    await newProduct.save()

    res.json({ success: true, message: 'Product added', product: newProduct })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

module.exports = router
