import Cookies from 'js-cookie'
import axios from 'axios'

export const axiosCustom = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_API_HOST
      : 'https://buy-it-ten.vercel.app/',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  },
})

axiosCustom.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    const { headers } = config

    // Check headers before add Authorization
    if (!headers) return config

    if (token) {
      const tokenParts = token.split('.')
      const payload = JSON.parse(atob(tokenParts[1]))
      const expirationTime = payload.exp * 1000 // Convert expiration time to millisecond
      if (expirationTime > Date.now()) {
        headers['Authorization'] = token === null ? '' : `Bearer ${token}`
      }
    }

    return config
  },
  (error) => Promise.reject(error)
)
