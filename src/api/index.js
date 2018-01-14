import axios from 'axios'

const URL = 'https://cnodejs.org/api/v1'

export function getTab(tab) {
  const url = URL + '/topics'

  const data = {
    page: 1,
    tab: tab,
    limit: 20
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
