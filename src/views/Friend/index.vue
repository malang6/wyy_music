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
                <!-- 用户信息 -->
                <div>
                  <div>
                    <span class="name">{{ dynamic.nickName }}</span>
                    <span class="cate">{{ dynamic.type || "" }}</span>
                  </div>
                  <span class="time">{{ dynamic.showTime }}</span>
                </div>
                <!-- 动态内容主体 -->
                <Dynamic :dynamic="dynamic" />
                <!-- 转发内容 -->
                <div class="retransmission" v-if="dynamic.type === '转发动态'">
                  <Dynamic :dynamic="extractData(dynamic.content.event)" />
                </div>
                <!-- 操作 -->
                <div class="edit" v-if="dynamic.type === '转发动态'">
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
                <span
                  class="advertisement-close"
                  @click="closeAdvertisement(dynamic.id)"
                  >x</span
                >
                <div class="advertisement-box">
                  <span class="advertisement-border"></span>
                  <div class="advertisement-content">
                    <div class="advertisement-text">
                      # {{ dynamic.content.title }} #
                    </div>
                    <span class="advertisement-count">
                      {{ dynamic.content.participateCount }}人参与
                    </span>
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
                <img class="avatar" :src="userInfo.avatarUrl" alt="" />
              </div>
              <div class="user-name">{{ userInfo.nickName }}</div>
            </div>
          </div>
          <div class="user-fans">
            <div>
              <div class="count">102</div>
              <span>动态</span>
            </div>
            <div>
              <div class="count">97</div>
              <span>关注</span>
            </div>
            <div>
              <div class="count">316155</div>
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
import Dynamic from "./Dynamic";
export default {
  name: "Friend",
  data() {
    return {
      showTopBtn: false, //返回顶部按钮显示隐藏
      isLogin: false, //登录状态
    };
  },
  components: {
    Dynamic,
  },
  computed: {
    ...mapGetters(["friendDynamicList", "userInfo"]),
  },
  methods: {
    ...mapMutations(["CHANGE_SHOW", "DEL_ADVERTISEMENT"]),
    ...mapActions(["getFriendDynamic", "getUser"]),
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
    //动态数据抽取
    extractData(value) {
      return {
        id: value.id, //id
        avatarUrl: value.user.avatarUrl, //头像url
        nickName: value.user.nickname, //账号名
        text:
          JSON.parse(value.json).msg &&
          JSON.parse(value.json).msg.replace(/\n/g, "<br/>"), //文本内容
        content: JSON.parse(value.json), //分享内容
        imageList: value.pics && value.pics.map((item) => item.originUrl), //分享图片
        showTime: dayjs(value.showTime).format("HH:mm"), //发布时间
        type:
          value.info.commentThread.resourceTitle &&
          value.info.commentThread.resourceTitle.split("：")[0], //动态类型
        commentCount: value.info.commentCount, //评论数
        likedCount: value.info.likedCount, //点赞数
        insiteForwardCount: value.insiteForwardCount, //转发数
        isRetransmission: true, //被转发内容标记
      };
    },
    //关闭广告
    closeAdvertisement(id) {
      this.DEL_ADVERTISEMENT(id);
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
      //请求用户数据
      this.getUser();
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
            .retransmission
              background #f5f5f5
              padding 10px
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
              cursor pointer
            .edit>span:nth-child(n+2)
              border-left 1px solid #999
          .advertisement
            cursor pointer
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
                transform translate(-50%, -50%)
                .advertisement-border
                  display inline-block
                  border 1px solid #ffffff
                  width 100%
                  opacity 0.2
                .advertisement-content
                  margin 20px
                  text-align left
                  .advertisement-text
                    font-size 20px
                    color #fff
                    margin-bottom 20px
                    padding 0 5px
                    white-space nowrap
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
