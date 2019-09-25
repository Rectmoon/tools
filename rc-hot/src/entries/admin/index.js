import 'core-js/es/promise'
import 'core-js/es/set'
import 'core-js/es/map'

import React from 'react'
import { render } from 'react-dom'

import '@/assets/styles/widget.css'
import '@/assets/styles/common.styl'

import App from './App'
const root = document.getElementById('app')

render(<App />, root)
