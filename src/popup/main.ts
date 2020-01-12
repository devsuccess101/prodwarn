import Vue from 'vue';
import VueRouter from 'vue-router';

import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';

import './assets/styles/app.scss';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
