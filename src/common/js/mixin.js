import { timeFromNow, getTabInfo } from '@/common/js/utils'
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  data() {
    return {
      showDialog: false
    }
  },
  methods: {
    isLogin() {
      console.log(this.userInfo.token)
      if (this.userInfo.token) {
        return true
      } else {
        return false
      }
    },
    hideDialog() {
      this.showDialog = false
    }
  },
  components: {
    LoginDialog
  }
}
