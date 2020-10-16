import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Kubeportal from './views/Kubeportal.vue'
import Login from './views/Login.vue'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'Home',
      path: '/',
      redirect: '/login',
      component: Home
    },
    {
      name: 'Kubeportal',
      path: '/kubeportal',
      component: Kubeportal
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'invalidUrl',
      path: '/*',
      redirect: '/login',
      component: Login
    }
  ]
})

export default router
