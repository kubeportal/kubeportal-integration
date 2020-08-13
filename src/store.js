import Vue from 'vue'
import Vuex from 'vuex'
import * as backend from './api/backend'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },

  getters: {
  },

  mutations: {
    set_user(state, user) { state.user = user}

  },
  actions: {
    async get_current_user(context, field) {
      const user = await backend.readByField('/users', field)
      console.log('user set ' + user)

      context.commit('set_user', user)
      console.log('user set ' + user.firstname)
      return user
    }
  }
})
