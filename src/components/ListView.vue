<template>
  <div>
    <v-list two-line>
      <div v-for="item in postList" :key="item.id">
        <v-list-tile avatar ripple >
          <v-list-tile-avatar tile>
            <img :src="item.avatar">
          </v-list-tile-avatar>
          <v-list-tile-content class="content">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-sub-title>
              <span>{{item.tab}}</span>
              <span class="reply-text">{{item.replyCount}}</span>/<span>{{item.visitCount}}</span>
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text class="time-text">{{ item.lastReply | formatTime }}</v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    getTab
  } from '@/api/index'
  import {
    mapGetters
  } from 'vuex'
  import {timeFromNow} from '@/common/js/utils'

  export default {
    name: 'ListView',
    created() {
      this.getTabData(this.tab)
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
        getTab(tab).then((res) => {
          if (res.success) {
            this.postList = this.$_normalizePosts(res.data)
          }
          console.log(this.postList)
        })
      },
      $_normalizePosts(list) {
        let ret = []
        list.forEach((item) => {
          ret.push({
            avatar: item.author.avatar_url,
            title: item.title,
            top: item.top,
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
    computed: {
      ...mapGetters([
        'tab'
      ])
    },
    watch: {
      '$route' (to, from) {
        this.postList = []
        this.getTabData(this.tab)
      }
    }
  }
</script>

<style lang="stylus" scoped>
.content
  text-overflow: ellipsis

.reply-text
  color: #414184

.time-text
  color: #666
</style>