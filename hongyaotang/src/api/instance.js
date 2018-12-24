import axios from 'axios'
import qs from 'qs'

const baseURLMap = {
  development: '/api',
  production: 'http://api.123dailu.com'
}
const mode = process.env.NODE_ENV

const Instance = axios.create({
  baseURL: baseURLMap[mode],
  timeout: 10000,
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

Instance.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
      if (localStorage.token) {
        config.headers.Authorization = localStorage.token
      }
    }
    return config
  },
  error => Promise.reject(error)
)

Instance.interceptors.response.use(res => res.data, error => Promise.reject(error))

export default Instance
