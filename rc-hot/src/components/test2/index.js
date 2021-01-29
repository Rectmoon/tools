import React from 'react'

export default props => {
  console.log({ props })
  return <div {...props}>Test2</div>
}
