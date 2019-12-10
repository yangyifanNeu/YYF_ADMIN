<template>
  <a-form :form="form" @submit="handleSubmit" class="user-form">
    <a-form-item label="姓名" :label-col="{span: 5}" :wrapper-col="{span: 12}">
      <a-input v-decorator="['name', {rules: [{required: true, message: '姓名不能为空'}]}]" placeholder="姓名" />
    </a-form-item>
    <a-form-item label="性别" :label-col="{span: 5}" :wrapper-col="{span: 12}">
      <a-select
        v-decorator="['gender', {rules: [{required: true, message: '请选择性别'}]}]"
        placeholder="性别"
        @change="handleSelectChange"
      >
        <a-select-option :value="item.CODEVALUE" v-for="item in genderStore" :key="item.CODEVALUE">
          {{ item.CODENAME }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="出生日期" :label-col="{span: 5}" :wrapper-col="{span: 12}">
      <a-date-picker
        v-decorator="['birth', {rules: [{required: true, message: '请选择出生日期'}]}]"
        placeholder="出生日期"
        style="width:100%"
      />
    </a-form-item>
    <a-form-item label="邮箱" :label-col="{span: 5}" :wrapper-col="{span: 12}">
      <a-input
        v-decorator="[
          'email',
          {rules: [{required: true, message: '邮箱不能为空'}, {type: 'email', message: '邮箱格式错误'}]},
        ]"
        placeholder="邮箱"
      >
        <a-icon type="mail" slot="addonBefore"></a-icon>
      </a-input>
    </a-form-item>
    <a-form-item label="手机号" :label-col="{span: 5}" :wrapper-col="{span: 12}">
      <a-input
        v-decorator="['phone', {rules: [{required: true, message: '手机号不能为空'}, {validator: phoneValidator}]}]"
        placeholder="手机号"
      >
        <a-icon type="phone" slot="addonBefore"></a-icon>
      </a-input>
    </a-form-item>
    <a-form-item :wrapper-col="{span: 12, offset: 5}" style="text-align:right">
      <a-button type="primary" html-type="submit" class="user-submit-btn">
        保存
      </a-button>
      <a-button type="defaut">
        重置
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import validatorFunc from '../../util/validateUtil';
export default {
  data() {
    return {
      formLayout: 'horizontal',
      genderStore: [
        {
          CODENAME: '男',
          CODEVALUE: '1',
        },
        {
          CODENAME: '女',
          CODEVALUE: '0',
        },
      ],
    };
  },
  beforeMount() {
    this.form = this.$form.createForm(this, {name: 'userForm'});
  },
  beforeDestroy() {
    window.console.log('destroy BasicForm');
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          window.console.log('Received values of form: ', values);
        }
      });
    },
    handleSelectChange(value) {
      window.console.log(value);
    },
    ...validatorFunc,
  },
};
</script>

<style scoped>
.user-submit-btn {
  margin-right: 10px;
}
.user-form {
  padding-top: 40px;
}
</style>
