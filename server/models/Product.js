const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
})

module.exports = mongoose.model('posts', ProductSchema)
