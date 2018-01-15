import * as types from './mutation-types'

const mutations = {
  [types.SET_TAB](state, tab) {
    state.tab = tab
  },
  [types.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_TAB_NAME](state, tabName) {
    state.tabName = tabName
  },
  [types.SET_TOPIC_ID](state, topicId) {
    state.topicId = topicId
  }
}

export default mutations
