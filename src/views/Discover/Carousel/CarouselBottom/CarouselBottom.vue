<template>
  <div class="swiper-container" ref="swiper">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="skuImage in skuImageList"
        :key="skuImage.id"
      >
        <img :src="skuImage.imgUrl" alt="" />
      </div>
    </div>

    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination } from 'swiper'
Swiper.use([Navigation, Pagination])
export default {
  name: '',
  data() {
    return {
      skuImageList: [
        { imgUrl: '../static/aj1.jpg', id: 1 },
        { imgUrl: '../static/aj1.jpg', id: 2 },
        { imgUrl: '../static/aj1.jpg', id: 3 },
        { imgUrl: '../static/aj1.jpg', id: 4 },
        { imgUrl: '../static/aj1.jpg', id: 5 },
      ],
    }
  },
  methods: {
    initSwiper() {
      // 使用 this.$refs.swiper 取代 .swiper-container
      // 使用 this.$refs.swiper 才能保证轮播图组件使用的自己的swiper
      this.swiper = new Swiper(this.$refs.swiper, {
        slidesPerView: 5, //每页显示轮播图数
        slidesPerGroup: 5, //切换时轮播图数量
        spaceBetween: 20, //轮播图间距
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })
    },
  },
  mounted(){
    this.initSwiper()
  }
}
</script>

<style lang="stylus" scoped>
.swiper-container
  height 56px
  width 412px
  box-sizing border-box
  padding 0 12px
  .swiper-slide
    width 56px
    height 56px
    img
      width 100%
      height 100%
      border 1px solid #ccc
      padding 2px
      width 50px
      height 50px
      display block
      &.active
        border 2px solid #f60
        padding 1px
      &:hover
        border 2px solid #f60
        padding 1px
  .swiper-button-next
    left auto
    right 0
  .swiper-button-prev
    left 0
    right auto
  .swiper-button-next, .swiper-button-prev
    box-sizing border-box
    width 12px
    height 56px
    background rgb(235, 235, 235)
    border 1px solid rgb(204, 204, 204)
    top 0
    margin-top 0
    &::after
      font-size 12px
</style>
