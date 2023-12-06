import React, { useState } from 'react'
import { Button, Menu } from 'antd'
import {
  AppstoreOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from '@ant-design/icons'
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
    // console.log('click ', e)
    setSelectTab(e)
    navigate('/' + e.key)
  }
  return (
    <>
      <Menu
        items={items}
        onClick={onClick}
        selectedKeys={selectTab}
        defaultSelectedKeys={['1']}
      />
    </>
  )
}

export default Navbar
