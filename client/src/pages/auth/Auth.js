import React, { useState } from 'react'

// import { Navigate } from 'react-router-dom'
import LoginForm from './login/LoginForm'
import RegisterForm from './register/RegisterForm'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Auth = ({ authRoute }) => {
  const authenticated = useSelector((state) => state.authentication.authenticated)

  let body = <>{authRoute === 'login' ? <LoginForm /> : <RegisterForm />}</>
  return !authenticated ? (
    <div className='landing'>
      <div className='landing-inner'>
        <div className='landing-content'>
          <h1>E-commerce Manager</h1>
          <h4>Start bussiness as easy as ever</h4>
          {body}
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={'/dashboard'} replace={true} />
  )
}

export default Auth
