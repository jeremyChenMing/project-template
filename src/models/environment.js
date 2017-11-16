import { ENV } from '../constants/ActionTypes'

export default {

  namespace: ENV.ROOT,

  state: {
    spin: false
  },

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

    save (state, action) {
      return {...state, ...action.payload}
    },

    [ENV.CHANGE_SPIN] (state, action) {
      return {
        ...state,
        spin: action.payload
      }
    }
  }

}
