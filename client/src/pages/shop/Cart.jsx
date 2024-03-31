import { Button, Col, Image, InputNumber, Row, Space, Table } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateCartQuantity } from '../../redux/slice/store.slice'
import CheckOut from './checkOut/CheckOut'

const Cart = ({
  cart,
  setId,
  setShowDetailModal,
  allProducts,
  selectedRowKeys,
  setSelectedRowKeys,
}) => {
  const dispatch = useDispatch()
  const [total, setTotal] = useState(0)
  const [showCheckout, setShowCheckout] = useState(false)
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    if (allProducts && cart) {
      setDataSource(
        cart.map((item, i) => {
          let temp = allProducts.find((product) => product._id === item.id)
          return {
            id: item.id,
            key: i,
            url: temp?.url,
            title: temp?.title,
            price: temp?.price,
            quantity: item.quantity,
          }
        })
      )
    }
  }, [allProducts, cart])

  useEffect(() => {
    setTotal(
      dataSource
        .filter((_, i) => selectedRowKeys.includes(i))
        .reduce((accumulator, curr) => accumulator + curr.quantity * curr.price, 0)
    )
  }, [cart, selectedRowKeys, dataSource])

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
    temp = temp.map((key) => {
      if (key >= i) {
        return key - 1
      } else return key
    })

    setSelectedRowKeys(temp)
  }

  const updateQuantity = (id, value) => {
    dispatch(updateCartQuantity({ id, value }))
  }

  const renderImage = (url) => (
    <span>
      <Image
        preview={false}
        style={{ width: 50, height: 50, objectFit: 'cover' }}
        alt='cover'
        src={url}
      />
    </span>
  )

  const columns = [
    {
      title: <span>Image</span>,
      dataIndex: 'url',
      key: 'url',
      render: renderImage,
    },
    {
      title: <span>Name</span>,
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => (
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setId(record.id)
            setShowDetailModal(true)
          }}
        >
          {record.title}
        </span>
      ),
    },
    {
      title: <span>Unit Price($)</span>,
      dataIndex: 'price',
      key: 'unitPrice',
      render: (_, record) => <span>{record.price}</span>,
    },
    {
      title: <span>Quantity</span>,
      key: 'quantity',
      render: (_, record) => {
        return (
          <span>
            <InputNumber
              controls
              max={20}
              min={1}
              defaultValue={record.quantity ? record.quantity : 1}
              value={record.quantity ? record.quantity : 1}
              precision={0}
              onChange={(value) => updateQuantity(record.id, value)}
              size={'large'}
            ></InputNumber>
          </span>
        )
      },
    },
    {
      title: <span>Total Price($)</span>,
      key: 'totalPrice',
      render: (_, record) => {
        const totalPrice = (record.quantity * record.price).toFixed(2)
        return <span>{totalPrice}</span>
      },
    },
    {
      title: <span>Action</span>,
      key: 'action',
      render: (_, record) => (
        <span>
          <Button onClick={() => removeItem(record.id, record.key)}>Discard</Button>
        </span>
      ),
    },
  ]

  return (
    <div style={{ maxWidth: '80%', margin: 'auto' }}>
      {showCheckout && (
        <CheckOut
          showCheckout={showCheckout}
          setShowCheckout={() => setShowCheckout(false)}
          items={cart.filter((_, i) => selectedRowKeys.includes(i))}
          total={total}
          setSelectedRowKeys={setSelectedRowKeys}
          allProducts={allProducts}
        />
      )}
      <Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} />
      <Row
        style={{
          padding: '30px 0',
          alignItems: 'center',
          position: 'sticky',
          bottom: 0,
        }}
        className={hasSelected ? 'checkoutRow--checked' : 'checkoutRow--uncheck'}
      >
        <Col offset={3}>
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
