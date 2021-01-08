<template>
  <div class="singlePage">
    <div class="singlePage-content">
      <ul>
        <li v-for="song in changSongsList" :key="song.id">
          <div class="two-con">
            <div class="hd">
              <span class="ply p-icon"></span>
            </div>
            <div class="song">
              <div class="ttc">
                <span class="txt">
                  <a>
                    <b>{{song.name}}</b>
                  </a>
                </span>
              </div>
              <div class="opt">
                <a class="u-icn u-icn-81 icn-add" href="###"></a>
                <span class="icn icn-fav"></span>
                <span class="icn icn-share"></span>
                <span class="icn icn-dl"></span>
              </div>
            </div>
          </div>
          <div class="tops">
            <a class="name">{{song.artists[0].name}}</a>
            <a class="song-name">《{{song.album.name}}》</a>
            <span class="song-time">{{song.duration}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { searchSong } from "@api/searchSong";
export default {
  name: "SinglePage",
  data() {
    return {
      songsList: [], //单曲列表
    };
  },
  watch: {
    $route(newVal) {
      let search = newVal.query.s;
      if (!search.trim()) return;
      this.getSongsList(search);
    },
  },
  computed: {
    changSongsList() {
      let songsList = this.songsList.map((song) => {
        let time = song.duration / 1000 / 60 + "";
        if (time.indexOf(".") === -1) {
          time = time < 10 ? `0${time}:00` : `${time}:00`;
        } else {
          let timeList = time.split(".");
          timeList[0] = timeList[0] < 10 ? `0${timeList[0]}` : timeList[0];
          timeList[1] = (Math.floor(timeList[1] * 60) + "").slice(0, 2);
          timeList[1] = timeList[1] < 10 ? `0${timeList[1]}` : timeList[1];
          time = timeList.join(":");
        }
        return { ...song, duration: time };
      });
      return songsList;
    },
  },
  methods: {
    async getSongsList(searchTxt) {
      let res = await searchSong(JSON.stringify(searchTxt));
      // console.log(res.data.result.songs);
      this.songsList = res.data.result.songs;
      this.$emit("getListLength", this.songsList.length);
    },
  },
  mounted() {
    const { s } = this.$route.query;
    this.getSongsList(s);
  },
};
</script>

<style lang="stylus" scoped>
.singlePage-content
  margin-top 15px
  li
    display flex
    justify-content space-between
    align-items center
    box-sizing border-box
    width 867.5px
    height 38px
    padding-left 10px
    background #fff
    &:nth-child(even)
      background #f7f7f7
    &:hover
      background #eeeeee
    &:hover .two-con .opt
      display block
    .two-con
      display flex
      align-items center
      .hd
        .p-icon
          background url('./img/index.png') no-repeat 0 0
        .ply
          display inline-block
          width 26px
          height 24px
          cursor pointer
          background-position -9px -204px
    .song
      position relative
      width 442px
      padding-left 10px
      .txt
        position relative
        display inline-block
        max-width 99%
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        a
          b
            font-weight bold
            color #333
        .line
          padding 0 5px
          color #AEAEAE
        .g-n
          color #AEAEAE
      .opt
        position absolute
        display none
        top 0
        right 0
        a.icn-add
          margin-top -11px
        a.u-icn
          display inline-block
          overflow hidden
          vertical-align middle
          background url('./img/icon.png') no-repeat 0 0
        a.u-icn-81
          width 13px
          height 13px
          background-position 0 -700px
        span.icn
          display inline-block
          width 18px
          height 16px
          margin 2px 0 0 8px
          overflow hidden
          text-indent -999px
          cursor pointer
          background url('./img/table.png') no-repeat 0 0
        span.icn-fav
          background-position 0 -174px
        span.icn-share
          background-position 0 -195px
        span.icn-dl
          background-position -81px -174px
    .tops
      display flex
      height 38px
      line-height 38px
      a.name
        width 130px
      a.song-name
        width 156px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
      span.song-time
        width 30px
        margin 0 36px 0 10px
      a:hover
        cursor pointer
        text-decoration underline
</style>