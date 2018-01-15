<template>
  <div id="app">
    <v-app light>
      <!-- 侧栏sideBar -->
      <v-navigation-drawer fixed app v-model="drawer">
        <v-card tile fixed flat color="primary" dark height="160px">
          <v-container v-show="!login" class="avatar-container">
            <div>
              <v-avatar size="80px" class="elevation-5">
                <img src="https://avatars0.githubusercontent.com/u/24468747?v=4&s=460" alt="">
              </v-avatar>
            </div>
            <div class="text">
              <span>hddhyqsadfsdf</span>
            </div>
          </v-container>
          <v-container v-show="login" class="avatar-container">
            <div>
              <v-btn round color="primary lighten-3" dark>立即登录</v-btn>
            </div>
          </v-container>
        </v-card>
        <v-list>
          <v-list-tile v-for="item in sidebars" :key="item.title" @click="selectPage(item)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <!-- 顶栏toolBar -->
      <v-toolbar app dense fixed color="primary" dark>
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
      </v-toolbar>
      <!-- 内容路由区 -->
      <v-content>
        <keep-alive>
          <router-view>
            <v-container fluid></v-container>
          </router-view>
        </keep-alive>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { chooseTabName } from '@/common/js/tab'

export default {
  name: 'app',
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
      ],
      sidebars: [
        {
          title: '个人中心',
          icon: 'account_circle'
        },
        {
          title: '我的收藏',
          icon: 'stars'
        },
        {
          title: '我的消息',
          icon: 'message'
        },
        {
          title: '关于',
          icon: 'info'
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
      this.setTab(item.tab)
      this.$router.push({
        path: '/list',
        query: {
          tab: item.tab
        }
      })
    },
    selectPage(item) {},
    ...mapMutations({
      setTab: 'SET_TAB'
    })
  },
  computed: {
    tabName() {
      let name = chooseTabName(this.$route.query.tab)
      return name
    }
  }
}
</script>

<style lang="stylus">
@import '~vuetify/src/stylus/main'

.avatar-container
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  height: 100%
  .text
    margin: 10px auto
</style>
