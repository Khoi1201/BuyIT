import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import tbAuthController from '../api/tb.auth.controller'

import Cookies from 'js-cookie'

export const initialState = {
  user: null,
  authenticated: false,
  loadStatus: 'idle',
}

export const loadUser = createAsyncThunk('loadUser', async () => {
  try {
    const response = await tbAuthController.getUser()
    return response.data.user
  } catch (error) {
    Cookies.remove('token')
    throw new Error('Invalid token')
  }
})

export const login = createAsyncThunk('login', async ({ username, password }, { dispatch }) => {
  try {
    const response = await tbAuthController.login(username, password)
    const accessToken = response.data.accessToken
    Cookies.set('token', accessToken, { expires: 7 })
    await dispatch(loadUser()).unwrap()
  } catch (error) {
    console.log(error)
  }
})

export const register = createAsyncThunk('register', async ({ username, password }) => {
  try {
    await tbAuthController.register(username, password )
  } catch (error) {
    console.log(error)
  }
})

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // loadUser
    builder.addCase(loadUser.pending, (state) => {
      state.loadStatus = 'loading'
    })
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loadStatus = 'success'
      state.user = action.payload
      state.authenticated = true
    })
    builder.addCase(loadUser.rejected, (state) => {
      state.loadStatus = 'failed'
      state.authenticated = false
      state.user = null
    })

    //login
    builder.addCase(login.pending, (state) => {
      state.loginStatus = 'loading'
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginStatus = 'success'
    })
    builder.addCase(login.rejected, (state) => {
      state.loginStatus = 'failed'
    })

    //register
    builder.addCase(register.pending, (state) => {
      state.registerStatus = 'loading'
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.registerStatus = 'success'
    })
    builder.addCase(register.rejected, (state) => {
      state.registerStatus = 'failed'
    })
  },
})

export default authenticationSlice.reducer
