const express = require('express')
const router = express.Router()

const Product = require('../models/Product')

// @route GET api/search?query=:productTitle
// @desc Find products
// @access Private

router.get('/', async (req, res) => {
  const { query } = req.query

  try {
    const products = await Product.find({ title: { $regex: query, $options: 'i' } }, '_id')
    res.json({ success: true, products })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

module.exports = router
