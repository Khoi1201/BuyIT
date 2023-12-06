import { configureStore } from '@reduxjs/toolkit'
import authenticationSlice from '../slice/login.slice'
import productSlice from '../slice/product.slice'

export const store = configureStore({
  reducer: {
    authentication: authenticationSlice,
    product: productSlice,
  },
})
