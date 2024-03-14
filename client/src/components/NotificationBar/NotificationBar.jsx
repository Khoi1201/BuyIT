import { notification, Typography } from 'antd'

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const { Text } = Typography

const NotificationBar = () => {
  const loginStatus = useSelector((state) => state.authentication.loginStatus)

  const registerStatus = useSelector((state) => state.authentication.registerStatus)

  const addProdcutStatus = useSelector((state) => state.product.addProductStatus)

  const updateProductStatus = useSelector((state) => state.product.updateProductStatus)

  const deleteProductStatus = useSelector((state) => state.product.deleteProductStatus)

  const notifyError = (content) => {
    return notification.error({
      placement: 'topRight',
      message: 'notification',
      description: (
        <Text strong style={{ color: 'red' }}>
          {content}
        </Text>
      ),
    })
  }
  const notifySuccess = (content) => {
    return notification.success({
      placement: 'topRight',
      message: 'notification',
      description: (
        <Text style={{ color: 'green' }} strong>
          {content}
        </Text>
      ),
    })
  }

  useEffect(() => {
    loginStatus === 'success' && notifySuccess('Login Successfully')
    loginStatus === 'failed' && notifyError('Login Failed')

    registerStatus === 'success' && notifySuccess('Register Successfully')
    registerStatus === 'failed' && notifyError('Register Failed')
  }, [loginStatus, registerStatus])

  useEffect(() => {
    addProdcutStatus === 'success' && notifySuccess('Add Product Successfully')
    addProdcutStatus === 'failed' && notifyError('Add Product Failed')
  }, [addProdcutStatus])

  useEffect(() => {
    deleteProductStatus === 'success' && notifySuccess('Delete Product Successfully')
    deleteProductStatus === 'failed' && notifyError('Delete Product Failed')
  }, [deleteProductStatus])

  useEffect(() => {
    updateProductStatus === 'success' && notifySuccess('Product Updated')
    updateProductStatus === 'failed' && notifyError('Failed To Update Product')
  }, [updateProductStatus])
}

export default NotificationBar
