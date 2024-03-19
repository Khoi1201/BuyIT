import { Button, Col, Image, InputNumber, Row, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateCartQuantity } from '../../redux/slice/store.slice'
import CheckOut from './checkOut/CheckOut'

const Cart = ({ setId, setShowDetailModal, allProducts }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.store.cart)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [showCheckout, setShowCheckout] = useState(false)

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

  useEffect(() => {
    setTotal(
      dataSource
        .filter((_, i) => selectedRowKeys.includes(i))
        .reduce((accumulator, curr) => accumulator + curr.quantity * curr.price, 0)
    )
  }, [cartItems, selectedRowKeys, total, dataSource])

  const handleBuyAction = () => {
    setShowCheckout(true)
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
    let temp = selectedRowKeys.filter((key) => key !== i)
    setSelectedRowKeys(
      temp.map((value, j) => {
        if (j >= i) {
          return value - 1
        } else return value
      })
    )
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
      {showCheckout && (
        <CheckOut
          showCheckout={showCheckout}
          setShowCheckout={() => setShowCheckout(false)}
          items={cartItems.filter((_, i) => selectedRowKeys.includes(i))}
          total={total}
          setSelectedRowKeys={setSelectedRowKeys}
          allProducts={allProducts}
        />
      )}
      <Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} />
      <Row style={{ marginTop: '20px', alignItems: 'center' }}>
        <Col>
          <Button type='primary' onClick={handleBuyAction} disabled={!hasSelected}>
            Buy
          </Button>
        </Col>
        <Col>
          <span
            style={{
              marginLeft: 8,
            }}
          >
            {hasSelected
              ? `Selected ${selectedRowKeys.length} items, total ${total.toFixed(2)}`
              : ''}
          </span>
        </Col>
      </Row>
    </div>
  )
}

export default Cart
