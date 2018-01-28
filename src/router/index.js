import Vue from 'vue'
import Router from 'vue-router'
import ListView from '@/components/ListView'
import TopicDetail from '@/components/TopicDetail'
import Login from '@/components/Login'
import NewTopic from '@/components/NewTopic'
import About from '@/components/About'
import MyMessage from '@/components/MyMessage'
import UserInfo from '@/components/UserInfo'

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
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/message',
      name: 'message',
      component: MyMessage
    },
    {
      path: '/user/:name',
      name: 'user',
      component: UserInfo
    }
  ]
})
