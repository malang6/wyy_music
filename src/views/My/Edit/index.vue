<template>
  <div class="edit">
    <div class="title">
      <span>歌单</span>
      <span>></span>
      <span>编辑歌单</span>
    </div>
    <div class="form">
      <div>
        <span class="name">歌单名：</span><input class="songs" type="text" />
      </div>
      <div>
        <span class="name">标签：</span>
        <span class="label">选择标签</span><br />
        <span>选择合适的标签,最多选三个</span>
      </div>
      <div>
        <span class="name">介绍：</span>
        <textarea class="description"></textarea>
      </div>
      <div>
        <span class="save">保 存</span>
        <span class="cancel">取 消</span>
      </div>
    </div>
    <div>
      <img class="img" src="../../../assets/my/images/test.jpg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Edit",
};
</script>

<style lang="stylus" scoped>
.edit
  padding 40px
  font-size 12px
  color #333
  .title
    margin-bottom 30px
    font-size 12px
    height 27px
    border-bottom 1px solid rgb(203, 203, 203)
  .title>span:nth-child(1)
    color #0c73c2
  .title>span:nth-child(2)
    color #999
  .title>span:nth-child(3)
    color #333
    font-weight bold
  .form
    float left
    margin-right 20px
  .form>div
    position relative
    padding-left 62px
    .name
      position absolute
      left 0px
      height 32px
      width 62px
      text-align right
    .name:nth-child(1)
      line-height 32px
    .songs
      outline none
      width 291px
      height 16px
      borderr-radius 3px
      padding 5px 6px 6px 6px
    .label
      color #0c73c2
    .description
      width 302px
      height 122px
      padding 5px 6px 6px 6px
      resize none
      outline none
      border-radius 3px
    .save
      display inline-block
      height 31px
      width 80px
      border-radius 5px
      border 1px solid rgb(219, 219, 219)
      text-align center
      line-height 31px
      margin-right 20px
      margin-top 40px
      background rgb(245, 245, 245)
    .save.active
      background #fff
      box-shadow -2px 2px 2px #999
    .cancel
      display inline-block
      height 31px
      width 80px
      border-radius 5px
      border 1px solid rgb(219, 219, 219)
      text-align center
      line-height 31px
      margin-top 40px
      background #fff
      box-shadow -2px 2px 2px #999
  .form>div:nth-child(1)
    margin-bottom 30px
  .form>div:nth-child(2)
    height 52px
    line-height 30px
  .form>div:nth-child(3)
    margin-top 10px
  .img
    height 140px
    width 140px
</style>
