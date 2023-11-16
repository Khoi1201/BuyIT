import React, { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Auth from '../pages/auth/Auth'

import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { loadUser } from '../redux/slice/login.slice'

const Router = () => {
  const token = Cookies.get('token')
  const dispatch = useDispatch()
  useEffect(() => {
    if (token) dispatch(loadUser())
  }, [dispatch, token])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<Auth authRoute='login' />} />
        <Route path='/register' element={<Auth authRoute='register' />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<>dashboard</>} />
          <Route path='/about' element={<>about</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
