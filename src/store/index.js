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
        path: '/common/home',
        component: '/Home.vue',
        label: '主页',
        id: 'home',
        icon: 'home',
      },
    ],
    breadCumb: [],
    menuInit: false,
  },
  mutations: {
    refreshMenu: function(state, menuData) {
      state.menuData = menuData;
      state.menuInit = true;
    },
    refreshBreadcumb: (state, breadCumbData) => {
      state.breadCumb = breadCumbData;
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
    refreshBreadcumb: function(context, routeItem) {
      let matchedMenu = routeItem.matched;
      let breadCumbData = [];
      matchedMenu.forEach((item) => {
        if (item.name) {
          breadCumbData.push({
            label: item.meta.label,
            path: item.path,
            name: item.name,
          });
        }
      });
      context.commit('refreshBreadcumb', breadCumbData);
    },
  },
  getters: {
    wholeMenu: (state) => {
      return state.stableMenu.concat(state.menuData);
    },
    breadCumbData: (state) => {
      return state.breadCumb;
    },
  },
  modules: {},
});
