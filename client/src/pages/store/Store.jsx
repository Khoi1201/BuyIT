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
  getProducts,
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
  const [updateProductData, setUpdateProductData] = useState('')

  // add form

  const openAddWindow = () => {
    setShowAddWindow(true)
  }

  const handleSubmit = () => {
    form.validateFields().then(async (data) => {
      // Handle form submission logic here
      await dispatch(addProduct(data))
      dispatch(getProducts())

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
    dispatch(getProducts())
  }

  // update form

  const openUpdateWindow = (product) => {
    formUpdate.setFieldsValue({ ...product, id: product._id })
    setUpdateProductData(product)
    setShowUpdateWindow(true)
  }

  const handleSubmitUpdate = () => {
    formUpdate.validateFields().then(async (data) => {
      if (
        !(
          // prevent default
          (
            data.description === updateProductData.description && // update product data is old data
            data.price === updateProductData.price &&
            data.title === updateProductData.title &&
            data.url === updateProductData.url
          )
        )
      ) {
        await dispatch(updateProduct(data))
        await dispatch(getProducts())

        formUpdate.resetFields()

        setShowUpdateWindow(false)
      }
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
    dispatch(getProducts())
  }, [])

  return (
    <div>
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
        updateProductData={updateProductData}
      />

      <Flex wrap='wrap' gap={'large'} justify={'space-between'} style={{ margin: 'auto' }}>
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
              style={{ height: 400, width: '30%' }}
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
              <Meta
                title={product.title}
                description={
                  product.description.split(' ').length > 5
                    ? product.description.split(' ').slice(0, 5).join(' ') + ' ...'
                    : product.description
                }
              />
              <span>Price: {product.price} $</span>
            </Card>
          )
        })}

        <Card
          className={'card-' + theme}
          style={{
            height: 400,
            width: 300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
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
