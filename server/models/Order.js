const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
  listOfProduct: [
    {
      id: { type: String, required: true },
      quantity: { type: Number, required: true },
      state: {
        type: String,
        enum: ['ORDER', 'DELIVER', 'DONE', 'CANCEL'],
      },
    },
  ],
})

module.exports = mongoose.model('orders', OrderSchema)
