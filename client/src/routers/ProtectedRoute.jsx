import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar/Navbar'
import { Content } from 'antd/es/layout/layout'
import { Layout } from 'antd'
import Sider from 'antd/es/layout/Sider'

const ProtectedRoute = ({ selectTab, setSelectTab }) => {
  const authenticated = useSelector((state) => state.authentication.authenticated)

  const [collapsed, setCollapsed] = useState(false)

  return authenticated ? (
    <>
      <Layout style={{ height: '100vh' }}>
        
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Navbar selectTab={selectTab} setSelectTab={setSelectTab} />
        </Sider>

        <Content style={{ padding: '2rem', boxSizing: 'border-box' }}>
          <Outlet />
        </Content>

      </Layout>
    </>
  ) : (
    <Navigate to={'/login'} replace />
  )
}

export default ProtectedRoute
