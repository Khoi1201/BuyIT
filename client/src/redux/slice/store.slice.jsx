import { createAsyncThunk, createReducer, createSlice } from '@reduxjs/toolkit'
import tbProductController from '../api/tb.products.controller'

export const initialState = {
  allProducts: [],
  cart: [],
  status: 'idle',
}

export const getAllProducts = createAsyncThunk('getAllProducts', async () => {
  try {
    const response = await tbProductController.getAllProducts()
    return response.data.allProducts
  } catch (error) {
    console.log(error)
  }
})

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    loadCart: (state) => {
      if (localStorage.getItem('cart') && !state.cart.length) {
        localStorage
          .getItem('cart')
          .split(',')
          .forEach((id) => state.cart.push(id))
      }
    },
    addToCart: (state, action) => {
      if (!state.cart.includes(action.payload)) {
        state.cart.push(action.payload)
      }
      localStorage.setItem('cart', state.cart)
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((id) => id !== action.payload)
      localStorage.setItem('cart', state.cart)
    },
  },
  extraReducers: (builder) => {
    //get all product
    builder.addCase(getAllProducts.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.status = 'success'
      state.allProducts = action.payload
    })
    builder.addCase(getAllProducts.rejected, (state) => {
      state.status = 'failed'
    })
  },
})

export const { loadCart, addToCart, removeFromCart } = storeSlice.actions

export default storeSlice.reducer
