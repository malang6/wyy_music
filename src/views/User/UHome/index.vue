<template>
  <div class="song-sheet">
    <Rank></Rank>
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
import { getUserLevel, getUserPlayList } from "@api/userHome";
import Rank from "./Rank";
import SongSheet from "./SongSheet";
export default {
  name: "UHome",
  data() {
    return {
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
    const userPlay = await getUserPlayList(id);
    this.userPlayList = userPlay.data.playlist;

    let userLevel = await getUserLevel();
    this.userLevel = userLevel.data;
  },
};
</script>

<style lang="stylus" scoped>
.song-sheet
  margin-top 0px
</style>