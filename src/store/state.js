function loadUserInfo() {
  let user = window.localStorage.getItem('user')
  return JSON.parse(user)
}

// params {userInfo}
/* name: res.loginname,
* avatarUrl: res.avatar_url,
* userId: res.id,
* token: this.accessToken
*/

const state = {
  userInfo: loadUserInfo() || {},
  topicId: '',
  drawer: false
}

export default state
