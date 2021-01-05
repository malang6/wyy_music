<template>
  <div class="allComment">
    <div class="niceComment">
      <h4 class="title">精彩评论</h4>
    <div class="commentList">
      <div class="commentItem" v-for="item in 3" :key="item">
        <img
          src="../../../../assets/Discover/images/nike.jpg"
          alt=""
          class="avatar"
        />
        <div class="content">
          <p class="detail">
            <a href="" class="username">帐号已注销</a>
            <span class="words">
              ：震惊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</span
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
    <div class="latestComment">
      <h4 class="title">精彩评论</h4>
    <div class="commentList">
      <div class="commentItem" v-for="item in 3" :key="item">
        <img
          src="../../../../assets/Discover/images/nike.jpg"
          alt=""
          class="avatar"
        />
        <div class="content">
          <p class="detail">
            <a href="" class="username">帐号已注销</a>
            <span class="words">
              ：震惊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</span
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
  </div>
</template>

<script>
export default {
  name: '',
}
</script>

<style lang="stylus" scoped>
.allComment
  width 670px
  margin 20px auto 0
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
        .username
          color #0c73c2
          &:hover
            text-decoration underline
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
              background-image url('../../../../assets/Discover/images/icon2.png')
              background-position -150px 0px
              &:hover
                background-position -150px -20px
          .reply
            padding-left 8px
            border-left 1px solid #ccc
    >.commentItem:nth-child(1)
      border-top none
</style>
