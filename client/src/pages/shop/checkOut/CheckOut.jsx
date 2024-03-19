import React, { useState } from 'react'
import { Button, Col, Image, InputNumber, Modal, Row, Space, Table } from 'antd'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../../../redux/slice/store.slice'

const CheckOut = ({
  items,
  total,
  setSelectedRowKeys,
  showCheckout,
  setShowCheckout,
  allProducts,
}) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const dataSource = items.map((item, i) => {
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

  const handleClose = () => {
    setShowCheckout()
  }

  const start = () => {
    setLoading(true)
    // ajax request after empty completing

    setTimeout(() => {
      // call server to make a purchase
      console.log(items) // give this to server

      // clear cart
      items.map((item) => dispatch(removeFromCart(item.id)))
      // clear selected
      setSelectedRowKeys([])
      handleClose()
      setLoading(false)
    }, 1000)
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
          <p>{record.title}</p>
        </Space>
      ),
    },
    { title: 'Unit Price($)', dataIndex: 'price', key: 'unitPrice' },
    {
      title: 'Quantity',
      key: 'quantity',
      render: (_, record) => {
        return <InputNumber readOnly value={record.quantity ? record.quantity : 1}></InputNumber>
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
  ]
  return (
    <Modal
      style={{ top: 30 }}
      width={800}
      open={showCheckout}
      onCancel={handleClose}
      footer={
        <>
          <Button type='primary' onClick={start} loading={loading}>
            Confirm
          </Button>
          <Button type='default' onClick={handleClose}>
            Cancel
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexFlow: 'wrap', justifyContent: 'end', rowGap: '2rem' }}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          scroll={{
            y: 240,
          }}
        />
        <span>{`Total: ${total}$`}</span>
      </div>
    </Modal>
  )
}

export default CheckOut
