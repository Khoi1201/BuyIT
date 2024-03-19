import './index.css'

import { ShoppingFilled } from '@ant-design/icons'
import { Avatar, Badge, Col, Layout, Row } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllProducts, loadCart } from '../../redux/slice/store.slice'
import Shop from './Shop'
import Cart from './Cart'
import ModalDetail from '../../components/Modal/ModalDetail/ModalDetail'

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  lineHeight: '20px',
  paddingTop: '10px',
}
const contentStyle = {
  padding: '20px 0',
  textAlign: 'center',
}
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
}
const layoutStyle = {
  width: '100%',
  minHeight: '100vh',
}

const ChangeTab = () => {
  const dispatch = useDispatch()
  const allProducts = useSelector((state) => state.store.allProducts)

  const [currentTab, setCurrentTab] = useState()
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [id, setId] = useState()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const cart = useSelector((state) => state.store.cart)

  useEffect(() => {
    dispatch(loadCart())
  }, [])

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  const renderSwitch = (tabName) => {
    switch (tabName) {
      case 'shop':
        return (
          <Shop
            allProducts={allProducts}
            setCurrentTab={setCurrentTab}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            count={cart.length}
          />
        )
      case 'cart':
        return (
          <Cart
            setId={setId}
            setShowDetailModal={setShowDetailModal}
            allProducts={allProducts}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
          />
        )
      default:
        return (
          <Shop
            allProducts={allProducts}
            setCurrentTab={setCurrentTab}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            count={cart.length}
          />
        )
    }
  }

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Row>
          <Col span={12}>
            <p
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setCurrentTab('shop')
              }}
            >
              Shopping at ease!
            </p>
          </Col>
          <Col span={12}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                gap: '2rem',
              }}
            >
              <Badge offset={[-5, 5]} count={cart.length}>
                <Avatar
                  size={'large'}
                  icon={<ShoppingFilled style={{ color: 'white' }} />}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setCurrentTab('cart')
                  }}
                />
              </Badge>
              <p>
                <Link to={'/login'}>Login</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Header>

      <Content style={contentStyle}>
        {renderSwitch(currentTab)}
        {id && (
          <ModalDetail
            setShowDetailModal={setShowDetailModal}
            showDetailModal={showDetailModal}
            product={allProducts.find((product) => product._id === id)}
          />
        )}
      </Content>

      <Footer style={footerStyle}>Copyright © by Khoi1203-3/2024 </Footer>
    </Layout>
  )
}

export default ChangeTab
