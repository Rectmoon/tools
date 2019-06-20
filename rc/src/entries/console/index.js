import React from "react"
import ReactDOM from "react-dom"
import App from "./app"

ReactDOM.render(<App />, document.getElementById("root"))

const __DEV__ = process.env.NODE_ENV === "development"

if (__DEV__) {
  if (module.hot) {
    module.hot.accept(["./app"], () => {
      ReactDOM.render(<App />, document.getElementById("root"))
    })
  }
}
