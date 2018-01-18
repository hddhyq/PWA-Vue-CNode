// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import store from './store'
import router from './router'
import FastClick from 'fastclick'
import '@/common/stylus/index.styl'
import VueLazyload from 'vue-lazyload'

Vue.use(Vuetify) // 使用Vuetify,stylus使用方法：@import '~vuetify/src/stylus/main'
FastClick.attach(document.body)
Vue.use(VueLazyload, {
  loading: require('@/common/image/default.jpg')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
