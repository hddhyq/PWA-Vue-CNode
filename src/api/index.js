import axios from 'axios'

const URL = 'https://cnodejs.org/api/v1'

// 获取页面listView
export function getTab(tab, page) {
  const url = URL + '/topics'

  const data = {
    page: page || 1,
    tab: tab,
    limit: 20
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取主题详情
export function getTopicDetail(id) {
  const url = URL + '/topic/' + id

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 登录
export function getLogin(accessToken) {
  const url = URL + '/accesstoken'

  return axios.post(url, {
    accesstoken: accessToken
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function postReply(accessToken, topicId, content, replyId) {
  const url = URL + '/topic/' + topicId + '/replies'

  return axios.post(url, {
    accesstoken: accessToken,
    content: content,
    reply_id: replyId | ''
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
