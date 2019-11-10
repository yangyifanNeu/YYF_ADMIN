<template functional>
  <a-sub-menu :key="props.menuInfo.id">
    <span slot="title">
      <a-icon type="mail" /><span>{{ props.menuInfo.label }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.id">
        <a-icon type="pie-chart" />
        <span>{{ item.label }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.id" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: {
    menuInfo: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
