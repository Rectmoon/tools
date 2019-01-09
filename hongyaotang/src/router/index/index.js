import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/index/login.vue')
    },
    {
      path: '/home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/index/home.vue')
    }
  ]
})
