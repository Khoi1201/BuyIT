import { Button, Col, Layout, Row } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { Link, Navigate } from 'react-router-dom'

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  paddingInline: 48,
  lineHeight: '20px',
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
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Row>
          <Col span={12}>
            <p>Hello</p>
          </Col>
          <Col span={12}>
            <p>
              <Link to={'/login'}>Login to Start selling</Link>
            </p>
          </Col>
        </Row>
      </Header>
      <Content style={contentStyle}>
        
      </Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  )
}

export default Landing
