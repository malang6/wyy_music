<template>
  <div class="newDisc">
    <!-- 头 -->
    <div class="top">
      <i class="circle"></i>
      <a href="" class="title">新碟上架</a>
      <span class="more">
        <a href="">更多</a>
        <i class="arrow"></i>
      </span>
    </div>
    <!-- 轮播图 -->
    <div class="discSwiper">
      <a class="pre" @click="preRoll" ref="pre"></a>
      <div class="carousel">
        <div class="showRoll">
          <ul class="discList" v-for="item in 4" :key="item">
            <li v-for="item in 5" :key="item" class="discItem">
              <a href="" class="cover">
                <img
                  src="../../../../assets/Discover/images/discCover.jpg"
                  alt=""
                  class="pic"
                />
              </a>
              <a href="" class="albumName">狼殿下 影视原声碟PART.1</a>
              <a href="" class="artists">群星</a>
            </li>
          </ul>
        </div>
      </div>
      <a class="next" @click="nextRoll" ref="next"></a>
    </div>
  </div>
</template>

<script>
// import CarouselBottom from '../Carousel/CarouselBottom/CarouselBottom'
export default {
  name: 'NewDisc',
  methods: {
    // 向前滚
    preRoll() {},
    // 向后滚
    nextRoll() {
      console.log(this.$refs.next)
      
    },
  },
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
      background url('../../../../assets/Discover/images/sprit.png')
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
        background url('../../../../assets/Discover/images/sprit.png')
        background-position 1px -240px
        width 12px
        height 12px
  .discSwiper
    display flex
    justify-content space-evenly
    align-items center
    height 186px
    margin 20px 0 37px
    border 1px solid #d3d3d3
    background-color rgb(245, 245, 245)
    .next, .pre
      width 17px
      height 17px
      &:hover
        cursor pointer
    .pre
      background-image url('../../../../assets/Discover/images/sprit.png')
      background-position -261px -75px
      &:hover
        background-position -281px -75px
    .next
      margin-left -10px
      background-image url('../../../../assets/Discover/images/sprit.png')
      background-position -298px -75px
      &:hover
        background-position -318px -75px
    .carousel
      width 645px
      height 150px
      margin-top 30px
      overflow hidden
      position relative
      .showRoll
        display flex
        position absolute
        left -645px
        .discList
          width 100%
          height 100%
          display flex
          justify-content space-between
          .discItem
            width 118px
            height 150px
            margin-left 10px
            display flex
            flex-direction column
            .cover
              width 118px
              height 100px
              margin-bottom 5px
              background-image url('../../../../assets/Discover/images/disc.png')
              background-position 0 -570px
            .albumName, .artists
              width 90%
              overflow hidden
              white-space nowrap
              text-overflow ellipsis
              line-height 18px
</style>
