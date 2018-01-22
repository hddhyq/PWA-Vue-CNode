function loadUserInfo() {
  let user = window.localStorage.getItem('user')
  return JSON.parse(user)
}

const state = {
  userInfo: loadUserInfo() || {},
  topicId: '',
  drawer: false
}

export default state
