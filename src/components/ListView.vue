<template>
  <div class="list-view">
    <v-list two-line>
      <div v-for="item in postList" :key="item.id">
        <router-link :to="{name:'topic',params:{id:item.id}}">
          <v-list-tile avatar ripple>
            <v-list-tile-avatar tile>
              <img :src="item.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content class="content">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>
                <span>
                  <topic-text :topicTab="item"></topic-text>
                </span>
                <span class="reply-text">{{item.replyCount}}</span>/<span>{{item.visitCount}}</span>
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-list-tile-action-text class="time-text">{{ item.lastReply | formatTime }}</v-list-tile-action-text>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
        </router-link>
      </div>
    </v-list>
  </div>
</template>

<script type="text/ecmascript-6">
import { getTab } from '@/api/index'
import { timeFromNow } from '@/common/js/utils'
import TopicText from '@/base/TopicText'
export default {
  name: 'ListView',
  created() {
    this.getTabData(this.$route.query.tab) // 获取路由的query 来刷新页面
  },
  data() {
    return {
      postList: []
    }
  },
  filters: {
    formatTime(time) {
      let Time = timeFromNow(time)
      return Time
    }
  },
  methods: {
    getTabData(tab) {
      getTab(tab).then(res => {
        if (res.success) {
          this.postList = this.$_normalizePosts(res.data)
        }
        // console.log(this.postList)
      })
    },
    getTopicDetail(id) {
      this.$router.push({
        path: `/topic/${id}`
      })
    },
    $_normalizePosts(list) {
      let ret = []
      list.forEach(item => {
        ret.push({
          avatar: item.author.avatar_url,
          title: item.title,
          top: item.top,
          good: item.good,
          tab: item.tab,
          replyCount: item.reply_count,
          visitCount: item.visit_count,
          lastReply: item.last_reply_at,
          id: item.id
        })
      })
      return ret
    }
  },
  components: {
    TopicText
  },
  beforeRouteUpdate(to, from, next) {
    this.postList = []
    this.getTabData(to.query.tab)
    next()
  }
}
</script>

<style lang="stylus" scoped>
.content
  text-overflow: ellipsis
  .tabTopic
    display: inline-block
.reply-text
  color: #6495ed
.time-text
  color: #666
</style>
