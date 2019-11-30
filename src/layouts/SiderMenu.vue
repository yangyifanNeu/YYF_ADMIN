<template>
  <div>
    <a-menu
      mode="inline"
      :theme="$route.query.theme || 'dark'"
      @click="switchMenu"
      :default-selected-keys="defaultSelectedKeys"
      :default-open-keys="defaultOpenKeys"
    >
      <template v-for="item in wholeMenu">
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
import {mapGetters} from 'vuex';
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
  created() {
    let menuName = this.$route.name;
    this.defaultSelectedKeys = [menuName];
  },
  beforeMount() {
    this.refreshOpenMenus();
  },
  mounted() {
    this.$nextTick(() => this.$forceUpdate());
  },
  methods: {
    switchMenu(item) {
      if (item.key) {
        this.$router.push({name: item.key, query: {...this.$route.query}});
      }
    },
    refreshOpenMenus() {
      var $this = this;
      $this.defaultOpenKeys = [];
      let matchedRouters = this.$route.matched;
      matchedRouters.forEach((item) => {
        if (item.parent && item.parent.name) {
          $this.defaultOpenKeys.push(item.parent.name);
        }
      });
    },
  },
  computed: {
    ...mapGetters(['wholeMenu']),
  },
};
</script>

<style scoped></style>
