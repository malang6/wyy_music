<template>
  <div class="allComment">
    <!-- 精彩评论 -->
    <div class="niceComment" v-if="pageNo===1">
      <h4 class="title">精彩评论</h4>
      <div class="commentList">
        <div class="commentItem" v-for="item in 3" :key="item">
          <img
            src="../../../assets/Discover/images/nike.jpg"
            alt=""
            class="avatar"
          />
          <div class="content">
            <p class="detail">
              <a href="" class="username">帐号已注销</a>
              <span class="words">
                ：许巍有《蓝莲花》高梨康治有《红莲》翁大涵有《白莲》马琪龙有《青莲》，最近又火了一个啥榴莲，我孙某人只有不要b莲</span
              >
            </p>
            <div class="control">
              <span class="date">2018年1月1日</span>
              <div>
                <a href="" class="like"><i class="thumb"></i>(1490)</a>
                <a href="" class="reply">回复</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="line"></div>
    <!-- 最新评论 -->
    <div class="latestComment">
      <h4 class="title" v-if="pageNo===1">最新评论</h4>
      <div class="commentList">
        <div class="commentItem" v-for="(songComment,index) in songCommentList" :key="songComment.commentId">
          <img
            :src="songComment.user.avatarUrl"
            alt=""
            class="avatar"
          />
          <div class="content">
            <div class="detail" v-html="mainComment[index]">
              <!-- <a href="" class="username">{{songComment.user.nickname}}</a> -->
            </div>
            <div class="beReplied" v-if="songComment.beReplied.length" v-html="transmitComment[index]">
                <!-- <a href="" class="username">{{songComment.beReplied[0].user.nickname}}</a>
                <span class="words">
                  ：{{songComment.beReplied[0].content}}</span>
                <i class="arrow bottom">◆</i>
                <i class="arrow top">◆</i> -->
            </div>
            <div class="control">
              <span class="date">{{commentTime[index]}}</span>
              <div>
                <a href="" class="like"><i class="thumb"></i>({{songComment.likedCount}})</a>
                <a href="" class="reply">回复</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <Pagination
    @current-change="handleCurrentChange"
    :current-page="1"
    :page-size="20"
    :pager-count="9"
    :total="totalComment"
    />
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import { reqSongListComment } from '@api/Discover/topList'
import Pagination from '@comps/Pagination/Pagination'
export default {
  name: '',
  data() {
    return {
      songCommentList: [],
      totalComment:0,
      pageNo:1
    }
  },
  methods:{
    // 发送请求评论函数
    async getCommentList(currentId,time){
      const songCommentList = await reqSongListComment(currentId,time)
      this.songCommentList = songCommentList.comments
      this.totalComment=songCommentList.total
    },
    // 点击分页
    handleCurrentChange(pageNo){
      this.pageNo=pageNo
      const time=this.songCommentList[this.songCommentList.length-1].time
      this.getCommentList(this.currentId,time)
    }
  },
  components:{
    Pagination
  },
  computed: {
    ...mapState({
      currentId: (state) => state.topList.currentId,
    }),

    // 计算评论时间
    commentTime(){
      const timeList=this.songCommentList.map(comment=>{
        return moment(comment.time).format('YYYY年MM月DD日')
      })
      return timeList
    },

    // 主评论换行处理
    mainComment(){
      // 将\n全部替换成<br>
      const commentList=this.songCommentList.map(comment=>{
        let beforeComment=`<a href="" class="username">${comment.user.nickname}</a>`
        let ifVip=''
        if(comment.user.vipRights){
          ifVip=`<span class="vipIcon">VIP${comment.user.vipRights.redVipLevel}</span>`
        }
        let showComment=comment.content
        if(showComment.indexOf('\n')>-1){
          showComment=showComment.replace(/\n/g,'<br>')
        }
        return beforeComment  + ifVip + ' : ' + showComment
      })
      return commentList
    },

    // 转发评论换行处理
    transmitComment(){
      const commentList=this.songCommentList.map(comment=>{
        if(!comment.beReplied.length)return
        let beforeComment=`<a href="" class="username">${comment.beReplied[0].user.nickname}</a>`
        let showComment=comment.beReplied[0].content
        let icon = `<i class="arrow bottom">◆</i><i class="arrow top">◆</i>`
        if(showComment.indexOf('\n')>-1){
          showComment=showComment.replace(/\n/g,'<br>')
        }
        return beforeComment + ' : ' + showComment + icon
      })
      return commentList
    },

  },
  watch: {
    currentId() {
      this.getCommentList(this.currentId)
    },
    totalComment(){
      this.$emit('getCommentCount',this.totalComment)
    }
  },
}
</script>

<style lang="stylus" scoped>
.allComment
  width 670px
  margin 20px auto 0
  .line
    border-bottom 1px dashed #ccc
  .title
    width 100%
    border-bottom 1px solid #cfcfcf
    height 20px
  .commentList
    .commentItem
      padding 15px 0
      border-top 1px dashed #ccc
      display flex
      .avatar
        width 50px
        height 50px
      .content
        margin-left 10px
        width 610px
        .detail
          line-height 20px
          >>>.username
            color #0c73c2
            &:hover
              text-decoration underline
          >>>.vipIcon
            font-style italic
            background-color rgb(20,20,18)
            color rgb(248, 220, 217)
            width 30px
            height 15px
            line-height 15px
            display inline-block
            border-radius 4px
            margin 5px 0 0 5px
        .beReplied
          background-color rgb(244, 244, 244)
          padding 8px 19px
          margin-top 10px
          position relative
          border 1px solid #dedede
          line-height 20px
          >>>.username
            color #0c73c2
            &:hover
              text-decoration underline
          >>>.arrow
            position absolute
            font-size 20px
            &.bottom
              color #dedede
              z-index 9
              top -12px
              left 20px
            &.top
              color rgb(244, 244, 244)
              z-index 10
              top -11px
              left 20px
        .control
          display flex
          justify-content space-between
          margin-top 15px
          .date
            color #999
          a
            &:hover
              text-decoration underline
          .like
            margin 0 8px
            .thumb
              width 15px
              height 14px
              margin-right 5px
              display inline-block
              vertical-align bottom
              background-image url('../../../assets/Discover/images/icon2.png')
              background-position -150px 0px
              &:hover
                background-position -150px -20px
          .reply
            padding-left 8px
            border-left 1px solid #ccc
    >.commentItem:nth-child(1)
      border-top none
</style>
