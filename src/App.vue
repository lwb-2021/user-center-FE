<template>
  <div class="main">
    <router-view />
  </div>
</template>
<script>
</script>
<style lang="less">
@import "less/background";
@import "less/global";
:root body {
  position: fixed;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-family: Arial, sans-serif;
  color: @background-colour;
}
#main{
  margin: auto auto;
  padding-top: @padding-top-default;

}
</style>
