import Vue from 'vue'
import * as backend from '@/api/backend'

const users_container = {
  module: {
    namespaced: true,

    state: {
      user: {},
      is_authenticated: ''
    },

    getters: {
      get_current_user (state) { return state.user },
      get_is_authenticated (state) { return state.is_authenticated }
    },

    mutations: {
      set_is_authenticated (state, status) { state.is_authenticated = status },
      set_user (state, user) { state.user = user }
    },

    actions: {
      async get_current_user (context, field) {
        const user = await backend.readByField('/users', field, context.state.jwt)
        console.log(user)
        console.log('KONTEXT')
        console.log(context.state.jwt)
        context.commit('set_user', user)
        return user
      },
      async post_login_data (context, request_body) {
        console.log('logindata')
        console.log(request_body)
        const response = await backend.create('/login', request_body)
        return response
      },
      async authorize_google_user (context, auth_response) {
        const response = await backend.create('/login/authorize_google_user', auth_response)
        return response
      }
    }
  }
}

export default users_container
