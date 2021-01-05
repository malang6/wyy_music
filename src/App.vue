<template>
  <div id="app">
    <My v-if="false"/>
    <Friend v-else/>
  </div>
</template>

<script>
import My from "./views/My";
import Friend from "./views/Friend";

export default {
  name: "App",
  components: {
    Friend,
    My
  },
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
