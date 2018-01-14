import * as types from './mutation-types'

const mutations = {
  [types.SET_TAB](state, tab) {
    state.tab = tab
  },
  [types.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  }
}

export default mutations
