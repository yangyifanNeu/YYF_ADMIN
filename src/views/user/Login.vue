<template>
  <div class="page-container">
    <div class="login-container" style="width:400px">
      <a-form id="login-form" :form="form" class="login-form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            size="large"
            v-decorator="['userName', {rules: [{required: true, message: '请输入用户名!'}]}]"
            placeholder="用户名"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            v-decorator="['password', {rules: [{required: true, message: '请输入密码!'}]}]"
            type="password"
            placeholder="密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true,
              },
            ]"
          >
            记住我
          </a-checkbox>
          <a class="login-form-forgot" href="">
            忘记密码
          </a>
          <a-button type="primary" html-type="submit" class="login-form-button">
            登录
          </a-button>
          <a href="">
            注册
          </a>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, {name: 'normal_login'});
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
  },
};
</script>
<style scoped>
#login-form .login-form {
  max-width: 300px;
}
#login-form .login-form-forgot {
  float: right;
}
#login-form .login-form-button {
  width: 100%;
}
.login-container {
  width: 400px;
  top: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
.page-container {
  background-image: url(/asset/img/login-background.jpg);
  width: 100%;
  height: 100%;
}
</style>
