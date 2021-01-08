<template>
  <div class="radio-outer">
    <div class="title">我订阅的电台({{collectRadio.length}})</div>
    <div class="item" v-for="item in collectRadio" :key="item.id">
      <img class="img" :src="item.image" alt="图片" />
      <em class="superscript" v-if="item.newProgramCount" >{{item.newProgramCount}}</em>
      <div class="detail">
        <div class="name">{{item.name}}</div>
        <div class="author">by {{item.nickName}}</div>
      </div>
      <div class="count">{{item.programCount}}期</div>
    </div>
  </div>
</template>

<script>
import { mapActions,mapGetters } from "vuex";
export default {
  name: "Radio",
  computed:{
    ...mapGetters(["collectRadio"])
  },
  methods: {
    ...mapActions(["getRadio"]),
  },
  mounted() {
    //获取电台列表
    this.getRadio();
  },
};
</script>

<style lang="stylus" scoped>
.radio-outer
  padding 40px
  .title
    margin-top 20px
    font-size 24px
    height 42px
    width 660px
    border-bottom 2px solid #c20c0c
  .item
    padding 10px 0
    height 50px
    display flex
    align-items center
    position relative
    .img
      width 50px
      height 50px
    .superscript
      background-color rgb(217, 49, 49)
      font-style normal
      border-radius 7px
      height 14px
      padding 0 3px
      font-size 12px
      font-weight bold
      color #fff
      text-align center
      line-height 14px
      position absolute
      top 2px
      left 42px
    .detail
      margin-left 10px
      padding-right 57px
      width 488px
      .name
        font-size 14px
        color #333
        height 24px
      .author
        font-size 12px
        color #999
        height 24px
    .count
      margin-left 10px
      font-size 12px
      color #999
</style>
