import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './assets/style/global.less';
import cache from './util/cache';

Vue.use(Antd);
Vue.config.productionTip = false;
Vue.prototype.cache = cache;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
