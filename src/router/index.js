import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const ListView = () => import('@/components/ListView')
const TopicDetail = () => import('@/components/TopicDetail')
const Login = () => import('@/components/Login')
const NewTopic = () => import('@/components/NewTopic')
const About = () => import('@/components/About')
const MyMessage = () => import('@/components/MyMessage')
const UserInfo = () => import('@/components/UserInfo')

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
