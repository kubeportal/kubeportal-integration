import Vue from 'vue'
import Vuex from 'vuex'
import generator from './api/generator.js'
import statistics from './api/statistics.js'
import users from './api/users.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    users: users.module,
    statistics: statistics.module,
    generator: generator.module
  }
})
