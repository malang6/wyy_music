<template>
  <div class="program">
    <div class="title">
      <h3>推荐节目</h3>
      <span class="more">更多 ></span>
    </div>
    <ul class="program_list">
      <li class="program_item" v-for="item in recommondList" :key="item.id">
        <img v-lazy="item.picUrl" alt="" class="item_img" />
        <div class="item_desc">
          <div class="desc_top">{{ item.name }}</div>
          <div class="desc_bottom">{{ item.rcmdtext }}</div>
        </div>
        <a class="type">{{ item.category }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AnchorContent",
  props: {
    recommondList: Array,
  },
};
</script>

<style lang="stylus" scoped>
.program
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
.program_list
  height 600px
  border 1px solid #e2e2e2
  border-top none
  .program_item
    width 424px
    height 40px
    padding 10px 0 10px 0
    line-height 40px
    display flex
    .item_img
      width 40px
      height 40px
      margin-left 20px
    .item_desc
      width 254px
      margin 1px 0 0 10px
      line-height 20px
      .desc_top .desc_bottom
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
    .type
      margin 1px 0 0 10px
      font-size 12px
      color #999
      border 1px solid #999
      overflow hidden
      height 16px
      padding 0 6px
      line-height 16px
      vertical-align middle
      display inline-block
      position relative
      top 50%
      margin-top -8px
  .program_item:nth-of-type(even)
    background #f7f7f7
</style>