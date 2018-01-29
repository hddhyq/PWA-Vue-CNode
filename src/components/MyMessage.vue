<template>
  <div class="my-message">
    <v-tabs v-model="active" centered grow>
      <v-tabs-bar color="blue darken-1" dark>
        <v-tabs-item v-for="tab in tabs" :key="tab" :href="'#' + tab" ripple>
          {{tab}}
        </v-tabs-item>
        <v-tabs-slider color="yellow"></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content v-for="tab in tabs" :key="tab" :id="tab">
          <message-list v-if="tab === '已读消息'" :msgs="hasReadMsgs"></message-list>
          <message-list v-else :msgs="hasNotReadMsgs" @firstRead="readMessage"></message-list>          
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>
<script type="text/ecmascript-6">
import { getMessages, postMarkOne } from '@/api/index'
import { mapGetters, mapMutations } from 'vuex'
import MessageList from '@/base/MessageList'

export default {
  name: 'MyMessage',
  created() {
    getMessages(this.userInfo.token).then((res) => {
      this.hasReadMsgs = this.$_normalizeMsg(res.data.has_read_messages)
      this.hasNotReadMsgs = this.$_normalizeMsg(res.data.hasnot_read_messages)
    })
  },
  computed: {
    ...mapGetters(['userInfo', 'msgCount'])
  },
  data() {
    return {
      tabs: ['已读消息', '未读消息'],
      active: null,
      hasReadMsgs: [],
      hasNotReadMsgs: []
    }
  },
  methods: {
    readMessage(item, index) {
      postMarkOne(item.id)
      this.hasNotReadMsgs.splice(index, 1)
      this.hasReadMsgs.unshift(item)
    },
    $_normalizeMsg(list) {
      let ret = []
      list.forEach(i => {
        ret.push({
          avatar: i.author.avatar_url,
          name: i.author.loginname,
          type: this.$_chooseType(i.type),
          createdTime: i.create_at,
          reply: i.reply.content,
          topic: `话题：${i.topic.title}`,
          topicId: i.topic.id,
          id: i.id,
          hasRead: i.has_read
        })
      })

      return ret
    },
    $_chooseType(MsgType) {
      let typeName = ''
      switch (MsgType) {
        case 'at':
          typeName = '在回复中@了您'
          break
        case 'reply':
          typeName = '回复了您的话题'
          break
        default:
          typeName = '回复了您'
      }

      return typeName
    },
    ...mapMutations({
      setMsgCount: 'SET_MSG_COUNT'
    })
  },
  components: {
    MessageList
  }
}
</script>
<style lang="stylus" scoped>
</style>