<template>
  <div class="radio-outer">
    <div class="title">我订阅的电台(1)</div>
    <div class="item">
      <img class="img" src="../../assets/my/images/test.jpg" alt="图片" />
      <em class="superscript">19</em>
      <div class="detail">
        <div class="name">Arcaea(韵律源点)</div>
        <div class="author">by Arcaea_Team</div>
      </div>
      <div class="count">211期</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Radio",
};
</script>

<style lang="stylus" scoped>
.radio-outer
  padding 40px
  .title
    margin-top 20px
    font-size 24px
    height 42px
    width 660px
    border-bottom 2px solid #c20c0c
  .item
    padding 10px 0
    height 50px
    display flex
    align-items center
    position relative
    .img
      width 50px
      height 50px
    .superscript
      background-color rgb(217, 49, 49)
      font-style normal
      border-radius 7px
      height 14px
      width 20px
      font-size 12px
      font-weight bold
      color #fff
      text-align center
      line-height 14px
      position absolute
      top 2px
      left 40px
    .detail
      margin-left 10px
      padding-right 57px
      width 488px
      .name
        font-size 14px
        color #333
        height 24px
      .author
        font-size 12px
        color #999
        height 24px
    .count
      margin-left 10px
      font-size 12px
      color #999
</style>
