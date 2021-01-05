<template>
  <div class="playlist">
    <!-- 歌单信息部分 -->
    <div class="info">
      <img
        class="song-list-img"
        :src="this.songList.coverImgUrl"
        alt=""
        id="top"
      />
      <div class="edit">
        <div class="edit-title">
          <span class="title">{{ this.songList.name }}</span>
        </div>
        <div class="edit-user">
          <span class="clock"></span>
          <span class="user-name">最近更新：{{ updateTime }}</span>
          <span class="create-time">（{{ updateFrequency }}）</span>
        </div>
        <div class="edit-btn">
          <div class="btn play">播放</div>
          <div class="btn plus"></div>
          <div class="btn collect">收藏</div>
          <div class="btn share">分享</div>
          <div class="btn down">下载</div>
          <div class="btn comment">评论</div>
        </div>
      </div>
    </div>
    <!-- 歌单曲目 -->
    <div class="table">
      <div class="table-title">
        <span class="table-name">歌曲列表</span>
        <span class="table-total"
          >{{ songList.tracks ? songList.tracks.length : '' }}首歌</span
        >
        <span class="table-count"
          >播放：<span class="num">{{ songList.playCount }}</span
          >次</span
        >
      </div>
      <div class="table-header">
        <div class="header order"></div>
        <div class="header title">标题</div>
        <div class="header time">时长</div>
        <div class="header singer">歌手</div>
      </div>
      <div class="table-content" @mousemove="setToPlay">
        <div
          class="song-list"
          v-for="(track, index) in songList.tracks"
          :key="track.id"
          :data-id="track.id"
        >
          <div class="song order">{{ index + 1 }}</div>
          <div class="song title">
            <img :src="track.al.picUrl" alt="" v-if="index < 3" />
            <a class="playSong" href=""></a>
            <span class="songName">{{ track.name }}</span>
            <span class="append">{{
              track.alia.length ? '-(' + track.alia[0] + ')' : ''
            }}</span>
          </div>
          <div class="song time" v-if="track.id === hoverId">1</div>
          <div class="song time" v-else>{{ songTime[index] }}</div>
          <div class="song singer">{{ track.ar[0].name }}</div>
        </div>
      </div>
    </div>
    <!-- 评论区域 -->
    <div class="comment">
      <div class="comment-title">
        <span class="title">评论</span>
        <span>共0条评论</span>
      </div>
      <div class="comment-ipt">
        <img
          class="avatar"
          src="../../../../assets/Discover/images/nike.jpg"
          alt=""
        />
        <div class="ipt">
          <span class="arrow">◆</span>
          <span class="arrow-inside">◆</span>
          <textarea class="textarea" cols="30" rows="10"> </textarea>
          <div class="edit">
            <div>
              <div class="expression"></div>
              <div class="call"></div>
            </div>
            <div>
              <span class="count">140</span>
              <div class="publish">评论</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 精彩/最新评论 -->
    <CommentList />
    <!-- 回到顶部 -->
    <div class="returnTop">
      <a href="#top">Top^</a>
    </div>
  </div>
</template>

<script>
import CommentList from '../CommentList/CommentList'
import moment from 'moment'
export default {
  name: 'PlayList',
  data() {
    return {
      hoverId: '',
    }
  },
  components: {
    CommentList,
  },
  methods: {
    setToPlay(e) {
      // if(!e.target.dataset.id)return
      console.log(e.target)
    },
  },
  props: ['songList', 'updateFrequency'],
  computed: {
    updateTime() {
      return moment(this.songList.updateTime).format('MM月DD日')
    },
    songTime() {
      const time = this.songList.tracks.map((track) => {
        const tick = Math.floor(track.dt / 1000)
        return moment(tick * 1000).format('mm:ss')
      })
      return time
    },
  },
}
</script>

