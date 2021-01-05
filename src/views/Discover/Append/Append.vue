<template>
  <div class="append">
    <!-- 用户信息 -->
    <!-- <div class="unLogin" v-if="true">
      <span class="unLoginInfo"
        >登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</span
      >
      <a class="login" href="">用户登录</a>
    </div> -->
    <div class="userLogin">
      <div class="userInfo">
        <a href="">
          <img src="../Carousel/static/nike.jpg" alt="" />
        </a>
        <div class="info">
          <div class="name">
            <a>用户名</a>
            <span></span>
          </div>
          <p>
            <a href="" class="grade">lv9</a>
          </p>
          <div>
            <a href="" class="sign">签到</a>
          </div>
        </div>
      </div>
      <div class="activity">
        <a href="">
          <strong>0</strong>
          <span>动态</span>
        </a>
        <a href="">
          <strong>0</strong>
          <span>动态</span>
        </a>
        <a href="">
          <strong>0</strong>
          <span>动态</span>
        </a>
      </div>
    </div>
    <!-- 入驻歌手 -->
    <div class="singer">
      <div class="inSinger">
        <span>入驻歌手</span>
        <a href="">查看全部></a>
      </div>
      <div class="singerInfo">
        <a href="" class="eachSinger">
          <img src="../Carousel/static/ajlogo.png" alt="" />
          <div class="singerName">
            <strong class="name">张惠妹</strong>
            <span class="region">台湾歌手张惠妹</span>
          </div>
        </a>
        <a href="" class="eachSinger">
          <img src="../Carousel/static/ajlogo.png" alt="" />
          <div class="singerName">
            <strong class="name">张惠妹</strong>
            <span class="region">台湾歌手张惠妹</span>
          </div>
        </a>
        <a href="" class="eachSinger">
          <img src="../Carousel/static/ajlogo.png" alt="" />
          <div class="singerName">
            <strong class="name">张惠妹</strong>
            <span class="region">台湾歌手张惠妹</span>
          </div>
        </a>
        <a href="" class="eachSinger">
          <img src="../Carousel/static/ajlogo.png" alt="" />
          <div class="singerName">
            <strong class="name">张惠妹</strong>
            <span class="region">台湾歌手张惠妹</span>
          </div>
        </a>
        <a href="" class="eachSinger">
          <img src="../Carousel/static/ajlogo.png" alt="" />
          <div class="singerName">
            <strong class="name">张惠妹</strong>
            <span class="region">台湾歌手张惠妹</span>
          </div>
        </a>
      </div>
      <a href="" class="apply">申请成为网易音乐人</a>
    </div>
    <!-- 主播 -->
    <div class="dj">
      <h4 class="hotDj">热门主播</h4>
      <div class="djs">
        <div class="eachDj">
          <a href="">
            <img src="../Carousel/static/ajlogo.png" alt="" class="pic" />
          </a>
          <div class="info">
            <a href="">陈立</a>
            <span>独立DJ，CRI环球旅游广播特约主持人</span>
          </div>
        </div>
        <div class="eachDj">
          <a href="">
            <img src="../Carousel/static/ajlogo.png" alt="" class="pic" />
          </a>
          <div class="info">
            <a href="">陈立</a>
            <span>独立DJ，CRI环球旅游广播特约主持人</span>
          </div>
        </div>
        <div class="eachDj">
          <a href="">
            <img src="../Carousel/static/ajlogo.png" alt="" class="pic" />
          </a>
          <div class="info">
            <a href="">陈立</a>
            <span>独立DJ，CRI环球旅游广播特约主持人</span>
          </div>
        </div>
        <div class="eachDj">
          <a href="">
            <img src="../Carousel/static/ajlogo.png" alt="" class="pic" />
          </a>
          <div class="info">
            <a href="">陈立</a>
            <span>独立DJ，CRI环球旅游广播特约主持人</span>
          </div>
        </div>
        <div class="eachDj">
          <a href="">
            <img src="../Carousel/static/ajlogo.png" alt="" class="pic" />
          </a>
          <div class="info">
            <a href="">陈立</a>
            <span>独立DJ，CRI环球旅游广播特约主持人</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Append',
}
</script>

<style lang="stylus" scoped>
.append
  width 250px
  border-right 1px solid rgb(211, 211, 211)
  height 100%
  .unLogin
    height 126px
    display flex
    flex-direction column
    align-items center
    background-color rgb(237, 237, 237)
    .unLoginInfo
      padding 16px 0
      color #666
      margin 0 22.5px
    .login
      background-color rgb(216, 26, 34)
      display block
      width 100px
      height 31px
      line-height 31px
      text-align center
      color #fff
      text-shadow 0 1px 0 #8a060b
      border-radius 5px
      &:hover
        background-color rgba(216, 26, 34, 0.8)
  .userLogin
    height 165px
    padding-top 20px
    .userInfo
      height 90px
      display flex
      margin-left 20px
      img 
        width 80px
        height 80px
      .info
        margin-left 18px
        .name
          font-size 14px
          color #333
          font-weight bold
        .grade
          border 1px solid #eaeaea
          display inline-block
          height 18px
          line-height 18px
          width 40px
          border-radius 20px
          color #999   
          text-align center 
          margin-top 5px
        .sign
          margin-top 15px
          width 100px
          height 31px
          display inline-block
          background-color rgb(46, 126, 203)
          color #ffffff
          border-radius 3px
          line-height 31px
          text-align center
          &:hover
            background-color rgba(46, 126, 203,.8)
    .activity
      margin 20px 0 0 22px
      color #666
      display flex
      a
        display flex 
        flex-direction column
        padding 0 15px
        &:nth-child(2)
          border-left 1px solid #eaeaea
          border-right 1px solid #eaeaea
        strong
          font-size 20px
        span
          font-size 12px

  .singer
    margin-top 15px
    .inSinger
      display flex
      justify-content space-between
      margin 0 20px
      padding-bottom 5px
      border-bottom 1px solid #ccc
      span
        color #333
        font-weight bold
    .singerInfo
      margin 6px 0 14px
      display flex
      flex-direction column
      align-items center
      .eachSinger
        &:hover
          background-color rgb(244, 244, 244)
        margin-top 14px
        display flex
        background-color rgb(250, 250, 250)
        img
          width 62px
          height 62px
        .singerName
          padding-left 14px
          height 60px
          width 124px
          border 1px solid #e9e9e9
          border-left none
          .name
            color #333
            font-size 14px
            font-weight bold
            display block
            margin-top 8px
          .region
            margin-top 8px
            display block
    .apply
      display block
      width 200px
      margin 0 auto
      height 31px
      line-height 31px
      border-radius 4px
      text-align center
      background-color rgb(250, 250, 250)
      font-weight bold
      color #333
      border 1px solid #ccc
      &:hover
        background-color rgb(244, 244, 244)
  .dj
    margin-top 30px
    .hotDj
      margin 0 20px
      border-bottom 1px solid #ccc
      padding-bottom 8px
    .djs
      margin 20px 0 0 20px
      .eachDj
        margin-bottom 10px
        display flex
        .pic
          width 40px
          height 40px
        .info
          width 160px
          display flex
          flex-direction column
          justify-content space-around
          margin-left 10px
          a
            color #000
            &:hover
              text-decoration underline
          span
            color #666
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
</style>
