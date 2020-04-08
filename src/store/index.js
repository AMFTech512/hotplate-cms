import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageTitle: 'HotplateCMS'
  },
  mutations: {
    setPageTitle(state, payload) {
      state.pageTitle = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
