import Vue from 'vue';
import VueRouter from 'vue-router';

import ElementUI from 'element-ui';
// @ts-ignore
import locale from 'element-ui/lib/locale/lang/en';
import App from './App.vue';
import router from './router';

import './assets/styles/app.scss';

Vue.config.productionTip = false;

Vue.use(ElementUI, { locale });
Vue.use(VueRouter);

Vue.directive('trim', {
  bind(el, binding, vnode) {
    const target = el.getElementsByTagName('input')[0];
    target.onblur = () => {
      // @ts-ignore
      vnode.componentInstance.$emit('input', target.value.replace(/^\s+|\s+$/gm, ''));
    };
  },
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
