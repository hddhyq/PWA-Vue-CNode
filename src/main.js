// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import store from './store'
import router from './router'

import '@/common/stylus/index.styl'

Vue.config.productionTip = false

Vue.use(Vuetify) // 使用Vuetify,stylus使用方法：@import '~vuetify/src/stylus/main'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
