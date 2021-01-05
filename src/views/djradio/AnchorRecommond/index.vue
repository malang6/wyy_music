<template>
  <div class="recommond">
    <div class="title">
      <h3>节目排行榜</h3>
      <span class="more">更多 ></span>
    </div>
    <ul class="recommond_list">
      <li class="recommond_item" v-for="item in topList" :key="item.rank">
        <div class="rank">
          <em>0{{ item.rank }}</em>
          <i></i>
        </div>
        <img class="item_img" :src="item.program.coverUrl" />
        <div class="item_desc">
          <div class="desc_top">{{ item.program.name }}</div>
          <div class="desc_bottom">{{ item.program.radio.name }}</div>
        </div>
        <span class="hot">
          <i></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AnchorRecommond",
  props: {
    topList: Array,
  },
};
</script>

<style lang="stylus" scoped>
.recommond
  width 426px
  .title
    height 40px
    border-bottom 2px solid #c20c0c
    h3
      font-size 24px
      font-weight normal
      float left
    .more
      float right
      color #666
      margin-top 14px
      font-size 12px
  .recommond_list
    height 600px
    border 1px solid #e2e2e2
    border-top none
    .recommond_item
      width 424px
      height 40px
      padding 10px 0 10px 0
      line-height 40px
      display flex
    .recommond_item:nth-of-type(even)
      background #f7f7f7
    .rank
      width 47px
      margin 6px 0 0
      text-align center
      line-height normal
      em
        color red
        display block
        width 100%
        text-align center
        font-size 14px
      i
        display inline-block
        overflow hidden
        vertical-align middle
        background-image url('../../../assets/images/icon.png')
        width 16px
        height 17px
        background-position -67px -283px
    .item_img
      width 40px
      height 40px
      background-color red
      margin-left 20px
    .item_desc
      width 254px
      margin 1px 0 0 10px
      line-height 20px
      .desc_top
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      .desc_bottom
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
    .hot
      margin-top 16px
      position relative
      width 100px
      background-position 0 -240px
      line-height normal
      height 8px
      background-image url('../../../assets/images/table.png')
      i
        display block
        height 8px
        overflow hidden
        padding 0 4px
        background-position right -304px
        background-image url('../../../assets/images/table.png')
        width 92%
</style>