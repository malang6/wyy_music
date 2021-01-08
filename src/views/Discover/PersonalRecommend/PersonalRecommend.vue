<template>
  <div class="personalRecommend">
    <div class="top">
      <i class="circle"></i>
      <span class="title">个性化推荐</span>
    </div>
    <div class="recommendContainer">
      <div class="dateRecommend">
        <a href="" class="everyday">
          <span class="day">星期{{ day }}</span>
          <span class="date">{{ date }}</span>
          <span class="dateMask"></span>
        </a>
        <a href="" class="info">每日歌曲推荐</a>
        <p class="attachment">
          根据你的口味生成
          <br />
          每天6:00更新
        </p>
      </div>
      <div
        class="recommendItem"
        v-for="songList in userSongList"
        :key="songList.id"
      >
        <div class="playList">
          <a href="">
            <img :src="songList.picUrl" alt="" class="pic" />
          </a>
          <div class="control">
            <span class="headphone"></span>
            <span class="playCount">{{
              songList.playcount > 100000000
                ? Math.floor(songList.playcount / 100000000) + "亿"
                : Math.floor(songList.playcount / 10000) + "万"
            }}</span>
            <a href="" class="play"></a>
          </div>
        </div>
        <a href="" class="info">{{ songList.name }}</a>
        <div class="guessLike">
          <span class="origin">{{ songList.copywriter }}</span>
          <a href="" class="dislike">不感兴趣</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { reqUserSongList } from "@api/Discover/recommend";
export default {
  name: "PersonalRecommend",
  data() {
    return {
      date: "",
      day: "",
      userSongList: []
    };
  },
  methods: {
    // 获取时间
    getDate() {
      const time = moment(Date.now()).format("D-d");
      const dayList = ["一", "二", "三", "四", "五", "六", "日"];
      this.date = time.split("-")[0];
      this.day = dayList[time.split("-")[1] - 1];
    },

    // 获取用户推荐歌单
    async getUserSongList() {
      const userSongList = await reqUserSongList();
      this.userSongList = userSongList.recommend.slice(0, 3);
    }
  },
  mounted() {
    this.getDate();
    this.getUserSongList();
  }
};
</script>

<style lang="stylus" scoped>
.personalRecommend
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
      display inline-block
      font-size 20px
      font-weight normal
      line-height 28px
      color #333
  .recommendContainer
    .dateRecommend
      display flex
      padding 0 45px 30px 0
      flex-direction column
      width 140px
      height 204px
      .everyday
        width 100%
        height 140px
        display block
        position relative
        border-radius 10px
        overflow hidden
        border 1px solid rgb(188, 188, 188)
        span
          display block
        .day
          height 33px
          line-height 33px
          color #fed9d9
          font-size 14px
          text-shadow 0 -1px #962626
          text-align center
          background-color #cf3636
        .date
          height 107px
          line-height 107px
          text-align center
          font-size 94px
          font-weight bold
          color #202020
          background-color rgb(220, 220, 220)
        .dateMask
          position absolute
          width 100%
          height 53px
          bottom 0
          left 0
          background-color rgba(255, 255, 255, 0.3)
      .info
        font-size 14px
        color #000
        width 100%
        margin 8px 0 3px
        &:hover
          text-decoration underline
      .attachment
        color #999
  .recommendContainer
    display flex
    margin 20px -42px 0 0
    flex-wrap wrap
    .recommendItem
      display flex
      flex-shrink 0
      padding 0 43px 30px 0
      flex-direction column
      width 140px
      height 204px
      .playList
        position relative
        .pic
          width 100%
          height 140px
        .control
          position absolute
          bottom 2px
          left 0
          width 100%
          height 27px
          background-color rgba(0, 0, 0, 0.5)
          color #ccc
          .headphone
            display inline-block
            margin 8px 5px 0
            width 14px
            height 11px
            background url('../../../assets/Discover/images/sprit3.png')
            background-position 0px -24px
          .playCount
            display inline-block
            margin-top 5px
          .play
            display inline-block
            float right
            width 20px
            height 20px
            margin 4px 5px 0
            background url('../../../assets/Discover/images/sprit3.png')
            background-position -1px -86px
            &:hover
              background-position -1px -111px
      .info
        font-size 14px
        margin 8px 0 3px
        color #000
        width 100%
        &:hover
          text-decoration underline
      .guessLike
        width 100%
        height 30px
        &:hover
          >.origin
            display none
          >.dislike
            display inline-block
        .origin
          color #999
          display inline-block
        .dislike
          display none
          color #666
          width 60px
          height 25px
          line-height 25px
          text-align center
          border 1px solid #ccc
          border-radius 3px
          background-color #fcfcfc
</style>
