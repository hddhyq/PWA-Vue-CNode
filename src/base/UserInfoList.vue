<template>
  <div class="user-info-list">
    <div v-for="item in infoList" :key="item.createdTime" @click="goDetail(item)">
      <div class="info-wrapper">
        <div class="info-avatar-content">
          <v-avatar @click="toUser(item.name)">
            <img v-lazy="item.avatar">
          </v-avatar>
          <div class="info-content">
            <div class="info-title">{{item.title}}</div>
            <div class="info-name">{{item.name}}</div>
          </div>
        </div>
        <div class="info-time">{{item.LastTime | formatTime}}</div>
      </div>
      <v-divider></v-divider>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { timeFromNow } from '@/common/js/utils'

export default {
  name: 'UserInfoList',
  props: {
    infoList: {
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
    goDetail(item) {
      this.$router.push(`/topic/${item.id}`)
    }
  }
}
</script>
<style lang="stylus" scoped>
.user-info-list
  .info-wrapper
    display: flex
    padding: 15px
    justify-content: space-between
    .info-avatar-content
      display: flex
      width: calc(100% - 50px)
      .info-content
        margin-left: 15px
        .info-title
          font-weight: 700
          color: #333
        .info-name
          color: #666
    .info-time
      font-size: 12px
      color: #666
</style>
