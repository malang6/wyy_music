<template>
  <div class="friend">
    <div class="friend-content" v-if="isLogin">
      <!-- 动态 -->
      <div class="message">
        <div class="message-header">
          <span>动态</span>
          <div>
            <span class="publish-msg"></span>
            <span class="publish-video"></span>
          </div>
        </div>
        <div class="content">
          <div
            class="content-item"
            v-for="dynamic in friendDynamicList"
            :key="dynamic.id"
          >
            <div v-if="dynamic.avatarUrl">
              <img class="avatar" :src="dynamic.avatarUrl" alt="头像" />
              <!-- 用户动态内容 -->
              <div class="main">
                <div>
                  <div>
                    <span class="name">{{ dynamic.nickName }}</span>
                    <span class="cate">{{ dynamic.type || "" }}</span>
                  </div>
                  <span class="time">{{ dynamic.showTime }}</span>
                </div>
                <!-- 文本内容 -->
                <div class="text" v-html="dynamic.text"></div>
                <!-- 引入歌曲 -->
                <div v-if="dynamic.type === '分享单曲'" class="song">
                  <img :src="dynamic.content.song.img80x80" class="song-img" />
                  <div class="insert-img"></div>
                  <div>
                    <div class="song-name">{{ dynamic.content.song.name }}</div>
                    <span class="song-author">{{
                      dynamic.content.song.artists
                        .reduce((p, c) => p + c.name + "/", "")
                        .slice(0, -1)
                    }}</span>
                  </div>
                </div>
                <!-- 引入专辑 -->
                <div v-if="dynamic.type === '分享专辑'" class="song">
                  <img
                    :src="dynamic.content.album.blurPicUrl"
                    class="song-img"
                  />
                  <div class="insert-img"></div>
                  <div>
                    <div class="song-name">
                      <span class="type">{{ dynamic.content.album.type }}</span
                      >{{ dynamic.content.album.name }}
                    </div>
                    <span class="song-author">{{
                      dynamic.content.album.artist.name
                    }}</span>
                  </div>
                </div>
                <!-- 引入视频 -->
                <div v-if="dynamic.type === '分享MV'" class="video">
                  <div
                    class="video-img"
                    :style="`background:url(${dynamic.content.mv.imgurl});backgroundSize:cover`"
                  >
                    <!-- 视频标题 -->
                    <div class="video-header">
                      <span class="video-type"></span>
                      <span class="video-name">{{
                        dynamic.content.mv.name
                      }}</span>
                      <span class="video-author"
                        >-{{
                          dynamic.content.mv.artists
                            .reduce((p, c) => p + c.name + "/", "")
                            .slice(0, -1)
                        }}</span
                      >
                    </div>
                  </div>
                  <!-- 播放按钮 -->
                  <span class="play-btn"></span>
                  <!-- 视频底部 -->
                  <div class="video-footer">
                    <span class="play-count">
                      <span class="play-count-icon"></span>
                      {{ dynamic.content.mv.playCount }}
                    </span>
                    <span class="video-time">
                      <span class="video-time-icon"></span>
                      {{ dynamic.content.mv.duration | handleTime }}
                    </span>
                  </div>
                </div>
                <!-- 插入图片 -->
                <div v-if="dynamic.image">
                  <!-- 小图 -->
                  <img
                    v-show="!isBigImg"
                    @click="changeSize(true)"
                    class="img"
                    :src="dynamic.image"
                    alt=""
                  />
                  <!-- 大图 -->
                  <div
                    v-show="isBigImg"
                    @click="changeSize(false)"
                    class="img-big"
                  >
                    <div class="img-big-deit">
                      <span>
                        <span class="pack"></span>
                        收起
                      </span>
                      <span>
                        <span class="origin"></span>
                        查看原图
                      </span>
                      <span>
                        <span class="down"></span>
                        下载
                      </span>
                    </div>
                    <img class="img-big-img" :src="dynamic.image" alt="" />
                  </div>
                </div>
                <!-- 操作 -->
                <div class="edit">
                  <span class="edit-star">
                    <span class="edit-star-icon"></span>
                    ({{ dynamic.likedCount }})
                  </span>
                  <span>转发（{{ dynamic.insiteForwardCount }}）</span>
                  <span>评论（{{ dynamic.commentCount }}）</span>
                </div>
              </div>
            </div>
            <!-- 广告 -->
            <div class="advertisement" v-else>
              <img
                class="advertisement-background"
                :src="dynamic.content.coverPCListUrl"
              />
              <div class="advertisement-main">
                <span class="advertisement-close">x</span>
                <div class="advertisement-box">
                  <span class="advertisement-border"></span>
                  <div class="advertisement-content">
                    <div class="advertisement-text"># {{dynamic.content.title}} #</div>
                    <span class="advertisement-count">{{dynamic.content.participateCount}}人参与</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 个人信息 -->
      <div class="user">
        <div class="user-info">
          <div>
            <div class="user-avatar">
              <div class="avatar-border">
                <img
                  class="avatar"
                  src="../../assets/my/images/test.jpg"
                  alt=""
                />
              </div>
              <div class="user-name">永恒之夜</div>
            </div>
          </div>
          <div class="user-fans">
            <div>
              <div class="count">0</div>
              <span>动态</span>
            </div>
            <div>
              <div class="count">0</div>
              <span>关注</span>
            </div>
            <div>
              <div class="count">0</div>
              <span>粉丝</span>
            </div>
          </div>
        </div>
        <div class="star">
          <div class="header">
            <span>明星用户</span>
            <span class="update">换一批</span>
          </div>
          <div class="star-item" v-for="item in 3" :key="item">
            <img class="avatar" src="../../assets/my/images/test.jpg" alt="" />
            <div>
              <div class="name">赵琦</div>
              <span class="status">著名音乐节目主持人</span>
            </div>
            <div class="btn">关注</div>
          </div>
        </div>
      </div>
      <!-- 返回top -->
      <div class="top-btn" v-show="showTopBtn" @click="toTop"></div>
    </div>
    <div class="not-login" v-else>
      <div class="login-img">
        <div class="login-btn" @click="toLogin"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import dayjs from "dayjs";
