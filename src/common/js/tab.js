export function chooseTabName(tab) {
  let tabName = ''
  switch (tab) {
    case 'share':
      tabName = '分享'
      break
    case 'all':
      tabName = '全部'
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
    default:
      tabName = '全部'
  }

  return tabName
}
