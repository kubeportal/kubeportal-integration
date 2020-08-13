import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showNavigation: false
  },

  getters: {
  },

  mutations: {
    toggleShowNavigation (state) { state.showNavigation = !state.showNavigation }
  }
})
