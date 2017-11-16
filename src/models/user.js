/**
 * Created by nap on 17/9/27.
 */
import { USER } from '../constants/ActionTypes'
import { LOCAL_STORAGE } from '../constants/Constants'
import { Storage } from '../utils/common'

export default {

  namespace: USER.ROOT,

  state: {},

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
    }
  },

  effects: {
    *fetch({payload}, {call, put}) {  // eslint-disable-line
      yield put({type: 'save'})
    }
  },

  reducers: {

    [USER.SAVE_USERINFO] (state, {payload}) {
      const user = {
        ...state,
        ...payload
      }

      Storage.setItem(LOCAL_STORAGE, {user})

      return user
    },
    [USER.CLEAR_USERINFO] () {
      Storage.clear()
      return {}
    }
  }

}
