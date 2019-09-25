import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      a: 1
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    alert()
    console.log(234568)
  }

  handleClick() {
    console.log(666777888)
    console.log(this.state.a)
    this.setState({
      a: 666
    })
  }

  render() {
    return (
      <div>
        <h1>hello1234568</h1>

        <button onClick={this.handleClick}>我是一个按钮嘿嘿嘿</button>
      </div>
    )
  }
}
