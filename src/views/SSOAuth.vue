<template>
  <div class="redirect-message" style="margin: auto auto;color: black">
    登录成功，正在跳转
  </div>
  <login-form @finished="finished" v-if="login_form_visible"/>
</template>

<script>
import LoginForm from "../components/LoginForm";
import {getCookie, hasCookie} from "../utils/utils";

export default {
  name: "SSOAuth",
  components: {LoginForm},
  data() {
    return{
      login_form_visible: true
    }
  },
  methods:{
    redirect(){
      const mode = this.$route.query.mode
      const redirect = this.$route.query.redirect.toString()
      if(redirect.startsWith("http://192.168.100.36")){
        if(mode !== undefined && mode){
          window.location.href = redirect
        }else {
          window.location.href = redirect + "?ticket=" + getCookie("JWT_TOKEN")
        }
      }
    },
    checkLogin(){
      if (hasCookie("JWT_TOKEN")){
        this.finished()
      }
    },
    finished(){
      this.login_form_visible = false
      setTimeout(this.redirect, 3000)
    }
  },
  created() {
    this.checkLogin()
  }
}
</script>

<style scoped>

</style>