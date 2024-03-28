import React, { useEffect } from 'react'
import './index.css'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../redux/slice/product.slice'

const Dashboard = ({ setSelectTab }) => {
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.product.orders)

  const dataSource = orders
  const column = [
    {
      title: <span>Order Id</span>,
      key: 'id',
      render: (_, record) => {
        return <span>{record._id}</span>
      },
    },
    {
      title: <span>Created Date</span>,
      dataIndex: 'createdAt',
      key: 'date',
    },
    { title: <span>Status</span>, key: 'status' },
  ]

  useEffect(() => {
    dispatch(getOrders())
  }, [])

  useEffect(() => setSelectTab('dashboard'), [])
  return (
    <div className='center'>
      <span>Dashboard for statistic and order</span>
      <Table dataSource={dataSource} columns={column}></Table>
    </div>
  )
}

export default Dashboard
