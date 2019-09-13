import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'
import Counter from './Counter'
import Button from './Button'

import styles from './index.css'

console.log(process.env)
const sleep = t => new Promise(resolve => setTimeout(resolve, t * 1000))

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1
    }
  }

  handleClick = () => {
    console.log(6666789)
    this.setState({
      count: this.state.count + 1
    })
  }

  async componentDidMount() {
    await sleep(3)
    console.log('What happened ?')
  }

  render() {
    console.log('rendering1')
    return (
      <div>
        <h1>
          Hello, world1234.
          <br />
          <Counter />
        </h1>
        <h1>{this.state.count}</h1>
        <Button onClick={this.handleClick}>123456789</Button>

        <div className="flex">我是widget中的样式</div>

        <div className={styles.box}>我是局部的box</div>
        <div className="box">我是全局的box</div>
      </div>
    )
  }
}

export default hot(App)
