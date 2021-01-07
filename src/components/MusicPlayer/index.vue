<template>
  <div
    class="music_player"
    :class="{ isShow: stateLock || isLock ? 'isShow' : '' }"
    @mouseenter="handleShow('up')"
    @mouseleave="handleShow('down')"
  >
    <div class="play_line" title="展开播放条 "></div>
    <div class="center">
      <!-- 暂停/上一首 -->
      <div class="status">
        <a class="pre"></a>
        <a class="pause_play"></a>
        <a class="next"></a>
      </div>
      <!-- 歌曲图片 -->
      <div class="logo"></div>
      <!-- 播放进度条 -->
      <div class="play">
        <!-- 进度条头部标题 -->
        <div class="title">
          <a class="name hid">七里香</a>
          <span class="author hid">周杰伦</span>
          <a class="link" title="来自电台分享"></a>
        </div>
        <!--进度条-->
        <div class="noop">
          <div class="process_bar">
            <div class="ready"></div>
            <div class="current"><span class="btn"></span></div>
          </div>
          <div class="time">
            <em class="start">00:00</em>
            /
            <em class="end">00:00</em>
          </div>
        </div>
      </div>
      <!-- 功能区 -->
      <div class="fun">
        <div class="left">
          <a class="col icn" title="收藏"></a>
          <a class="share icn" title="分享"></a>
        </div>
        <div class="right">
          <a class="volume icn"></a>
          <a
            class="play_mode icn"
            :class="{
              single_circle: play_mode === 0,
              loop: play_mode === 1,
              random: play_mode === 2,
            }"
            :title="play_title"
            @click="handleShowPlayMode"
          >
            <a v-show="isShowPlayMode">{{ play_title }}</a>
          </a>
          <a class="play_list icn" title="播放列表">1</a>
        </div>
      </div>
    </div>
    <!-- 固定 -->
    <div class="lock">
      <a
        class="lock_bottom"
        :class="{ isLock: isLock ? 'isLock' : '' }"
        @click="handleLock"
      ></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicPlayer",
  data() {
    return {
      isLock:
        JSON.parse(window.sessionStorage.getItem("statusObj"))?.isLock || false,
      stateLock: 0,
      isShowPlayMode: false,
      play_mode:
        JSON.parse(window.sessionStorage.getItem("statusObj"))?.play_mode || 0, // 0-单曲循环 1-循环 2-随机
    };
  },
  computed: {
    play_title() {
      let str;
      if (this.play_mode === 0) {
        str = "单曲循环";
      }
      if (this.play_mode === 1) {
        str = "循环";
      }
      if (this.play_mode === 2) {
        str = "随机";
      }
      return str;
    },
  },
  methods: {
    // 临时存储状态栏数据
    saveBtmStatus(count) {
      if (count === 0) {
        let statusObj = {
          isLock: false,
          play_mode: 0,
        };
        window.sessionStorage.setItem("statusObj", JSON.stringify(statusObj));
      }
      let statusObj = {
        isLock: this.isLock,
        play_mode: this.play_mode,
      };
      window.sessionStorage.setItem("statusObj", JSON.stringify(statusObj));
    },
    // 播放模式切换
    handleShowPlayMode() {
      if (this.flag) return;
      this.flag = true;
      if (this.play_mode < 2) {
        this.play_mode = this.play_mode + 1;
      } else {
        this.play_mode = 0;
      }
      this.saveBtmStatus();
      this.isShowPlayMode = !this.isShowPlayMode;
      this.timer = setTimeout(() => {
        this.isShowPlayMode = false;
      }, 2000);
      setTimeout(() => {
        this.flag = false;
      }, 2500);
    },
    // 底部滑动
    handleShow(params) {
      params === "up" ? (this.stateLock = 1) : (this.stateLock = 0);
    },
    // 底部状态锁
    handleLock() {
      this.isLock = !this.isLock;
      this.saveBtmStatus();
    },
  },
  mounted() {
    this.saveBtmStatus(0);
  },
};
</script>

