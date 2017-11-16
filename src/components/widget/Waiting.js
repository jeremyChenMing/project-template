/**
 * Created by nap on 17/9/26.
 */
import React from 'react'
import l from './Waiting.less'

class Waiting extends React.Component {
  render () {
    return (
      <div className={l.waiting}>
        <div className={l.text}>敬请期待...</div>
      </div>
    )
  }
}

export default Waiting
