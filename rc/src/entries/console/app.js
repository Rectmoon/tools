import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      a: 1
    }
  }

  componentDidMount() {
    console.log(23456)
  }

  handleClick = () => {
    console.log(562127)
    console.log(this.state.a)
    this.setState({
      a: 666
    })
  }

  render() {
    return (
      <div>
        <h1>hello12342678</h1>

        <button onClick={this.handleClick}>我是一个按钮嘿嘿嘿333</button>
      </div>
    )
  }
}
