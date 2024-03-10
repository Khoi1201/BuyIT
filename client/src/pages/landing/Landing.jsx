import { Avatar, Badge, Button, Card, Col, Flex, Image, Layout, Row } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { addToCart, getAllProducts, loadCart } from '../../redux/slice/store.slice'
import { useContext, useEffect } from 'react'
import ThemeContext from '../../context/themeContext'
import { ShoppingCartOutlined, ShoppingFilled, ShoppingOutlined } from '@ant-design/icons'
import Meta from 'antd/es/card/Meta'

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  lineHeight: '20px',
  paddingTop: '10px',
}
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  color: '#fff',
  backgroundColor: '#0958d9',
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

const Landing = () => {
  const dispatch = useDispatch()
  const theme = useContext(ThemeContext)
  const allProducts = useSelector((state) => state.store.allProducts)
  const cart = useSelector((state) => state.store.cart)

  const handleAddToCart = (id) => {
    dispatch(addToCart(id))
  }

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  useEffect(() => {
    dispatch(loadCart())
  }, [])

  console.log(cart.length)

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Row>
          <Col span={12}>
            <p>Hello</p>
          </Col>
          <Col span={12}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem',
              }}
            >
              <p>
                <Link to={'/login'}>Login to Start selling</Link>
              </p>
              <Badge count={cart.length}>
                <Avatar size={'large'} icon={<ShoppingFilled style={{ color: 'white' }} />} />
              </Badge>
            </div>
          </Col>
        </Row>
      </Header>

      <Content style={contentStyle}>
        <Flex
          wrap='wrap'
          justify={'space-between'}
          style={{ maxWidth: '80%', margin: 'auto' }}
          gap={'large'}
        >
          {allProducts?.map((product) => {
            return (
              <Card
                className={'card-' + theme}
                key={product._id}
                id={product._id}
                cover={
                  <Image
                    preview={false}
                    style={{ width: '100%', height: 235, objectFit: 'cover' }}
                    alt='cover'
                    src={product.url}
                  />
                }
                style={{ height: 400, width: '30%' }}
                actions={[
                  <ShoppingCartOutlined
                    key='cart'
                    onClick={() => {
                      handleAddToCart(product._id)
                    }}
                  />,
                  <ShoppingOutlined
                    key='buy'
                    onClick={() => {
                      console.log('user want to buy this product')
                    }}
                  />,
                ]}
              >
                <Meta
                  title={product.title}
                  description={product.description.split(' ').slice(0, 5).join(' ') + ' ...'}
                />
                <span>Price: {product.price} $</span>
              </Card>
            )
          })}
        </Flex>
      </Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  )
}

export default Landing
