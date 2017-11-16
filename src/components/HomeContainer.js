import React from 'react'
import Header from './Layout/Header'
import l from './HomeContainer.less'
import { Link } from 'dva/router'

class HomeContainer extends React.Component {
  render () {
    return (
      <div className={l.home}>
        <Header />
        <div className={l.navs}>
          <Link activeClassName={l.active} to='/index'><span className='upvi-icon'>&#xe6f0;</span>首页</Link>
          <Link activeClassName={l.active} to='/management'><span className='upvi-icon'>&#xe6f0;</span>公司管理</Link>
          <Link activeClassName={l.active} to='/statistics'><span className='upvi-icon'>&#xe6f1;</span>数据统计</Link>
        </div>
        <div className={l.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default HomeContainer
