import { Button, Col, Row } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadUser } from '../../redux/slice/login.slice'
import Cookies from 'js-cookie'

const Setting = ({ theme, setTheme, setSelectTab }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    setSelectTab('setting')
  }, [])

  const changeTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      setTheme('light')
      localStorage.setItem('theme', 'light')
    }
  }

  const handleLogout = () => {
    Cookies.remove('token')
    dispatch(loadUser())
  }

  return (
    <div>
      <Col span={24}>
        <Row>
          <Button onClick={changeTheme}>Change Theme with a Click!</Button>
        </Row>
        <br />
        <Row>
          <Button danger onClick={handleLogout}>
            Logout
          </Button>
        </Row>
      </Col>
    </div>
  )
}

export default Setting
