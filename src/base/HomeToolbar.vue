<template>
  <div>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-menu :nudge-width="100">
      <v-toolbar-title slot="activator">
        <span>{{tabName}}</span>
        <v-icon dark>arrow_drop_down</v-icon>
      </v-toolbar-title>
      <v-list>
        <v-list-tile v-for="item in tabs" :key="item.tab" @click="selectTab(item)">
          <v-list-tile-title v-text="item.name"></v-list-tile-title>
          <v-list-tile-action class="tab_list_action">
            <v-icon v-show="item.active" color="blue darken-3">done</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script type="text/ecmascript-6">
import { chooseTabName } from '@/common/js/utils'
export default {
  name: 'HomeToolbar',
  data() {
    return {
      drawer: false,
      login: false,
      tabs: [
        {
          name: '全部',
          tab: 'all',
          active: true
        },
        {
          name: '精华',
          tab: 'good',
          active: false
        },
        {
          name: '分享',
          tab: 'share',
          active: false
        },
        {
          name: '问答',
          tab: 'ask',
          active: false
        },
        {
          name: '招聘',
          tab: 'job',
          active: false
        }
      ]
    }
  },
  methods: {
    selectTab(item) {
      this.tabs.map(i => {
        i.active = false
        if (i.name === item.name) {
          i.active = true
        }
      }) // 单选效果
      // 路由
      // let tabType = item.tab
      // console.log(tabType)
      this.$router.push({
        path: '/list',
        query: {
          tab: item.tab
        }
      })
    }
  },
  computed: {
    tabName() {
      let name = chooseTabName(this.$route.query.tab)
      return name
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
