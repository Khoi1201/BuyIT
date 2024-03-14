import { Button, Image, Space, Table } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../redux/slice/store.slice'

const Cart = ({ setId, setShowDetailModal, allProducts }) => {
  const dispatch = useDispatch()
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
    <div className='center'>
      <Image
        preview={false}
        style={{ width: 50, height: 50, objectFit: 'cover' }}
        alt='cover'
        src={url}
      />
    </div>
  )

  const columns = [
    {
      title: (
        <div className='center'>
          <span>Image</span>
        </div>
      ),
      dataIndex: 'url',
      key: 'url',
      render: renderImage,
    },
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => (
        <Space>
          <p
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setId(record._id)
              setShowDetailModal(true)
            }}
          >
            {record.title}
          </p>
        </Space>
      ),
    },
    { title: 'Price($)', dataIndex: 'price', key: 'price' },
    {
      title: (
        <div className='center'>
          <span>Action</span>
        </div>
      ),
      key: 'action',
      render: (_, record) => (
        <div className='center'>
          <Button onClick={() => removeItem(record._id)}>Discard</Button>
        </div>
      ),
    },
  ]

  return (
    <div style={{ maxWidth: '80%', margin: 'auto' }}>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}

export default Cart
