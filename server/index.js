const env = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const axios = require('axios')

const authRouter = require('./routes/auth')
// const userRouter = require('./routes/user')
const productRouter = require('./routes/product')
const orderRouter = require('./routes/order')
const searchRouter = require('./routes/search')

const connectDB = async () => {
  try {
    mongoose.connect(process.env.DB_CONNECT)
    console.log('MongoDB connected')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

connectDB()
const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send('Express on Vercel'))
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/order', orderRouter)
app.use('/api/search', searchRouter)
// app.use('/api/user', userRouter)

const PORT = process.env.PORT || 1203

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

module.exports = app
