import './index.css'

import { ShoppingFilled } from '@ant-design/icons'
import { Avatar, Badge, Col, Layout, Row } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getAllProducts, loadCart, searchProducts } from '../../redux/slice/store.slice'
import Shop from './Shop'
import Cart from './Cart'
import ModalDetail from '../../components/Modal/ModalDetail/ModalDetail'
import Search from 'antd/es/input/Search'

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

const ChangeTab = ({ tab }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const query = new URLSearchParams(location.search).get('query') || ''
  const allProducts = useSelector((state) => state.store.allProducts)
  const searchStatus = useSelector((state) => state.store.searchStatus)
  const cart = useSelector((state) => state.store.cart)

  const [showDetailModal, setShowDetailModal] = useState(false)
  const [id, setId] = useState()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [searchQuery, setSearchQuery] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)

  const handleSearch = (value) => {
    setSearchQuery(value)
    dispatch(searchProducts(value))
    value ? navigate(`?query=${value}`) : navigate('/')
  }

  useEffect(() => {
    searchStatus === 'loading' ? setSearchLoading(true) : setSearchLoading(false)
  }, [searchStatus])

  useEffect(() => {
    dispatch(searchProducts(query))
  }, [])

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  useEffect(() => {
    dispatch(loadCart())
  }, [])

  const renderSwitch = (tabName) => {
    switch (tabName) {
      case 'shop':
        return (
          <Shop
            allProducts={allProducts}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            cart={cart}
            searchQuery={searchQuery}
          />
        )
      case 'cart':
        return (
          <Cart
            cart={cart}
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
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            cart={cart}
            searchQuery={searchQuery}
          />
        )
    }
  }

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Row>
          <Col span={8}>
            <p
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate('/')
              }}
            >
              Shopping at ease!
            </p>
          </Col>
          <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
            <Search
              allowClear
              placeholder='search for...'
              onSearch={handleSearch}
              enterButton
              loading={searchLoading}
            />
          </Col>
          <Col span={8}>
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
                    navigate('/cart')
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
        {renderSwitch(tab)}
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
