import { Button, Image, Space, Table } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../redux/slice/store.slice'

const Cart = () => {
  const dispatch = useDispatch()
  const allProducts = useSelector((state) => state.store.allProducts)
  const cartItems = useSelector((state) => state.store.cart)

  const dataSource = allProducts
    .filter((product) => cartItems.includes(product._id))
    .map((filterd, i) => {
      return { ...filterd, key: i }
    })

  const removeItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const renderImage = (url) => (
    <Image
      preview={false}
      style={{ width: 50, height: 50, objectFit: 'cover' }}
      alt='cover'
      src={url}
    />
  )

  const columns = [
    {
      title: 'Image',
      dataIndex: 'url',
      key: 'url',
      render: renderImage,
    },
    { title: 'Name', dataIndex: 'title', key: 'title' },
    { title: 'Price($)', dataIndex: 'price', key: 'price' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button onClick={() => removeItem(record._id)}>Remove</Button>
        </Space>
      ),
    },
  ]

  return (
    <div style={{ maxWidth: '80%', margin: 'auto' }}>
      sups?
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}

export default Cart
