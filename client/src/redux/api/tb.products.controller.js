import { axiosCustom } from './axios.custom'

const tbProductController = {
  getProducts() {
    const url = '/products'
    return axiosCustom.get(url, {})
  },

  addProduct(payload) {
    const url = '/products'
    return axiosCustom.post(url, { payload })
  },

  updateProduct(payload) {
    const url = '/products'
    return axiosCustom.put(url + `/${payload.id}`, { payload })
  },

  deleteProduct(id) {
    const url = '/products'
    return axiosCustom.delete(url + `/${id}`)
  },

  getOrders() {
    const url = '/order'
    return axiosCustom.get(url)
  },
}

export default tbProductController
