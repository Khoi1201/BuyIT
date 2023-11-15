import React from 'react'

import { Navigate } from 'react-router-dom'
import LoginForm from './login/LoginForm'
import RegisterForm from './register/RegisterForm'

const Auth = ({ authRoute }) => {
  let body = (
    <>
      {authRoute === 'login' && <LoginForm />}
      {authRoute === 'register' && <RegisterForm />}
    </>
  )
  return (
    <div className='landing'>
      <div className='landing-inner'>
        <div className='landing-content'>
          <h1>E-commerce Manager</h1>
          <h4>Start bussiness as easy as ever</h4>
          {body}
        </div>
      </div>
    </div>
  )
}

export default Auth
