<template>
  <div class="topic-text" 
        :class="chooseTabInfo(topicTab.tab, topicTab.good, topicTab.top, true)" 
        v-text="chooseTabInfo(topicTab.tab, topicTab.good, topicTab.top, false)">
  </div>
</template>
<script type="text/ecmascript-6">
import { timeFromNow, getTabInfo } from '@/common/js/utils'
export default {
  name: 'TopicText',
  props: {
    topicTab: {
      type: Object,
      default: {}
    }
  },
  filters: {
    formatTime(time) {
      let Time = timeFromNow(time)
      return Time
    }
  },
  methods: {
    chooseTabInfo(tab, good, top, isClass) {
      return getTabInfo(tab, good, top, isClass)
    }
  }
}
</script>
<style lang="stylus" scoped>
.topic-text
  display: inline-block
  font-size: 12px
  padding: 0 4px
  border-radius: 2px
  color: #eee
  background-color: darkgrey
  &.top
    background-color: royalblue
  &.good
    background-color: rgb(100, 149, 237)
</style>
