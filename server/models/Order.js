const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
  listOfProduct: [
    {
      id: { type: Schema.Types.ObjectId, ref: 'products' },
      quantity: { type: Number, required: true },
      state: {
        type: String,
        enum: ['ORDER', 'DELIVER', 'DONE', 'CANCEL'],
      },
    },
  ],
})

module.exports = mongoose.model('orders', OrderSchema)
