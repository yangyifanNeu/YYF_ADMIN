<template>
  <div @click="handleClick">Form</div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$router.push({path: '/form/basicForm'});
    },
  },
};
</script>

<style></style>
