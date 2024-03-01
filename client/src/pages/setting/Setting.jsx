import { Button } from 'antd'
import React from 'react'

const Setting = ({ theme, setTheme }) => {

  const changeTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      setTheme('light')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <div style={{ height: '100vh' }}>
      <Button onClick={changeTheme}>Change Theme with a Click!</Button>
    </div>
  )
}

export default Setting
