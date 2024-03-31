import { ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Card, Image, List } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ThemeContext from '../../context/themeContext'
import { addToCart } from '../../redux/slice/store.slice'
import { useNavigate } from 'react-router-dom'

const Shop = ({ allProducts, selectedRowKeys, setSelectedRowKeys, cart, searchQuery }) => {
  const dispatch = useDispatch()
  const theme = useContext(ThemeContext)
  const navigate = useNavigate()
  const searchProducts = useSelector((state) => state.store.searchProducts)
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    setDataSource(
      searchQuery
        ? searchProducts.length
          ? allProducts.filter((item) =>
              searchProducts.find((product) => {
                return product._id === item._id
              })
            )
          : []
        : allProducts
    )
  }, [searchQuery, allProducts, searchProducts, setDataSource])

  const handleAddToCart = (id) => {
    dispatch(addToCart(id))
  }

  return (
    <List
      style={{ maxWidth: '80%', margin: 'auto' }}
      grid={{
        gutter: 16,
        column: 3,
      }}
      dataSource={dataSource}
      renderItem={(product) => (
        <List.Item>
          <Card
            className={'card-' + theme}
            key={product._id}
            id={product._id}
            cover={
              <Image
                preview={false}
                style={{ width: '100%', height: 235, objectFit: 'cover' }}
                alt='cover'
                src={product.url}
              />
            }
            style={{ height: 400, width: '100%' }}
            actions={[
              <ShoppingCartOutlined
                key='cart'
                onClick={() => {
                  handleAddToCart(product._id)
                }}
              />,
              <ShoppingOutlined
                key='buy'
                onClick={() => {
                  if (!cart.map((item) => item.id).includes(product._id)) {
                    handleAddToCart(product._id)
                    navigate('/cart')
                    setSelectedRowKeys(selectedRowKeys.concat(cart.length))
                  }
                }}
              />,
            ]}
          >
            <Meta
              title={product.title}
              description={
                product.description.split(' ').length > 5
                  ? product.description.split(' ').slice(0, 5).join(' ') + ' ...'
                  : product.description
              }
            />
            <span>Price: {product.price} $</span>
          </Card>
        </List.Item>
      )}
    />
  )
}

export default Shop
