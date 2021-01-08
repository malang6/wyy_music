<template>
  <div class="singerTypeCont">
    <div class="title">
      <h3>{{ $route.query.name }}</h3>
    </div>
    <!-- 字母索引 -->
    <ul class="letters" @click="getLetter">
      <li class="letter letter_msg" :data-initial="-1">
        <a :class="{ active: initial == -1 ? 'active' : '' }" :data-initial="-1"
          >热门</a
        >
      </li>
      <li
        class="letter"
        v-for="item in sortLetter"
        :key="item"
        :data-initial="item"
      >
        <a
          :class="{ active: initial == item.toLowerCase(item) ? 'active' : '' }"
          :data-initial="item"
          >{{ item }}</a
        >
      </li>
      <li class="letter letter_msg" :data-initial="0">
        <a :class="{ active: initial == 0 ? 'active' : '' }" :data-initial="0"
          >其他</a
        >
      </li>
    </ul>
    <!-- 歌手列表 -->
    <ul class="list">
      <li class="item" v-for="item in sliceSingerList" :key="item.id">
        <!-- <div class="item_img"></div> -->
        <img v-lazy="item.img1v1Url" class="item_img" alt="" />
        <p>
          <a class="singer" :title="`${item.name}的音乐`">{{ item.name }}</a>
          <a class="logo" :title="`${item.name}的主页`"></a>
        </p>
      </li>
    </ul>
    <!-- 其他歌手 -->
    <div class="other_singer">
      <ul class="other_list">
        <li class="other_item" v-for="item in otherSingerList" :key="item.id">
          <a class="singer_name" :title="`${item.name}的音乐`">{{
            item.name
          }}</a>
          <a class="singer_logo" :title="`${item.name}的主页`"></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SingerTypeCont",
  data() {
    return {
      initial: -1,
    };
  },
  computed: {
    ...mapGetters(["sliceSingerList", "otherSingerList"]),
    sortLetter() {
      let letterArr = [];
      for (let i = 65; i < 90; i++) {
        letterArr.push(String.fromCharCode(i));
      }
      return letterArr;
    },
  },
  methods: {
    ...mapActions(["getSinger"]),
    // 获取字母索引
    getLetter(e) {
      const initial = e.target.getAttribute("data-initial");

      if (!Object.is(initial, null)) {
        const { type, area } = this.$route.query;
        const reg = /^[A-Za-z]+$/;
        if (reg.test(initial)) {
          this.initial = initial.toLowerCase(initial);
        } else {
          this.initial = initial;
        }
        this.getSinger({ type, area, initial: this.initial });
      }
    },
  },
  mounted() {
    const { type, area } = this.$route.query;
    this.getSinger({ type, area, initial: -1 });
  },
};
</script>
<style lang="stylus" scoped>
.singerTypeCont
  width 719px
  margin-bottom 20px
  padding 40px
  border-left 1px solid #d3d3d3
  background-color #fff
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
  .letters
    margin-top 20px
    display flex
    justify-content space-between
    .letter
      margin-left 3px
      font-size 14px
      a
        width 24px
        height 24px
        line-height 24px
        text-align center
      a:hover
        cursor pointer
        text-decoration underline
    .letter_msg
      a
        width 45px
        height 24px
        text-align center
        line-height 24px
    .active
      color #fff
      border-radius 2px
      background-color #c20c0c
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
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
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
        margin-bottom 10px
        .singer_name
          cursor pointer
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        .singer_name:hover
          text-decoration underline
        .singer_logo
          width 17px
          height 18px
          background-image url('../../../assets/images/icon.png')
          background-position 0 -740px
          margin 4px 0 0 2px
</style>