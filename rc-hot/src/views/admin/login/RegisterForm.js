import React from 'react'
import { withRouter } from 'react-router-dom'
import lyForm from '@/components/lyform'
import { register } from '@/api/admin'

@withRouter
@lyForm
class Register extends React.Component {
  async handleRegister() {
    try {
      await register(this.props.state)
      alert('注册成功')
      this.clear()
    } catch (e) {}
  }

  login = () => {
    this.props.switchShowBox('login')
    this.clear()
  }

  clear = () => {
    this.props.setData({
      username: '',
      password: ''
    })
  }

  render() {
    return (
      <div className={this.props.className}>
        <h3 className="title">管理员注册</h3>
        <form action="">
          <input
            onChange={e => this.props.handleChange('username', e.target.value)}
            value={this.props.state.username || ''}
            maxLength={16}
            placeholder="用户名"
          />
          <input
            type="password"
            onChange={e => this.props.handleChange('password', e.target.value)}
            value={this.props.state.password || ''}
            maxLength={16}
            placeholder="密码"
          />
        </form>

        <div className="bottom">
          <button onClick={() => this.handleRegister()}>注册</button>
          <button onClick={this.login}>登录</button>
        </div>
      </div>
    )
  }
}

export default Register
