import React, { useEffect, useLayoutEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Auth from '../pages/auth/Auth'

import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../redux/slice/login.slice'
import Dashboard from '../pages/dashboard/Dashboard'
import Store from '../pages/store/Store'
import NotificationBar from '../components/NotificationBar/NotificationBar'
import ThemeContext from '../context/themeContext'
import Setting from '../pages/setting/Setting'
import Landing from '../pages/landing/Landing'

const Router = () => {
  const dispatch = useDispatch()
  const authenticated = useSelector((state) => state.authentication.authenticated)

  const [theme, setTheme] = useState(localStorage.getItem('theme'))
  const token = Cookies.get('token')
  useLayoutEffect(() => {
    if (token && !authenticated) dispatch(loadUser())
  })

  const [selectTab, setSelectTab] = useState()

  return (
    <ThemeContext.Provider value={theme}>
      <BrowserRouter>
        <NotificationBar />
        <Routes>
          <Route path='/' element={<Navigate to='/landing' replace />} />
          <Route path='/landing' element={<Landing />} />
          <Route path='/login' element={<Auth authRoute='login' />} />
          <Route path='/register' element={<Auth authRoute='register' />} />
          <Route element={<ProtectedRoute selectTab={selectTab} setSelectTab={setSelectTab} />}>
            <Route path='/dashboard' element={<Dashboard setSelectTab={setSelectTab} />} />
            <Route path='/store' element={<Store setSelectTab={setSelectTab} />} />
            <Route
              path='/setting'
              element={<Setting setSelectTab={setSelectTab} theme={theme} setTheme={setTheme} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default Router
