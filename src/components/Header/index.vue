<template>
  <header class="header">
    <div class="headerContainer">
      <div class="header-r">
        <div class="logo-container">
          <h1 class="logo">
            <a href="/#">网易云音乐</a>
          </h1>
        </div>
        <ul @click="changebar = true">
          <li>
            <span>
              <a :class="changebar ? 'headerActive' : ''">
                <em>发现音乐</em>
                <i :class="changebar ? 'cor' : ''">&nbsp;</i>
              </a>
            </span>
          </li>
          <li>
            <span>
              <a>
                <em>我的音乐</em>
                <i>&nbsp;</i>
              </a>
            </span>
          </li>
          <li>
            <span>
              <a>
                <em>朋友</em>
                <i>&nbsp;</i>
              </a>
            </span>
          </li>
          <li>
            <span>
              <a>
                <em>商城</em>
              </a>
            </span>
          </li>
          <li>
            <span>
              <a>
                <em>音乐人</em>
              </a>
            </span>
          </li>
          <li>
            <span>
              <a>
                <em>下载客户端</em>
              </a>
              <img class="hot" src="./img/hot.png" />
            </span>
          </li>
        </ul>
      </div>
      <div class="header-l">
        <div class="header-search">
          <span class="parent">
            <i class="iconfont icon-sousuo"></i>
            <input
              type="text"
              ref="search"
              v-model="searchTxt"
              @keyup.enter="goSearchSong"
              @focus="isShow = false"
              @blur="handleBlur"
            />
            <label v-show="isShow">音乐/视频/电台/用户</label>
          </span>
        </div>
        <div class="header-lc">
          <a>创作者中心</a>
        </div>
        <!-- 登录后 -->
        <div class="head-portrait" v-if="token ? token : ltoken">
          <div class="hpp">
            <img :src="avatarUrl" />
            <div class="content">
              <span class="c-bor"></span>
              <ul class="contentList">
                <li class="contentItem" @click="goUserHome">
                  <a>
                    <i class="icn icn-hm"></i>
                    <em>我的主页</em>
                  </a>
                </li>
                <li class="contentItem">
                  <a>
                    <i class="icn icn-msg"></i>
                    <em>我的消息</em>
                  </a>
                </li>
                <li class="contentItem">
                  <a>
                    <i class="icn icn-lv"></i>
                    <em>我的等级</em>
                  </a>
                </li>
                <li class="contentItem">
                  <a>
                    <i class="icn icn-mbr"></i>
                    <em>VIP会员</em>
                  </a>
                </li>
                <li class="contentItem">
                  <a>
                    <i class="icn icn-st"></i>
                    <em>个人设置</em>
                  </a>
                </li>
                <li class="contentItem">
                  <a>
                    <i class="icn icn-verify"></i>
                    <em>实名认证</em>
                  </a>
                </li>
                <li class="contentItem" @click="exit">
                  <a>
                    <i class="icn icn-ex"></i>
                    <em>退出</em>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 登录 -->
        <div class="head-login" v-else>
          <a @click="login">登录</a>
        </div>
        <Login v-show="isShowLogin" class="login"></Login>
      </div>
    </div>
    <div class="findBar" v-if="changebar">
      <div class="findBar-container">
        <ul class="navList">
          <li
            class="navItem"
            v-for="item in headerData.headerData"
            :key="item.id"
            @click="handleClick(item)"
          >
            <a
              :class="{
                navTitle: 'navTitle',
                navActive: currentId === item.id ? 'navActive' : ''
              }"
            >
              <em>
                {{ item.name }}
                <img
                  v-if="item.name === '歌单'"
                  src="./img/white-r-icon@3x.png"
                  class="R-icon"
                />
              </em>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="c-bar" v-else></div>
  </header>
</template>

<script>
import Login from "@views/Login";
import { mapState, mapMutations } from "vuex";
import { default as headerData } from "@utils/headerData";
export default {
  name: "Header",
  data() {
    return {
      headerData: headerData,
      isLogin: false, //是否登录
      ltoken: window.localStorage.getItem("token"),
      avatarUrl: window.localStorage.getItem("avatarUrl"),
      changebar: true, //红色导航条
      searchTxt: "", //搜索关键字
      isShow: true, //是否显示输入框placeholder提示文字
      currentId:
        JSON.parse(window.sessionStorage.getItem("selectedHeader"))
          ?.currentId || 1
    };
  },
  computed: {
    ...mapState({
      isShowLogin: state => state.user.isShowLogin,
      token: state => state.user.token,
      profile: state => state.user.profile
    })
  },
  methods: {
    ...mapMutations(["CHANGE_SHOW", "EXIT"]),
    handleClick(item) {
      console.log(1);
      this.currentId = item.id;
      let obj = {
        currentId: this.currentId
      };
      window.sessionStorage.setItem("selectedHeader", JSON.stringify(obj));
      this.$router.push({ path: item.path });
    },
    //点击登录
    login() {
      this.CHANGE_SHOW(true);
    },
    //去我的主页
    goUserHome() {
      let userId = window.localStorage.getItem("userId");
      // this.$router.push("/user/home?id=" + userId);
      this.$router.push({ name: "home", query: { id: userId } });

      this.changebar = false;
    },
    //退出登录
    exit() {
      localStorage.clear();
      this.EXIT();
      //回到首页
      this.$router.replace("/");
      window.location.reload();
    },
    //搜索框失去焦点事件
    handleBlur() {
      if (!this.searchTxt) {
        this.isShow = true;
      }
    },
    //搜索功能
    goSearchSong() {
      const { searchTxt } = this;
      this.$router.push("/search/m?s=" + searchTxt);
      this.$refs.search.blur();
    }
  },
  created() {
    let obj = {
      currentId: 1
    };
    window.sessionStorage.setItem("selectedHeader", JSON.stringify(obj));
  },
  mounted() {
    // console.log(
    //   JSON.parse(window.sessionStorage.getItem("selectedHeader")).currentId
    // );
  },
  components: {
    Login
  }
};
</script>

