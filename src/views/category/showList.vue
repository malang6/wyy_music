<template>
  <ul class="list">
    <li
      class="item"
      v-for="item in status ? hotRadioList : newTopList"
      :key="item.id"
    >
      <img v-lazy="item.picUrl" class="item_img" alt="" />
      <div class="item_cont">
        <h3>{{ item.name }}</h3>
        <p class="author">
          <i class="iconfont icon-user"></i>
          <span class="name">{{ item.dj.nickname }}</span>
        </p>
        <p class="period">
          <span>共{{ item.programCount }}期</span>
          <span>订阅{{ item.subCount }}次</span>
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ShowList",

  computed: {
    ...mapState({
      newTopList: (state) => state.goodAnchorList.newTopList,
      status: (state) => state.goodAnchorList.status,
      hotRadioList: (state) => state.goodAnchorList.hotRadioList,
    }),
  },
};
</script>

<style lang="stylus" scoped>
.list
  display flex
  justify-content space-between
  flex-wrap wrap
  .item
    width 435px
    height 120px
    padding 20px 0
    border-bottom 1px solid #e7e7e7
    display flex
    .item_img
      width 120px
      height 120px
    .item_cont
      margin-left 20px
    h3
      height 64px
      margin 0
      line-height 64px
      font-size 18px
    .author
      margin-bottom 6px
      line-height 20px
    .name
      margin-left 5px
    .period
      color #999
      span:nth-child(1)
        margin-right 10px
</style>