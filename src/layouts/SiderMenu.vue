<template>
  <div>
    <a-menu mode="inline" :theme="$route.query.theme || 'dark'" @click="switchMenu">
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
  beforeMount() {
    if (this.$store.state.menuData.length == 0) {
      this.$store.dispatch('getMenu');
    }
  },
  methods: {
    switchMenu(item) {
      if (item.key) {
        debugger;
        // this.$router.push({path: item.path});
        this.$router.push({name: item.key, query: {...this.$router.query}});
      }
    },
  },
};
</script>

<style scoped></style>
