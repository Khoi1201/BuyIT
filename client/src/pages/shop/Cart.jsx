import { Button, Image, InputNumber, Space, Table } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateCartQuantity } from '../../redux/slice/store.slice'

const Cart = ({ setId, setShowDetailModal, allProducts }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.store.cart)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)

  const dataSource = cartItems.map((item, i) => {
    let temp = allProducts.find((product) => product._id === item.id)
    return {
      id: item.id,
      key: i,
      url: temp.url,
      title: temp.title,
      price: temp.price,
      quantity: item.quantity,
    }
  })

  const start = () => {
    setLoading(true)
    // ajax request after empty completing
    let buyItem = cartItems.filter((item, i) => {
      return selectedRowKeys.includes(i)
    })

    setTimeout(() => {
      // call server to make a purchase
      console.log(buyItem) // give this

      // clear cart
      buyItem.map((item) => dispatch(removeFromCart(item.id)))
      // clear selected
      setSelectedRowKeys([])
      setLoading(false)
    }, 1000)
  }

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const hasSelected = selectedRowKeys.length > 0

  const removeItem = (id, i) => {
    dispatch(removeFromCart(id))
    setSelectedRowKeys(selectedRowKeys.filter((key) => key !== i))
  }

  const updateQuantity = (id, value) => {
    dispatch(updateCartQuantity({ id, value }))
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
              setId(record.id)
              setShowDetailModal(true)
            }}
          >
            {record.title}
          </p>
        </Space>
      ),
    },
    { title: 'Unit Price($)', dataIndex: 'price', key: 'unitPrice' },
    {
      title: 'Quantity',
      key: 'quantity',
      render: (_, record) => {
        return (
          <InputNumber
            controls
            max={20}
            min={1}
            defaultValue={record.quantity ? record.quantity : 1}
            value={record.quantity ? record.quantity : 1}
            precision={0}
            onChange={(value) => updateQuantity(record.id, value)}
          ></InputNumber>
        )
      },
    },
    {
      title: 'Total Price($)',
      key: 'totalPrice',
      render: (_, record) => {
        const totalPrice = (record.quantity * record.price).toFixed(2)
        return <span>{totalPrice}</span>
      },
    },
    {
      title: (
        <div className='center'>
          <span>Action</span>
        </div>
      ),
      key: 'action',
      render: (_, record) => (
        <div className='center'>
          <Button onClick={() => removeItem(record.id, record.key)}>Discard</Button>
        </div>
      ),
    },
  ]

  return (
    <div style={{ maxWidth: '80%', margin: 'auto' }}>
      <Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} />
      <div style={{ marginTop: '20px' }}>
        <Button type='primary' onClick={start} disabled={!hasSelected} loading={loading}>
          Buy
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
    </div>
  )
}

export default Cart
