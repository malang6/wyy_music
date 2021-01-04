<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in carouselList"
        :key="carousel.id"
      >
        <img
          :src="carousel.imgUrl"
          v-if="index === 0 || index === carouselList.length - 1"
        />
        <img v-if="index !== 0 && index !== carouselList.length - 1" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
//swiper轮播插件
import Swiper, { Pagination, Navigation, Autoplay } from 'swiper'

Swiper.use([Pagination, Navigation, Autoplay])

export default {
  name: 'Carousel',
  data() {
    return {
      carouselList: [
        {
          imgUrl:
            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2072177575,1951826205&fm=26&gp=0.jpg',
        },
        {
          imgUrl:
            'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1562829019,143854787&fm=26&gp=0.jpg',
        },
        /* {
          imgUrl:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Ffashion%2Ftransform%2F20170218%2Fkic2-fyarrcf4619027.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612334461&t=b3ce8d82737902b4a18b624cb9dd41ca',
        }, */
      ],
    }
  },
  /* props: {
    carouselList: {
      type: Array,
      required: true,
    },
  }, */
  methods: {
    initSwiper() {
      this.swiper = new Swiper(this.$refs.swiper, {
        loop: true, // 循环模式选项
        // 自动播放
        autoplay: {
          delay: 2000,
          disableOnInteraction: false, // 当用户点击下一页时，仍会开启自动轮播
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })
    },
  },
  watch: {
    /* carouselList() {
      if (this.swiper) return
      this.$nextTick(() => {
        this.initSwiper()
      })
    }, */
  },
  mounted() {
    //floor->一进来carouselList是有数据的，不会触发watch
    // 所以可以在mounted阶段new Swiper
    // if (!this.carouselList.length) return
    this.initSwiper()
  },
}
</script>

<style lang="stylus" scoped>
.swiper-container
  width 100%
  height 100%
.swiper-wrapper
  width 100%
  height 100%
.swiper-slide
  width 100%
  height 100%
  img
    width 982px
    height 285px
</style>
