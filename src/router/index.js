import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/user/login',
  },
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "layout" */ '@/layouts/UserLayout.vue'),
    children: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        name: 'userLogin',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login.vue'),
      },
      {
        path: '/user/registry',
        name: 'userRegistry',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Registry.vue'),
      },
    ],
  },
  {
    path: '/common',
    component: () => import(/* webpackChunkName: "layout" */ '@/layouts/BasicLayout.vue'),
    children: [
      {
        path: '/common/home',
        component: () => import(/* webpackChunkName: "layout" */ '@/views/Home.vue'),
      },
    ],
  },
  // {
  //   path: '/console',
  //   component: () => import(/* webpackChunkName: "layout" */ '../layouts/BasicLayout.vue'),
  //   children: [
  //     {
  //       path: '/console/basicForm',
  //       component: () => import(/* webpackChunkName: "layout" */ '../views/form/BasicForm.vue'),
  //     },
  //   ],
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
