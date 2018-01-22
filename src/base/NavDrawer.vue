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
      </v-list-tile>
    </v-list>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'NavDrawer',
  computed: {
    ...mapGetters(['userInfo'])
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
          title: '我的消息',
          icon: 'message'
        },
        {
          title: '我的收藏',
          icon: 'stars'
        },
        {
          title: '关于',
          icon: 'info'
        }
      ]
    }
  },
  methods: {
    selectTab(item) {
      this.$router.push({
        path: '/list',
        query: {
          tab: item.tab
        }
      })
    },
    goLogin() {
      this.$router.push('/login')
    },
    loginOut() {
      this.setUserInfo({})
      window.localStorage.removeItem('user')
    },
    ...mapMutations({
      setUserInfo: 'SET_USER_INFO'
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
