<template>
  <div class="box">
    <div v-if="isLogin">
      <div class="song-list">
        <router-link to="/my/artist" class="list">我的歌手(1)</router-link>
        <router-link to="/my/radio" class="list">我的电台(1)</router-link>
        <div class="list" @click="open">
          <div class="arrow" :class="{ show: isShowSongList }"></div>
          创建的歌单(7)
          <button class="add" @click.stop="add">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jia"></use>
            </svg>
            新建
          </button>
        </div>
        <!-- 创建的歌单列表 -->
        <div v-show="isShowSongList">
          <div v-for="(item, index) in songList" :key="index">
            <router-link class="songs" to="/my/playlist">
              <img class="img" src="../../assets/my/images/test.jpg" alt="" />
              <div class="songs-info">
                <div class="songs-name">{{ item.name }}</div>
                <div class="songs-count">{{ item.count }}首</div>
              </div>
              <div class="btn">
                <router-link to="/my/edit" class="edit"></router-link>
                <span class="del"></span>
              </div>
            </router-link>
          </div>
        </div>
        <div class="list" @click="openCollection">
          <div class="arrow" :class="{ show: isShowCollection }"></div>
          收藏的歌单(2)
        </div>
        <!-- 收藏歌单列表 -->
        <div v-show="isShowCollection">
          <div v-for="(collection, index) in collectionList" :key="index">
            <router-link class="songs" to="/my/playlist">
              <img class="img" src="../../assets/my/images/test.jpg" alt="" />
              <div>
                <div class="songs-name">{{ collection.name }}</div>
                <span class="songs-count">{{ collection.count }}首</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="song-content">
        <router-view></router-view>
      </div>
      <!-- 新建歌单窗口 -->
      <div v-if="showAddWindow" class="add-window">
        <div class="title">
          <span>新建歌单</span>
          <span class="close" @click="cancel">×</span>
        </div>
        <div class="form">
          <div class="form-ipt">歌单名：<input class="ipt" type="text" /></div>
          <span class="tap">可通过“收藏”将音乐添加到新歌单中</span>
          <div class="edit">
            <div class="add">新 建</div>
            <div class="cancel" @click="cancel">取 消</div>
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
  name: "My",
  data() {
    return {
      songList: [
        {
          name: "我喜欢的歌单",
          count: 48,
          img: "",
          songs: [
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
          ],
        },
        {
          name: "我喜欢的歌单",
          count: 48,
          img: "",
          songs: [
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
          ],
        },
        {
          name: "我喜欢的歌单",
          count: 48,
          img: "",
          songs: [
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
          ],
        },
        {
          name: "我喜欢的歌单",
          count: 48,
          img: "",
          songs: [
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
          ],
        },
      ],
      collectionList: [
        {
          name: "很强",
          count: 2,
          img: "",
          songs: [
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
            {
              songName: "哈行哈",
              time: 210,
              singer: "呢",
              album: "专辑",
            },
          ],
        },
      ],
      isShowSongList: false,
      isShowCollection: false,
      showAddWindow: false,
      showTopBtn: false,
      isLogin: true,
    };
  },
  methods: {
    //展开创建的列表
    open() {
      this.isShowSongList = !this.isShowSongList;
    },
    //展开收藏列表
    openCollection() {
      this.isShowCollection = !this.isShowCollection;
    },
    //添加新列表
    add() {
      this.showAddWindow = true;
    },
    //取消添加新列表
    cancel() {
      this.showAddWindow = false;
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
    //点击返回顶部
    toTop() {
      document.documentElement.scrollTop = 0;
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
.box
  width 980px
  height 100%
  margin 0 auto
  display flex
  .song-list
    position fixed
    width 240px
    height 100%
    padding-top 40px
    border-left 1px solid rgb(213, 213, 213)
    border-right 1px solid rgb(213, 213, 213)
    background-color rgb(249, 249, 249)
    .songs
      padding 6px 0 6px 20px
      display flex
      .img
        heihgt 40px
        width 40px
        margin-right 10px
      .songs-info
        .songs-name
          margin-top 3px
          font-size 12px
          color #000
        .songs-count
          font-size 12px
          color #999
      .btn
        margin-top 15px
        width 50px
        height 50px
        position absolute
        right 0
        display none
        .edit
          height 15px
          width 15px
          margin-right 10px
          background url('../../assets/my/images/icon.png')
          background-position 1px -269px
        .edit:hover
          background-position -19px -269px
        .del
          height 15px
          width 15px
          background url('../../assets/my/images/icon.png')
          background-position 1px -283px
        .del:hover
          background-position -19px -283px
    .songs:hover .btn
      display flex
    .songs:hover
      background-color rgb(242, 242, 242)
    .list
      display block
      padding 0 5px 2px 35px
      font-weight bold
      height 38px
      line-height 38px
      color #000
      font-size 14px
      text-decoration none
      font-family simsun
      position relative
      cursor pointer
      .arrow
        display inline-block
        border 8px solid #ccc
        border-color transparent transparent transparent #ccc
        position absolute
        top 10px
        left 20px
      .arrow.show
        border-color #ccc transparent transparent transparent
      .add
        outline none
        position absolute
        top 10px
        right 10px
        height 22px
        width 55px
        border 1px solid #ccc
        border-radius 5px
        font-size 12px
        color #515151
        background-color #fff
        cursor pointer
      .add:hover
        background rgb(235, 235, 235)
        .icon
          font-size 12px
    .list:hover
      background-color rgb(238, 238, 238)
  .song-content
    height 100%
    margin-left 242px
    width 740px
    background-color #fff
    border-right 1px solid rgb(213, 213, 213)
  .add-window
    width 480px
    height 249px
    position fixed
    top 40%
    left 40%
    z-index 11
    box-shadow 0px 3px 20px black
    .title
      padding 0 20px
      height 39px
      background #2d2d2d
      color #fff
      font-size 14px
      line-height 39px
      .close
        color rgb(136, 136, 136)
        font-size 20px
        float right
        cursor pointer
    .form
      background #fff
      padding 40px 30px
      .form-ipt
        font-size 12px
        color #333
        margin-bottom 30px
        .ipt
          outline none
          padding 0 5px
          height 28px
          width 340px
          border 1px solid rgb(205, 205, 205)
      .tap
        display inline-block
        font-size 12px
        color #999
        margin-left 48px
        margin-bottom 20px
      .edit
        margin-left 48px
        display flex
      .add
        height 31px
        width 80px
        background-image url('../../assets/my/images/button2.png')
        background-position 0px -387px
        border-radius 0 5px 5px 0
        color #fff
        font-size 12px
        line-height 31px
        text-align center
        cursor pointer
      .cancel
        height 31px
        width 80px
        margin-left 20px
        background-image url('../../assets/my/images/button2.png')
        background-position 0px -59px
        border-radius 0 5px 5px 0
        border-right 1px solid rgb(196, 196, 196)
        font-size 12px
        line-height 31px
        text-align center
        cursor pointer
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
      height 274px
      margin-top 20px
      padding-top 70px
      background url('../../assets/my/images/mymusic.png') no-repeat
      background-position 73px 69px
      .login-btn
        cursor pointer
        position absolute
        bottom 29px
        right 180px
        width 167px
        height 44px
        background-image url('../../assets/my/images/mymusic.png')
        background-position 325px 121px
      .login-btn:hover
        background-position 0px 45px
</style>
