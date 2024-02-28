import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import tbProductController from '../api/tb.products.controller'

import Cookies from 'js-cookie'

export const initialState = {
  products: [],
  status: 'idle',
}

export const getAllProducts = createAsyncThunk('getAllProducts', async () => {
  try {
    const response = await tbProductController.getAllProducts()
    return response.data.products
  } catch (error) {
    console.log(error)
  }
})

export const addProduct = createAsyncThunk('addProduct', async (data) => {
  try {
    const response = await tbProductController.addProduct(data)
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all product
    builder.addCase(getAllProducts.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.status = 'success'
      state.products = action.payload
    })
    builder.addCase(getAllProducts.rejected, (state) => {
      state.status = 'failed'
    })

    //add product
    builder.addCase(addProduct.pending, (state)=>{
      state.addProductStatus='loading'
    })
    builder.addCase(addProduct.fulfilled, (state)=>{
      state.addProductStatus='success'
    })
    builder.addCase(addProduct.rejected, (state)=>{
      state.addProductStatus='failed'
    })
  },
})

export default productSlice.reducer