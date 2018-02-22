<template>
 <div class="new-topic">
   <div v-show="alertShow">
      <v-alert outline color="error" icon="warning" :value="true">
        请按正确格式填写主题！
      </v-alert>
   </div>
   <div class="topic-wrapper">
     <div class="hint-text">
       <v-subheader>发布到分类:</v-subheader>
     </div>
     <div class="select-wrapper">
        <v-select :items="topicList" 
                  v-model="topic"
                  single-line
                  hide-details
                  dense
                  class="topic-select"
        ></v-select>
     </div>
   </div>
   <v-divider></v-divider>
   <div>
     <input
      placeholder="标题，字数10字以上"
      v-model="title"
      class="title-text"/>
     <v-divider></v-divider>
   </div>
   <div>
     <mavon-editor  v-model="content" 
                    :toolbars="toolbars" 
                    :ishljs="false"
                    :subfield="false"/>
   </div>
   <div class="button-send">
     <v-btn color="blue" dark @click="postNewTopic">提交</v-btn>
   </div>
 </div>
</template>
<script type="text/ecmascript-6">
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { postTopic } from '@/api/index'
import { mapGetters } from 'vuex'
import { getTab } from '@/common/js/utils'
export default {
  name: 'NewTopic',
  computed: {
    ...mapGetters(['userInfo'])
  },
  data() {
    return {
      title: '',
      topicList: ['分享', '问答', '招聘', '测试'],
      topic: '测试',
      content: '',
      alertShow: false,
      alertText: '',
      toolbars: {
        bold: true, // 粗体   https://github.com/hinesboy/mavonEditor
        italic: true, // 斜体
        quote: true, // 引用
        ul: true, // 无序列表
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        preview: true // 预览
      }
    }
  },
  methods: {
    postNewTopic() {
      let token = this.userInfo.token
      let tab = getTab(this.topic)
      let title = this.title
      let content = this.content
      if (title.length <= 10 && content.length <= 0) {
        this.alertText = '请正确填写主题内容及标题'
        this.sendError()
      } else {
        postTopic(token, tab, title, content).then(res => {
          if (res.success) {
            this.clearTopic()
            this.$router.back()
          } else {
            this.alertText = '网络错误'
            this.sendError()
          }
        })
      }
    },
    sendError() {
      this.alertShow = true
      setTimeout(() => {
        this.alertShow = false
      }, 1000)
    },
    clearTopic() {
      this.topic = '测试'
      this.title = ''
      this.content = ''
    }
  },
  components: {
    mavonEditor
  }
}
</script>
<style lang="stylus" scoped>
.new-topic
  .topic-wrapper
    display: flex
    align-content: center
    justify-content: space-between
    .hint-text
      line-height: 2
    .select-wrapper
      display: flex
      justify-content: center
      align-items: center
      width: calc(100% - 110px)
      height: 30px
      .topic-select
        border: none
        margin-right: 20px
        min-width: 200px
        z-index: 1501
        .input-group__input
          line-height: 50px
          margin-bottom: 10px
.title-text
  font-size: 18px
  line-height: 1.25
  padding: 15px
  font-weight: 700
  outline: none
.button-send
  display: flex
  flex-direction: row-reverse
</style>
