<template>
  <div class="topic-detail" ref="topic" @touchstart.passive="listTouchStart" @touchmove.passive="listTouchMove">
    <div v-show="alertSucessShow" class="alert">
      <v-alert color="success" icon="check_circle" :value="true">
        发送成功!
      </v-alert>
    </div>
    <div v-show="alertErrorShow" class="alert">
      <v-alert color="error" icon="warning" :value="true">
        发送失败！
      </v-alert>
    </div>
    <div class="topic-title">{{topic.title}}</div>
    <div class="author">
      <div class="author-info">
        <div class="author-info-left">
          <div class="author-avatar" @click="toUser(topic.authorName)">
            <v-avatar>
              <img v-lazy="topic.avatar">
            </v-avatar>
          </div>
          <div class="author-title">
            <div class="author-name">作者：{{topic.authorName}}</div>
            <div>
              <span>来自{{topic.tab | formatTabName}} | </span>
              <span>发布于{{topic.createTime | formatTime}}</span>
            </div>
          </div>
        </div>
        <div class="author-info-right">
          <div @click="postIsCollect">
            <v-icon large color="yellow lighten-1" v-if="topic.isCollect">star</v-icon>
            <v-icon large color="grey lighten-1" v-else>star_border</v-icon>
          </div>
          <div class="visit-count">{{topic.visitCount}} 次浏览</div>
        </div>
      </div>
      <v-divider></v-divider>
    </div>
    <div v-html="topic.content" class="markdown-body"></div>
    <v-divider></v-divider>
    <div>
      <reply-list :replies="topic.replies" @reply="replyPerson" @hasNotLogin="showDialog = true"></reply-list>
    </div>
    <v-fab-transition>
      <v-btn color="blue" dark fixed bottom right fab v-show="iconShow" transition="scale" @click="replyTopic">
        <v-icon>reply</v-icon>
      </v-btn>
    </v-fab-transition>
    <login-dialog :dialog="showDialog" @hasClick="hideDialog"></login-dialog>
    <v-bottom-sheet v-model="sheet">
      <div class="btn-wrapper" @click="sendReply">
        <v-btn color="blue" dark small>发送</v-btn>
      </div>
      <v-text-field
        v-model="content"
        single-line
        autofocus
        box
        solo
        hide-details
      ></v-text-field>
    </v-bottom-sheet>
  </div>
</template>

