import { Button, Card, Flex, Form, Image, Input, Modal, Popconfirm, Typography } from 'antd'
import {
  DeleteOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, deleteProduct, getAllProducts } from '../../redux/slice/product.slice'
import Meta from 'antd/es/card/Meta'

const Store = ({ setSelectTab }) => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.product.products)
  const [showAddWindow, setShowAddWindow] = useState(false)
  const [form] = Form.useForm()

  const openAddWindow = () => {
    setShowAddWindow(true)
  }

  const handleSubmit = () => {
    form.validateFields().then(async (data) => {
      // Handle form submission logic here
      await dispatch(addProduct(data))
      dispatch(getAllProducts())

      // Clear form values
      form.resetFields()

      // Close the modal
      setShowAddWindow(false)
    })
  }

  const handleCancel = () => {
    setShowAddWindow(false)
  }

  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id))
    dispatch(getAllProducts())
  }

  useEffect(() => {
    setSelectTab('store')
  }, [])
  useEffect(() => {
    dispatch(getAllProducts())
  }, [addProduct])

  return (
    <div style={products ? {} : { height: '100vh' }}>
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
          <Form.Item label='Price' name='price' required>
            <Input />
          </Form.Item>
          <Form.Item label='Description' name='description' initialValue={''}>
            <Input />
          </Form.Item>
          <Form.Item label='Image url' name='url' required>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Flex wrap='wrap' gap={'large'}>
        {products?.map((product) => {
          return (
            <Card
              key={product._id}
              id={product._id}
              cover={
                <Image
                  style={{ width: '100%', height: 250, objectFit: 'cover' }}
                  alt='cover'
                  src={product.url}
                />
              }
              style={{ height: 400, width: 300 }}
              actions={[
                <SettingOutlined key='setting' />,
                <Popconfirm
                  title='Delete item'
                  description='Are you sure to delete this product?'
                  onConfirm={() => handleDelete(product._id)}
                  okText='Yes'
                  okType={'danger'}
                  cancelText='No'
                  icon={
                    <QuestionCircleOutlined
                      style={{
                        color: 'red',
                      }}
                    />
                  }
                  placement='topRight'
                >
                  <DeleteOutlined key='delete' />
                </Popconfirm>,
              ]}
            >
              <Meta title={product.title} description={product.description} />
              <span>Price: {product.price} $</span>
            </Card>
          )
        })}

        <Card
          style={{ width: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          hoverable
          onClick={openAddWindow}
        >
          <PlusCircleOutlined style={{ fontSize: 70, fontWeight: 'lighter' }} />
        </Card>
      </Flex>
    </div>
  )
}

export default Store
