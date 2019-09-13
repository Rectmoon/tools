import React from 'react'

export default class Counter extends React.Component {
  state = { count: 0 }

  componentDidMount() {
    console.log(1234)
    this.interval = setInterval(() => this.setState(prevState => ({ count: prevState.count + 1 })), 200)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return <strong>{this.state.count}</strong>
  }
}
