import VueRouter from 'vue-router';

// Layouts
import DefaultLayout from './layouts/default.vue';

// Pages
import HomePage from './pages/index.vue';
import AddSitePage from './pages/add-site.vue';
import EditSitePage from './pages/edit-site.vue';
import EditGroupPage from './pages/edit-group.vue';
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
        path: '/add-site',
        component: AddSitePage,
        meta: {
          title: 'Add site',
        },
      },
      {
        path: '/edit-site/:site',
        component: EditSitePage,
        meta: {
          title: 'Edit site',
        },
      },
      {
        path: '/edit-group/:group',
        component: EditGroupPage,
        meta: {
          title: 'Edit group',
        },
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
