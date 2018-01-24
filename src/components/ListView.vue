<template>
<div class="list-view"  @touchstart.passive="listTouchStart"
                        @touchmove.passive="listTouchMove">
  <v-list two-line ref="scrollList" @onscroll="onScroll">
    <template v-for="(item, index) in postList">
      <v-list-tile avatar ripple :key="item.id" @click="toTopic(item)">
        <v-list-tile-avatar tile class="list-avatar">
          <img v-lazy="item.avatar">
        </v-list-tile-avatar>
        <v-list-tile-content class="content">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title>
            <span><topic-text :topicTab="item"></topic-text></span>
            <span class="reply-text">{{item.replyCount}}</span>/<span>{{item.visitCount}}</span>
          </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text class="time-text">{{ item.lastReply | formatTime }}</v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider v-if="index + 1 < postList.length" :key="index"></v-divider>
    </template>
    <div class="loading-wrapper">
      <loading></loading>
    </div>
    <v-fab-transition>
      <v-btn color="blue" dark fixed bottom right fab v-show="iconShow" transition="scale" @click="newReply">
        <v-icon>create</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-list>
  <login-dialog :dialog="showDialog" @hasClick="hideDialog"></login-dialog>
</div>
</template>

<script type="text/ecmascript-6">
import { getTab } from '@/api/index'
import { timeFromNow } from '@/common/js/utils'
import TopicText from '@/base/TopicText'
import Loading from '@/base/Loading/Loading'
import {loginMixin} from '@/common/js/mixin'

export default {
  name: 'ListView',
  mixins: [loginMixin],
  created() {
    this.getTabData(this.tab) // 获取路由的query 来刷新页面
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  data() {
    return {
      postList: [],
      iconShow: true,
      touch: [],
      page: 1,
      tab: this.$route.query.tab
    }
  },
  filters: {
    formatTime(time) {
      let Time = timeFromNow(time)
      return Time
    }
  },
  methods: {
    toTopic(item) {
      this.$router.push({
        name: 'topic',
        params: {
          id: item.id
        }
      })
    },
    getTabData(tab) {
      getTab(tab).then(res => {
        if (res.success) {
          this.postList = this.$_normalizePosts(res.data)
        }
      })
    },
    getTopicDetail(id) {
      this.$router.push({
        path: `/topic/${id}`
      })
    },
    onScroll() {
      if (this.$route.name === 'list') {
        // 根据路由判断是否执行相关操作。全部都是为了返回原页面的状态。
        // console.log(window.scrollY)
        let offsetTop = window.scrollY
        const wrapperHeight = window.innerHeight - 48
        let scrollHeight = this.$refs.scrollList.$el.clientHeight
        let height = scrollHeight - offsetTop
        if (wrapperHeight >= height) {
          this.loadMore()
          console.log('loadMore')
        }
      }
    },
    loadMore() {
      this.page += 1
      getTab(this.tab, this.page).then(res => {
        if (res.success) {
          let ret = this.$_normalizePosts(res.data)
          ret.forEach(i => {
            this.postList.push(i)
          })
          console.log(this.postList)
          // console.log(this.$_normalizePosts(res.data))
        }
      })
    },
    listTouchStart(e) {
      const touch = e.touches[0]
      this.touch.startY = touch.clientY
    },
    listTouchMove(e) {
      const touch = e.touches[0]
      const deltaY = touch.clientY - this.touch.startY
      if (deltaY > 5) { // 设置一个阀值
        this.iconShow = true
      } else if (deltaY < -5) {
        this.iconShow = false
      }
    },
    newReply() {
      if (this.isLogin) {
        this.$router.push('/new')
      } else {
        this.showDialog = true
      }
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
    TopicText,
    Loading
  },
  beforeRouteUpdate(to, from, next) {
    this.postList = []
    this.getTabData(to.query.tab)
    next()
  },
  beforeRouteLeave(to, from, next) {
    from.meta.scrollHeight = this.offsetTop
    next()
  }
}
</script>

<style lang="stylus" scoped>
.list-view
  padding: 0
  width: 100%
  height: 100%
.list-avatar
  margin-top: 10px
.content
  text-overflow: ellipsis
  .tabTopic
    display: inline-block
.reply-text
  color: #6495ed
.time-text
  color: #666
</style>
