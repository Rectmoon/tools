import React, { Component } from 'react'
import styles from './login.styl'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

class Login extends Component {
  state = {
    showBox: 'login'
  }

  switchShowBox = box => {
    this.setState({
      showBox: box
    })
  }

  render() {
    const { showBox } = this.state

    return (
      <div className={styles['login-page']}>
        <div className={styles['background-box']} />
        <div className="container" className={styles.container}>
          <LoginForm
            switchShowBox={this.switchShowBox}
            className={`${styles.box} ${showBox === 'login' ? 'show-box' : 'hidden-box'}`}
          ></LoginForm>
          <RegisterForm
            switchShowBox={this.switchShowBox}
            className={`${styles.box} ${showBox === 'register' ? 'show-box' : 'hidden-box'}`}
          ></RegisterForm>
        </div>
      </div>
    )
  }
}

export default Login
