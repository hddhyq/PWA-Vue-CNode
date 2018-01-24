<template>
 <div class="new-topic">
   <div class="topic-wrapper">
     <div class="hint-text">
       <v-subheader>发布到分类:</v-subheader>
     </div>
     <div class="select-wrapper">
        <v-select :items="topicList" 
                  v-model="topic"
                  single-line
                  hide-details
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
 </div>
</template>
<script type="text/ecmascript-6">
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'NewTopic',
  data() {
    return {
      title: '',
      topicList: ['分享', '问答', '招聘', '测试'],
      topic: '测试',
      content: '',
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        quote: true, // 引用
        // ol: true, // 有序列表
        ul: true, // 无序列表
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        preview: true // 预览
        // imagelink: true,
        // trash: true // 清空
        // subfield: true // 单双栏模式
      }
    }
  },
  methods: {
    imgAdd() {
      this.$vm.$imgAddByUrl()
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
        .input-group__input
          line-height: 50px
          margin-bottom: 10px
.title-text
  font-size: 18px
  line-height: 1.25
  padding: 15px
  font-weight: 700
  outline: none
</style>