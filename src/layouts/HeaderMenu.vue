<template>
  <div>
    <a-menu
      mode="horizontal"
      :theme="$route.query.theme || 'dark'"
      @click="switchMenu"
      :default-selected-keys="defaultSelectedKeys"
      :style="{lineHeight: '64px'}"
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
import {createNamespacedHelpers} from 'vuex';
const {mapGetters} = createNamespacedHelpers('menu');
export default {
  components: {
    'sub-menu': subMenu,
  },
  data: () => {
    return {
      defaultSelectedKeys: [],
    };
  },
  created() {
    let menuName = this.$route.name;
    this.defaultSelectedKeys = [menuName];
  },
  beforeMount() {},
  mounted() {
    this.$nextTick(() => this.$forceUpdate());
  },
  methods: {
    switchMenu(item) {
      if (item.key) {
        this.$router.push({name: item.key, query: {...this.$route.query}});
      }
    },
  },
  computed: {
    ...mapGetters(['wholeMenu']),
  },
};
</script>

<style scoped></style>