<script type="text/ecmascript-6">
import { getTopicDetail, postCollect, postDeCollect, postReply } from '@/api/index' // postReply
import { timeFromNow, chooseTabName } from '@/common/js/utils'
import { mapMutations, mapGetters } from 'vuex'
import { loginMixin } from '@/common/js/mixin'
// import LoginDialog from '@/base/LoginDialog'
import ReplyList from '@/base/ReplyList'
export default {
  name: 'TopicDetail',
  mixins: [loginMixin],
  created() {
    this.getDetail(this.$route.params.id)
  },
  computed: {
    ...mapGetters(['topicId', 'userInfo']) // loginMixin有userInfo
  },
  data() {
    return {
      topic: {},
      iconShow: true,
      touch: [],
      content: '',
      alertSucessShow: false,
      alertErrorShow: false,
      sheet: false,
      replyId: ''
    }
  },
  filters: {
    formatTime(time) {
      let Time = timeFromNow(time)
      return Time
    },
    formatTabName(name) {
      let tabName = chooseTabName(name)
      return tabName
    }
  },
  methods: {
    toUser(name) {
      this.$router.push(`/user/${name}`)
    },
    getDetail(id) {
      getTopicDetail(id).then(res => {
        if (res.success) {
          this.topic = this.$_normailzeTopic(res.data)
          // console.log(this.topic)
        }
      })
    },
    postIsCollect() {
      // this.topic.isCollect = !this.topic.isCollect
      if (this.userInfo.token) {
        if (!this.topic.isCollect) {
          postCollect(this.userInfo.token, this.topic.id).then(res => {
            if (res.success) {
              this.topic.isCollect = !this.topic.isCollect
            }
          })
        } else {
          postDeCollect(this.userInfo.token, this.topic.id).then(res => {
            if (res.success) {
              this.topic.isCollect = !this.topic.isCollect
            }
          })
        }
      } else {
        this.showDialog = true
      }
    },
    replyPerson(item) {
      if (this.userInfo.token) {
        this.content = `@${item.authorName} `
        this.replyId = item.id
        this.sheet = !this.sheet
      } else {
        this.showDialog = true
      }
    },
    replyTopic() {
      if (this.userInfo.token) {
        this.sheet = !this.sheet
      } else {
        this.showDialog = true
      }
    },
    pushReply() {
      let time = new Date()
      this.topic.replies.push({
        id: this.userInfo.userId,
        avatar: this.userInfo.avatarUrl,
        upsNumber: 0,
        content: this.content,
        authorName: this.userInfo.name,
        createTime: time
      })
    },
    sendReply() {
      postReply(this.userInfo.token, this.topic.id, this.content, this.replyId).then((res) => {
        if (res.success) {
          this.pushReply()
          this.hideReply()
          this.sendSucess()
        } else {
          this.sheet = !this.sheet
          this.sendError()
        }
      })
    },
    hideReply() {
      this.sheet = !this.sheet
      this.content = ''
      this.replyId = ''
    },
    sendSucess() {
      this.alertSucessShow = true
      setTimeout(() => {
        this.alertSucessShow = false
      }, 1000)
    },
    sendError() {
      this.alertErrorShow = true
      setTimeout(() => {
        this.alertErrorShow = false
      }, 1000)
    },
    listTouchStart(e) {
      const touch = e.touches[0]
      this.touch.startY = touch.clientY
    },
    listTouchMove(e) {
      const touch = e.touches[0]
      const deltaY = touch.clientY - this.touch.startY
      if (deltaY > 5) {
        // 设置一个阀值
        this.iconShow = true
      } else if (deltaY < -5) {
        this.iconShow = false
      }
    },
    $_normailzeTopic(data) {
      let obj = Object.assign(
        {},
        {
          avatar: data.author.avatar_url,
          authorName: data.author.loginname,
          authorId: data.author_id,
          content: data.content,
          id: data.id,
          tab: data.tab,
          title: data.title,
          visitCount: data.visit_count,
          isCollect: data.is_collect,
          createTime: data.create_at,
          replies: this.$_normalizereplies(data) || []
        }
      )
      return obj
    },
    $_normalizereplies(data) {
      let ret = []
      data.replies.forEach(item => {
        ret.push({
          authorName: item.author.loginname,
          avatar: item.author.avatar_url,
          id: item.id,
          isUped: item.is_uped,
          upsNumber: item.ups.length,
          createdTime: item.create_at,
          content: item.content,
          isAuthor: data.author.loginname === item.author.loginname
        })
      })
      return ret
    },
    ...mapMutations({
      setTopicId: 'SET_TOPIC_ID'
    })
  },
  components: {
    ReplyList
  },
  watch: {
    $route(to, from) {
      // 理解一下to＝＝要去的路由
      // this.topic = []
      // console.log(to)
      if (to.name === 'topic' && to.params.id !== this.topicId) {
        this.topic = {}
        // console.log('我们不一样')
        this.getDetail(this.$route.params.id)
        if (from.name === 'topic') {
          this.setTopicId(from.params.id)
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.topic-detail
  .topic-title
    padding: 5px
    margin: 15px
    border-radius: 5px
    font-weight: 700
    font-size: 18px
    line-height: 1.5
    background-color: #f0f0f0
  .author
    .author-info
      display: flex
      padding: 15px
      flex-flow: row nowrap
      justify-content: space-between
      align-items: center
      .author-info-left
        display: flex
        color: #666
        .author-title
          font-size: 12px
          line-height: 2.3
          margin-left: 10px
      .author-info-right
        display: flex
        margin-top: -10px
        flex-direction: column
        align-items: center
        .visit-count
          font-size: 10px
          color: #666

.btn-wrapper
  display: flex
  flex-direction: row-reverse
.alert
  position: fixed
  top: 40px
  left: 0
  right: 0
  width: 100%
.markdown-body 
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}

// .slide-enter-active, .slide-leave-active
//     transition: all 1s

// .slide-enter, .slide-leave-to
//   transform: translate3d(100%, 0, 0)
</style>