<style lang="stylus" scoped>
.music_player
  position absolute
  top 10px
  width 100%
  height 53px
  background-image url('/images/playbar.png')
  background-position 0 0
  visibility visible
  transition all 0.3s linear
  &.isShow
    top -33px
  .play_line
    position absolute
    top -10px
    width 100%
    height 20px
    cursor pointer
  a
    cursor pointer
  .center
    position absolute
    width 980px
    height 47px
    left 50%
    top 6px
    transform translateX(-50%)
    display flex
    .status
      width 137px
      padding 6px 0 0
      display flex
      justify-content space-between
      a
        display block
        width 28px
        height 28px
        margin-right 8px
        margin-top 5px
      .pre
        background-image url('/images/playbar.png')
        background-position 0 -130px
      .pre:hover
        background-position -30px -130px
      .pause_play
        width 36px
        height 36px
        margin-top 0
        background-image url('/images/playbar.png')
        background-position 0 -204px
      .pause_play:hover
        background-position -40px -204px
      .next
        background-image url('/images/playbar.png')
        background-position -80px -130px
      .next:hover
        background-position -110px -130px
    .logo
      width 34px
      height 34px
      background-color green
      margin 6px 15px 0 20px
    .play
      width 608px
      .title
        height 28px
        overflow hidden
        color #e8e8e8
        line-height 28px
        text-shadow 0 1px 0 #171717
        display flex
        .hid
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        .hid:hover
          text-decoration underline
        .name
          max-width 300px
          // color #e8e8e8
        color red
      .author
        max-width 220px
        margin-left 15px
        color #9b9b9b
      .link
        width 14px
        height 14px
        line-height 28px
        margin 7px 0 0 13px
        background-image url('/images/playbar.png')
        background-position -110px -103px
      .link:hover
        background-position -130px -103px
    .noop
      width 493px
      display flex
      justify-content space-between
      .process_bar
        width 493px
        position relative
        height 9px
        background-image url('/images/statbar.png')
        background-position right 0
        .ready
          width 0px
          height 9px
          background-image url('/images/statbar.png')
          background-position right -30px
        .current
          position absolute
          top 0
          left 0
          width 0%
          background-image url('/images/statbar.png')
          background-position left -66px
          .btn
            position absolute
            top -3px
            right -13px
            width 14px
            height 14px
            margin-left -11px
            background-color #fff
            border-radius 50%
            background-image url('/images/icon.png')
            background-position -65px -121px
      .time
        margin-left 10px
        height 9px
        line-height 9px
        display flex
        justify-content space-between
        color #a1a1a1
    .fun
      width 173px
      height 37px
      margin-left -56px
      display flex
      .icn
        height 25px
        margin 11px 2px 0 0
        text-indent -9999px
        background-image url('/images/playbar.png')
      .left
        width 60px
        height 37px
        display flex
        .col
          margin-top 12px
          width 26px
          background-position -60px -502px
        .col:hover
          background-position -90px -502px
        .share
          width 25px
          height 25px
          margin 11px 2px 0 0
          background-position -114px -163px
        .share:hover
          background-position -114px -189px
      .right
        width 113px
        height 37px
        display flex
        .icn
          width 25px
          height 25px
          margin 11px 2px 0 0
          a
            position absolute
            top -49px
            left -25px
            width 81px
            height 39px
            line-height 39px
            text-indent 0
            text-align center
            color #fff
            background-image url('/images/playbar.png')
        .volume
          background-position -2px -248px
        .volume:hover
          background-position -31px -248px
        .play_mode
          position relative
        .single_circle
          background-position -93px -344px
        .loop
          background-position -33px -344px
        .random
          background-position -93px -248px
        .play_list
          width 38px
          padding-left 21px
          line-height 27px
          text-align center
          text-shadow 0 1px 0 #080707
          background-position -42px -68px
          text-indent 0
        .play_list:hover
          background-position -42px -98px
  .lock
    width 52px
    height 22px
    position absolute
    top -14px
    right 15px
    background-image url('/images/playbar.png')
    background-position 0 -380px
    .lock_bottom
      display block
      width 18px
      height 18px
      margin 6px 0 0 17px
      background-image url('/images/playbar.png')
      background-position -80px -380px
    .isLock
      background-position -100px -400px
</style>
