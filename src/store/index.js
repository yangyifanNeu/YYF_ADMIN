import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
Vue.prototype.$axios = axios;
const API_PREFIX_URL = 'http://127.0.0.1:3000';
const MENU_URL = '/getMenuData';
export default new Vuex.Store({
  state: {
    menuData: [],
    stableMenu: [
      {
        path: '/user',
        component: '/layouts/UserLayout.vue',
        children: [
          {
            path: '/user',
            redirect: '/user/login',
          },
          {
            path: '/user/login',
            name: 'userLogin',
            component: '/views/user/Login.vue',
          },
          {
            path: '/user/registry',
            name: 'userRegistry',
            component: '/views/user/Registry.vue',
          },
        ],
      },
      {
        path: '/common',
        component: 'BasicLayout',
        children: [
          {
            path: '/common/home',
            component: '/views/Home.vue',
          },
        ],
      },
    ],
    menuInit: false,
  },
  mutations: {
    refreshMenu: function(state, menuData) {
      state.menuData = menuData;
    },
  },
  actions: {
    getMenu: function(context) {
      if (context.state.menuData && context.state.menuData.length == 0) {
        return axios.get(API_PREFIX_URL + MENU_URL).then(function(res) {
          context.commit('refreshMenu', res.data);
        });
      }
    },
  },
  modules: {},
});
