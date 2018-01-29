import * as types from './mutation-types'

const mutations = {
  [types.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_TOPIC_ID](state, topicId) {
    state.topicId = topicId
  },
  [types.SET_DRAWER](state, drawer) {
    state.drawer = drawer
  },
  [types.SET_MSG_COUNT](state, count) {
    state.msgCount = count
  }
}

export default mutations
