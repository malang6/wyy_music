<template>
  <div class="discoverContainer">
    <!-- 头部轮播图 -->
    <div class="header">
      <div class="banner">
        <!-- 自己封装的轮播图 -->
        <!-- <CarouselTop /> -->

        <!-- element-ui轮播图 -->
        <div class="block">
          <el-carousel trigger="click" height="284px" indicator-position="none">
            <el-carousel-item
              v-for="carousel in carouselList"
              :key="carousel.bannerId"
            >
              <img :src="carousel.pic" alt="" class="swiperPic" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="download">
          <a href="" class="downloadLink"></a>
          <span class="platform">PC 安卓 iPhone WP iPad Mac 六大客户端</span>
        </div>
        <!-- <img
          src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2072177575,1951826205&fm=26&gp=0.jpg"
          alt=""
        /> -->
      </div>
      <div class="download"></div>
    </div>

    <!-- 内容区 -->
    <div class="content">
      <!-- 左侧内容区 -->
      <div class="main">
        <!-- 热门推荐 -->
        <PopularRecommend />
        <!-- 个性化推荐 -->
        <PersonalRecommend />
        <!-- 新碟上架 -->
        <NewDisc />
        <!-- 榜单 -->
        <TopList />
      </div>
      <!-- 右侧内容区 -->
      <Append />
    </div>
  </div>
</template>

<script>
import Append from './Append/Append'
import TopList from './TopList/TopList'
import NewDisc from './NewDisc/NewDisc'
import PersonalRecommend from './PersonalRecommend/PersonalRecommend'
import PopularRecommend from './PopularRecommend/PopularRecommend'
// import CarouselTop from './Carousel/CarouselTop/CarouselTop'
import {reqBanner} from '@api/Discover/recommend'
export default {
  name: 'Discover',
  data() {
    return {
      carouselList: [],
    }
  },
  methods:{
    async getBanner(){
      const bannerList=await reqBanner()
      this.carouselList=bannerList.data.blocks[0].extInfo.banners   
    }
  },
  mounted(){
    this.getBanner()
  },
  components: {
    Append,
    TopList,
    NewDisc,
    PersonalRecommend,
    PopularRecommend,
    // CarouselTop
  },
}
</script>

<style lang="stylus" scoped>
.discoverContainer
  width 100%
  border-bottom 1px solid rgb(211, 211, 211)
  background-color rgb(245, 245, 245)
  .header
    width 100%
    // background-color #352f05
    .banner
      width 980px
      height 285px
      margin 0 auto
      display flex
      .block
        width 738px
        .swiperPic
          width 738px
      .download
        width 242px
        height 284px
        background url('../../../assets/Discover/images/download.png')
        background-position -5px 0
        display flex
        flex-direction column
        align-items center
        justify-content flex-end
        .downloadLink
          width 220px
          height 60px
          border-radius 3px
          &:hover
            background url('../../../assets/Discover/images/download.png')
            background-position 4px -287px
        .platform
          color #8d8d8d
          text-align center
          margin 10px 0 15px 0
        
  .content
    width 980px
    height 1732px
    margin 0 auto
    display flex
    background-color rgb(255, 255, 255)
    .main
      width 730px
      border-left 1px solid rgb(211, 211, 211)
      border-right 1px solid rgb(211, 211, 211)
      padding 20px 20px 40px
</style>
