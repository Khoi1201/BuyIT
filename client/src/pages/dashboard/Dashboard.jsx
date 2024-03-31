import React, { useEffect } from 'react'
import './index.css'
import { Image, Popover, Table, Tag } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, updateOrder } from '../../redux/slice/product.slice'

const Dashboard = ({ setSelectTab }) => {
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.product.orders)
  const products = useSelector((state) => state.product.products)

  const tagRender = (tag, onClick, style) => {
    let color

    switch (tag) {
      case 'ORDER':
        color = 'gold'
        break
      case 'DELIVER':
        color = 'blue'
        break
      case 'DONE':
        color = 'green'
        break
      case 'CANCEL':
        color = 'red'
        break
      case 'COMPLETE':
        color = 'purple'
        break
      default:
        color = ''
        break
    }

    return (
      <Tag color={color} key={tag} onClick={onClick} style={style}>
        {tag}
      </Tag>
    )
  }

  const getDate = (time) => {
    const date = new Date(time)
    return `${date.getDate()}/${date.getMonth()}/${date.getUTCFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
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

  const dataSource = orders.map((order, i) => {
    return { ...order, key: i }
  })

  const changeTag = (state, itemId, orderId) => {
    const list = ['ORDER', 'DELIVER', 'DONE', 'CANCEL'].filter((value) => value !== state)

    const style = {
      cursor: 'pointer',
    }

    const handleChange = (e) => {
      const data = { orderId, itemId, state: e.target.textContent }
      dispatch(updateOrder(data))
    }

    return <div>{list.map((value) => tagRender(value, handleChange, style))}</div>
  }

  const column = [
    {
      title: <span>Order Id</span>,
      key: 'id',
      render: (_, record) => {
        return <span>{record._id.slice(-5)}</span>
      },
      sortDirections: ['descend', 'ascend', 'descend'],
      sorter: (a, b) => {
        let numA = parseInt(a._id.match(/\d+/)[0])
        let numB = parseInt(b._id.match(/\d+/)[0])

        if (numA < numB) {
          return -1
        }
        if (numA > numB) {
          return 1
        }
        return 0
      },
    },
    {
      title: <span>Created Date</span>,
      key: 'date',
      render: (_, record) => {
        return <span>{getDate(record.createdAt)}</span>
      },
      sortDirections: ['descend', 'ascend', 'descend'],
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        let dateA = new Date(a.createdAt)
        let dateB = new Date(b.createdAt)
        return Date.parse(dateA) - Date.parse(dateB)
      },
    },
    {
      title: <span>Status</span>,
      key: 'status',
      render: (_, record) => {
        let tag
        if (record.listOfProduct.find((temp) => ['ORDER', 'DELIVER'].includes(temp.state)))
          tag = 'PROGRESS'
        else tag = 'COMPLETE'
        return <span>{tagRender(tag)}</span>
      },
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => {
        let tagA
        if (a.listOfProduct.find((temp) => ['ORDER', 'DELIVER'].includes(temp.state)))
          tagA = 'PROGRESS'
        else tagA = 'COMPLETE'
        let tagB
        if (b.listOfProduct.find((temp) => ['ORDER', 'DELIVER'].includes(temp.state)))
          tagB = 'PROGRESS'
        else tagB = 'COMPLETE'

        if (tagA === 'COMPLETE' && tagB === 'PROGRESS') {
          return -1
        } else if (tagA === 'PROGRESS' && tagB === 'COMPLETE') {
          return 1
        } else {
          return 0
        }
      },
    },
  ]

  const expandable = {
    expandedRowRender: (order) => {
      const smallColumns = [
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
          render: (_, record) => <span>{record.title}</span>,
        },
        {
          title: <span>Quantity</span>,
          dataIndex: 'quantity',
          key: 'quantity',
          render: (_, record) => <span>{record.quantity}</span>,
        },
        {
          title: <span>State</span>,
          key: 'state',
          render: (_, record) => {
            const style = {
              cursor: 'pointer',
            }
            return (
              <Popover
                content={() => changeTag(record.state, record.id, order._id)}
                placement={'right'}
              >
                <span>{tagRender(record.state, null, style)}</span>
              </Popover>
            )
          },
        },
      ]
      const smallData = order.listOfProduct.map((product, i) => {
        let tempProduct = products.find((temp) => temp._id === product.id)
        return {
          ...product,
          url: tempProduct?.url,
          title: tempProduct?.title,
          key: i,
        }
      })
      return (
        <Table
          dataSource={smallData}
          columns={smallColumns}
          pagination={{ hideOnSinglePage: true }}
        />
      )
    },
  }

  useEffect(() => {
    dispatch(getOrders())
  }, [orders])

  useEffect(() => setSelectTab('dashboard'), [])
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={column}
        expandable={expandable}
        pagination={{ hideOnSinglePage: true }}
        style={{ width: '50vw' }}
      ></Table>
    </div>
  )
}

export default Dashboard
