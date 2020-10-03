import Vue from 'vue'
import * as backend from '@/api/backend'

const users_container = {
  module: {
    namespaced: true,

    state: {
      user_id: null,
      user_firstname: '',
      user_token: '',
      user_details: {},
      user_webapps: [],
      is_authenticated: false
    },

    getters: {
      get_user_details (state) { return state.user_details },
      get_user_id (state) { return state.user_id },
      get_is_authenticated (state) { return state.is_authenticated },
      get_user_firstname (state) { return state.user_firstname },
      get_user_webapps (state) { return state.user_webapps },
      get_user_token (state) { return state.user_token }
    },

    mutations: {
      set_is_authenticated (state, status) { state.is_authenticated = status },
      set_user_id (state, id) { state.user_id = id },
      set_user_firstname (state, name) { state.user_firstname = name },
      set_user_details (state, user_details) { state.user_details = user_details },
      set_user_webapps (state, webapps) { state.user_webapps = webapps },
      set_user_token (state, token) { state.user_token = token }
    },

    actions: {
      async get_user_details (context, field) {
        const response = await backend.readByField('/users', field, this.state.user_token)
        console.log(response)
        context.commit('set_user_details', response.data)
        return response
      },
      async post_login_data (context, request_body) {
        const response = await backend.create('/login', request_body, '')
        context.commit('set_user_id', response.data['id'])
        context.commit('set_user_firstname', response.data['firstname'])
        context.commit('set_user_token', response.data['token'])
        return response
      },
      async authorize_google_user (context, auth_response) {
        const response = await backend.create('/google_login', auth_response)
        return response
      },
      async get_user_webapps (context) {
        console.log('get user webapps')
        const response = await backend.readByFieldRessource('/users', context.state.user_id, 'webapps', this.state.user_token)
        console.log(response.data)
        context.commit('set_user_webapps', response.data)
        return response
      },
      async update_user (context, item) {
        const response = await backend.updateById('/users', context.state.user_id, 'webapps', this.state.user_token)
        context.commit('set_user_details', response.data)
        return response
      }
    }
  },
}

export default users_container
