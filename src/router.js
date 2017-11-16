import React from 'react'
import { Router, Route, IndexRedirect } from 'dva/router'

import Shell from './components/widget/Shell'
import Waiting from './components/widget/Waiting'

import HomeContainer from './components/HomeContainer'

import Login from './routes/Login'

function RouterConfig ({history}) {
  return (
    <Router history={history}>
      <Route path='/' component={Shell}>
        <IndexRedirect to='login' />
        <Route path='login' component={Login} />
        <Route component={HomeContainer}>
          <Route path='index' component={Waiting} />
        </Route>
      </Route>
    </Router>
  )
}

export default RouterConfig
