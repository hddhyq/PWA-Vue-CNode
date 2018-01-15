<template>
  <div class="topic-detail">
    TopicDetail
    <p>{{$route.params}}</p>
    <div v-html="topic.content" class="markdown-body"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getTopicDetail } from '@/api/index'
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'TopicDetail',
  created() {
    this.getDetail(this.$route.params.id)
  },
  computed: {
    ...mapGetters(['topicId'])
  },
  data() {
    return {
      topic: []
    }
  },
  methods: {
    getDetail(id) {
      getTopicDetail(id).then(res => {
        if (res.success) {
          this.topic = res.data
          // console.log(this.topic)
        }
      })
    },
    ...mapMutations({
      setTopicId: 'SET_TOPIC_ID'
    })
  },
  watch: {
    $route(to, from) {
      // 理解一下to＝＝要去的路由
      // this.topic = []
      // console.log(to)
      console.log(from)
      console.log(to.params.id)
      console.log(this.topicId)
      if (to.name === 'topic' && to.params.id !== this.topicId) {
        this.topic = []
        console.log('我们不一样')
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
</style>
