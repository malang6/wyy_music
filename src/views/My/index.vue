<template>
  <div class="box">
    <div class="song-list">
      <router-link to="/my/artist" class="list">我的歌手(1)</router-link>
      <router-link to="/my/radio" class="list">我的电台(1)</router-link>
      <div class="list" @click="open">
        <div class="arrow" :class="{ show: isShowSongList }"></div>
        创建的歌单(7)
        <button class="add">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jia"></use>
          </svg>
          新建
        </button>
      </div>
      <!-- 创建的歌单列表 -->
      <div v-show="isShowSongList">
        <router-link to="/my/playlist">
          <div class="songs" v-for="(item, index) in songList" :key="index">
            <img class="img" src="../../assets/my/images/test.jpg" alt="" />
            <div>
              <div class="songs-name">{{ item.name }}</div>
              <span class="songs-count">{{ item.count }}首</span>
            </div>
          </div>
        </router-link>
      </div>
      <div class="list" @click="openCollection">
        <div class="arrow" :class="{ show: isShowCollection }"></div>
        收藏的歌单(2)
      </div>
      <!-- 收藏歌单列表 -->
      <div v-show="isShowCollection">
        <router-link to="/my/playlist">
          <div
            class="songs"
            v-for="(collection, index) in collectionList"
            :key="index"
          >
            <img class="img" src="../../assets/my/images/test.jpg" alt="" />
            <div>
              <div class="songs-name">{{ collection.name }}</div>
              <span class="songs-count">{{ collection.count }}首</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="song-content">
      <router-view></router-view>
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
    };
  },
  methods: {
    open() {
      this.isShowSongList = !this.isShowSongList;
    },
    openCollection() {
      this.isShowCollection = !this.isShowCollection;
    },
  },
};
</script>

<style lang="stylus" scoped>
.box
  width 980px
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
      .songs-name
        margin-top 3px
        font-size 12px
        color #000
      .songs-count
        font-size 12px
        color #999
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
        .icon
          font-size 12px
    .list:hover
      background-color rgb(238, 238, 238)
  .song-content
    margin-left 242px
    width 740px
    background-color #fff
    border-right 1px solid rgb(213, 213, 213)
</style>
