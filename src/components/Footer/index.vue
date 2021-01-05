<template>
  <div class="footer">
    <div class="content">
      <div class="left">
        <ul class="list">
          <li class="item f-i">
            <a href="###">服务条款</a>
          </li>
          <li class="item">
            <a href="###">隐私政策</a>
          </li>
          <li class="item">
            <a href="###">儿童隐私政策</a>
          </li>
          <li class="item">
            <a href="###">版权投诉指引</a>
          </li>
          <li class="item">
            <a href="###">意见反馈</a>
          </li>
        </ul>
        <p class="txt wh-txt">
          <span class="wy">网易公司版权所有©1997-2021</span>
          <span>
            杭州乐读科技有限公司运营：
            <a href="###">浙网文[2018]3506-263号</a>
          </span>
        </p>
        <p class="txt wj-txt">
          <span class="wf">违法和不良信息举报电话：0571-89853516</span>
          <span>
            举报邮箱：
            <a href="###">ncm5990@163.com</a>
          </span>
        </p>
        <div class="txt">
          <span class="yb">粤B2-20090191-18</span>
          <a href="###" class="gy">工业和信息化部备案管理系统网站</a>
          <a href="###">浙公网安备 33010902002564号</a>
        </div>
      </div>
      <div class="right">
        <ul class="r-list">
          <li>
            <a href="###" class="logo logonew logo-amped f-tid"></a>
            <span>Amped</span>
          </li>
          <li>
            <a href="###" class="logo logonew logo-auth f-tid"></a>
            <span>用户认证</span>
          </li>
          <li>
            <a href="###" class="logo logonew logo-musician f-tid"></a>
            <span>独立音乐人</span>
          </li>
          <li>
            <a href="###" class="logo logonew logo-reward f-tid"></a>
            <span>赞赏</span>
          </li>
          <li>
            <a href="###" class="logo logonew logo-cash f-tid"></a>
            <span>视频奖励</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="stylus" scoped>
.footer
  height 172px
  overflow hidden
  border-top 1px solid #d3d3d3
  background-color #f2f2f2
  .content
    width 980px
    margin 10px auto
    display flex
    justify-content space-between
    color #666666
    .left
      .list
        display flex
        .item
          text-align center
          padding 0 10px
          margin 10px 0 4px
          border-right 1px solid #ccc
          color #9999
        .f-i
          padding-left 0
    .txt
      height 24px
      line-height 24px
      margin-bottom 4px
      .wy, .wf, .yb, .gy
        margin-right 14px
    .right
      .r-list
        display flex
        li
          width 60px
          height 45px
          margin 24px 9px 0 8px
          text-align center
          .logonew
            display block
            float none
            width 50px
            height 45px
            margin 0 auto
            background url('./img/foot_enter_new.png') no-repeat
            background-size 110px 552px
          .logo-amped
            background-position -63px -456.5px
          .logo-auth
            background-position -63px -101px
          .logo-musician
            background-position 0 0
          .logo-reward
            background-position -60px -50px
          .logo-cash
            background-position 0 -101px
a:hover
  text-decoration underline
</style>