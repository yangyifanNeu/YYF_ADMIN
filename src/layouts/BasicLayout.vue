<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
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
          ></a-icon>
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <keep-alive>
            <router-view />
          </keep-alive>
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
</style>
