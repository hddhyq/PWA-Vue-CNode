<template>
  <div>
    <div class="img-wrapper">
      <img src="https://cnodejs.org/public/images/cnodejs.svg" alt="cnode_logo">
    </div>
    <v-list two-line>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>关于项目</v-list-tile-title>
          <v-list-tile-sub-title>本项目是基于CNode社区的api,采用vue写的pwa项目</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>源码地址</v-list-tile-title>
          <v-list-tile-sub-title><a href="//github.com/hddhyq/PWA-Vue-CNode">https://github.com/hddhyq/PWA-Vue-CNode</a></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>cNode社区</v-list-tile-title>
          <v-list-tile-sub-title><a href="//cnodejs.org">https://cnodejs.org</a></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>意见反馈</v-list-tile-title>
          <v-list-tile-sub-title><a href="//github.com/hddhyq/PWA-Vue-CNode/issues">反馈地址</a></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>作者</v-list-tile-title>
          <v-list-tile-sub-title><a href="//github.com/hddhyq">hddhyq</a></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
    </v-list>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'About'
}
</script>
<style lang="stylus" scoped>
.img-wrapper
  padding: 30px
</style>