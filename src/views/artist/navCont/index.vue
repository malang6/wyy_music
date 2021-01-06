<template>
  <div class="nav_container">
    <template v-if="$route.path === '/discover/artist/recommond'">
      <SingerList :indent="settleIn">
        <h3>入驻歌手</h3>
        <a class="more" @click="handleGoToSettleIn">更多&nbsp;&gt;</a>
      </SingerList>
      <SingerList :indent="hotSinger">
        <h3>热门歌手</h3>
      </SingerList>
    </template>
    <template v-else>
      <SingerList></SingerList>
    </template>
  </div>
</template>

<script>
import SingerList from "./singerList";
export default {
  name: "navCont",
  data() {
    return {
      settleIn: "settleIn",
      hotSinger: "hotSinger",
    };
  },
  methods: {
    handleGoToSettleIn() {
      let status = {
        count: 1,
        type: null,
        area: null,
      };
      window.sessionStorage.setItem("status", JSON.stringify(status));
      this.$router.push({ name: "signed" });
      window.location.reload();
    },
  },
  components: {
    SingerList,
  },
};
</script>

<style lang="stylus">
.nav_container
  padding 40px
  border-left 1px solid #d3d3d3
  background-color #FFFFFF
</style>