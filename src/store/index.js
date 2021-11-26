import Vue from "vue";
import Vuex from "vuex";
//import Axios from "axios";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    navActive: false,
    menus: [
      ["mdi-view-dashboard", "Dashboard ", "/employee"],
    ],
    selectMenu: 0,
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ],
  mutations: {
    SET_NAVACTIVE(state, value) {
      state.navActive = value;
    },
  },
  actions: {
    UPDATE_NAVACTIVE({ commit }, payload) {
      commit("SET_NAVACTIVE", payload);
    },
  },
  modules: {},
  getters: {},
});
