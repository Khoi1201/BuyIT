import { Col, Descriptions, Image, Modal, Row } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

const ModalDetail = ({ setShowDetailModal, showDetailModal, product }) => {
  const handleCancel = () => {
    setShowDetailModal(false)
  }

  const productDetail = [
    { key: '1', label: 'Product Name', children: product.title },
    { key: '2', label: 'Price', children: product.price },
    { key: '3', label: 'Description', children: product.description },
  ]

  return (
    <Modal open={showDetailModal} onCancel={handleCancel} footer={null}>
      <Row>
        <Col span={10}>
          <Image
            preview={false}
            style={{ width: '100%', height: 235, objectFit: 'cover' }}
            alt='cover'
            src={product.url}
          />
        </Col>
        <Col span={14} style={{ padding: '1.5rem 0 0 2.5rem ' }}>
          <Descriptions column={1} title='Product Information' items={productDetail} />
        </Col>
      </Row>
    </Modal>
  )
}
export default ModalDetail
