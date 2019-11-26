<template>
  <div>
    <a-menu
      mode="inline"
      :theme="$route.query.theme || 'dark'"
      @click="switchMenu"
      :default-selected-keys="defaultSelectedKeys"
      :default-open-keys="defaultOpenKeys"
    >
      <template v-for="item in $store.state.menuData">
        <a-menu-item v-if="!item.children" :key="item.id">
          <a-icon :type="item.icon || 'mail'" />
          <span>{{ item.label }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.key" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import subMenu from '../components/subMenu';

export default {
  components: {
    'sub-menu': subMenu,
  },
  data: () => {
    return {
      defaultSelectedKeys: [],
      defaultOpenKeys: [],
    };
  },
  beforeMount() {},
  mounted() {
    this.defaultSelectedKeys.push(this.$route.name);
    this.$nextTick(() => this.$forceUpdate());
    this.refreshOpenMenus();
  },
  methods: {
    switchMenu(item) {
      if (item.key) {
        this.$router.push({name: item.key, query: {...this.$route.query}});
      }
    },
    refreshOpenMenus() {
      let matchedRouters = this.$route.matched;
      matchedRouters.forEach((item) => {
        if (item.parent) {
          this.defaultOpenKeys.push(item.parent.name);
        }
      });
    },
  },
};
</script>

<style scoped></style>