export default {
  name: "Friend",
  data() {
    return {
      showTopBtn: false, //返回顶部按钮显示隐藏
      isLogin: false, //登录状态
      isBigImg: false, //是否显示大图
    };
  },
  filters: {
    handleTime(value) {
      return dayjs(value).format("mm:ss");
    },
  },
  computed: {
    ...mapGetters(["friendDynamicList"]),
  },
  methods: {
    ...mapMutations(["CHANGE_SHOW"]),
    ...mapActions(["getFriendDynamic"]),
    //点击返回顶部
    toTop() {
      document.documentElement.scrollTop = 0;
    },
    //top按钮显示隐藏
    scrollChange() {
      const scroll = document.documentElement.scrollTop;
      if (scroll > 0) {
        this.showTopBtn = true;
        return;
      }
      this.showTopBtn = false;
    },
    //点击登录
    toLogin() {
      this.CHANGE_SHOW(true);
    },
    //点击切换大小图
    changeSize(flag) {
      this.isBigImg = flag;
    },
  },
  mounted() {
    //绑定滚轮事件
    document.addEventListener("scroll", this.scrollChange);
    //读取localStorage,判断登录状态
    this.isLogin = localStorage.getItem("token") ? true : false;
    //如果是登录状态就请求数据
    if (this.isLogin) {
      //请求动态数据
      this.getFriendDynamic();
    }
  },
  beforeDestory() {
    //解除绑定滚轮事件
    document.removeEventListener("scroll", this.scrollChange);
  },
};
</script>

