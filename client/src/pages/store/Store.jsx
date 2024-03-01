import { Button, Card, Flex, Form, Image, Input, Modal, Popconfirm, Typography } from 'antd'
import {
  DeleteOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from '../../redux/slice/product.slice'
import Meta from 'antd/es/card/Meta'
import ModalAddProduct from '../../components/Modal/ModalAdd/ModalAddProduct'
import ModalUpdateProduct from '../../components/Modal/ModalUpdate/ModalUpdateProduct'
import ThemeContext from '../../context/themeContext'
import './index.css'

const Store = ({ setSelectTab }) => {
  const theme = useContext(ThemeContext)
  const dispatch = useDispatch()
  const products = useSelector((state) => state.product.products)
  const [showAddWindow, setShowAddWindow] = useState(false)
  const [showUpdateWindow, setShowUpdateWindow] = useState(false)
  const [form] = Form.useForm()
  const [formUpdate] = Form.useForm()
  const [updateId, setUpdateId] = useState('')

  // add form

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

  // delete product

  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id))
    dispatch(getAllProducts())
  }

  // update form

  const openUpdateWindow = (data) => {
    setUpdateId(data._id)
    formUpdate.setFieldsValue(data)
    setShowUpdateWindow(true)
  }

  const handleSubmitUpdate = () => {
    formUpdate.validateFields().then(async (data) => {
      // Handle form submission logic here
      await dispatch(updateProduct({ ...data, id: updateId }))
      await dispatch(getAllProducts())

      // Clear form values
      formUpdate.resetFields()

      // Close the modal
      setShowUpdateWindow(false)
    })
  }

  const handleCancelUpdate = () => {
    setShowUpdateWindow(false)
  }

  useEffect(() => {
    setSelectTab('store')
  }, [])
  useEffect(() => {
    dispatch(getAllProducts())
  }, [addProduct])

  return (
    <div style={products ? {} : { height: '100vh' }}>
      <ModalAddProduct
        showAddWindow={showAddWindow}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        form={form}
      />

      <ModalUpdateProduct
        showUpdateWindow={showUpdateWindow}
        handleCancelUpdate={handleCancelUpdate}
        handleSubmitUpdate={handleSubmitUpdate}
        formUpdate={formUpdate}
      />

      <Flex wrap='wrap' gap={'large'}>
        {products?.map((product) => {
          return (
            <Card
              className={'card-' + theme}
              key={product._id}
              id={product._id}
              cover={
                <Image
                  style={{ width: '100%', height: 235, objectFit: 'cover' }}
                  alt='cover'
                  src={product.url}
                />
              }
              style={{ height: 400, width: 300 }}
              actions={[
                <SettingOutlined
                  key='setting'
                  onClick={() => {
                    openUpdateWindow(product)
                  }}
                />,
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
          className={'card-' + theme}
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
