<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html,
body {
  height: 100%;
  background-color: rgb(245, 245, 245);
}
#app {
  height: 100%;
}
.icon {
  width: 10px;
  height: 10px;
  color: rgb(190, 41, 20);
  fill: currentColor;
  overflow: hidden;
}
</style>
