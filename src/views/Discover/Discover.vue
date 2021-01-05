<template>
  <div class="discoverContainer">
    <!-- 头部轮播图 -->
    <div class="header">
      <div class="banner">
        <!-- <CarouselTop /> -->
        <img
          src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2072177575,1951826205&fm=26&gp=0.jpg"
          alt=""
        />
      </div>
      <div class="download"></div>
    </div>

    <!-- 内容区 -->
    <div class="content">
      <!-- 左侧内容区 -->
      <div class="main">
        <!-- 热门推荐 -->
        <PopularRecommend/>
        <!-- 个性化推荐 -->
        <PersonalRecommend/>
        <!-- 新碟上架 -->
        <NewDisc/>
        <!-- 榜单 -->
        <TopList/>
      </div>
      <!-- 右侧内容区 -->
      <Append/>
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
export default {
  name: 'Discover',
  components:{
    Append,
    TopList,
    NewDisc,
    PersonalRecommend,
    PopularRecommend,
    // CarouselTop
  }
}
</script>

<style lang="stylus" scoped>
.discoverContainer
  width 100%
  border-bottom 1px solid rgb(211, 211, 211)
  background-color rgb(245, 245, 245)
  .header
    width 100%
    .banner
      width 980px
      height 285px
      margin 0 auto
      img
        width 100%
        height 100%
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
