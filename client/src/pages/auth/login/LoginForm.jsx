import React from 'react'
import { Button, Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { login } from '../../../redux/slice/login.slice'
import { Navigate, useNavigate } from 'react-router-dom'

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 16,
  },
}

const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 16,
  },
}

const LoginForm = ({ setTab }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (data) => {
    dispatch(login(data))
  }
  return (
    <div>
      <Form {...layout} onFinish={handleLogin}>
        <Form.Item
          name={'username'}
          label='Username'
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Input placeholder='Input username' />
        </Form.Item>
        <Form.Item
          name={'password'}
          label='Password'
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Input.Password placeholder='Input password' />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Login
          </Button>
        </Form.Item>
      </Form>
      <span onClick={() =>       navigate('/register')}>Register</span>
    </div>
  )
}

export default LoginForm
