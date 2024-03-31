import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import tbProductController from '../api/tb.products.controller'

import Cookies from 'js-cookie'

export const initialState = {
  products: [],
  orders: [],
  status: 'idle',
}

export const getProducts = createAsyncThunk('getProducts', async () => {
  try {
    const response = await tbProductController.getProducts() // token based
    return response.data.products
  } catch (error) {
    console.log(error)
  }
})

export const addProduct = createAsyncThunk('addProduct', async (data, { rejectWithValue }) => {
  try {
    const response = await tbProductController.addProduct(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const updateProduct = createAsyncThunk(
  'updateProduct',
  async (data, { rejectWithValue }) => {
    try {
      const response = await tbProductController.updateProduct(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteProduct = createAsyncThunk('deleteProduct', async (id, { rejectWithValue }) => {
  try {
    const response = await tbProductController.deleteProduct(id)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const getOrders = createAsyncThunk('getOrders', async () => {
  try {
    const response = await tbProductController.getOrders()
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const updateOrder = createAsyncThunk('updateOrder', async (data, { rejectWithValue }) => {
  try {
    const response = await tbProductController.updateOrder(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all product
    builder.addCase(getProducts.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.status = 'success'
      state.products = action.payload
    })
    builder.addCase(getProducts.rejected, (state) => {
      state.status = 'failed'
    })

    //add product
    builder.addCase(addProduct.pending, (state) => {
      state.addProductStatus = 'loading'
    })
    builder.addCase(addProduct.fulfilled, (state) => {
      state.addProductStatus = 'success'
    })
    builder.addCase(addProduct.rejected, (state) => {
      state.addProductStatus = 'failed'
    })

    //update product
    builder.addCase(updateProduct.pending, (state) => {
      state.updateProductStatus = 'loading'
    })
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.updateProductStatus = 'success'
    })
    builder.addCase(updateProduct.rejected, (state) => {
      state.updateProductStatus = 'failed'
    })

    //delete product
    builder.addCase(deleteProduct.pending, (state) => {
      state.deleteProductStatus = 'loading'
    })
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.deleteProductStatus = 'success'
    })
    builder.addCase(deleteProduct.rejected, (state) => {
      state.deleteProductStatus = 'failed'
    })

    //get order
    builder.addCase(getOrders.pending, (state) => {
      state.getOrdersState = 'loading'
    })
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.getOrdersState = 'success'
      state.orders = action.payload
    })
    builder.addCase(getOrders.rejected, (state) => {
      state.getOrdersState = 'failed'
    })
  },
})

export default productSlice.reducer
