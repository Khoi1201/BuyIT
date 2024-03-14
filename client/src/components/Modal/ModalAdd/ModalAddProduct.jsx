import { Button, Form, Input, InputNumber, Modal } from 'antd'
import React from 'react'

const ModalAddProduct = ({ showAddWindow, handleCancel, handleSubmit, form }) => {
  return (
    <Modal
      open={showAddWindow}
      onCancel={handleCancel}
      footer={[
        <Button key='cancel' onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label='Name of product' name='title' required>
          <Input />
        </Form.Item>
        <Form.Item label='Price' name='price' required initialValue={1}>
          <InputNumber addonAfter='$' min={1} max={999} />
        </Form.Item>
        <Form.Item label='Description' name='description' initialValue={''}>
          <Input />
        </Form.Item>
        <Form.Item label='Image url' name='url' required>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalAddProduct
