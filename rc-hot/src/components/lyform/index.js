import React from 'react'

export default function lyForm(Comp) {
  return class WrapperComp extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
      this.setData = this.setData.bind(this)
    }

    handleChange(k, v) {
      this.setState({
        [k]: v
      })
    }

    setData(d) {
      this.setState(d)
    }

    render() {
      return <Comp handleChange={this.handleChange} state={this.state} setData={this.setData} {...this.props} />
    }
  }
}
