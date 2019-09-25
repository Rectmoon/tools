import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import s from '@/utils/storage'

@withRouter
class Auth extends Component {
  componentDidMount() {
    const whiteList = ['/login', '/register']
    const pathname = this.props.location.pathname

    if (!whiteList.includes(pathname)) {
      if (!s.get('token')) {
        this.props.history.push('/login')
      }
    }
  }

  render() {
    return null
  }
}

export default Auth
