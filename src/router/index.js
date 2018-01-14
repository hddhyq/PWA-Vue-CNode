import Vue from 'vue'
import Router from 'vue-router'
import ListView from '@/components/ListView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/tab/all'
    },
    {
      path: '/tab',
      name: 'tab',
      component: ListView,
      children: [
        {
          path: ':tabType',
          name: 'tabDetail',
          component: ListView
        }
      ]
    }
  ]
})
