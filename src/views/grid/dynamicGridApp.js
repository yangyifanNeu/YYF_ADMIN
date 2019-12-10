import Vue from 'vue';
import App from './dynamicGrid.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/assets/style/global.less';
import cache from '@/util/cache';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Antd);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.cache = cache;
new Vue({
  el: '#app',
  render: (h) => h(App),
});
