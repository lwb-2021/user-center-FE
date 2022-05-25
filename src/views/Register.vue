<template>
  <register-steps :current="step"/>
  <register-form @finished="step1_finished" v-if="step === 0"/>
  <register-verify-input @finished="step2_finished" v-if="step === 1" />
  <div class="success-message" v-if="step === 2">
    <span class="finish">
      恭喜你，注册成功
    </span>
  </div>
</template>

<script>
import RegisterForm from "../components/RegisterForm";
import RegisterSteps from "../components/RegisterSteps";
import RegisterVerifyInput from "../components/RegisterVerifyInput";
export default {
  name: "Register",
  components: {RegisterVerifyInput, RegisterSteps, RegisterForm},
  data(){
    return {
      step: 0
    }
  },
  methods:{
    step1_finished(){
      this.step = 1
    },
    step2_finished(){
      this.step = 2
    },
  }
}
</script>

<style lang="less">
@import "../less/global";
.success-message{
  width: 224px;
  margin: auto auto;
  color: black;
  padding-top: @padding-top-default;
};
.finish{
  color: black;
  font-size: @title-font-size;
};
</style>