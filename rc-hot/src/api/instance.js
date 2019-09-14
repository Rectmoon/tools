import axios from 'axios'

const baseURLMap = {
  development: '/',
  production: 'http://api.123dailu.com'
}

const mode = process.env.NODE_ENV

const Instance = axios.create({
  baseURL: baseURLMap[mode],
  timeout: 10000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
})

Instance.interceptors.request.use(
  config => {
    // if (config.method === 'post') {
    //   if (localStorage.token) {
    //     config.headers.Authorization = localStorage.token
    //   }
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

Instance.interceptors.response.use(
  res => res.data,
  error => {
    return Promise.reject(error)
  }
)

export default Instance
