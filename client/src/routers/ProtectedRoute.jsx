import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar/Navbar'
import { Content } from 'antd/es/layout/layout'
import { Layout } from 'antd'
import Sider from 'antd/es/layout/Sider'
import ThemeContext from '../context/themeContext'

const ProtectedRoute = ({ selectTab, setSelectTab, setMem }) => {
  const theme = useContext(ThemeContext)
  const authenticated = useSelector((state) => state.authentication.authenticated)

  const [collapsed, setCollapsed] = useState(false)

  const location = useLocation()
  useEffect(() => setMem(location), [setMem])

  return authenticated ? (
    <>
      <Layout style={{ height: '100%', minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Navbar selectTab={selectTab} setSelectTab={setSelectTab} />
        </Sider>

        <Content
          style={{ padding: '2rem', boxSizing: 'border-box' }}
          className={'content-' + theme}
        >
          <Outlet />
        </Content>
      </Layout>
    </>
  ) : (
    <Navigate to={'/login'} />
  )
}

export default ProtectedRoute
