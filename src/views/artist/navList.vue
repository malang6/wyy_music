<template>
  <div class="navList">
    <div class="nav_list">
      <h2 class="title">推荐</h2>
      <ul class="nav">
        <li
          :class="{ active: count == 0 ? 'active' : '' }"
          @click="changeStatus(0)"
        >
          <a>推荐歌手</a>
        </li>
        <li
          :class="{ active: count == 1 ? 'active' : '' }"
          @click="changeStatus(1)"
        >
          <a>入驻歌手</a>
        </li>
      </ul>
      <div class="item" v-for="item in singerList.singerList" :key="item.id">
        <h2 class="title">{{ item.title }}</h2>
        <ul class="nav" @click="selectSingerType">
          <li
            :class="{
              active:
                type == option.type && area == option.area ? 'active' : '',
            }"
            v-for="option in item.options"
            :key="option.type"
            :data-type="option.type"
            :data-area="option.area"
            :data-name="option.name"
          >
            <a
              :data-type="option.type"
              :data-area="option.area"
              :data-name="option.name"
              >{{ option.name }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { default as singerData } from "@utils/singerData";
import { mapActions } from "vuex";
export default {
  name: "NavList",
  data() {
    return {
      singerList: singerData,
      count: JSON.parse(window.sessionStorage.getItem("status"))?.count || 0, // 推荐栏样式控制器
      type: JSON.parse(window.sessionStorage.getItem("status"))?.type || null, // 请求参数
      area: JSON.parse(window.sessionStorage.getItem("status"))?.area || null, // 请求参数
      name: "",
    };
  },

  methods: {
    ...mapActions(["getSinger"]),
    // 持久化存储状态
    saveStatus(num) {
      if (num === 0) {
        let status = {
          count: this.count,
          type: null,
          area: null,
        };
        window.sessionStorage.setItem("status", JSON.stringify(status));
      }
      if (num === 1) {
        let status = {
          count: null,
          type: this.type,
          area: this.area,
        };
        window.sessionStorage.setItem("status", JSON.stringify(status));
      }
    },
    changeStatus(count) {
      this.type = null;
      this.area = null;
      this.count = count;
      count === 0
        ? this.$router.push({ name: "recommond" })
        : this.$router.push({ name: "signed" });
      this.saveStatus(0);
    },
    selectSingerType(e) {
      this.type = e.target.getAttribute("data-type");
      this.area = e.target.getAttribute("data-area");
      this.name = e.target.getAttribute("data-name");
      this.saveStatus(1);
      this.count = null;
      this.$router.push({
        name: "cat",
        query: { type: this.type, area: this.area, name: this.name },
      });
      const { type, area } = this.$route.query;
      this.getSinger({ type, area, initial: -1 });
    },
  },
  mounted() {
    this.saveStatus(0);
  },
};
</script>

<style lang="stylus" scoped>
.nav_list
  padding 0 10px 40px
  margin-top 51px
  .title
    height 25px
    padding-left 14px
    font-size 16px
    font-family 'Microsoft Yahei'
  .nav
    li
      margin-bottom 2px
      width 160px
      height 29px
      line-height 29px
      background-image url('../../assets/images/singer.png')
      background-position 0 -30px
      color #333
      cursor pointer
      a
        width 133px
        padding-left 27px
      a:hover
        text-decoration underline
    .active
      width 160px
      background-image url('../../assets/images/singer.png')
      text-decoration none
      color #c20c0c
      background-position 0 0
  .item
    margin 5px 0 0
    padding-top 16px
    border-top 1px solid #d3d3d3
</style>