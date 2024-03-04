import { Button, Form, Input, InputNumber, Modal } from 'antd'
import React from 'react'

const ModalUpdateProduct = ({
  showUpdateWindow,
  handleCancelUpdate,
  handleSubmitUpdate,
  formUpdate,
}) => {
  return (
    <Modal
      open={showUpdateWindow}
      onCancel={handleCancelUpdate}
      footer={[
        <Button key='cancel' onClick={handleCancelUpdate}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' htmlType='submit' onClick={handleSubmitUpdate}>
          Submit
        </Button>,
      ]}
    >
      <Form
        form={formUpdate}
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
        <Form.Item hidden name='id'>
          <Input></Input>
        </Form.Item>
        <Form.Item label='Name of product' name='title' required>
          <Input />
        </Form.Item>
        <Form.Item label='Price' name='price' required>
          <InputNumber addonAfter='$' min={1} max={999} />
        </Form.Item>
        <Form.Item label='Description' name='description'>
          <Input />
        </Form.Item>
        <Form.Item label='Image url' name='url' required>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalUpdateProduct
