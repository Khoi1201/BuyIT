import { Col, Image, Row, Typography } from 'antd'
import React from 'react'

const Detail = () => {
  return (
    <Row className='product'>
      <Col span={10} className='product--image'>
        <Image />
      </Col>
      <Col span={14} className='product--details'>
        <Typography.Title>Ihone 19</Typography.Title>

      </Col>
    </Row>
  )
}

export default Detail
