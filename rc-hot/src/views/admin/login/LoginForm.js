import React from 'react'
import { withRouter } from 'react-router-dom'
import lyForm from '@/components/lyform'
import { login } from '@/api/admin'
import s from '@/utils/storage'

const Test1 = React.lazy(() => import('@/components/test1'))
const Test2 = React.lazy(() => import('@/components/test2'))

@withRouter
@lyForm
class LoginForm extends React.Component {
  state = {
    componentName: 'Test1'
  }

  async handleLogin () {
    console.log(12345)
    this.setState({
      componentName: 'Test2'
    })
    try {
      const {
        user: { username, password },
        token
      } = await login(this.props.state)
      console.log(username)
      console.log(password)
      s.set('token', token)
      this.props.history.push('/')
    } catch (e) {}
  }

  componentDidMount () {
    console.log(this.props.state)
  }

  register = () => {
    console.log(66677)
    this.props.switchShowBox('register')
    this.clear()
  }

  clear = () => {
    this.props.setData({
      username: '',
      password: ''
    })
  }

  render () {
    const { componentName } = this.state

    return (
      <div className={this.props.className}>
        <h3 className='title'>管理员登录</h3>
        <React.Suspense fallback={<div>loading...</div>}>
          {React.createElement(componentName === 'Test1' ? Test1 : Test2, {
            className: 'c'
          })}
        </React.Suspense>
        <form action=''>
          <input
            onChange={e => this.props.handleChange('username', e.target.value)}
            value={this.props.state.username || ''}
            maxLength={16}
            placeholder='用户名'
          />
          <input
            type='password'
            autoComplete='off'
            onChange={e => this.props.handleChange('password', e.target.value)}
            value={this.props.state.password || ''}
            maxLength={16}
            placeholder='密码'
          />
        </form>

        <div className='bottom'>
          <button onClick={() => this.handleLogin()}>登录</button>
          <button onClick={this.register}>注册</button>
        </div>
      </div>
    )
  }
}

export default LoginForm
