<template>
  <div class="newDisc">
    <div class="top">
      <i class="circle"></i>
      <a href="" class="title">新碟上架</a>
      <span class="more">
        <a href="">更多</a>
        <i class="arrow"></i>
      </span>
    </div>
    <div class="discSwiper">
      <!-- <CarouselBottom/> -->
    </div>
  </div>
</template>

<script>
// import CarouselBottom from '../Carousel/CarouselBottom/CarouselBottom'
export default {
  name: 'NewDisc',
  // components:{
  //   CarouselBottom
  // }
}
</script>

<style lang="stylus" scoped>
.newDisc
  .top
    padding-right 10px
    border-bottom 2px solid #C10D0C
    height 33px
    color #666
    font-size 12px
    .circle
      float left
      display inline-block
      width 20px
      height 20px
      background url('../../../assets/Discover/images/sprit.png')
      background-position -232px -162px
      margin 5px 10px 0
    .title
      float left
      font-size 20px
      font-weight normal
      line-height 28px
      color #333
    .more
      float right
      margin-top 10px
      .arrow
        display inline-block
        background url('../../../assets/Discover/images/sprit.png')
        background-position 1px -240px
        width 12px
        height 12px
  .discSwiper
    height 186px
    margin 20px 0 37px
    border 1px solid #d3d3d3
    background-color rgb(245, 245, 245)
</style>
