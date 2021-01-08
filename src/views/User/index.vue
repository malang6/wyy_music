<template>
  <div class="userhome">
    <UHeader />
    <router-view></router-view>
  </div>
</template>

<script>
import UHeader from "./UHeader";
export default {
  name: "User",
  components: {
    UHeader,
  },
};
</script>

<style lang="stylus" scoped>
.userhome
  width 900px
  padding 40px
  margin 0 auto
  background #fff
  border 1px solid #ccc
  border-top none
  border-bottom none
</style>>
