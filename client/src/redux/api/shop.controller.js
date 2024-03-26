import { axiosCustom } from './axios.custom'

const shopController = {
  getAllProducts() {
    const url = '/products/store'
    return axiosCustom.get(url, {})
  },

  placeOrder(order) {
    const url = '/order'
    const payload = { order }
    return axiosCustom.post(url, { payload })
  },
}

export default shopController
