<template>
  <div class="anchor_header">
    <ul class="anchor_list">
      <li
        class="item"
        v-for="item in categories"
        :key="item.id"
        @click="changeStatus(item.id)"
      >
        <a
          :style="{
            color: $route.query.id == item.id ? '#d35757' : '',
            backgroundImage:
              $route.query.id == item.id ? `url(${backgroundImgUrl})` : '',
            backgroundPosition: $route.query.id == item.id ? '-70px 0px' : '',
          }"
        >
          <div
            class="icon"
            :style="{
              backgroundImage: `url(${item.picWebUrl})`,
              backgroundPosition: $route.query.id == item.id ? '-48px 0px' : '',
            }"
          ></div>
          <em>{{ item.name }}</em>
        </a>
      </li>
      <li class="item">
        <a>
          <div class="icon question"></div>
          <em>常见问题</em>
        </a>
      </li>
      <li class="item">
        <a>
          <div class="icon apply"></div>
          <em>我要做主播</em>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { cateList } from "../../../api/djradio";
import { mapActions } from "vuex";
export default {
  name: "Anchor_header",
  data() {
    return {
      categories: [], //电台类型
      backgroundImgUrl: "",
    };
  },
  methods: {
    ...mapActions(["getGoodAnchorList"]),
    changeStatus(id) {
      this.backgroundImgUrl = "/images/radio_bg.png";
      this.getGoodAnchorList(id);
      this.$router.push({ name: "category", query: { id } });
    },
  },
  async mounted() {
    const categories = await cateList();
    this.categories = categories.data.categories;
  },
};
</script>

<style lang="stylus" scoped>
.anchor_header
  width 900px
  overflow hidden
  max-height 194px
  margin 0 auto
  .anchor_list
    margin-left -33px
    li
      float left
      margin 0 0 25px 33px
    a
      display block
      width 70px
      height 70px
      text-align center
      color #888
      background-color #fff
    a:hover
      background-image url('../../../assets/images/radio_bg.png')
      background-position 0 0
    .icon
      width 48px
      height 48px
      margin 2px auto 0
      background-position 0 0
    em
      margin-top -3px
    .question
      background-image url('../../../assets/images/radio_faq.png')
    .apply
      background-image url('../../../assets/images/radio_apply (3).png')
</style>