<style lang="stylus" scoped>
.friend
  width 980px
  height 100%
  margin 0 auto
  .friend-content
    display flex
    .message
      background #fff
      border-left 1px solid rgb(211, 211, 211)
      border-right 1px solid rgb(211, 211, 211)
      width 620px
      padding 20px 30px
      .message-header
        height 42px
        border-bottom 2px solid #c20c0c
        display flex
        align-items center
        justify-content space-between
        font-size 24px
        color #333
        .publish-msg
          display inline-block
          height 24px
          width 71px
          background-image url('../../assets/my/images/sprite.png')
          background-position 0px 99px
        .publish-video
          margin-left 10px
          display inline-block
          height 24px
          width 84px
          background-image url('../../assets/my/images/sprite.png')
          background-position -100px 99px
      .content
        .content-item
          border-bottom 1px solid #e8e8e9
          padding 20px 0
          width 100%
          .avatar
            float left
            width 45px
            height 45px
          .main
            margin-left 55px
            font-size 0
            .name
              font-size 14px
              color #0c73c2
            .cate
              font-size 14px
              color #666
              margin-left 5px
            .time
              font-size 12px
              color #999
            .text
              margin-top 10px
              font-size 14px
              line-height 24px
            .song
              padding 10px
              margin 4px 0 5px
              height 40px
              display flex
              background #f5f5f5
              position relative
              .insert-img
                height 22px
                width 22px
                background-image url('../../assets/my/images/sprite.png')
                background-position -109px -79px
                position absolute
                top 20px
                left 20px
                z-index 10
              .song-img
                display inline-block
                height 40px
                width 40px
                margin-right 10px
              .song-name
                height 22px
                font-size 14px
                color #333
                .type
                  color #e03f40
                  border 1px solid #e03f40
                  font-size 12px
                  width 27px
                  height 14px
                  margin-right 5px
              .song-author
                height 22px
                font-size 12px
                color #666
            .video
              position relative
              .video-img
                width 318px
                height 169px
                margin-top 10px
                padding 10px 10px
                .video-header
                  height 15px
                  .video-type
                    margin-right 5px
                    display inline-block
                    width 21px
                    height 12px
                    background url('../../assets/my/images/sprite.png')
                    background-position 0 -210px
                  .video-name
                    font-size 12px
                    color #fff
                  .video-author
                    font-size 12px
                    color rgb(128, 128, 128)
              .play-btn
                display inline-block
                position absolute
                top 90px
                left 148px
                width 40px
                height 40px
                background-image url('../../assets/my/images/sprite.png')
                background-position 0 -510px
                opacity 0.8
              .play-btn:hover
                opacity 1
                cursor pointer
              .video-footer
                padding 0 10px
                font-size 12px
                color #fff
                height 25px
                line-height 25px
                width 318px
                background black
                .play-count
                  .play-count-icon
                    display inline-block
                    width 10px
                    height 10px
                    background-image url('../../assets/my/images/sprite.png')
                    background-position -50px -510px
                .video-time
                  float right
                  .video-time-icon
                    display inline-block
                    width 10px
                    height 10px
                    background-image url('../../assets/my/images/sprite.png')
                    background-position -50px -530px
            .img
              height 338px
              margin-top 5px
            .img:hover
              cursor zoom-in
            .img-big
              background rgb(245, 245, 245)
              padding 12px 20px
              .img-big-deit
                padding-bottom 8px
                font-size 12px
                color #666
                .pack
                  display inline-block
                  width 13px
                  height 13px
                  background url('../../assets/my/images/sprite.png')
                  background-position -108px -19px
                .origin
                  display inline-block
                  width 13px
                  height 13px
                  background url('../../assets/my/images/sprite.png')
                  background-position -180px -20px
                .down
                  display inline-block
                  width 13px
                  height 13px
                  background url('../../assets/my/images/sprite.png')
                  background-position -45px -58px
              .img-big-deit>span
                padding-right 10px
                cursor pointer
              .img-big-deit>span:nth-child(n+2)
                padding-left 10px
                border-left 1px solid rgb(215, 215, 215)
              .img-big-img
                width 525px
              .img-big-img:hover
                cursor zoom-out
            .edit
              height 16px
              margin-top 18px
              font-size 12px
              color #0c73c2
              text-align right
              .edit-star
                .edit-star-icon
                  display inline-block
                  width 14px
                  height 14px
                  background-image url('../../assets/my/images/sprite.png')
                  background-position 0 -20px
            .edit>span
              padding 0 10px
            .edit>span:nth-child(n+2)
              border-left 1px solid #999
          .advertisement
            margin 0 auto
            width 565px
            height 247px
            position relative
            .advertisement-background
              height 100%
              width 100%
            .advertisement-main
              position absolute
              top 0
              left 0
              height 100%
              width 100%
              text-align center
              background-image url('../../assets/my/images/mask.png')
              .advertisement-close
                position absolute
                display inline-block
                width 20px
                height 20px
                right 5px
                top 5px
                color #fff
                font-size 20px
                z-index 19
              .advertisement-box
                position absolute 
                top 50%
                left 50%
                transform translate(-50%,-50%)
                .advertisement-border 
                  display inline-block
                  border 1px solid #ffffff
                  width 100%
                  opacity .2
                .advertisement-content
                  margin 20px
                  text-align left
                  .advertisement-text
                    font-size 20px
                    color #fff
                    margin-bottom 20px
                    padding 0 5px
                    white-space:nowrap
                  .advertisement-count
                    color #ffffff
  .user
    background #fff
    border-right 1px solid rgb(211, 211, 211)
    width 298px
    min-height 100%
    .user-info
      background rgb(247, 247, 247)
      padding 40px 30px 0 30px
      height 153px
      width 236px
      margin 0 auto
      border-bottom 1px solid rgb(211, 211, 211)
      .user-avatar
        display flex
        .avatar-border
          height 66px
          width 66px
          border 1px solid #999
          text-align center
          margin-right 20px
          .avatar
            margin-top 2px
            height 62px
            width 62px
        .user-name
          font-size 14px
          color #333
          font-weight bold
      .user-fans
        margin-top 20px
        display flex
        color #666
        font-size 12px
        .count
          font-size 20px
          padding-bottom 10px
      .user-fans>div
        padding-right 20px
      .user-fans>div:nth-child(n+2)
        padding-left 20px
        border-left 1px solid rgb(211, 211, 211)
    .star
      padding 20px 30px
      .header
        font-size 12px
        color #333
        font-weight bold
        padding-bottom 5px
        margin 5px 0
        border-bottom 1px solid #dcdcdc
        .update
          color #666
          float right
          font-weight normal
      .star-item
        width 236px
        height 45px
        padding 10px 0
        display flex
        align-items center
        justify-content space-between
        .avatar
          width 45px
          height 45px
        .name
          font-size 12px
          color #333
        .status
          font-size 12px
          color #9b9b9b
        .btn
          width 44px
          height 20px
          font-size 12px
          color #515151
          border 1px solid rgb(196, 196, 196)
          border-radius 5px
          text-align right
          padding 0 3px
          line-height 20px
          background-image url('../../assets/my/images/button.png')
          background-position -1px -97px
  .top-btn
    position fixed
    right 18%
    bottom 18%
    width 49px
    height 44px
    background-image url('../../assets/my/images/sprite2.png')
    background-position -265px -47px
    cursor pointer
.not-login
  margin 0 auto
  border 1px solid #d3d3d3
  background #fff
  width 902px
  height 100%
  .login-img
    position relative
    width 902px
    height 330px
    margin-top 20px
    padding-top 70px
    background-image url('../../assets/my/images/notlogin.jpg')
    background-position 20px 8px
    .login-btn
      cursor pointer
      position absolute
      bottom 84px
      right 190px
      width 155px
      height 46px
      background-image url('../../assets/my/images/notlogin.jpg')
      background-position 320px 227px
    .login-btn:hover
      background-position -2px 57px
</style>
