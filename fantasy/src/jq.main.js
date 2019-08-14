import $ from 'jquery'
import { version } from '../package.json'

export default class Demo {
  constructor() {
    this.version = version
    this.init()
  }

  init() {
    console.log($.extend)
  }
}
