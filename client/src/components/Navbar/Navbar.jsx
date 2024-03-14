import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const getItem = (label, key, icon, children, type) => {
  return { key, icon, children, label, type }
}

const items = [
  getItem('Dashboard', 'dashboard', <MailOutlined />),
  getItem('Store', 'store', <AppstoreOutlined />),
  getItem('Setting', 'setting', <SettingOutlined />),
]

const Navbar = ({ selectTab, setSelectTab }) => {
  const navigate = useNavigate()

  const onClick = (e) => {
    setSelectTab(e)
    navigate('/' + e.key)
  }
  return (
    <>
      <Menu items={items} onClick={onClick} selectedKeys={selectTab} defaultSelectedKeys={['1']} />
    </>
  )
}

export default Navbar
