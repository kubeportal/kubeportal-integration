const api_container = {
  module: {
    namespaced: true,

    state: {
      csrf_token: '',
      api_version: '',
      access_token: ''
    },
    getters: {
      get_csrf_token (state) { return state.csrf_token },
      get_api_version (state) { return state.api_version },
      get_access_token (state) { return state.access_token }
    },

    mutations: {
      set_csrf_token (state, csrf_token) { state.csrf_token = csrf_token },
      set_api_version (state, api_version) { state.api_version = api_version },
      set_access_token (state, token) { state.access_token = token }
    },

    actions: {
    }
  }
}

export default api_container
