import Timeago from 'timeago.js'

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1
      .length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDay(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

/**
 * 调用Timeago库显示到现在的时间
 */
export function timeFromNow(time) {
  var str = ''
  if (time !== null && time !== '') {
    let timeagoInstance = new Timeago()
    str = timeagoInstance.format(time, 'zh_CN')
  }
  return str
}

/**
 * 解决标题置顶、精华、和tab样式。
 * @param  {[type]}  tab     [tab分类]
 * @param  {[type]}  good    [是否是精华]
 * @param  {[type]}  top     [是否置顶]
 * @param  {Boolean} isClass [是否是样式]
 * @return {[type]}          [返回对应字符串]
 */

export function getTabInfo(tab, good, top, isClass) {
  let str = ''
  let className = ''
  if (top) {
    str = '置顶'
    className = 'top'
  } else if (good) {
    str = '精华'
    className = 'good'
  } else {
    switch (tab) {
      case 'share':
        str = '分享'
        className = 'share'
        break
      case 'ask':
        str = '问答'
        className = 'job'
        break
      case 'job':
        str = '招聘'
        className = 'job'
        break
      default:
        str = '暂无'
        className = 'default'
        break
    }
  }

  return isClass ? className : str
}

export function chooseTitleName(name) {
  let titleName = ''
  switch (name) {
    case 'topic':
      titleName = '主题详情'
      break
    case 'login':
      titleName = '登录'
      break
    case 'new':
      titleName = '新建主题'
      break
    case 'about':
      titleName = '关于'
      break
    case 'message':
      titleName = '我的消息'
      break
    case 'user':
      titleName = '个人中心'
      break
    default:
      titleName = ''
  }

  return titleName
}

export function chooseTabName(tab) {
  let tabName = ''
  switch (tab) {
    case 'share':
      tabName = '分享'
      break
    case 'all':
      tabName = 'CNode社区'
      break
    case 'good':
      tabName = '精华'
      break
    case 'ask':
      tabName = '问答'
      break
    case 'job':
      tabName = '招聘'
      break
    case 'dev':
      tabName = '测试'
      break
    default:
      tabName = 'CNode社区'
  }

  return tabName
}

export function getTab(topicName) {
  let tabName = ''
  switch (topicName) {
    case '分享':
      tabName = 'share'
      break
    case '问答':
      tabName = 'ask'
      break
    case '测试':
      tabName = 'dev'
      break
    case '招聘':
      tabName = 'job'
      break
    default:
      tabName = 'dev'
  }

  return tabName
}
