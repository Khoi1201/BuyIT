import { axiosCustom } from './axios.custom'

const tbProductController = {
  getAllProducts() {
    const url = '/products'
    return axiosCustom.get(url, {})
  },

  addProduct(payload) {
    const url = '/products'
    return axiosCustom.post(url, { payload })
  },
}

export default tbProductController
