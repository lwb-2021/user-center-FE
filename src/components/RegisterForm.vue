<template>
  <div class="register">
    <span class="register-title">
        用户中心
    </span>
    <t-divider />
    <t-form class="register-form" :data="formData" :colon="true" :label-width="0" @submit="onSubmit"
    :rules="rules">
      <t-form-item name="email" >
        <t-input v-model="formData.email" clearable placeholder="请输入电子邮箱地址">
          <template #prefix-icon>
            <mail-icon />
          </template>
        </t-input>
      </t-form-item>
      <t-form-item name="account" >
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
      <t-form-item name="verify_password" >
        <t-input v-model="formData.verify_password" type="password" clearable placeholder="请再次输入密码">
          <template #prefix-icon>
            <lock-on-icon />
          </template>
        </t-input>
      </t-form-item>
      <router-link to="/login" style="font-size: 12px">已有帐户？去登录</router-link>
      <t-form-item style="padding-top: 8px">
        <t-button theme="primary" type="submit" block>注册</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import {DesktopIcon, LockOnIcon, MailIcon, UserIcon} from 'tdesign-icons-vue-next';
import axios from "axios";

const INITIAL_DATA = {
  email: "",
  account: "",
  password: "",
  verify_password: ""
};

export default defineComponent({
  components: {
    MailIcon,
    UserIcon,
    DesktopIcon,
    LockOnIcon,
  },
  props: ["finished"],
  setup() {
    const formData = ref({ ...INITIAL_DATA });
    const rules = {
      email: [
        {
          required: true, message: "邮箱必填", type: "error"
        },
        {
          email: true, message: "邮箱格式不正确", type: "error"
        },
        {
          max: 100, message: "邮箱不能大于100个字", type: "error"
        }
      ],
      account: [
        {
          required: true, message: "用户名必填", type: "error"
        },
        {
          max: 16, message: "用户名不能大于16个字", type: "error"
        },
        {
          min: 3, message: "用户名不能小于三个字", type: "error"
        },
      ],
      password: [
        {
          required: true, message: "密码必填", type: "error"
        }
      ],
      verify_password: [
        {
          required: true, message: "确认密码必填", type: "error"
        },
        {
          validator: (content) => content === formData.value.password, message: "确认密码必须和密码一致", type: "error"
        }
      ],
    };
    return {
      formData,
      rules
    }

  },
  methods: {
    onSubmit({ validateResult, firstError }) {
      if (validateResult === true) {
        axios.post("/api/account/register", {
          email: this.formData.email,
          username: this.formData.account,
          password: this.formData.password
        }).then(
            (result) => {
              if(result.status === 200){
                MessagePlugin.success(result.data.msg, 2000)
                this.$emit("finished")
              }else {
                MessagePlugin.error(result.data.msg, 2000)
              }
            }
        )
      } else {
        console.log("Validate Errors: ", firstError, validateResult);
        MessagePlugin.warning(firstError);
      }
    }
  }
});
</script>
<style lang="less">
@import "../less/global";
.register {
  width: 400px;
  margin: auto auto;
  padding-top: @padding-top-default;
};
.register-title{
  margin: auto auto;
  color: black;
  font-size: @title-font-size;
};
</style>