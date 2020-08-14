import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Kubeportal from './views/Kubeportal.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home
    },
    {
      name: 'Kubeportal',
      path: '/kubeportal',
      component: Kubeportal
    }
  ]
})
