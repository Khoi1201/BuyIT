import { axiosCustom } from './axios.custom'

const tbAuthController = {
  getUser() {
    const url = '/auth'
    return axiosCustom.get(url, {})
  },
  login(username, password) {
    const url = '/auth/login'
    const payload = { username, password }
    return axiosCustom.post(url, { payload })
  },
  register(username, password){
    const url = 'auth/register'
    const payload = {username, password}
    return axiosCustom.post(url, { payload })
  }
}

export default tbAuthController
