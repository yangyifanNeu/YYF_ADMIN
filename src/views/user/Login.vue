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
import BasicLayout from '../../layouts/BasicLayout';
var makeMenu = function(menuItem) {
  let viewPath = menuItem.component;
  menuItem.name = menuItem.id;
  if (viewPath == 'Basiclayout') {
    menuItem.component = BasicLayout;
  } else {
    menuItem.component = () => import('@/views' + viewPath);
  }
  if (menuItem.children && menuItem.children.length > 0) {
    for (var i = 0; i < menuItem.children.length; i++) {
      let item = menuItem.children[i];
      makeMenu(item);
    }
  }
};
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, {name: 'normal_login'});
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      var $this = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.$store
            .dispatch('getMenu')
            .then(function() {
              $this.$store.dispatch('getMenu').then(() => {
                let menuData = JSON.parse(JSON.stringify($this.$store.state.menuData));
                for (var i = 0; i < menuData.length; i++) {
                  let item = menuData[i];
                  makeMenu(item);
                }
                $this.$router.addRoutes(menuData);
              });
            })
            .then(() => this.$router.push({path: '/common/home', query: {plan: 'private'}}));
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
