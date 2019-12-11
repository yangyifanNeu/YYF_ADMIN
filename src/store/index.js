import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import menuModule from './yyfAdmin/modules/menuStore.js';
import bmwModule from './bmw/index';
Vue.use(Vuex);
Vue.prototype.$axios = axios;
export default new Vuex.Store({
  modules: {
    menu: menuModule,
    bmw: bmwModule,
  },
});
