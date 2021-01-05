<template>
  <div class="friend">
    <div v-if="isLogin">
      <!-- 动态 -->
      <div class="message">
        <div class="header">
          <span>动态</span>
          <div>
            <span class="publish-msg"></span>
            <span class="publish-video"></span>
          </div>
        </div>
        <div class="content">
          <div class="content-item" v-for="item in 6" :key="item">
            <img class="avatar" src="../../assets/my/images/test.jpg" alt="" />
            <div class="main">
              <div>
                <div>
                  <span class="name">超级黑的黑胶会员</span>
                  <span class="cate">分享单曲</span>
                </div>
                <span class="time">9分钟前</span>
              </div>
              <!-- 文本内容 -->
              <div class="text">哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
              <!-- 引入歌曲 -->
              <div class="song">
                <img src="../../assets/my/images/test.jpg" class="song-img" />
                <div class="insert-img"></div>
                <div>
                  <div class="song-name">赵琦之歌</div>
                  <span class="song-author">赵琦</span>
                </div>
              </div>
              <!-- 插入图片 -->
              <img class="img" src="../../assets/my/images/test.jpg" alt="" />
              <!-- 操作 -->
              <div class="edit">
                <div>
                  <span></span>
                  <span>转发（2）</span>
                  <span>评论（15）</span>
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
        <div class="login-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Friend",
  data() {
    return {
      showTopBtn: false,
      isLogin: false,
    };
  },
  methods: {
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
  },
  mounted() {
    //绑定滚轮事件
    document.addEventListener("scroll", this.scrollChange);
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
  display flex
  .message
    background #fff
    border-left 1px solid rgb(211, 211, 211)
    border-right 1px solid rgb(211, 211, 211)
    width 620px
    padding 20px 30px
    .header
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
            .song-author
              height 22px
              font-size 12px
              color #666
          .img
            height 224px
            width 224px
            margin-top 5px
          .edit
            height 16px
            margin-top 18px
            font-size 12px
            color #0c73c2
            text-align right
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
