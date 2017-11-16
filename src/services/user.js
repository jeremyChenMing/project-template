import * as fetch from '../utils/fetch'

export const login = (data) => {
  return fetch.post('/api/v1/auth/token', {}, data)
}
