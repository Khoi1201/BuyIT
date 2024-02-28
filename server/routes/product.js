const express = require('express')
const verifyToken = require('../middleware/auth')
const router = express.Router()

const Product = require('../models/Product')

// @route POST api/products
// @desc Create product
// @access Private

router.post('/', verifyToken, async (req, res) => {
  const { title, price, description, url } = req?.body?.payload

  // Simple validation
  if (!title || !price)
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

// @route GET api/products
// @desc Get products
// @access Private

router.get('/', verifyToken, async (req, res) => {
  try {
    const products = await Product.find({ user: req.userId }).populate('user', ['username'])
    res.json({ success: true, products })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route PUT api/products/:productId
// @desc Upadte product
// @access Private

router.put('/:productId', verifyToken, async (req, res) => {
  const { title, price, description, url } = req.body.payload

  // Simple validation
  if (!title || !price)
    return res.status(400).json({ success: false, message: 'Title and price are required' })

  try {
    let updatedProduct = {
      title,
      price,
      description,
      url: url.startsWith('https://') || url.startsWith('http://') ? url : `https://${url}`,
      user: req.userId,
    }

    const productUpdateCondition = { _id: req.params.productId, user: req.userId }

    updatedProduct = await Product.findOneAndUpdate(productUpdateCondition, updatedProduct, {
      new: true,
    })

    if (!updatedProduct) {
      res.status(401).json({
        success: false,
        message: 'Product not found or User not authorized',
      })
    }

    res.json({ success: true, message: 'Product updated', product: updatedProduct })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route DELETE api/products/:productId
// @desc Delete product
// @access Private

router.delete('/:productId', verifyToken, async (req, res) => {
  try {
    const productDeleteCondition = { _id: req.params.productId, user: req.userId }
    const deleteProduct = await Product.findOneAndDelete(productDeleteCondition)

    if (!deleteProduct) {
      res.status(401).json({
        success: false,
        message: 'Product not found or User not authorized',
      })
    }

    res.json({ success: true, message: 'Product removed', product: deleteProduct })
  } catch (error) {
    console.log(error)
    res.status({ success: false, message: 'Internal server error' })
  }
})

module.exports = router
