<template>
  <div class="artist-outer">
    <div class="title">我的歌手({{ collectArtist.length }})</div>
    <div class="item" v-for="item in collectArtist" :key="item.id">
      <img class="img" :src="item.artistImg" alt="图片" />
      <div class="detail">
        <div class="name">{{ item.name }}</div>
        <div class="count">
          <span>{{ item.albumCount }}个专辑</span>
          <span class="mv">{{ item.mvCount }}个MV</span>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Artist",
  computed: {
    ...mapGetters(["collectArtist"]),
  },
  methods: {
    ...mapActions(["getArtist"]),
  },
  mounted() {
    //获取歌手列表
    this.getArtist();
  },
};
</script>

<style lang="stylus" scoped>
.artist-outer
  padding 40px
  .title
    font-size 24px
    height 42px
    width 660px
    border-bottom 2px solid #c20c0c
  .item
    padding 10px 0
    height 81px
    border-bottom 1px solid #ddd
    display flex
    align-items center
    position relative
    .img
      width 80px
      height 80px
    .detail
      margin-left 15px
      height 100%
      .name
        margin 10px 0
        font-weight bold
      .count
        font-size 12px
        color #666
        .mv
          margin-left 10px
</style>
