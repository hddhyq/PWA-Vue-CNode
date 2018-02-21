<template>
  <div id="app">
    <v-app light>
      <!-- 侧栏sideBar -->
      <v-navigation-drawer fixed app touchless mobile-break-point="10000" v-model="drawer">
        <nav-drawer @closeDrawer="close"></nav-drawer>
      </v-navigation-drawer>
      <v-toolbar app dense fixed color="primary" dark>
        <div v-if="isTopic" @click="goBack">
          <v-icon>arrow_back</v-icon>
        </div>
        <v-toolbar-side-icon v-else @click.stop="drawer=!drawer"></v-toolbar-side-icon>
        <v-toolbar-title>{{titleName}}</v-toolbar-title>
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
import { chooseTabName, chooseTitleName } from '@/common/js/utils'
import NavDrawer from '@/base/NavDrawer'

export default {
  name: 'app',
  computed: {
    titleName() {
      let titleName = ''
      if (this.$route.name !== 'list') {
        titleName = chooseTitleName(this.$route.name)
      } else {
        titleName = chooseTabName(this.$route.query.tab)
      }

      return titleName
    },
    isTopic() {
      if (this.$route.name === 'login' || this.$route.name === 'topic' || this.$route.name === 'new' || this.$route.name === 'user') {
        return true
      } else {
        return false
      }
    }
  },
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    close() {
      this.drawer = false
    }
  },
  components: {
    NavDrawer
  }
}
</script>

<style lang="stylus">
@import '~vuetify/src/stylus/main'
</style>
