<template>
  <div class="user-info">
    <div class="user-header">
      <div class="avatar-wrapper">
        <div class="avatar">
          <v-avatar size="80px" class="elevation-5">
            <img v-lazy="headerInfo.avatar">
          </v-avatar>
        </div>
        <div class="name">{{headerInfo.name}}</div>
        <div class="userUrl" v-html="headerInfo.git"></div>
      </div>
      <div class="sign-score">
        <div class="sign-time">注册时间：{{headerInfo.createdTime | formatDate}}</div>
        <div class="score">积分：{{headerInfo.score}}</div>
      </div>
    </div>
    <div class="tabs-wrapper">
       <v-tabs v-model="active" centered grow>
        <v-tabs-bar color="blue darken-4" dark>
          <v-tabs-item v-for="tab in tabs" :key="tab" :href="'#' + tab" ripple>
            {{tab}}
          </v-tabs-item>
          <v-tabs-slider color="yellow"></v-tabs-slider>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content v-for="tab in tabs" :key="tab" :id="tab">
            <user-info-list v-if="tab === '最近回复'" :infoList="replyList"></user-info-list>
            <user-info-list v-else-if="tab === '最近发布'" :infoList="topicList"></user-info-list>
            <user-info-list v-else :infoList="starsList"></user-info-list>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getUserDetail, getTopicCollect } from '@/api/index'
import { formatDate } from '@/common/js/utils'
import UserInfoList from '@/base/UserInfoList'

export default {
  name: 'UserInfo',
  created() {
    this.getUserData(this.$route.params.name)
  },
  data() {
    return {
      tabs: ['最近回复', '最近发布', '话题收藏'],
      active: null,
      starsList: [],
      replyList: [],
      topicList: [],
      headerInfo: {}
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM')
    }
  },
  methods: {
    getUserData(UserName) {
      getUserDetail(UserName).then(res => {
        if (res.success) {
          this.headerInfo = this.$_normalizeHeader(res.data)
          this.replyList = this.$_normalizeList(res.data.recent_replies)
          this.topicList = this.$_normalizeList(res.data.recent_topics)
        }
      })
      getTopicCollect(this.$route.params.name).then(res => {
        if (res.success) {
          this.starsList = this.$_normalizeList(res.data)
          console.log(res)
        }
      })
    },
    $_normalizeList(list) {
      let ret = []
      list.forEach(i => {
        ret.push({
          LastTime: i.last_reply_at,
          avatar: i.author.avatar_url,
          name: i.author.loginname,
          title: i.title,
          id: i.id
        })
      })

      return ret
    },
    $_normalizeHeader(data) {
      let obj = Object.assign(
        {},
        {
          avatar: data.avatar_url,
          createdTime: data.create_at,
          git: `<a href="//github.com/${data.githubUsername}">${
            data.githubUsername
          }@github.com</a>`,
          name: data.loginname,
          score: data.score
        }
      )

      return obj
    }
  },
  components: {
    UserInfoList
  },
  beforeRouteUpdate(to, from, next) {
    this.starsList = []
    this.replyList = []
    this.topicList = []
    this.headerInfo = {}
    this.getUserData(to.params.name)
    next()
  }
}
</script>
<style lang="stylus" scoped>
.user-info
  .user-header
    height: 200px
    padding: 15px
    background-image: url('../common/image/backImg.jpg')
    background-size: 100% 100%
    .avatar-wrapper
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      .name
        color: #eee
    .sign-score
      display: flex
      margin-top: 30px
      font-size: 12px
      justify-content: space-between
      .sign-time
        color: #aaa
      .score
        color: #eee
</style>
