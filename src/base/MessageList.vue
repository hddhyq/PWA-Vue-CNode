<template>
  <div class="message-list">
    <div v-for="(item, index) in msgs" :key="item.createdTime">
      <div class="msg-container">
        <div class="msg-header">
          <div class="header-left">
            <div class="msg-avatar" @click="toUser(item.name)">
              <v-avatar>
                <img v-lazy="item.avatar">
              </v-avatar>
            </div>
            <div class="msg-name-type">
              <div class="msg-name">{{item.name}}</div>
              <div class="msg-type">{{item.type}}</div>
            </div>
          </div>
          <div class="msg-time">{{item.createdTime | formatTime}}</div>
        </div>
        <div class="msg-content" v-html="item.reply"></div>
        <div class="msg-topic" @click="goDetail(item, index)">{{item.topic}}</div>
      </div>
      <v-divider></v-divider>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { timeFromNow } from '@/common/js/utils'

export default {
  name: 'MessageList',
  props: {
    msgs: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    formatTime(time) {
      let Time = timeFromNow(time)
      return Time
    }
  },
  methods: {
    toUser(name) {
      this.$router.push(`/user/${name}`)
    },
    goDetail(item, index) {
      this.$router.push(`/topic/${item.topicId}`)
      if (!item.hasRead) {
        this.$emit('firstRead', item, index)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.message-list
  .msg-container
      padding: 15px
      .msg-header
        display: flex
        justify-content: space-between
        font-size: 12px
        .header-left
          display: flex
          .msg-name-type
            margin-left: 15px
            .msg-type
              color: #666
        .msg-time
          color: #666
      .msg-content
        margin-top: 15px
      .msg-topic
        padding: 10px
        line-height: 1.5
        color: #666
        background-color: #f0f0f0
        border-radius: 5px
</style>
