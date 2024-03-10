import { ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Card, Flex, Image } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ThemeContext from '../../context/themeContext'
import { addToCart } from '../../redux/slice/store.slice'

const Shop = () => {
  const dispatch = useDispatch()
  const theme = useContext(ThemeContext)
  const allProducts = useSelector((state) => state.store.allProducts)

  const handleAddToCart = (id) => {
    dispatch(addToCart(id))
  }

  return (
    <Flex
      wrap='wrap'
      justify={'space-between'}
      style={{ maxWidth: '80%', margin: 'auto' }}
      gap={'large'}
    >
      {allProducts?.map((product) => {
        return (
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
            style={{ height: 400, width: '30%' }}
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
                  console.log('user want to buy this product')
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
        )
      })}
    </Flex>
  )
}

export default Shop