<style lang="stylus" scoped>
.playlist
  padding-bottom 50px
  position relative
  .info
    padding 40px
    height 160px
    .song-list-img
      float left
      width 150px
      height 150px
      padding 4px
      border 1px solid #ccc
    .edit
      margin-left 187px
      margin-top 4px
      .edit-title
        margin 16px 0 12px
        display flex
        align-items center
        .title
          font-size 20px
          color #333
      .edit-user
        margin-bottom 20px
        font-size 12px
        display flex
        align-items center
        .clock
          width 13px
          height 13px
          background url('../../../../assets/Discover/images/icon.png')
          background-position -70px -140px
        .user-name
          margin-left 5px
          color #666
        .create-time
          color #999
      .edit-btn
        display flex
        align-items flex-start
        .btn
          display inline-block
          height 21px
          padding 5px
          padding-left 30px
          background-image url('../../../../assets/Discover/images/button2.png')
        .btn.play
          border-radius 5px 0 0 5px
          color #fff
          font-size 14px
          background-position -5px 3272px
        .btn.plus
          background-position 0px 2403px
        .btn.collect
          border-radius 0 5px 5px 0
          margin 0 5px
          border-right 1px solid rgb(204, 204, 204)
          background-position 0px 2841px
        .btn.share
          border-radius 0 5px 5px 0
          border-right 1px solid rgb(204, 204, 204)
          background-position 0px 2765px
        .btn.down
          border-radius 0 5px 5px 0
          margin 0 5px
          border-right 1px solid rgb(204, 204, 204)
          background-position 0px 1229px
        .btn.comment
          border-radius 0 5px 5px 0
          border-right 1px solid rgb(204, 204, 204)
          background-position 0px 2525px
  .table
    padding 0 30px 40px 40px
    .table-title
      padding 0 10px 0 5px
      border-bottom 2px solid #c20c0c
      height 35px
      .table-name
        font-size 20px
        color #333
      .table-total
        font-size 12px
        color #666
        margin-left 20px
      .table-count
        margin-top 10px
        float right
        font-size 12px
        color #666
        .num
          color #c20c0c
          font-weight bold
    .table-header
      display flex
      border-bottom 1px solid rgb(204, 204, 204)
      border-left 1px solid rgb(204, 204, 204)
      .header
        border-right 1px solid rgb(204, 204, 204)
        padding 8px 10px
        height 18px
        font-size 12px
        color #666
      .order
        width 68px
      .title
        width 307px
      .time
        width 70px
      .singer
        width 153px
    .table-content
      border 1px solid rgb(204, 204, 204)
      border-top none
      .song-list
        display flex
        .song
          padding 8px 10px
          height 18px
          font-size 12px
          color #666
        .order
          width 68px
        .title
          width 307px
          display flex
          align-items center
          img
            width 50px
            height 50px
          .playSong
            flex-shrink 0
            width 17px
            height 17px
            background url('../../../../assets/Discover/images/table.png')
            background-position 0 -103px
            margin 0 8px
            &:hover
              background-position 0 -128px
          .append
            color #aeaeae
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
          .songName
            flex-shrink 0
            white-space nowrap
        .time
          width 70px
        .singer
          width 153px
      .song-list:nth-child(odd)
        background-color rgb(247, 247, 247)
      .song-list:nth-child(-n+3)
        .song
          height 50px
          line-height 50px
  .comment
    height 98px
    padding 0 30px 40px 40px
    .comment-title
      padding 0 10px 0 32px
      height 35px
      font-size 12px
      color #666
      border-bottom 2px solid #c20c0c
      .title
        margin-right 20px
        font-size 20px
        color #333
    .comment-ipt
      margin-top 20px
      display flex
      .avatar
        height 50px
        width 50px
      .ipt
        position relative
        margin-left 20px
        .textarea
          width 579px
          height 47px
          resize none
          outline none
          padding 5px 8px
          font-size 18px
        .arrow
          position absolute
          font-size 28px
          top 1px
          left -8px
          color black
        .arrow-inside
          position absolute
          font-size 26px
          top 2px
          left -6px
          color #fff
        .edit
          display flex
          justify-content space-between
          .expression
            height 22px
            width 22px
            display inline-block
            margin-right 10px
            background-image url('../../../../assets/Discover/images/icon.png')
            background-position -37px -489px
          .call
            height 22px
            width 22px
            display inline-block
            background-image url('../../../../assets/Discover/images/icon.png')
            background-position -58px -489px
          .count
            font-size 12px
            color #999
            margin-right 10px
          .publish
            display inline-block
            width 46px
            height 25px
            background-image url('../../../../assets/Discover/images/button2.png')
            background-position 0px -471px
            border-radius 3px
            text-align center
            color #fff
            font-size 14px
            line-height 25px
  .returnTop
    position fixed
    border 1px solid #ccc
    border-radius 3px
    left 50%
    margin-left 500px
    bottom 100px
    background-color rgb(245, 245, 245)
    a
      width 50px
      height 50px
      display inline-block
      line-height 50px
      text-align center
</style>
