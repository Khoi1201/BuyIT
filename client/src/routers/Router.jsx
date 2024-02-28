import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Auth from '../pages/auth/Auth'

import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { loadUser } from '../redux/slice/login.slice'
import Dashboard from '../pages/dashboard/Dashboard'
import Store from '../pages/store/Store'
import NotificationBar from '../components/NotificationBar/NotificationBar'

const Router = () => {
  const token = Cookies.get('token')
  const dispatch = useDispatch()
  useEffect(() => {
    if (token) dispatch(loadUser())
  }, [dispatch, token])

  const [selectTab, setSelectTab] = useState()

  return (
    <BrowserRouter>
      <NotificationBar />
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<Auth authRoute='login' />} />
        <Route path='/register' element={<Auth authRoute='register' />} />
        <Route element={<ProtectedRoute selectTab={selectTab} setSelectTab={setSelectTab} />}>
          <Route path='/dashboard' element={<Dashboard setSelectTab={setSelectTab} />} />
          <Route path='/store' element={<Store setSelectTab={setSelectTab} />} />
          <Route path='/setting' element={<div style={{ height: '100vh' }}>setting</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
