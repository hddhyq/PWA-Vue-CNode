<template>
  <div id="app">
    <v-app light>
      <!-- 侧栏sideBar -->
      <v-navigation-drawer fixed app v-model="drawer">
        <nav-drawer></nav-drawer>
      </v-navigation-drawer>
      <v-toolbar app dense fixed color="primary" dark>
        <v-toolbar-side-icon @click.stop="drawer=!drawer"></v-toolbar-side-icon>
        <v-toolbar-title>{{tabName}}</v-toolbar-title>
      </v-toolbar>
      <!-- 内容路由区 -->
      <!-- <v-content> -->
      <div class="view-container">
        <keep-alive>
          <router-view>
            <!-- <v-container fluid></v-container> -->
          </router-view>
        </keep-alive>
      </div>
        <!-- <keep-alive>
          <router-view>
            <v-container fluid></v-container>
          </router-view>
        </keep-alive> -->
      <!-- </v-content> -->
    </v-app>
  </div>
</template>

<script>
import { chooseTabName } from '@/common/js/utils'
import NavDrawer from '@/base/NavDrawer'
export default {
  name: 'app',
  computed: {
    tabName() {
      let name = chooseTabName(this.$route.query.tab)
      return name
    }
  },
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    selectPage(item) {}
  },
  components: {
    NavDrawer
  }
}
</script>

<style lang="stylus">
@import '~vuetify/src/stylus/main'

.view-container
  position: relative
  margin-top: 48px
  height: 100%
  width: 100%
  // overflow: hidden
</style>
