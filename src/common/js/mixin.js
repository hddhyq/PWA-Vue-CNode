import { timeFromNow, getTabInfo } from '@/common/js/utils'

export const topicMixin = {
  filters: {
    formatTime(time) {
      let Time = timeFromNow(time)
      return Time
    }
  },
  methods: {
    chooseTabInfo(tab, good, top, isClass) {
      return getTabInfo(tab, good, top, isClass)
    }
  }
}
