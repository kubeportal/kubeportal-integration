const api_container = {
  module: {
    namespaced: true,

    state: {
      csrf_token: '',
      api_version: ''
    },
    getters: {
      get_csrf_token (state) { return state.csrf_token },
      get_api_version (state) { return state.api_version }
    },

    mutations: {
      set_csrf_token (state, csrf_token) { state.csrf_token = csrf_token },
      set_api_version (state, api_version) { state.api_version = api_version }
    },

    actions: {
    }
  }
}

export default api_container
