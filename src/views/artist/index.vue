<template>
  <div class="artist">
    <NavList></NavList>

    <router-view></router-view>
  </div>
</template>

<script>
import NavList from "./navList";
export default {
  name: "Artist",
  components: {
    NavList,
  },
};
</script>

<style lang="stylus" scoped>
.artist
  width 980px
  min-height 700px
  margin 0 auto
  border 1px solid #d3d3d3
  border-width 0 1px
  display flex
  // justify-content space-between
</style>