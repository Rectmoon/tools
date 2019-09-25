import React, { Component } from 'react'
import { getProfile } from '@/api/profile'
import { sleep } from '@/utils/sleep'
import s from '@/utils/storage'

export default class index extends Component {
  state = {
    showDialog: false,
    value: ''
  }

  async componentDidMount() {
    try {
      const res = await getProfile()
      console.log(res)
    } catch (e) {}
    await sleep(5)
    console.log('What happened ?')
  }

  handleLogout = () => {
    s.remove('token')
    this.props.history.push('/login')
  }

  handleToggleDialogShow = () => {
    this.setState({
      showDialog: !this.state.showDialog,
      value: ''
    })
  }

  handleChange = (k, v) => {
    this.setState({
      [k]: v
    })
  }

  // handleSubmit = () => {
  //   console.log(5556222333666)
  //   console.log('干点什么')
  //   console.log('123456')
  //   console.log(this.state)
  // }

  handleSubmit() {
    console.log(123)
    console.log('干点什么')
    console.log('123456')
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <h1>我是主页</h1>
        <button onClick={this.handleLogout}>登出</button>
        <button onClick={this.handleToggleDialogShow}>{this.state.showDialog ? '关闭弹窗' : '点我弹窗'}</button>

        {this.state.showDialog ? (
          <div className="dialog">
            <div className="dialog-container">
              <h2>我是弹窗嘿嘿嘿</h2>
              <div>
                <input
                  type="text"
                  value={this.state.value}
                  onChange={e => this.handleChange('value', e.target.value)}
                />

                <button onClick={() => this.handleSubmit()}>确定</button>
              </div>
              <a onClick={this.handleToggleDialogShow} className="close">
                关闭弹窗
              </a>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}
