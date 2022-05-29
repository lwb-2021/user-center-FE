<template>

</template>

<script>
import axios from "axios";

export default {
  name: "SSOLogout",
  created() {
    let back = this.$route.query.back
    if(back !== undefined){
      back = back.toString()
      axios.post("/api/account/logout").then(
          (result) =>{
            window.location.href = back
          }
      )
    }
  }
}
</script>

<style scoped>

</style>