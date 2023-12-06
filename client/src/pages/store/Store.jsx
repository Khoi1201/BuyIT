import { Button, Card, Flex, Image } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../redux/slice/product.slice'
import Meta from 'antd/es/card/Meta'

const Store = ({ setSelectTab }) => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.product.products)

  useEffect(() => {
    setSelectTab('store')
  }, [])
  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  console.log(products)

  return (
    <div>
      {/* {products && <span>{products}</span>} */}
      <Flex wrap='wrap' gap={'large'}>
        {products.map((product) => {
          return (
            <Card cover={<Image alt='cover' src={product.url} />} style={{ width: 300 }}>
              <Meta title={product.title} description={product.description} />
              <span>Price: {product.price} $</span>
            </Card>
          )
        })}
      </Flex>
    </div>
  )
}

export default Store
