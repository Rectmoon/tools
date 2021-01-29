import React from 'react'

export default props => {
  console.log({ props })
  return <div {...props}>Test1</div>
}
