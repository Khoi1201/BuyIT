import { axiosCustom } from './axios.custom'

const tbProductController = {
  getAllProducts() {
    const url = '/products'
    return axiosCustom.get(url, {})
  },
}

export default tbProductController
