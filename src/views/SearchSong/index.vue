<template>
  <div class="searchSong">
    <div class="searchSong-cont">
      <div class="search">
        <input type="text" v-model="$route.query.s" />
        <div class="icon-cont">
          <i class="iconfont icon-sousuo"></i>
        </div>
      </div>
      <div class="song-bar">
        <p class="search-title">
          搜索"
          <span class="searchName">{{$route.query.s}}</span>",找到
          <span class="searchNum">{{num}}</span>首单曲
        </p>
        <div class="navBar">
          <ul class="m-tabs m-tabs-srch f-cb ztag">
            <li class="fst">
              <a class="z-slt">
                <em>单曲</em>
              </a>
            </li>
            <li>
              <a class="z-slt">
                <em>歌手</em>
              </a>
            </li>
            <li>
              <a class="z-slt">
                <em>专辑</em>
              </a>
            </li>
            <li>
              <a class="z-slt">
                <em>视频</em>
              </a>
            </li>
            <li>
              <a class="z-slt">
                <em>歌词</em>
              </a>
            </li>
            <li>
              <a class="z-slt">
                <em>歌单</em>
              </a>
            </li>
            <li>
              <a class="z-slt">
                <em>声音主播</em>
              </a>
            </li>
            <li>
              <a class="z-slt">
                <em>用户</em>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <SinglePage @getListLength="getListLength" />
    </div>
  </div>
</template>

<script>
import SinglePage from "./SinglePage";
export default {
  name: "SearchSong",
  data() {
    return {
      num: 10,
    };
  },
  components: {
    SinglePage,
  },
  methods: {
    getListLength(length) {
      this.num = length;
    },
  },
};
</script>

<style lang="stylus" scoped>
.searchSong
  .searchSong-cont
    margin 0 auto
    width 900px
    padding 40px
    background #fff
    .search
      position relative
      width 900px
      input
        margin-left 200px
        width 420px
        height 40px
        border-radius 5px
        border none
        box-shadow -0.02rem 0.06rem 0.51rem 0rem rgba(0, 0, 0, 0.2) inset
        outline none
        padding 5px 0 5px 20px
        box-sizing border-box
      .icon-cont
        position absolute
        top 0
        left 580px
        width 40px
        height 40px
        line-height 40px
        text-align center
        border-radius 5px
        border-top-left-radius 0
        border-bottom-left-radius 0
        box-shadow -0.02rem 0.06rem 0.51rem 0rem rgba(0, 0, 0, 0.2) inset
        .iconfont
          display inline-block
          font-size 24px
          color #666
    .song-bar
      .search-title
        margin 28px 0 17px
        color #999
        .searchNum
          color #c20c0c
          padding 0 5px 0 0
      .navBar
        .m-tabs
          display flex
          width 865px
          height 38px
          border 1px solid #ccc
          border-width 0 1px
          background #f8f8f8
          li
            width 108px
            height 36px
            line-height 36px
            font-size 14px
            text-align center
            border-top 2px solid #cccccc
            border-bottom 1px solid #cccccc
            &:hover
              border-top 2px solid #c20c0c
              cursor pointer
          .fst
            border-top 2px solid #c20c0c
            border-right 1px solid #cccccc
            border-bottom none
            background #fff
            a
              em
                padding 2px 2px 0 0
                line-height 37px
                color #333
                cursor pointer
</style>