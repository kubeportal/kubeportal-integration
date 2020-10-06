import Vue from 'vue'
import * as backend from '@/api/backend'
import * as users_container from "@/api/users";

const statistics = {
  module: {
    namespaced: true,

    state: {
      cluster_request_info: ['portal_user_count', 'portal_version', 'k8s_version', 'k8s_node_count', 'k8s_cpu_count', 'k8s_mem_sum', 'k8s_pod_count', 'k8s_volume_count', 'k8s_apiserver_url', 'k8s_cluster_name'],
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
      async get_cluster_info (context, field, token) {
        const infos = await backend.readByField('/cluster', field, token)
        console.log(infos)
        context.commit('update_cluster_info', infos.data)
        return infos
      }
    },
    mounted () {
      console.log('LOCALSTORAGE')
      console.log(localStorage.getItem('api_token'))
    }
  }
}

export default statistics
