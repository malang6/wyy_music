<template>
  <div class="popularRecommend">
    <div class="top">
      <i class="circle"></i>
      <a href="" class="title">热门推荐</a>
      <div class="category">
        <a href="" class="item" v-for="SongList in hotSongList" :key="SongList.id">{{SongList.name}}</a>
      </div>
      <span class="more">
        <a href="">更多</a>
        <i class="arrow"></i>
      </span>
    </div>
    <div class="recommendContainer">
      <div class="recommendItem" v-for="listOnline in hotListOnline" :key="listOnline.id">
        <div class="playList">
          <a href="">
            <img :src="listOnline.coverImgUrl" alt="" class="pic" />
          </a>
          <div class="control">
            <span class="headphone"></span>
            <span class="playCount">{{listOnline.playCount>10000?Math.floor(listOnline.playCount/10000)+'万':listOnline.playCount}}</span>
            <a href="" class="play"></a>
          </div>
        </div>
        <a href="" class="info">{{listOnline.name}}</a>
      </div>
     
    </div>
  </div>
</template>

<script>
import {reqHotSongList,reqHotListOnline} from '@api/Discover/recommend'
export default {
  name: 'PopularRecommend',
  data(){
    return {
      hotSongList:[],
      hotListOnline:[]
    }
  },
  methods:{
    // 请求推荐歌单类名
    async getHotSongList(){
      const hotSongList=await reqHotSongList()
      this.hotSongList=hotSongList.tags.slice(0,5)
    },
    // 请求网友精品歌单
    async getHotListOnline(){
      const hotListOnline=await reqHotListOnline()
      this.hotListOnline=hotListOnline.playlists.slice(0,8)
    }
  },
  mounted(){
    this.getHotSongList()
    this.getHotListOnline()
  }
}
</script>

<style lang="stylus" scoped>
.popularRecommend
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
      background url('../../../../assets/Discover/images/sprit.png')
      background-position -232px -162px
      margin 5px 10px 0
    .title
      float left
      font-size 20px
      font-weight normal
      line-height 28px
      color #333
    .category
      float left
      margin 10px 0 0 20px
      .item
        width 44px
        border-right 1px solid #ccc
        display inline-block
        text-align center
    .more
      float right
      margin-top 10px
      .arrow
        display inline-block
        background url('../../../../assets/Discover/images/sprit.png')
        background-position 1px -240px
        width 12px
        height 12px
  .recommendContainer
    display flex
    margin 20px -42px 0 0
    flex-wrap wrap
    .recommendItem
      display flex
      flex-shrink 0
      padding 0 45px 30px 0
      flex-direction column
      align-items center
      width 140px
      height 204px
      .playList
        position relative
        width 140px
        height 140px
        .pic
          width 100%
          height 140px
        .control
          position absolute
          bottom 0
          left 0
          width 100%
          height 27px
          background-color rgba(0, 0, 0, 0.6)
          color #ccc
          .headphone
            display inline-block
            margin 8px 5px 0
            width 14px
            height 11px
            background url('../../../../assets/Discover/images/sprit3.png')
            background-position 0px -24px
          .playCount
            display inline-block
            margin-top 5px
          .play
            display inline-block
            float right
            width 20px
            height 20px
            margin 4px 5px 0
            background url('../../../../assets/Discover/images/sprit3.png')
            background-position -1px -86px
            &:hover
              background-position -1px -111px
      .info
        font-size 14px
        margin-top 8px
        color #000
        width 100%
        &:hover
          text-decoration underline
</style>
