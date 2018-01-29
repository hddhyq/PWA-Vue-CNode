import { timeFromNow, getTabInfo } from '@/common/js/utils'
// import { mapGetters } from 'vuex'
import LoginDialog from '@/base/LoginDialog'

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

export const loginMixin = {
  data() {
    return {
      showDialog: false
    }
  },
  methods: {
    hideDialog() {
      this.showDialog = false
    }
  },
  components: {
    LoginDialog
  }
}
