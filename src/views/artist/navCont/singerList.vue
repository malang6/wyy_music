<template>
  <div class="singer_list">
    <div class="title">
      <template v-if="$route.path === '/discover/artist/recommond'">
        <slot></slot>
      </template>
      <template v-else>
        <h3>入驻歌手</h3>
      </template>
    </div>
    <ul class="list" v-if="$route.path === '/discover/artist/recommond'">
      <li
        class="item"
        v-for="item in indent === 'settleIn'
          ? sliceSingerList
          : sliceHotSingeList"
        :key="item.id"
      >
        <img v-lazy="item.img1v1Url" alt="" class="item_img" />
        <p>
          <a class="singer" :title="`${item.name}的音乐`">{{ item.name }}</a>
          <a class="logo" :title="`${item.name}的主页`"></a>
        </p>
      </li>
    </ul>
    <ul class="list" v-else>
      <li class="item" v-for="item in singerList" :key="item.id">
        <img v-lazy="item.img1v1Url" alt="" class="item_img" />
        <p>
          <a class="singer" :title="`${item.name}的音乐`">{{ item.name }}</a>
          <a class="logo" :title="`${item.name}的主页`"></a>
        </p>
      </li>
    </ul>
    <div class="other_singer" v-if="indent === 'hotSinger'">
      <ul class="other_list">
        <li class="other_item" v-for="item in otherHotSinger" :key="item.id">
          <a class="singer_name" title="`${item.name}的音乐`">{{
            item.name
          }}</a>
          <a class="singer_logo" title="`${item.name}的主页`"></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "SingerList",
  props: {
    indent: String,
  },
  computed: {
    ...mapGetters(["sliceSingerList", "sliceHotSingeList", "otherHotSinger"]),
    ...mapState({
      singerList: (state) => state.singer.singerList,
    }),
  },
  methods: {
    ...mapActions(["getSinger", "getHotSingerList"]),
  },
  mounted() {
    this.getSinger({ type: -1, area: -1 });
    this.getHotSingerList();
  },
};
</script>

<style lang="stylus" scoped>
.singer_list
  width 719px
  margin-bottom 20px
  // background-color #FFFFFF
  .title
    heigth 40px
    border-bottom 2px solid #c20c0c
    display flex
    justify-content space-between
    padding-bottom 10px
    h3
      font-size 24px
      font-weight normal
    .more
      margin-top 14px
    .more:hover
      text-decoration underline
      cursor pointer
  .list
    margin-top 20px
    display flex
    flex-wrap wrap
    justify-content space-between
    .item
      width 130px
      height 170px
      overflow hidden
      line-height 1.4
      padding-right 13px
      .item_img
        width 130px
        height 130px
      p
        margin-top 8px
        display flex
        justify-content space-between
        a
          cursor pointer
          color #666
        .logo
          width 17px
          height 18px
          background-image url('../../../assets/images/icon.png')
          background-position 0 -740px
  .other_singer
    margin-top 12px
    border-top 1px dotted #999
    padding-top 10px
    .other_list
      display flex
      flex-wrap wrap
      justify-content space-between
      .other_item
        width 130px
        height 30px
        padding-bottom 0
        line-height 23px
        display flex
        .singer_name
          cursor pointer
        .singer_name:hover
          text-decoration underline
        .singer_logo
          width 17px
          height 18px
          background-image url('../../../assets/images/icon.png')
          background-position 0 -740px
          margin 4px 0 0 2px
</style>
