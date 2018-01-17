import * as types from './mutation-types'

const mutations = {
  [types.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_TOPIC_ID](state, topicId) {
    state.topicId = topicId
  }
}

export default mutations
