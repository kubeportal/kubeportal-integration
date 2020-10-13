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
      update_cluster_info (state, info) { state.cluster_info.push(info) },
      set_cluster_info (state, info) { state.cluster_info = info }
    },

    actions: {
      async get_cluster_infos (context, infos) {
        const newClusterInfo = []
        await infos.forEach(async field => {
          const info = await backend.read(`/cluster/${field}/`)
          newClusterInfo.push(info.data)
        })
        context.commit('set_cluster_info', newClusterInfo)
      }
    }
  }
}

export default statistics
