import Vue from 'vue'
import * as backend from '@/api/backend'

const users_container = {
  module: {
    namespaced: true,

    state: {
      current_user_id: null,
      current_user_firstname: '',
      current_user_details: {},
      current_user_webapps: [],
      is_authenticated: false
    },

    getters: {
      get_current_user_details (state) { return state.current_user_details },
      get_current_user_id (state) { return state.current_user_id },
      get_is_authenticated (state) { return state.is_authenticated },
      get_current_user_firstname (state) { return state.current_user_firstname },
      get_current_user_webapps (state) { return state.current_user_webapps }
    },

    mutations: {
      set_is_authenticated (state, status) { state.is_authenticated = status },
      set_current_user_id (state, id) { state.current_user_id = id },
      set_current_user_firstname (state, name) { state.current_user_firstname = name },
      set_user_details (state, current_user_details ) { state.current_user_details = current_user_details },
      set_current_user_webapps (state, webapps) { state.current_user_webapps = webapps }
    },

    actions: {
      async get_current_user_details (context, field) {
        const response = await backend.readByField('/users', field)
        console.log('set user details')
        context.commit('set_user_details', response)
        return response
      },
      async post_login_data (context, request_body) {
        const response = await backend.create('/login', request_body)
        console.log('post login data response:')
        console.log(response)
        context.commit('set_current_user_id', response['id'])
        context.commit('set_current_user_firstname', response['firstname'])
        return response
      },
      async authorize_google_user (context, auth_response) {
        const response = await backend.create('/google_login', auth_response)
        return response
      },
      async get_current_user_webapps (context) {
        const response = await backend.readByFieldRessource('/users', context.state.current_user_id, 'webapps')
        context.commit('set_current_user_webapps', response)
        return response
      }
    }
  }
}

export default users_container
