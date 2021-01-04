<template>
  <div class="artist-outer">
    <div class="title">我的歌手(1)</div>
    <div class="item">
      <img class="img" src="../../assets/my/images/test.jpg" alt="图片" />
      <div class="detail">
        <div class="name">网易云音乐</div>
        <div class="count">
          <span>14个专辑</span>
          <span class="mv">6个MV</span>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "Artist",
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
