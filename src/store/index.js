import Vue from 'vue'
// import { $cookies } from 'vue/types/umd'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
    saveStateToStorage(state) {
      localStorage.setItem('state', JSON.stringify(state))
    },
    UpdataAlbums(state, payload) {
      state.Datalist = payload
      this.commit('saveStateToStorage')
    },
    cleanState(state) {
      state.tokenInfo = {}
      state.userInfo = {}
      state.userProfile = {}
      this.commit('saveStateToStorage')
    },
    cleanTokenInfo(state) {
      state.token = ''
      state.user = ''
    },
  },
  actions: {
  },
  modules: {
  }
})
