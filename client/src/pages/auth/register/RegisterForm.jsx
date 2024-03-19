import React, { useEffect } from 'react'
import { Button, Col, Form, Input, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../../redux/slice/login.slice'
import { Link, useNavigate } from 'react-router-dom'

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

const RegisterForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const registerStatus = useSelector((state) => state.authentication.registerStatus)

  const handleRegister = (data) => {
    dispatch(register(data))
  }

  useEffect(() => {
    if (registerStatus === 'success') {
      navigate('/login')
    }
  }, [handleRegister])

  return (
    <div>
      <Form {...layout} onFinish={handleRegister}>
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
          <Input autoComplete='username' placeholder='Input username' />
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
          <Input.Password autoComplete='new-password' placeholder='Input password' />
        </Form.Item>
        <Form.Item
          name={'confirmPassword'}
          label='Confirm Password'
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }

                return Promise.reject(new Error('not match password'))
              },
            }),
          ]}
        >
          <Input.Password autoComplete='new-password' placeholder='Input password' />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            register
          </Button>
        </Form.Item>
      </Form>
      <Row justify={'space-evenly'}>
        <Col>
          <Button>
            <Link to={'/login'}>login</Link>
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

export default RegisterForm
