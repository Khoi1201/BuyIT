import React from 'react'
import { Button, Form, Input } from 'antd'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}

const LoginForm = () => {
  return (
    <div>
      login form
      <Form {...layout}>
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
              essage: 'This field is required',
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
    </div>
  )
}

export default LoginForm
