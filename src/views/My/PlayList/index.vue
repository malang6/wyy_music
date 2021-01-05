<template>
  <div class="playlist">
    <!-- 歌单信息部分 -->
    <div class="info">
      <img
        class="song-list-img"
        src="../../../assets/my/images/test.jpg"
        alt=""
      />
      <div class="edit">
        <div class="edit-title">
          <div class="title-cate"></div>
          <span class="title">我喜欢的音乐</span>
        </div>
        <div class="edit-user">
          <img class="avatar" src="../../../assets/my/images/test.jpg" alt="" />
          <span class="user-name">我我我我</span>
          <span class="create-time">2019-10-27 创建</span>
        </div>
        <div class="edit-btn">
          <div class="btn play">播放</div>
          <div class="btn plus"></div>
          <div class="btn collect">收藏</div>
          <div class="btn share">分享</div>
          <div class="btn down">下载</div>
          <div class="btn comment">评论</div>
        </div>
        <div class="edit-label">
          标签：
          <span class="label">日系</span>
          <span class="label">致郁</span>
          <span class="label">燃</span>
        </div>
        <div class="edit-description">
          <div v-if="descriptionSimple">
            <p>
              介绍：马老师个人专辑《我大E了啊》<br />
              马老师个人全新专辑，包含曲目：<br />
              《发生肾摸石了》 <br />
              《英国大力士》 <br />
              《健身房没有用》 等热门曲目<br />
              本次专辑的主打曲《耗子尾汁》一经发出，便获得2020年全球小聪明奖
              亚洲最佳个性曲目奖...
            </p>
            <span class="open" @click="descriptionSimple = false">
              <span class="text">展开</span>
            </span>
          </div>
          <div v-else>
            <p>
              介绍：马老师个人专辑《我大E了啊》<br />
              马老师个人全新专辑，包含曲目：<br />
              《发生肾摸石了》 <br />
              《英国大力士》 <br />
              《健身房没有用》 等热门曲目<br />
              本次专辑的主打曲《耗子尾汁》一经发出，便获得2020年全球小聪明奖
              亚洲最佳个性曲目奖,以及最谢谢朋友们奖<br />
              马老师自出道以来，1年内共获得19个全球大奖以及24个全国大奖，更是曾被邀请与比利共进晚餐<br />
            </p>
            <span class="close" @click="descriptionSimple = true">
              <span class="text">收起</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 歌单曲目 -->
    <div class="table">
      <div class="table-title">
        <span class="table-name">歌曲列表</span>
        <span class="table-total">48首歌</span>
        <span class="table-count">播放：<span class="num">666</span>次</span>
      </div>
      <div class="table-header">
        <div class="header order"></div>
        <div class="header title">歌曲标题</div>
        <div class="header time">时长</div>
        <div class="header singer">歌手</div>
        <div class="header album">专辑</div>
      </div>
      <div class="table-content">
        <div class="song-list" v-for="item in 33" :key="item">
          <div class="song order">{{ item }}</div>
          <div class="song title">哈行</div>
          <div class="song time">213213</div>
          <div class="song singer">213</div>
          <div class="song album">123</div>
        </div>
      </div>
    </div>
    <!-- 评论区域 -->
    <div class="comment">
      <div class="comment-title">
        <span class="title">评论</span>
        <span>共14条评论</span>
      </div>
      <div class="comment-ipt">
        <img class="avatar" src="../../../assets/my/images/test.jpg" alt="" />
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
      <!-- 评论内容 -->
      <div class="comment-content">
        <div class="comment-header">精彩评论</div>
        <div class="comment-item" v-for="item in 14" :key="item">
          <img class="avatar" src="../../../assets/my/images/test.jpg" alt="" />
          <div>
            <div class="text">
              <span class="name">我</span>:
              太强了吧？太强了吧？太强了吧？太强了吧？太强了吧？太强了吧？太强了吧？太强了吧？太强了吧？太强了吧？太强了吧？
            </div>
            <div class="footer">
              <span>2020年6月15日</span>
              <div class="edit">
                <span class="star">
                  <span class="count">(123)</span>
                </span>
                <span class="reply">回复</span>
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
  name: "PlayList",
  data() {
    return {
      descriptionSimple: true,
    };
  },
};
</script>

