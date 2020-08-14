import Vue from 'vue'
import Vuex from 'vuex'
import * as backend from './api/backend'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    metrics: ['kubernetes', 'api_server', 'cluster_nodes', 'cpu_cores', 'main_memory', 'deployed_pods', 'allocated_volumes', 'portal_users', 'kubeportal'],
    statistics : []
  },

  getters: {
    get_all_statistics (state) { return state.statistics },
    get_metrics (state) { return state.metrics }
  },

  mutations: {
    set_user (state, user ) { state.user = user },
    update_statistics (state, metric) { state.statistics.push(metric) }
  },
  actions: {
    async get_current_user (context, field) {
      const user = await backend.readByField('/users', field)
      context.commit('set_user', user)
      return user
    },
    async get_statistic_metric (context, field) {
      let statistics = await backend.readByField('/statistics', field)
      context.commit('update_statistics', statistics)
      return statistics
    }
  }
})
