import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import menuModule from './modules/menuStore.js';
Vue.use(Vuex);
Vue.prototype.$axios = axios;
export default new Vuex.Store({
  modules: {
    menu: menuModule,
  },
});
