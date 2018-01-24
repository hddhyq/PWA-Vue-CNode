import Vue from 'vue'
import Router from 'vue-router'
import ListView from '@/components/ListView'
import TopicDetail from '@/components/TopicDetail'
import Login from '@/components/Login'
import NewTopic from '@/components/NewTopic'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/list'
    },
    {
      path: '/list',
      name: 'list',
      component: ListView
    },
    {
      path: '/topic/:id',
      name: 'topic',
      component: TopicDetail
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/new',
      name: 'new',
      component: NewTopic
    }
  ]
})
