import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import Store from '../store/index';
import BasicLayout from '../layouts/BasicLayout';
import 'nprogress/nprogress.css';
Vue.use(VueRouter);
//定义登录页和主页路由
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
        name: 'home',
        path: '/common/home',
        meta: {
          label: '主页',
        },
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
  menuItem.meta = {label: menuItem.label};
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
  // let storeObj = Store;
  if (to.path != '/' && to.path.indexOf('/user') < 0 && !Store.state.menu.menuInit) {
    Store.dispatch('menu/getMenu').then(() => {
      let menuData = JSON.parse(JSON.stringify(Store.state.menu.menuData));
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
router.afterEach((to) => {
  //更新面包屑
  Store.dispatch('menu/refreshBreadcumb', to);
  NProgress.done();
});

export default router;
