import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, redirect } from 'react-router-dom'
import Auth from '../pages/auth/Auth'
import ProtectedRoute from './ProtectedRoute'

import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import NotificationBar from '../components/NotificationBar/NotificationBar'
import ThemeContext from '../context/themeContext'
import Dashboard from '../pages/dashboard/Dashboard'
import ChangeTab from '../pages/shop/ChangeTab'
import Setting from '../pages/setting/Setting'
import Store from '../pages/store/Store'
import { loadUser } from '../redux/slice/login.slice'

const Router = () => {
  const dispatch = useDispatch()
  const authenticated = useSelector((state) => state.authentication.authenticated)

  const [mem, setMem] = useState('/dashboard')
  const [theme, setTheme] = useState(localStorage.getItem('theme'))
  const token = Cookies.get('token')

  if (token && !authenticated) dispatch(loadUser())

  const [selectTab, setSelectTab] = useState()

  return (
    <ThemeContext.Provider value={theme}>
      <BrowserRouter>
        <NotificationBar />
        <Routes>
          <Route path='/' element={<ChangeTab tab='shop' />} />
          <Route path='/cart' element={<ChangeTab tab='cart' />} />
          <Route path='/login' element={<Auth authRoute='login' mem={mem} />} />
          <Route path='/register' element={<Auth authRoute='register' />} />
          <Route
            element={
              <ProtectedRoute setMem={setMem} selectTab={selectTab} setSelectTab={setSelectTab} />
            }
          >
            <Route path='/dashboard' element={<Dashboard setSelectTab={setSelectTab} />} />
            <Route path='/store' element={<Store setSelectTab={setSelectTab} />} />
            <Route
              path='/setting'
              element={<Setting setSelectTab={setSelectTab} theme={theme} setTheme={setTheme} />}
            />
          </Route>
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default Router
