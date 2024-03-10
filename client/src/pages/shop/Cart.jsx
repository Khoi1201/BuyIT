import { Image, Table } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
  const allProducts = useSelector((state) => state.store.allProducts)
  const cartItems = useSelector((state) => state.store.cart)

  const dataSource = allProducts.filter((product) => cartItems.includes(product._id))

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
    { title: 'Price', dataIndex: 'price', key: 'price' },
  ]

  return (
    <div style={{ maxWidth: '80%', margin: 'auto' }}>
      sups?
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}

export default Cart
