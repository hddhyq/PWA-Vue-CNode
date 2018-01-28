<template>
  <div class="reply-list-container">
    <div class="reply-count">
      <div class="text">全部评论 ({{replies.length}})</div>
    </div>
    <v-divider></v-divider>
    <div class="reply-list" v-for="(item, index) in replies" :key="item.id">
      <div class="reply-avatar">
        <v-avatar size="36px" tile>
          <img :src="item.avatar">
        </v-avatar>
      </div>
      <div class="reply-header-content">
        <div class="reply-title">
          <div class="reply-info">
            <div>
              <span>{{item.authorName}}</span>
              <span class="is-author" v-show="item.isAuthor">作者</span>
            </div>
            <div>
              <span>{{index + 1}}楼</span>•<span>{{item.createdTime | formatTime}}</span>
            </div>
          </div>
          <div class="ups">
            <span @click="postIsUps(item)">
              <span class="ups-number">({{item.upsNumber}})</span>
              <v-icon v-if="item.isUped">thumb_up</v-icon>
              <v-icon color="grey lighten-2" v-else>thumb_up</v-icon>
            </span>
            <span @click="toReply(item)">
              <v-icon large color="grey lighten-2">reply</v-icon>
            </span>
          </div>
        </div>
        <div class="markdown-body" v-html="item.content"></div>
        <v-divider v-if="index < replies.length - 1"></v-divider>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { timeFromNow } from '@/common/js/utils'
import { mapGetters } from 'vuex'
import { postUps } from '@/api/index'

export default {
  name: 'ReplyList',
  computed: {
    ...mapGetters(['userInfo'])
  },
  props: {
    replies: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    postIsUps(item) {
      if (this.userInfo.token) {
        if (item.isUped === false) {
          postUps(this.userInfo.token, item.id).then((res) => {
            if (res.success) {
              item.isUped = !item.isUped
              item.upsNumber += 1
            }
          })
        } else {
          postUps(this.userInfo.token, item.id).then((res) => {
            if (res.success) {
              item.isUped = !item.isUped
              item.upsNumber -= 1
            }
          })
        }
      } else {
        this.$emit('hasNotLogin')
      }
    },
    toReply(item) {
      this.$emit('reply', item)
    }
  },
  filters: {
    formatTime(time) {
      let Time = timeFromNow(time)
      return Time
    }
  }
}
</script>
<style lang="stylus" scoped>
.reply-list-container
  .reply-count
    padding: 2px 0
    font-size: 12px
    .text
      padding: 3px 8px
      border-left: 4px solid rgb(100, 149, 237)
  .reply-list
    display: flex
    flex-flow: row nowrap
    padding: 5px 0 5px 5px
    .reply-avatar
      margin-right: 5px
    .reply-header-content
      width: 100%
      max-width: calc(100% - 41px) // 避免markdown超出屏幕边界
      .reply-title
        display: flex
        justify-content: space-between
        color: #666
        .reply-info
          font-size: 12px
        .ups
          margin-right: 5px
          .ups-number
            color: #BDBDBD
            line-height: 2

.markdown-body
  box-sizing: border-box
  text-overflow: ellipsis
  min-width: 200px
  max-width: 980px
  // margin: 0 auto
</style>
