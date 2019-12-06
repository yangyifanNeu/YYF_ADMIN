<template>
  <div>
    <a-drawer title="主题配置" placement="right" width="300px" :closable="false" :visible="visible">
      <template v-slot:handle>
        <div class="handler" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <label style="display:block">颜色主题</label>
      <a-radio-group name="theme" :default-value="'dark'" @change="handleChange">
        <a-radio :value="item.name" v-for="item in themes" :key="item.name">{{ item.name }}</a-radio>
      </a-radio-group>
      <label style="display:block">菜单模式</label>
      <a-radio-group name="mode" :default-value="'inline'" @change="handleChange">
        <a-radio :value="item.mode" v-for="item in modes" :key="item.mode">{{ item.mode }}</a-radio>
      </a-radio-group>
    </a-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      themes: [
        {
          name: 'dark',
        },
        {
          name: 'light',
        },
      ],
      modes: [
        {
          mode: 'inline',
        },
        {
          mode: 'horizontal',
        },
      ],
    };
  },
  methods: {
    handleChange(event) {
      let value = event.target.value;
      let name = event.target.name;
      this.$router.push({query: {...this.$route.query, [name]: value}});
    },
  },
};
</script>

<style scoped>
.handler {
  position: absolute;
  top: 240px;
  right: 300px;
  width: 48px;
  background: #1890ff;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-radius: 3px 0 0 3px;
}
.handler:hover {
  cursor: pointer;
}
</style>
