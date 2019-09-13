import React, { Component } from 'react'
import styles from './button.styl'

export default class Button extends Component {
  componentDidMount() {
    console.log('button挂载成功')
  }

  render() {
    const { children, value } = this.props
    return (
      <button onClick={this.props.onClick} className={styles.button}>
        {children ? children : value}
      </button>
    )
  }
}
