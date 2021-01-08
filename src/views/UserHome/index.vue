<template>
  <div class="userhome">
    <div class="userInfo">
      <div class="avat">
        <img :src="userInfo.avatarUrl" alt="头像" />
      </div>
      <div class="userContent">
        <div class="u-title">
          <div class="u-name">
            <span class="name">{{userInfo.nickname}}</span>
            <img src="./img/lv.png" alt="lv" class="lv" />
            <img src="./img/sex.png" alt="sex" class="sex" />
          </div>
          <div class="edit">
            <a href="##">编辑个人资料</a>
          </div>
        </div>
        <div class="info-content">
          <ul class="info-list">
            <li class="one">
              <a>
                <span class="num">{{userEventList.length}}</span>
                <span>动态</span>
              </a>
            </li>
            <li>
              <a>
                <span class="num">{{followedList.length}}</span>
                <span>关注</span>
              </a>
            </li>
            <li class="followeds">
              <a>
                <span class="num">{{followedsList.length}}</span>
                <span>粉丝</span>
              </a>
            </li>
          </ul>
          <p>
            <span class="area">所在地区：广东省 - 深圳市</span>
            <span>年龄：95后</span>
          </p>
          <p class="wb-cont">
            <span>社交网络:</span>
            <img src="./img/wb.png" alt="wb" class="wb-img" />
          </p>
        </div>
      </div>
    </div>
    <Rank :listenSongs="listenSongs"></Rank>
    <SongSheet
      :level="userLevel.createdPlaylistCount"
      :userPlayList="createPlayList"
      :name="`createdPlay`"
    ></SongSheet>
    <SongSheet
      class="song-sheet"
      :level="userLevel.subPlaylistCount"
      :userPlayList="subPlaylist"
      :name="`subPlay`"
    ></SongSheet>
  </div>
</template>

<script>
import {
  getUserInfo,
  getUserFolloweds,
  getUserFollowed,
  getUserEvent,
  getUserLevel,
  getUserPlayList,
} from "@api/userHome";
import Rank from "./Rank";
import SongSheet from "./SongSheet";
export default {
  name: "UserHome",
  data() {
    return {
      userInfo: {}, //用户详细信息
      listenSongs: 0, //累积听歌数量
      userEventList: [], //动态列表
      followedsList: [], //粉丝列表
      followedList: [], //关注列表
      userLevel: {}, //获取用户信息 , 歌单，收藏，mv, dj 数量
      userPlayList: [], //歌单列表
    };
  },
  components: {
    Rank,
    SongSheet,
  },
  computed: {
    //处理我创建的歌单数据
    createPlayList() {
      let createPlayList = [];
      let { createdPlaylistCount } = this.userLevel;
      createPlayList = this.userPlayList.slice(0, createdPlaylistCount);
      return createPlayList;
    },
    //处理我收藏的歌单数据
    subPlaylist() {
      let subPlaylist = [];
      let { createdPlaylistCount } = this.userLevel;
      subPlaylist = this.userPlayList.slice(createdPlaylistCount);
      return subPlaylist;
    },
  },
  async mounted() {
    const { id } = this.$route.query;
    let userInfo = await getUserInfo(id);
    this.userInfo = userInfo.data.profile;
    this.listenSongs = userInfo.data.listenSongs;

    const res = await getUserFolloweds(id);
    this.followedsList = res.data.followeds;

    const followed = await getUserFollowed(id);
    this.followedList = followed.data.follow;

    const userEvent = await getUserEvent(id);
    this.userEventList = userEvent.data.events;

    const userPlay = await getUserPlayList(id);
    this.userPlayList = userPlay.data.playlist;

    let userLevel = await getUserLevel();
    this.userLevel = userLevel.data;
  },
};
</script>

<style lang="stylus" scoped>
.userhome
  width 900px
  padding 40px
  margin 0 auto
  background #fff
  border 1px solid #ccc
  border-top none
  border-bottom none
  .userInfo
    display flex
    border-bottom 43px
    .avat
      img
        padding 3px
        border 1px solid #ccc
        width 180px
        height 180px
        margin-right 50px
    .userContent
      width 670px
      .u-title
        display flex
        justify-content space-between
        width 100%
        height 36px
        line-height 36px
        margin-bottom 10px
        padding-bottom 10px
        border-bottom 1px solid #ddd
        .u-name
          margin-bottom 10px
          .name
            margin-top 3px
            font-size 22px
          .lv
            width 56px
            height 22px
            margin-left 15px
          .sex
            width 20px
            height 20px
            margin-left 6px
        .edit
          width 112px
          height 30px
          line-height 31px
          border-radius 5px
          text-align center
          border 1px solid #ddd
          box-shadow 0 2px 5px rgba(0, 0, 0, 0.2)
          background-color #f3f3f3
          &:hover
            cursor pointer
            background-color #f7f7f7
      .info-content
        .info-list
          display flex
          margin-bottom 20px
          li
            width 26px
            height 39px
            padding-left 20px
            padding-right 40px
            border-right 1px solid #ddd
            &.one
              padding-left 0
            &.followeds
              cursor pointer
            a
              display flex
              flex-direction column
              .num
                margin-top -4px
                font-size 24px
        p
          margin-bottom 10px
          .area
            margin-right 20px
        .wb-cont
          display flex
          align-items center
          .wb-img
            width 24px
            height 24px
            margin-left 10px
  .song-sheet
    margin-top 0px
</style>