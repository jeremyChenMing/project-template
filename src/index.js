import 'babel-polyfill'
import dva from 'dva'
import { reducer as formReducer } from 'redux-form'
import { syncStateToFetch } from './utils/fetch'
import createLoading from 'dva-loading'
import 'antd/dist/antd.less'
import './less/index.less'
import { LOCAL_STORAGE } from './constants/Constants'
import { Storage } from './utils/common'

const initialState = Storage.getItem(LOCAL_STORAGE)

// 1. Initialize
const app = dva({
  initialState,
  extraReducers: {
    form: formReducer
  }
})
// 分支
// 2. Plugins
app.use(createLoading())

app.use({
  onStateChange: syncStateToFetch.bind(null, app, initialState)
})

// 3. Model
app.model(require('./models/environment'))
app.model(require('./models/user'))

// 4. Router
app.router(require('./router'))

// 5. Start
app.start('#root')
