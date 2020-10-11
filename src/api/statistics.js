import Vue from 'vue'
import * as backend from '@/api/backend'

const statistics = {
  module: {
    namespaced: true,
    state: {
      cluster_request_info: [
        'portal_user_count', 'portal_version', 'k8s_version', 'k8s_node_count', 'k8s_cpu_count',
        'k8s_mem_sum', 'k8s_pod_count', 'k8s_volume_count', 'k8s_apiserver_url', 'k8s_cluster_name'],
      cluster_info: []
    },

    getters: {
      get_cluster_request_info (state) { return state.cluster_request_info },
      get_cluster_info (state) { return state.cluster_info }
    },

    mutations: {
      update_cluster_info (state, info) { state.cluster_info.push(info) }
    },

    actions: {
      async get_cluster_info (context, field) {
        const infos = await backend.readByID('/cluster', field)
        context.commit('update_cluster_info', infos.data)
        return infos
      }
    }
  }
}

export default statistics
