import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "layout" */ '../layouts/UserLayout.vue'),
    children: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        name: 'userLogin',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/Login.vue'),
      },
      {
        path: '/user/registry',
        name: 'userRegistry',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/Registry.vue'),
      },
    ],
  },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
