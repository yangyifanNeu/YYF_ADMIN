import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import Store from '../store/index';
import BasicLayout from '../layouts/BasicLayout';
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

var makeMenu = function(menuItem) {
  let viewPath = menuItem.component;
  menuItem.name = menuItem.id;
  if (viewPath == 'Basiclayout') {
    menuItem.component = BasicLayout;
  } else {
    menuItem.component = () => import('@/views' + viewPath);
  }
  if (menuItem.children && menuItem.children.length > 0) {
    for (var i = 0; i < menuItem.children.length; i++) {
      let item = menuItem.children[i];
      makeMenu(item);
    }
  }
};
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path != '/' && to.path.indexOf('/user') < 0 && !Store.state.menuInit) {
    Store.dispatch('getMenu').then(() => {
      let menuData = JSON.parse(JSON.stringify(Store.state.menuData));
      for (var i = 0; i < menuData.length; i++) {
        let item = menuData[i];
        makeMenu(item);
      }
      router.addRoutes(menuData);
      next({...to, replace: true});
    });
  } else {
    next();
  }
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
