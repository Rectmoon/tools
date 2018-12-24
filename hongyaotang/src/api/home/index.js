import { fetch, post } from '../common'

export const getData1 = () => fetch('/data1')
export const postData1 = id => post('/data1', { id })
