<template>
  <div class="box">
    <div v-if="isLogin">
      <div class="song-list">
        <router-link to="/my/artist" class="list"
          >我的歌手({{ subCountList.artistCount }})</router-link
        >
        <router-link to="/my/radio" class="list"
          >我的电台({{ subCountList.djRadioCount }})</router-link
        >
        <div class="list" @click="open">
          <div class="arrow" :class="{ show: isShowSongList }"></div>
          创建的歌单({{ createPlayList.length }})
          <button class="add" @click.stop="showWindow('showAddWindow')">
             新建
          </button>
        </div>
        <!-- 创建的歌单列表 -->
        <div v-show="isShowSongList">
          <div v-for="(playList, index) in createPlayList" :key="playList.id">
            <span
              class="songs"
              @click="toPlayListDetail(playList.id, playList)"
            >
              <img class="img" :src="playList.image" />
              <div class="songs-info">
                <div class="songs-name">{{ playList.name }}</div>
                <div class="songs-count">{{ playList.trackCount }}首</div>
              </div>
              <div class="btn" v-if="index !== 0">
                <span
                  class="edit"
                  @click.stop="
                    toEditPlayList(
                      playList.id,
                      playList.name,
                      playList.image,
                      playList.description,
                      playList.tags
                    )
                  "
                ></span>
                <span
                  class="del"
                  @click.stop="showWindow('showDelWindow', playList.id)"
                ></span>
              </div>
            </span>
          </div>
        </div>
        <div class="list" @click="openCollection">
          <div class="arrow" :class="{ show: isShowCollection }"></div>
          收藏的歌单({{ collectPlayList.length }})
        </div>
        <!-- 收藏歌单列表 -->
        <div v-show="isShowCollection">
          <div v-for="collection in collectPlayList" :key="collection.id">
            <span
              class="songs"
              @click="toPlayListDetail(collection.id, collection)"
            >
              <img class="img" :src="collection.image" />
              <div class="songs-info">
                <div class="songs-name">{{ collection.name }}</div>
                <span class="songs-count"
                  >{{ collection.trackCount }}首 by
                  {{ collection.nickName }}</span
                >
              </div>
            </span>
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
          <span class="close" @click="hideWindow('showAddWindow')">×</span>
        </div>
        <div class="form">
          <div class="form-ipt">
            歌单名：<input class="ipt" type="text" v-model="playListName" />
          </div>
          <span class="tap">可通过“收藏”将音乐添加到新歌单中</span>
          <div class="edit">
            <div class="add" @click="create">新 建</div>
            <div class="cancel" @click="hideWindow('showAddWindow')">取 消</div>
          </div>
        </div>
      </div>
      <!-- 删除歌单窗口 -->
      <div v-if="showDelWindow" class="add-window">
        <div class="title">
          <span>删除歌单</span>
          <span class="close" @click="hideWindow('showDelWindow')">×</span>
        </div>
        <div class="form">
          <span class="tap">是否删除此歌单？</span>
          <div class="edit">
            <div class="add" @click="del(willDelPlayListId)">删 除</div>
            <div class="cancel" @click="hideWindow('showDelWindow')">取 消</div>
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "My",
  data() {
    return {
      isShowSongList: false, //是否展开个人创建的歌单列表
      isShowCollection: false, //是否展开收藏歌单列表
      showAddWindow: false, //新建歌单窗口显示从动态
      showTopBtn: false, //返回顶部按钮显示状态
      isLogin: true, //是否登录状态
      playListName: "", //新建歌单名
      showDelWindow: false, //删除确认窗口显示状态
      willDelPlayListId: "" //即将删除歌单Id
    };
  },
  computed: {
    ...mapGetters([
      "createPlayList",
      "collectPlayList",
      "collectArtist",
      "subCountList"
    ])
  },
  methods: {
    ...mapActions([
      "getUserPlayList",
      "getPlayListDerail",
      "getSubcount",
      "addPlayList",
      "delPlayList"
    ]),
    //编辑歌单
    toEditPlayList(id, name, image, description, tags) {
      this.$router.push({
        path: "/my/edit",
        query: {
          id,
          name,
          image,
          description,
          tags
        }
      });
    },
    //显示删除或添加歌单提示窗口
    showWindow(type, id) {
      this[type] = true;
      this.willDelPlayListId = id;
    },
    //隐藏删除或添加歌单提示窗口
    hideWindow(type) {
      this[type] = false;
      this.willDelPlayListId = "";
    },
    //确定删除歌单
    del(id) {
      this.delPlayList(id);
      this.showDelWindow = false;
    },
    //确定新建歌单
    create() {
      this.addPlayList(this.playListName);
      this.showAddWindow = false;
      this.playListName = "";
    },
    //展开创建的列表
    open() {
      this.isShowSongList = !this.isShowSongList;
    },
    //展开收藏列表
    openCollection() {
      this.isShowCollection = !this.isShowCollection;
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
    //获取歌单详情,跳转路由
    toPlayListDetail(id, data) {
      //发送歌单详情请求
      this.getPlayListDerail(id);
      //路由传参
      this.$router.push({
        path: "/my/playlist",
        query: {
          ...data,
          id
        }
      });
    }
  },
  watch: {
    $route() {
      this.$forceUpdate();
    }
  },
  mounted() {
    //绑定滚轮事件
    document.addEventListener("scroll", this.scrollChange);
    //请求歌单数据
    const uid = localStorage.getItem("userId");
    this.getUserPlayList(uid);
    this.getSubcount();
  },
  beforeDestory() {
    //解除绑定滚轮事件
    document.removeEventListener("scroll", this.scrollChange);
  }
};
</script>

<style lang="stylus" scoped>
.box
  width 980px
  height 100%
  margin 0 auto
  display flex
  .song-list
    overflow auto
    position fixed
    width 240px
    height 800px
    padding-top 40px
    padding-bottom 10px
    border-left 1px solid rgb(213, 213, 213)
    border-right 1px solid rgb(213, 213, 213)
    background-color rgb(249, 249, 249)
    .songs
      padding 6px 0px 6px 20px
      display flex
      cursor pointer
      .img
        heihgt 40px
        width 40px
        margin-right 10px
      .songs-info
        .songs-name
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          margin 5px 0
          font-size 12px
          color #000
          width 140px
        .songs-count
          font-size 12px
          color #999
      .btn
        margin-top 28px
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
    min-height 100%
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
    left 40%
    bottom 18%
    margin-left 700px
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
