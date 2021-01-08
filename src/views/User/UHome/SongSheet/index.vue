<template>
  <div class="songSheet">
    <div class="song-title">
      <h3>
        我{{name==="createdPlay"?"创建":"收藏"}}的歌单
        <span>({{level}})</span>
      </h3>
    </div>
    <div class="song-content">
      <ul>
        <li v-for="(userPlay,index) in userPlayList" :key="index">
          <div class="song-img">
            <img :src="userPlay.coverImgUrl" alt="图片" />
            <div class="song-set">
              <div class="mban"></div>
              <a class="icon-play f-fr"></a>
              <span class="icon-headset f-fr"></span>
              <span class="nb">{{userPlay.playCount}}</span>
            </div>
          </div>
          <p class="desc">{{userPlay.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongSheet",
  props: {
    userPlayList: {
      type: Array,
    },
    level: {
      type: Number,
    },
    name: {
      type: String,
    },
  },
};
</script>

<style lang="stylus" scoped>
.songSheet
  margin-top 66px
  .song-title
    margin-bottom 20px
    border-bottom 2px solid #c20c0c
    h3
      font-size 20px
      line-height 28px
      font-weight normal
      padding-bottom 6px
  .song-content
    ul
      width 950px
      display flex
      flex-wrap wrap
      li
        width 140px
        height 165px
        padding 0 50px 30px 0
        .song-img
          position relative
          img
            width 140px
            heigth 140px
          .song-set
            position absolute
            bottom 4px
            left 0
            width 100%
            height 27px
            line-height 27px
            .mban
              position absolute
              bottom -1px
              left 0
              width 100%
              height 27px
              background #333
              opacity 0.6
            .f-fr
              position absolute
              z-index 10
              width 16px
              height 16px
            .icon-play
              right 10px
              bottom 5px
              background url('../../img/iconall.png') no-repeat 0 0
              &:hover
                cursor pointer
            .icon-headset
              display inline-block
              background url('../../img/iconall.png') no-repeat 0 -24px
              margin 9px 5px 9px 10px
            .nb
              position absolute
              top -6px
              left 30px
              z-index 10
              margin 7px 0 0 0
              color #ccc
        .desc
          width 100%
          margin 4px 0 3px
          font-size 14px
          color #000
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
</style>