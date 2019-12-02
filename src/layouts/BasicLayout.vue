<template>
  <div>
    <a-layout
      id="components-layout-demo-side"
      style="min-height: 100vh"
      :class="{
        'siderbar-layout': $route.query.mode == 'inline' || !$route.query.mode,
        'horizontal-layout': $route.query.mode == 'horizontal',
        'light-layout': $route.query.theme == 'light',
        'dark-layout': $route.query.theme !== 'light',
      }"
    >
      <a-layout-sider
        collapsible
        v-model="collapsed"
        :trigger="null"
        :class="'ant-layout-sider-' + ($route.query.theme || 'dark')"
        v-if="$route.query.mode == 'inline' || !$route.query.mode"
      >
        <div class="logo">
          <div v-if="!collapsed">YYF ADMIN</div>
          <div v-else>
            YYF
          </div>
        </div>
        <SiderMenu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            @click="collapsed = !collapsed"
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            v-if="$route.query.mode == 'inline' || !$route.query.mode"
          ></a-icon>
          <div class="horizontal-logo" v-if="$route.query.mode == 'horizontal'">
            <div>YYF</div>
          </div>
          <Header v-if="$route.query.mode == 'horizontal'" />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0px;">
            <a-breadcrumb-item v-for="item in breadCumbData" :key="item.name">{{ item.label }}</a-breadcrumb-item>
          </a-breadcrumb>
          <div :style="{padding: '24px', background: '#fff', minHeight: '360px'}">
            <keep-alive>
              <router-view />
            </keep-alive>
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
      <SettingDrawer />
    </a-layout>
  </div>
</template>

<script>
import Header from './Header';
import Footer from './Footer';
import SiderMenu from './SiderMenu';
import SettingDrawer from '../components/SettingDraw';
import {mapGetters} from 'vuex';
export default {
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer,
  },
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    ...mapGetters(['breadCumbData']),
  },
};
</script>

<style scoped>
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.trigger:hover {
  color: #eeeeee;
}
.logo {
  height: 32px;
  /* background: rgba(255, 255, 255, 0.2); */
  margin: 16px;
  font-size: 25px;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
}
.horizontal-logo {
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  float: left;
  text-align: center;
  line-height: 31px;
  font-size: 25px;
  color: #001529;
  font-weight: bold;
}
.light-layout .logo {
  color: #001529;
}
.dark-layout .logo {
  color: #ffffff;
}
.light-layout .horizontal-logo {
  color: #001529;
}
.dark-layout .horizontal-logo {
  color: #ffffff;
}
</style>
