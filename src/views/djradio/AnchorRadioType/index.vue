<template>
  <div class="radio_type">
    <header class="title">
      <h3>{{ recommondData[0] ? recommondData[0].category : "" }}·电台</h3>
      <span class="more">更多></span>
    </header>
    <section class="radio_cont">
      <div
        class="item"
        v-for="item in recommondData.slice(0, 4)"
        :key="item.id"
      >
        <img class="item_img" v-lazy="item.dj.avatarUrl" />
        <div class="item_desc">
          <h4>{{ item.name }}</h4>
          <p>{{ item.rcmdtext }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "RadioType",
  props: {
    recommondData: Array,
  },
};
</script>

<style lang="stylus" scoped>
.radio_type
  margin-top 35px
  .title
    height 40px
    border-bottom 2px solid #c20c0c
    display flex
    justify-content space-between
    h3
      font-size 24px
      font-weight normal
    .more
      font-size 12px
      margin-top 14px
  .radio_cont
    margin-left -30px
    display flex
    flex-wrap wrap
    .item
      width 435px
      height 120px
      margin-left 30px
      padding 20px 0
      border-top 1px solid #e7e7e7
      flex-grow 1
      display flex
      .item_img
        width 120px
        height 120px
      .item_desc
        margin-left 30px
        h4
          margin 16px 0 20px
          font-size 18px
        p
          margin-bottom 6px
          line-height 20px
          color #999
</style>