<template>
  <div class="nav-drawer">
    <v-card tile fixed flat class="nav-card" dark height="150px">
      <v-container v-show="userInfo.token" class="avatar-container">
        <div>
          <v-avatar size="70px" class="elevation-5">
            <img :src="userInfo.avatarUrl">
          </v-avatar>
        </div>
        <div class="text">
          <div>{{userInfo.name}}</div>
          <div @click.stop="loginOut">注销</div>
        </div>
      </v-container>
      <v-container v-show="!userInfo.token" class="avatar-login">
        <div @click="goLogin">
          <v-btn round color="primary lighten-3" dark>立即登录</v-btn>
        </div>
      </v-container>
    </v-card>
    <v-list>
      <v-list-tile ripple v-for="item in tabs" :key="item.title" @click="selectTab(item)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-tile ripple v-for="item in personInfo" :key="item.title" @click="selectPage(item)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action v-show="item.action">
          <v-list-tile-action-text v-show="msgCount">{{ msgCount }}</v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from 'vuex'
import { getMsgCount } from '@/api/index'

export default {
  name: 'NavDrawer',
  created() {
    getMsgCount(this.userInfo.token).then((res) => {
      if (res.success) {
        this.setMsgCount(res.data)
      }
    })
    // this.setMsgCount(99999)
  },
  computed: {
    ...mapGetters(['userInfo', 'msgCount'])
  },
  data() {
    return {
      tabs: [
        {
          title: '全部',
          tab: 'all',
          icon: 'question_answer'
        },
        {
          title: '精华',
          tab: 'good',
          icon: 'thumb_up'
        },
        {
          title: '分享',
          tab: 'share',
          icon: 'share'
        },
        {
          title: '问答',
          tab: 'ask',
          icon: 'face'
        },
        {
          title: '招聘',
          tab: 'job',
          icon: 'work'
        },
        {
          title: '测试',
          tab: 'dev',
          icon: 'star'
        }
      ],
      personInfo: [
        {
          title: '个人中心',
          page: 'user',
          icon: 'account_circle'
        },
        {
          title: '我的消息',
          page: 'message',
          action: true,
          icon: 'message'
        },
        {
          title: '关于',
          page: 'about',
          icon: 'info'
        }
      ]
    }
  },
  methods: {
    selectTab(item) {
      if (item.tab === this.$route.query.tab) {
        this.$emit('closeDrawer')
      }
      this.$router.push({
        path: '/list',
        query: {
          tab: item.tab
        }
      })
    },
    selectPage(item) {
      if (item.page === this.$route.name) {
        this.$emit('closeDrawer')
      }
      if (item.page !== 'about' && !this.userInfo.token) {
        this.$router.push('/login')
      } else {
        if (item.page === 'user') {
          this.$router.push(`/user/${this.userInfo.name}`)
        } else {
          this.$router.push(`/${item.page}`)
        }
      }
    },
    goLogin() {
      this.$router.push('/login')
    },
    loginOut() {
      this.setUserInfo({})
      window.localStorage.removeItem('user')
      this.setMsgCount(0)
    },
    ...mapMutations({
      setUserInfo: 'SET_USER_INFO',
      setMsgCount: 'SET_MSG_COUNT'
    })
  }
}
</script>

<style lang="stylus" scoped>
.nav-drawer
  height: 100%
  overflow: visible 
.nav-card
  background-image: url('../common/image/backImg.jpg')
  background-size: 100% 100%

.avatar-container
  display: flex
  flex-direction: column
  height: 100%
  .text
    display: flex
    justify-content: space-between
    margin-top: 20px

.avatar-login
  display: flex
  justify-content: center
  align-items: center
  height: 100%
</style>
