<template>
  <t-steps theme="dot" :current="current" readonly>
    <t-step-item title="输入账号密码" content="输入邮箱，账号，密码，确认密码。填完整账号信息" />
    <t-step-item title="邮箱验证" content="通过邮箱的认证码完成注册" />
  </t-steps>
</template>

<script>
export default {
  name: "RegisterSteps",
  props: ["current"]
}
</script>

<style scoped>

</style>