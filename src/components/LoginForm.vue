<template>
  <div class="login">
    <span class="login-title">
        用户中心
    </span>
    <t-divider />
    <t-form class="login-form" :data="formData" :colon="true" :label-width="0" @submit="onSubmit"
    :rules="rules">
      <t-form-item name="account">
        <t-input v-model="formData.account" clearable placeholder="请输入账户名">
          <template #prefix-icon>
            <user-icon />
          </template>
        </t-input>
      </t-form-item>
      <t-form-item name="password">
        <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码">
          <template #prefix-icon>
            <lock-on-icon />
          </template>
        </t-input>
      </t-form-item>
      <router-link to="/register" style="font-size: 12px">没有账户？注册一个</router-link>
      <t-form-item style="padding-top: 8px">
        <t-button theme="primary" type="submit" block>登录</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import {DesktopIcon, LockOnIcon, UserIcon} from 'tdesign-icons-vue-next';
import axios from "axios";

const INITIAL_DATA = {
  account: "",
  password: "",
};

export default defineComponent({
  components: {
    UserIcon,
    DesktopIcon,
    LockOnIcon,
  },
  methods: {
    onSubmit({ validateResult, firstError }){
      if (validateResult === true) {
        axios.post("/api/account/login", {
          username: formData.value.account,
          password: formData.value.password
        }).then(
            (result) => {
              if(result.status === 200){
                MessagePlugin.success("登录成功", 2000)
              }else {
                MessagePlugin.error(result.data.message, 2000)
              }
            }
        )
      } else {
        MessagePlugin.error(firstError);
      }
    }
  },
  setup() {
    const formData = ref({ ...INITIAL_DATA });
    const rules = {
      account: [
          {
            required: true, message: "用户名必填", type: "error"
          }
      ],
      password: [
          {
            required: true, message: "密码必填", type: 'error'
          }
      ],
    };


    return {
      formData,
      rules
    };
  },
});
</script>
<style lang="less">
@import "../less/global";
.login {
  width: 400px;
  margin: auto auto;
  padding-top: @padding-top-default;
};
.login-title{
  margin: auto auto;
  color: black;
  font-size: @title-font-size;
};
</style>