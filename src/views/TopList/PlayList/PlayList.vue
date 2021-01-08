<template>
  <div class="playlist">
    <!-- 歌单信息部分 -->
    <div class="info">
      <img class="song-list-img" :src="songList.coverImgUrl" alt="" />
      <div class="edit">
        <div class="edit-title">
          <span class="title">{{ songList.name }}</span>
        </div>
        <div class="edit-user">
          <span class="clock"></span>
          <span class="user-name">最近更新：{{ updateTime }}</span>
          <span class="create-time">（{{ updateFrequency }}）</span>
        </div>
        <div class="edit-btn">
          <div class="btn play">播放</div>
          <div class="btn plus"></div>
          <div class="btn collect">{{ songList.subscribedCount }}</div>
          <div class="btn share">{{ songList.shareCount }}</div>
          <div class="btn down">下载</div>
          <div class="btn comment">{{ songList.commentCount }}</div>
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
      <div class="table-content">
        <div
          class="song-list"
          v-for="(track, index) in songList.tracks"
          :key="track.id"
        >
          <div class="song order">{{ index + 1 }}</div>
          <div class="song title">
            <img :src="track.al.picUrl" alt="" v-if="index < 3" />
            <a class="playSong" href=""></a>
            <span class="songName"
              ><a href="">{{ track.name }}</a></span
            >
            <span class="append">{{
              track.alia.length ? '-(' + track.alia[0] + ')' : ''
            }}</span>
          </div>
          <div class="song time control">
            <div class="pad">
              <a class="add" href=""></a>
              <a class="collect" href=""></a>
              <a class="share" href=""></a>
              <a class="download" href=""></a>
            </div>
          </div>
          <div class="song time show">
            {{ songTime[index] }}
          </div>
          <div class="song singer">
            <a href="">{{ track.ar[0].name }}</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 评论区域 -->
    <div class="comment">
      <div class="comment-title">
        <span class="title">评论</span>
        <span>共{{commentCount}}条评论</span>
      </div>
      <div class="comment-ipt">
        <img
          class="avatar"
          :src="avatarUrl"
          v-if="avatarUrl"
        />
        <img
          class="avatar"
          v-else
          src="../../../assets/Discover/images/nike.jpg"
        />
        <div class="ipt">
          <span class="arrow">◆</span>
          <span class="arrow-inside">◆</span>
          <textarea class="textarea" cols="30" rows="10" v-model="inputText"> </textarea>
          <div class="edit">
            <div>
              <div class="expression"></div>
              <div class="call"></div>
            </div>
            <div>
              <span class="count">{{leftWord}}</span>
              <div class="publish" @click="comment">评论</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 精彩/最新评论 -->
    <CommentList @getCommentCount="getCommentCount"/>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import moment from 'moment'
import CommentList from '../CommentList/CommentList'
import {commentSongList} from '@api/Discover/topList'
export default {
  name: 'PlayList',
  data() {
    return {
      commentCount:'',
      avatarUrl:'',
      inputText:''
    }
  },
  components: {
    CommentList,
  },
  props:['songList'],
  watch: {
    // 歌单ID发生变化，请求歌单
    // async currentId(){
    //   const songList=await reqListSong(this.currentId)
    //   this.songList=songList.playlist
    // },
    // $route: {
    //   async handler(){
    //     if(!this.$route.query.id)return 
    //     const songList = await reqListSong(this.$route.query.id)
    //     this.songList = songList.playlist 
    //   },
    //   immediate:true
    // },
  },
  computed: {
    ...mapState({
      updateFrequency: (state) => state.topList.updateFrequency,
      currentId: (state) => state.topList.currentId,
    }),
    // 计算更新时间
    updateTime() {
      return moment(this.songList.updateTime).format('MM月DD日')
    },
    // 计算歌曲长度
    songTime() {
      const time = this.songList.tracks.map((track) => {
        const tick = Math.floor(track.dt / 1000)
        return moment(tick * 1000).format('mm:ss')
      })
      return time
    },
    // 计算剩余输入字数
    leftWord(){
      return this.inputText.length?140-this.inputText.length:140
    }
  },
  methods:{
    ...mapActions(['getComment']),
    getCommentCount(commentCount){
      this.commentCount=commentCount
    },
    // 是否已登录
    async ifLogin(){
      const avatarUrl=localStorage.getItem('avatarUrl')
      if(avatarUrl){
        this.avatarUrl=avatarUrl
      }
    },
    // 发布评论
    async comment(){
      if(this.inputText.length===0) return alert('请输入评论') 
      await commentSongList(1,2,this.currentId,this.inputText)
      console.log(1)
      const currentId=this.currentId
      const time=''
      await this.getComment({currentId,time})
    }
  },
  mounted(){
    this.ifLogin()
  }
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
          background url('../../../assets/Discover/images/icon.png')
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
          line-height 21px
          padding 5px
          padding-left 30px
          background-image url('../../../assets/Discover/images/button2.png')
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
          a
            &:hover
              text-decoration underline
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
            background url('../../../assets/Discover/images/table.png')
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
          &.control
            display none
            .pad
              width 86px
              a
                display inline-block
                width 18px
                height 16px
                background-color red
                margin 0 2px
              .add
                width 13px
                height 13px
                margin-bottom 2px
                background url('../../../assets/Discover/images/icon.png')
                background-position 0 -700px
                &:hover
                  background-position -22px -700px
              .collect
                background url('../../../assets/Discover/images/icon.png')
                background-position -44px -86px
                &:hover
                  background-position -44px -109px
              .share
                background url('../../../assets/Discover/images/icon.png')
                background-position -44px -136px
                &:hover
                  background-position -44px -159px
              .download
                background url('../../../assets/Discover/images/table.png')
                background-position -82px -174px
                &:hover
                  background-position -103px -174px
        .singer
          width 153px
        &:hover
          >.control
            display inline-block
          >.show
            display none
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
      padding-right 10px
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
          font-size 12px
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
            background-image url('../../../assets/Discover/images/icon.png')
            background-position -37px -489px
          .call
            height 22px
            width 22px
            display inline-block
            background-image url('../../../assets/Discover/images/icon.png')
            background-position -58px -489px
          .count
            font-size 12px
            color #999
            margin-right 10px
          .publish
            display inline-block
            width 46px
            height 25px
            background-image url('../../../assets/Discover/images/button2.png')
            background-position 0px -471px
            border-radius 3px
            text-align center
            color #fff
            font-size 14px
            line-height 25px
            &:hover
              cursor pointer
</style>
