import Vue from 'vue'
import App from './App.vue'
import VuexPersistence from 'vuex-persist'
import store from './store'
import logger from '@/plugins/logger'
import vuetify from './plugins/vuetify'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import GAuth from 'vue-google-oauth2'
import '@/assets/css/tailwind.css'

const gauthOption = {
  clientId: '516982342717-6ri9qn82ucchr13ftdec279bm2if82n0.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

const vuexLocalStorage = new VuexPersistence({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
}).plugin(store)

Vue.use(GAuth, gauthOption)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(logger)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

export default vuexLocalStorage
