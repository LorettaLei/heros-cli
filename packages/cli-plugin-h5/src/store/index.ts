import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null
  },
  mutations: {
    token (state: any, data: any) {
      state.token = data
    }
  },
  actions: {
  },
  modules: {
  }
})