<style lang="stylus" scoped>
.header
  width 100%
  background #242424
  .headerContainer
    width 1100px
    height 70px
    margin 0 auto
    display flex
    justify-content space-between
    .header-r
      display flex
    .logo-container
      h1.logo
        width 176px
        height 69px
        background-position 0 0
        background url('./img/topbar.png') no-repeat 0 0
      a
        display inline-block
        width 157px
        height 100%
        padding-right 20px
        text-indent -9999px
    ul
      display flex
      font-size 14px
      li
        text-align center
        position relative
        span
          position relative
          a
            display block
            height 70px
            padding 0 19px
            line-height 70px
            color #ccc
            .cor
              position absolute
              top 56px
              left -8px
              border-left 8px solid transparent
              border-right 8px solid transparent
              border-top 8px solid transparent
              border-bottom 8px solid #C20C0C
        &:hover a, a.headerActive
          background #000
          text-decoration none
          color #fff
          cursor pointer
        .hot
          position absolute
          top 21px
          left 48px
          width 27px
          height 14px
          border-radius 25px
    .header-l
      position relative
      display flex
      .header-search
        width 158px
        height 32px
        background-color #fff
        border-radius 32px
        margin-top 19px
        .parent
          position relative
          display block
          position relative
          margin 8px 0 0 30px
          i
            position absolute
            top -1px
            left -22px
            color #aaa
          input
            position relative
            z-index 5
            outline none
            width 95%
            color #333
            line-height 16px
            border none
            background transparent
          label
            display block
            position absolute
            top 0
            left 0
            width 90%
            color #9b9b9b
            cursor text
      .header-lc
        width 90px
        height 32px
        line-height 33px
        border 1px solid #4F4F4F
        margin 19px 0 0 12px
        box-sizing border-box
        padding-left 16px
        border-radius 20px
        a
          width 90px
          color #ccc
        &:hover
          color #fff
          text-decoration none
          border 1px solid #ccc
          a
            color #fff
      .head-portrait
        margin 20px 0 0 20px
        .hpp
          position relative
          height 45px
          padding-right 22px
          img
            width 30px
            height 30px
            border-radius 50%
          .content
            display none
            position absolute
            top 40px
            left -60px
            z-index 110
            .c-bor
              position absolute
              top -15px
              left 68px
              border-left 8px solid transparent
              border-right 8px solid transparent
              border-top 8px solid transparent
              border-bottom 8px solid #2b2b2b
            .contentList
              display flex
              flex-direction column
              width 150px
              background-color #2b2b2b
              border-radius 6px
              .contentItem
                width 150px
                .icn
                  position absolute
                  top 9px
                  left 20px
                  z-index 112
                  width 18px
                  height 18px
                  background url('./img/toplist.png') no-repeat 0 9999px
                .icn-hm
                  background-position 0 -80px
                .icn-msg
                  background-position -20px -120px
                .icn-lv
                  background-position 0 -100px
                .icn-mbr
                  background-position 0 -221px
                .icn-st
                  background-position 0 -140px
                .icn-verify
                  background-position -20px -142px
                .icn-ex
                  background-position 0 -200px
                a
                  display block
                  width 100%
                  height 34px
                  line-height 34px
                  color #ccc
                  em
                    font-size 12px
                  &:hover
                    background #353535
                    border-radius 6px
                    color #fff
          &:hover .content
            display block
      .head-login
        margin 27px 0 0 20px
        a
          color #787878
          cursor pointer
        &:hover
          text-decoration underline
      .login
        position absolute
        top 204px
        left -478px
        z-index 999
  .findBar
    position relative
    width 100%
    z-index 1
    height 35px
    box-sizing border-box
    background #C20C0C
    border-bottom 1px solid #a40011
    .findBar-container
      width 1100px
      margin 0 auto
      .navList
        padding-left 180px
        display flex
        .navItem
          a
            display inline-block
            height 35px
            color white
            em
              position relative
              display inline-block
              height 20px
              padding 0 13px
              margin 7px 17px 0
              border-radius 20px
              line-height 21px
              .R-icon
                position absolute
                top 2px
                right 4px
                width 8px
                height 8px
          .navActive, &:hover
            cursor pointer
            em
              background #9B0909
  .c-bar
    position relative
    width 100%
    z-index 90
    height 5px
    box-sizing border-box
    background #C20C0C
</style>
