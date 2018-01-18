<template>
  <div class="nav-drawer">
    <v-card tile fixed flat color="primary" dark height="160px">
      <v-container v-show="userInfo" class="avatar-container">
        <div>
          <v-avatar size="80px" class="elevation-5">
            <img src="https://avatars0.githubusercontent.com/u/24468747?v=4&s=460" alt="">
          </v-avatar>
        </div>
        <div class="text">
          <span>hddhyqsadfsdf</span>
        </div>
      </v-container>
      <v-container v-show="!userInfo" class="avatar-container">
        <div>
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
import { mapGetters } from 'vuex'
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav-drawer
  height: 100%

.avatar-container
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  height: 100%
  .text
    margin: 10px auto
</style>
