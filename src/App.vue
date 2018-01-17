<template>
  <div id="app">
      <v-app light>
      <!-- 侧栏sideBar -->
      <!-- <v-navigation-drawer fixed app v-model="drawer">
        <nav-drawer></nav-drawer>
      </v-navigation-drawer> -->
      <v-toolbar app dense fixed color="primary" dark>
        <home-toolbar></home-toolbar>
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
import NavDrawer from '@/base/NavDrawer'
import HomeToolbar from '@/base/HomeToolbar'
export default {
  name: 'app',
  methods: {
    selectPage(item) {}
  },
  components: {
    NavDrawer,
    HomeToolbar
  }
}
</script>

<style lang="stylus">
@import '~vuetify/src/stylus/main'
</style>
