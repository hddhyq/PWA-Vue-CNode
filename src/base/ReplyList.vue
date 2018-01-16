<template>
  <div class="reply-list-container">
    <div class="reply-count">86 回复</div>
    <v-divider></v-divider>
    <div class="reply-list">
      <div class="reply-header">
        <div class="title">
          <div class="avatar">
            <v-avatar tile>
              <img src="https://avatars1.githubusercontent.com/u/35208138?v=4&s=120">
            </v-avatar>
          </div>
          <div class="reply-info">
            <div class="info-top">
              <span class="name">hddhyq</span>
              <span class="is-author">作者</span>
            </div>
            <div class="info-bottom">
              <span class="floor-number">1楼</span>•<span>1个月前</span>
            </div>
          </div>
          <div class="ups">
            <v-icon>thumb_up</v-icon>
            <v-icon v-show="false">thumb_up</v-icon>
            <span>(12)</span>
            <span>
              <v-icon>reply</v-icon>
            </span>
          </div>
        </div>
      </div>
      <div class="reply-content" v-html="contentHtml"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'ReplyList',
  props: {
    replies: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      contentHtml: '<div>hello</div>'
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
