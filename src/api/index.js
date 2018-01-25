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
// *************************评论************************
// 新建评论
export function postReply(accessToken, topicId, content, replyId) {
  const url = URL + '/topic/' + topicId + '/replies'

  return axios.post(url, {
    accesstoken: accessToken,
    content: content,
    reply_id: replyId || ''
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 为评论点赞
export function postUps(accessToken, ReplyId) {
  const url = URL + '/reply/' + ReplyId + '/ups'

  return axios.post(url, {
    accesstoken: accessToken
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// ********************************主题***********************
// 新建主题
export function postTopic(accessToken, tab, title, content) {
  const url = URL + '/topics'

  return axios.post(url, {
    accesstoken: accessToken,
    tab: tab, // 测试用
    title: title,
    content: content // 测试
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// **************************主题收藏*****************************
// 收藏主题
export function postCollect(accessToken, topicId) {
  const url = URL + '/topic_collect/collect'

  return axios.post(url, {
    accesstoken: accessToken,
    topic_id: topicId
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 取消主题
export function postDeCollect(accessToken, topicId) {
  const url = URL + '/topic_collect/de_collect'

  return axios.post(url, {
    accesstoken: accessToken,
    topic_id: topicId
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 用户所收藏的主题
export function getTopicCollect(loginName) {
  const url = URL + '/topic_collect/' + loginName

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
