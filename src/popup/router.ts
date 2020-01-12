import VueRouter from 'vue-router';

// Layouts
import DefaultLayout from './layouts/default.vue';

// Pages
import HomePage from './pages/index.vue';
import AboutPage from './pages/about.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        component: HomePage,
      },
      {
        path: '/about',
        component: AboutPage,
        meta: {
          title: 'About us',
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

export default router;
