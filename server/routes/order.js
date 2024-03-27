const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Order = require('../models/Order')
const Product = require('../models/Product')

router.get('/', verifyToken, async (req, res) => {
  try {
    // find product of user
    const products = await Product.find({ user: req.userId })
    const tempArray = products.map((product) => product._id)

    // find the order compare and get the intersection
    const tempOrders = await Order.find({
      listOfProduct: { $elemMatch: { id: { $in: tempArray } } },
    })

    // filter user list of product
    const orders = tempOrders.map((order) => {
      const temp = order.listOfProduct.filter((orderItem) => {
        return tempArray.toString().includes(orderItem.id.toString())
      })
      return { ...order.toObject(), listOfProduct: temp }
    })

    // return intersection with order id
    res.json(orders)
  } catch (error) {
    console.log(error)
  }
})

// @route POST api/order
// @desc Create order
// @access Public

router.post('/', async (req, res) => {
  try {
    const { order } = req?.body?.payload

    if (!order) return res.status(400).json({ success: false, message: 'Empty order' })

    orderAddedState = order.map((val) => {
      return { ...val, state: 'ORDER' }
    })

    const newOrder = new Order({ listOfProduct: orderAddedState })
    await newOrder.save()
    res.json({ success: true, message: 'Ordering success', order: newOrder })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// @route UPDATE api/order
// @desc Update order
// @access Private

router.put('/:orderId/:itemId', verifyToken, async (req, res) => {
  try {
    const { state } = req.body.payload

    if (!state) return res.status(400).json({ success: false, message: 'Missing state' })

    const orderProduct = await Product.find({
      user: req.userId,
      _id: req.params.itemId,
    })

    if (!orderProduct)
      res.status(400).json({ success: false, message: 'Product not found or user not authorized' })

    let updateOrder = await Order.findById(req.params.orderId)

    if (!updateOrder) {
      res.status(401).json({
        success: false,
        message: 'Order not found',
      })
    }

    updateOrder.listOfProduct.forEach((element, index) => {
      if (element.id.toString() === req.params.itemId) {
        updateOrder.listOfProduct[index] = {
          ...updateOrder.listOfProduct[index].toObject(),
          state: state,
        }
      }
    })

    let updatedOrder = updateOrder

    const orderUpdateCondition = {
      _id: req.params.orderId,
    }

    updatedOrder = await Order.findOneAndUpdate(orderUpdateCondition, updatedOrder, {
      new: true,
    })

    res.json({ success: true, message: 'Order updated', order: updatedOrder })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

module.exports = router
