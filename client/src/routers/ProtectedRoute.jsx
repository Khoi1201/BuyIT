import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = () => {
  const authenticated = useSelector((state) => state.authentication.authenticated)
  return authenticated ? <Outlet /> : <Navigate to={'/login'} replace />
}

export default ProtectedRoute
