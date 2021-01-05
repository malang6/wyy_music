<template>
  <div class="container">
    <div class="btn prv">上一页</div>
    <ul class="page" @click="changPage">
      <li class="active">1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>...</li>
      <li>34</li>
    </ul>
    <div class="btn next">下一页</div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
};
</script>

<style lang="stylus" scoped>
.container
  margin 20px 0
  text-align center
  display flex
  justify-content center
  .page
    display flex
    margin 0 10px
    li
      height 22px
      padding 0 8px
      line-height 22px
      margin 0 1px 0 2px
      border 1px solid #ccc
      border-radius 2px
      vertical-align middle
    .active
      background-image url('/images/button.png')
      background-position 0 -650px
      color #fff
      border-color #A2161B
  .btn
    background-image url('/images/button.png')
    height 24px
    line-height 24px
    text-align left
  .prv
    width 47px
    padding-left 22px
    background-position 0 -620px
    color #cacaca
  .next
    width 57px
    padding-left 12px
    background-position -75px -560px
</style>