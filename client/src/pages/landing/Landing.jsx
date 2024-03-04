import { Button, Layout } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { Link, Navigate } from 'react-router-dom'

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 100,
  paddingInline: 48,
  lineHeight: '20px',
  backgroundColor: '#4096ff',
}
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
}
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
}
const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(50% - 8px)',
  maxWidth: 'calc(50% - 8px)',
}

const Landing = () => {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <div>
          <p>Hello</p>
          <Link to={'/login'}>Login to Start selling</Link>
        </div>
      </Header>
      <Content style={contentStyle}>Content</Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  )
}

export default Landing
