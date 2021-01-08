<template>
  <div
    class="discoverContainer"
    id="top"
    v-if="$route.path === '/' || $route.path === '/discover'"
  >
    <!-- 头部轮播图 -->
    <div class="header">
      <div class="banner">
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
        <PersonalRecommend v-if="token" />
        <!-- 新碟上架 -->
        <NewDisc />
        <!-- 榜单 -->
        <TopList />
      </div>
      <!-- 右侧内容区 -->
      <Append :userInfo="userInfo" />
    </div>

    <!-- 回到顶部 -->
    <ReturnTop :returnUpIsShow="returnUpIsShow" />
  </div>
  <router-view v-else></router-view>
</template>

<script>
import Append from "./Append/Append";
import TopList from "./TopList/TopList";
import NewDisc from "./NewDisc/NewDisc";
import PersonalRecommend from "./PersonalRecommend/PersonalRecommend";
import PopularRecommend from "./PopularRecommend/PopularRecommend";
import ReturnTop from "@comps/ReturnTop/ReturnTop";
import { reqBanner, reqUserInfo, reqUserId } from "@api/Discover/recommend";
export default {
  name: "Discover",
  data() {
    return {
      carouselList: [],
      returnUpIsShow: "none",
      userInfo: [],
      token: ""
    };
  },
  methods: {
    // 请求轮播图
    async getBanner() {
      const bannerList = await reqBanner();
      this.carouselList = bannerList.data.blocks[0].extInfo.banners;
    },
    // 回到顶部函数
    scroll() {
      if (window.pageYOffset <= 105) {
        this.returnUpIsShow = "none"
      } else this.returnUpIsShow = "block";
    },
    // 登录状态
    async ifLogin() {
      const token = localStorage.getItem("token");
      this.token = token;
      if (token) {
        const id = (await reqUserId()).account.id;
        const userInfo = await reqUserInfo(id);
        this.userInfo = userInfo;
      }
    }
  },
  mounted() {
    this.getBanner();
    this.ifLogin();
    window.addEventListener("scroll", this.scroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
  },
  components: {
    Append,
    TopList,
    NewDisc,
    PersonalRecommend,
    PopularRecommend,
    ReturnTop
  }
};
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
        background url('../../assets/Discover/images/download.png')
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
            background url('../../assets/Discover/images/download.png')
            background-position 4px -287px
        .platform
          color #8d8d8d
          text-align center
          margin 10px 0 15px 0

  .content
    width 980px
    margin 0 auto
    display flex
    background-color rgb(255, 255, 255)
    border-right 1px solid rgb(211, 211, 211)
    .main
      width 730px
      border-left 1px solid rgb(211, 211, 211)
      border-right 1px solid rgb(211, 211, 211)
      padding 20px 20px 40px
</style>
