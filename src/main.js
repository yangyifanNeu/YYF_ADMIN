import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {Button, Form} from 'ant-design-vue';

Vue.use(Button);
Vue.use(Form);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
