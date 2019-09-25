import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import Auth from '@/components/auth'
import { Route, Switch } from 'react-router-dom'
import Login from '@/views/admin/login'
import Home from '@/views/admin/home'

import './App.css'
import '@/assets/font/iconfont.css'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Auth />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

export default hot(module)(App)
