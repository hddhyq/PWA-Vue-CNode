export function loadUserInfo() {
  let user = window.localStorage.getItem('user')
  // console.log(user)
  return user
}
