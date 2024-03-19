import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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
      state.cart = JSON.parse(localStorage.getItem('cart') || '[]')
    },
    addToCart: (state, action) => {
      let idList = state.cart.map((item) => item.id)

      if (!idList.includes(action.payload)) {
        state.cart.push({ id: action.payload, quantity: 1 })
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },
    updateCartQuantity: (state, action) => {
      let tempI = state.cart.findIndex((item) => item.id === action.payload.id)
      state.cart[tempI] = { id: action.payload.id, quantity: action.payload.value }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cart))
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

export const { loadCart, addToCart, removeFromCart, updateCartQuantity } = storeSlice.actions

export default storeSlice.reducer
