import Vue from 'vue'
import * as backend from '@/api/backend'

const statistics = {
  module: {
    namespaced: true,

    state: {
      api_statistics: ['kubernetes', 'api_server', 'cluster_nodes', 'cpu_cores', 'main_memory', 'deployed_pods', 'allocated_volumes', 'portal_users', 'kubeportal'],
      statistics : [],
      webapps: []
    },

    getters: {
      get_api_statistics (state) { return state.api_statistics },
      get_statistics (state) { return state.statistics },
      get_webapps (state) { return state.webapps }
    },

    mutations: {
      update_statistics (state, stat) { state.statistics.push(stat) },
      update_webapps (state, webapps) { state.webapps = webapps }
    },

    actions: {
      async get_statistics (context, field) {
        const statistics = await backend.readByField('/statistics', field)
        context.commit('update_statistics', statistics)
        return statistics
      },
      async get_webapps (context) {
        const webapps = await backend.read('/webapps')
        context.commit('update_webapps', webapps.data)
        return webapps
      }
    }
  }
}

export default statistics
