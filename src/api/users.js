import Vue from 'vue'
import * as backend from '@/api/backend'
import store from '../store.js'

const users_container = {
  module: {
    namespaced: true,

    state: {
      user_id: null,
      user_firstname: '',
      is_authenticated: '',
      user_details: {},
      user_webapps: [],
      user_groups: {}
    },

    getters: {
      get_user_details (state) { return state.user_details },
      get_user_id (state) { return state.user_id },
      get_user_firstname (state) { return state.user_firstname },
      get_user_webapps (state) { return state.user_webapps },
      get_is_authenticated (state) { return state.is_authenticated }
    },

    mutations: {
      set_user_id (state, id) { state.user_id = id },
      set_user_firstname (state, name) { state.user_firstname = name },
      set_user_details (state, user_details) { state.user_details = user_details },
      set_user_webapps (state, webapps) { state.user_webapps = webapps },
      set_is_authenticated (state, is_authenticated) { state.is_authenticated = is_authenticated }
    },

    actions: {
      async get_user_details (context, field) {
        const response = await backend.readByField('/users', field)
        response !== undefined ? context.commit('set_user_details', response.data) : console.log('login failed')
        return response
      },
      async post_login_data (context, request_body) {
        const response = await backend.create('/login/', request_body)
        context.commit('set_user_id', response.data['id'])
        context.commit('set_user_firstname', response.data['firstname'])
        store.commit('api/set_access_token', response.data['access_token'])
        return response
      },
      async authorize_google_user (context, auth_response) {
        const response = await backend.create('/google_login/', auth_response)
        // @ TODO
        return response
      },
      async get_user_webapps (context) {
        const response = await backend.readByIDAndResource('/users', context.state.user_id, 'webapps')
        console.log('webapps')
        console.log(response)
        context.commit('set_user_webapps', response.data)
        return response
      },
      async get_user_groups (context) {
        const response = await backend.readByIDAndResource('/users', context.state.user_id, 'groups')
        context.commit('set_user_groups', response.data)
        return response
      },
      async update_user (context) {
        const response = await backend.updateById('/users', context.state.user_id, 'webapps')
        context.commit('set_user_details', response.data)
        return response
      }
    }
  }
}

export default users_container
