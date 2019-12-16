import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './assets/style/global.less';
import cache from './util/cache';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ECharts from 'vue-echarts';
// eslint-disable-next-line no-unused-vars
import * as echarts from 'echarts';
import i18n from './i18n/index.js';
Vue.use(Antd);
Vue.use(ElementUI);
Vue.config.productionTip = false;
window.console.log('aaa');
Vue.prototype.cache = cache;
Vue.component('v-chart', ECharts);
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
