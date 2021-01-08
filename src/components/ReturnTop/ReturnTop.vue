<template>
  <div class="returnTop" :style="{ display: returnUpIsShow }">
    <a href="#top">
      <span>^</span>
      <span>Top</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'ReturnTop',
  props:['returnUpIsShow']
}
</script>

<style lang="stylus" scoped>
  .returnTop
    position fixed
    border 1px solid #ccc
    border-radius 3px
    left 50%
    margin-left 500px
    bottom 100px
    background-color rgb(245, 245, 245)
    a
      width 50px
      display flex
      flex-direction column
      span 
        height 25px
        text-align center
        line-height 25px
</style>
