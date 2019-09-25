import http from '../common'

export const login = ({ username, password }) =>
  http.post('/api/login', {
    username,
    password
  })

export const register = ({ username, password }) =>
  http.post('/api/register', {
    username,
    password
  })
