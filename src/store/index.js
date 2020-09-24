import Vue from 'vue';
import Vuex from 'vuex';

import auth from '@/firebase/auth.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pageTitle: 'HotplateCMS',
    user: null,
    listenerRegistered: false,
    isWebmaster: false,
    canSave: false
  },
  mutations: {
    setPageTitle(state, payload) {
      state.pageTitle = payload;
    },
    enableAuthListener(state) {
      if (!state.listenerRegistered) {
        auth.onAuthStateChanged((user) => (state.user = user));
        state.listenerRegistered = true;
      }
    },
    setUser(state, user) {
      state.user = user;
    },
    setAuthorized(state, authorized) {
      state.isWebmaster = authorized;
    },
    setCanSave(state, canSave) {
      state.canSave = canSave;
    }
  },
  actions: {},
  modules: {}
});
