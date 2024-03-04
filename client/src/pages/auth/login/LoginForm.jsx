import React from 'react'
import { Button, Col, Form, Input, Row } from 'antd'
import { useDispatch } from 'react-redux'
import { login } from '../../../redux/slice/login.slice'
import { Link, Navigate, useNavigate } from 'react-router-dom'

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
      <Row justify={'space-evenly'}>
        <Col>
          <Button>
            <Link to={'/register'}>Register</Link>
          </Button>
        </Col>
        <Col>
          <Button>
            <Link to={'/landing'}>Landing Page</Link>
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default LoginForm
