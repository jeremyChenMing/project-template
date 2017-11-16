/**
 * Created by nap on 17/9/26.
 */
import React from 'react'
import l from './Header.less'
import { Avatar } from 'antd'
import { connect } from 'dva'
import { clearUserInfo } from '../../actions/user'
import { routerRedux } from 'dva/router'

class Header extends React.Component {
  handleExit = () => {
    const {dispatch} = this.props
    dispatch(clearUserInfo())
    dispatch(routerRedux.replace('/login'))
  }

  render () {
    const {username} = this.props
    return (
      <div className={l.header}>
        <div className={l.logo}>
          <h1>企飞科技</h1>
        </div>
        <div className={l.right}>
          <Avatar>{username}</Avatar>
          <div className={l.actions}>
            {/* <div className={l.item}><span className='upvi-icon'>&#xe6d4;</span></div> */}
            <div className={l.item} onClick={this.handleExit}><span className='upvi-icon'>&#xe6dc;</span></div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  const {user: {username}} = state
  return {username}
})(Header)
