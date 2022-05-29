<template>
  <div class="register">
    <span class="register-title">
        用户中心
    </span>
    <t-divider />
    <t-form :data="formData" @submit="onSubmit">
      <t-form-item label="验证码" name="verify_code" placeholder="验证码" help="请输入收到的36位验证码" :rules="rules">
        <t-input v-model="formData.verify_code"/>
      </t-form-item>
      <t-form-item style="padding-top: 8px">
        <t-button theme="primary" type="submit" block>注册</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
import {MessagePlugin} from "tdesign-vue-next";

export default {
  name: "RegisterVerifyInput",
  props: ["finished"],
  setup(){
    const INITIAL_DATA = {
      verify_code: ""
    };
    const rules = {
      verify_code: [
        {
          required: true, message: "验证码必填", type: "error"
        },
        {
          pattern: /[\da-f]{8}(-[\da-f]{4}){3}-[\da-f]{12}/, message: "验证码为uuid", type: "error"
        }
      ],
    }

    const formData = ref({ ...INITIAL_DATA });
    return {
      formData,
      rules
    }
  },
  methods: {
    onSubmit({ validateResult, firstError }) {
      const self = this;
      if (validateResult === true) {
        axios.post("/api/account/register/verify/" + self.formData.verify_code).then(
            (result) => {
              if(result.status === 200){
                MessagePlugin.success(result.data.msg, 2000)
                self.$emit("finished")
              }else {
                MessagePlugin.error(result.data.msg, 2000)
              }
            }
        )
      } else {
        console.log("Validate Errors: ", firstError, validateResult);
        MessagePlugin.warning(firstError);
      }
    },
  }
}
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