<style lang="stylus" scoped>
.playlist
  padding-bottom 50px
  .info
    padding 40px
    .song-list-img
      float left
      width 200px
      height 200px
      padding 4px
      border 1px solid #ccc
    .edit
      margin-left 230px
      margin-top 4px
      .edit-title
        margin-bottom 12px
        display flex
        align-items center
        .title
          font-size 20px
          color #333
          margin-left 6px
        .title-cate
          display inline-block
          height 24px
          width 54px
          background-image url('../../../assets/my/images/icon.png')
          background-position 0px -243px
      .edit-user
        margin-bottom 20px
        font-size 12px
        display flex
        align-items center
        .avatar
          width 35px
          height 35px
          margin-right 10px
        .user-name
          margin-right 20px
          color #0c73c2
        .create-time
          color #999
      .edit-btn
        display flex
        align-items center
        .btn
          display inline-block
          height 21px
          padding 5px
          padding-left 30px
          background-image url('../../../assets/my/images/button2.png')
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
      .edit-label
        font-size 12px
        color #666
        .label
          display inline-block
          height 20px
          width 55px
          border 1px solid rgb(199, 199, 199)
          border-radius 11px
          margin-right 10px
          text-align center
          line-height 22px
          background-image url('../../../assets/my/images/button2.png')
          background-position -2px -1px
          cursor pointer
        .label:hover
          background #fff
      .edit-description
        line-height 18px
        margin-top 10px
        font-size 12px
        color #666
        .open
          display inline-block
          float right
          cursor pointer
          color #0c73c2
          width 40px
          background-image url('../../../assets/my/images/icon.png')
          background-position -39px -513px
          .text
            background #fff
        .close
          height 18px
          display inline-block
          float right
          cursor pointer
          color #0c73c2
          width 40px
          background-image url('../../../assets/my/images/icon.png')
          background-position -20px -515px
          .text
            background #fff
            border 1px solid #fff
  .table
    border-bottom 1px solid rgb(204, 204, 204)
    .table-title
      padding 0 10px 0 32px
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
          color red
    .table-header
      display flex
      border-bottom 1px solid rgb(204, 204, 204)
      .header
        border-right 1px solid rgb(204, 204, 204)
        padding 8px 10px
        height 18px
        font-size 12px
        color #666
      .order
        width 74px
      .title
        width 303px
      .time
        width 111px
      .singer
        width 103px
      .album
        width 147px
        border none
    .table-content
      .song-list
        display flex
        .song
          padding 8px 10px
          height 18px
          font-size 12px
          color #666
        .order
          width 74px
        .title
          width 303px
        .time
          width 111px
        .singer
          width 103px
        .album
          width 147px
          border none
      .song-list:nth-child(odd)
        background-color rgb(247, 247, 247)
  .comment
    margin 40px 0
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
        margin-left 30px
      .ipt
        position relative
        margin-left 10px
        .textarea
          width 598px
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
            background-image url('../../../assets/my/images/icon.png')
            background-position -37px -489px
          .call
            height 22px
            width 22px
            display inline-block
            background-image url('../../../assets/my/images/icon.png')
            background-position -58px -489px
          .count
            font-size 12px
            color #999
            margin-right 10px
          .publish
            display inline-block
            width 46px
            height 25px
            background-image url('../../../assets/my/images/button2.png')
            background-position 0px -471px
            border-radius 3px
            text-align center
            color #fff
            font-size 14px
            line-height 25px
    .comment-content
      margin 0 30px
      .comment-header
        height 20px
        font-weight bold
        font-size 12px
        color #333
        border-bottom 1px solid #cfcfcf
      .comment-item
        display flex
        padding 15px 0
        .avatar
          margin-right 10px
          height 50px
          width 50px
        .text
          font-size 12px
          width 616px
          .name
            color #0c73c2
        .footer
          height 16px
          margin-top 15px
          font-size 12px
          color #999
          display flex
          justify-content space-between
          .edit
            .star
              height 14px
              background-image url('../../../assets/my/images/icon2.png')
              background-position -148px 1px
              padding-left 20px
              margin-right 10px
              .count
                background #fff
            .reply
              padding 0 10px
              border-left 1px solid rgb(211, 211, 211)
      .comment-item:nth-child(n+3)
        border-top 1px dotted #ccc
</style>
