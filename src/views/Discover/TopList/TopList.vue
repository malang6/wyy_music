<template>
  <div class="topList">
    <div class="top">
      <i class="circle"></i>
      <a href="" class="title">榜单</a>
      <span class="more">
        <a href="">更多</a>
        <i class="arrow"></i>
      </span>
    </div>
    <div class="listContainer">
      <dl
        class="listItem"
        v-for="(songList, index) in topSongList"
        :key="songList.id"
      >
        <dt class="listTitle">
          <router-link :to="'/toplist?id=' + songList.id">
            <img :src="songList.coverImgUrl" alt="" class="listPic" />
          </router-link>
          <div class="listType">
            <router-link :to="'/toplist?id=' + songList.id">
              <h3>{{ songList.name }}</h3>
            </router-link>
            <div class="control">
              <a href="" class="play"></a>
              <a href="" class="add"></a>
            </div>
          </div>
        </dt>
        <dd>
          <ol class="songList">
            <li
              class="song"
              v-for="(song, songIndex) in totalSongList[index]"
              :key="song.id"
            >
              <span class="songNum">{{ songIndex + 1 }}</span>
              <a href="" class="songName">{{ song.name }}</a>
              <div class="operate">
                <a class="play" @click="handlePlay(song)"></a>
                <a class="add"></a>
                <a class="collect"></a>
              </div>
            </li>
          </ol>
          <div class="seeMore">
            <a href="">查看全部></a>
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { reqTopList, reqListSong } from "@api/Discover/topList";
import {mapActions} from 'vuex'
export default {
  name: "TopList",
  data() {
    return {
      topSongList: [],
      totalSongList: []
    };
  },
  watch: {
    topSongList() {
      this.getSongList();
    }
  },

  methods: {
    ...mapActions(['getSongsDetail']),
    // 播放歌曲
    handlePlay(item) {
      // console.log(item);
      this.getSongsDetail(item.id)
    },
    // 请求榜单
    async getTopSongList() {
      const topSongList = await reqTopList();
      this.topSongList = topSongList.list.slice(0, 3);
    },
    // 获取榜单内歌曲
    getSongList() {
      this.topSongList.map(async songList => {
        const outSongList = await reqListSong(songList.id);
        this.totalSongList.push(outSongList.playlist.tracks.slice(0, 10));
        return;
      });
    }
  },
  mounted() {
    this.getTopSongList();
  }
};
</script>

<style lang="stylus" scoped>
.topList
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
      float left
      font-size 20px
      font-weight normal
      line-height 28px
      color #333
    .more
      float right
      margin-top 10px
      .arrow
        display inline-block
        background url('../../../assets/Discover/images/sprit.png')
        background-position 1px -240px
        width 12px
        height 12px
  .listContainer
    border 1px solid #d3d3d3
    border-right none
    background-color #f5f5f5
    display flex
    margin-top 20px
    width 693px
    .listItem
      border-right 1px solid #d3d3d3
      width 230px
      .listTitle
        display flex
        height 100px
        padding 20px 0 0 20px
        .listPic
          width 80px
          height 80px
          box-shadow 0 5px 5px #707171
        .listType
          margin 6px 0 0 10px
          h3
            color #333
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            &:hover
              text-decoration underline
          .control
            margin-top 10px
            .play, .add
              display inline-block
              width 22px
              height 22px
              margin-right 10px
            .play
              background url('../../../assets/Discover/images/sprit.png')
              background-position -267px -205px
              &:hover
                background-position -267px -235px
            .add
              background url('../../../assets/Discover/images/sprit.png')
              background-position -300px -205px
              &:hover
                background-position -300px -235px
      .songList
        .song
          height 32px
          font-size 12px
          line-height 32px
          position relative
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
          .songNum
            display inline-block
            width 35px
            height 100%
            text-align center
            margin-left 15px
            color #666
            font-size 16px
          .songName
            height 100%
            color #000
            display relative
            z-index 19
            &:hover
              text-decoration underline
          .operate
            position absolute
            z-index 20
            right 0
            bottom 0
            width 100px
            height 32px
            text-align right
            display none
            a
              width 17px
              height 17px
              margin 8px 10px 0 0
              display inline-block
            .play
              background url('../../../assets/Discover/images/sprit.png')
              background-position -267px -268px
              &:hover
                background-position -267px -288px
            .add
              background url('../../../assets/Discover/images/sprit2.png')
              background-position 2px -698px
              &:hover
                background-position -20px -698px
            .collect
              background url('../../../assets/Discover/images/sprit2.png')
              background-position -44px -86px
              &:hover
                background-position -44px -109px
          &:hover
            cursor pointer
            >.operate
              display block
        >li:nth-child(-n+3)
          .songNum
            color #c10d0c
        >li:nth-child(odd)
          background-color rgb(232, 232, 232)
      .seeMore
        background-color rgb(232, 232, 232)
        height 32px
        line-height 32px
        text-align right
        a
          margin-right 20px
          color #000
          &:hover
            text-decoration underline
</style>
