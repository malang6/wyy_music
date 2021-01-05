<template>
  <div class="container">
    <!-- 优秀新电台 -->
    <section class="good">
      <h3>优秀新电台</h3>
      <ul class="nav_list">
        <li class="item" v-for="item in slicedGoodAnchorList" :key="item.id">
          <!-- <div class="item_img"></div> -->
          <img v-lazy="item.picUrl" alt="" class="item_img" />
          <p class="name">{{ item.name }}</p>
          <p class="desc">{{ item.rcmdtext }}</p>
        </li>
      </ul>
    </section>

    <!-- 电台排行榜 -->
    <section class="rank_list">
      <div class="title">
        <h3>电台排行榜</h3>
        <div class="select">
          <span
            :class="{ top: 'top', active: status ? '' : 'active' }"
            @click="handleChange(0)"
            >上升最快</span
          >
          <span
            :class="{ hot: 'hot', active: status ? 'active' : '' }"
            @click="handleChange(1)"
            >最热电台</span
          >
        </div>
      </div>
      <ShowList></ShowList>
      <!-- 页面 -->
      <!-- <Pagination></Pagination> -->
      <div class="pagaination">
        <el-pagination
          background
          :page-size="30"
          :pager-count="9"
          layout="prev, pager, next"
          :total="990"
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import ShowList from "./showList";

export default {
  name: "Category",
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    ...mapGetters(["slicedGoodAnchorList"]),
    ...mapState({
      status: (state) => state.goodAnchorList.status,
      newTopList: (state) => state.goodAnchorList.newTopList,
    }),
  },
  methods: {
    ...mapActions(["getNewTopList", "getHotRadioList", "getGoodAnchorList"]),
    ...mapMutations(["SAVE_STATUS"]),
    async handleChange(count) {
      if (count === 0) {
        this.getNewTopList({ type: "new", limit: 30 });
        this.SAVE_STATUS(count);
      }
      if (count === 1) {
        this.getHotRadioList({
          cateId: this.$route.query.id,
          limit: 30,
          offset: 1,
        });
        this.SAVE_STATUS(count);
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.status === 0) {
        this.getNewTopList({
          type: "new",
          limit: 30,
          offset: (this.currentPage - 1) * 30,
        });
        return;
      }
      if (this.status === 1) {
        this.getHotRadioList({
          cateId: this.$route.query.id,
          limit: 30,
          offset: (this.currentPage - 1) * 30,
        });
        return;
      }
    },
  },
  mounted() {
    this.getGoodAnchorList(this.$route.query.id);
    this.getNewTopList({
      type: "new",
      limit: 30,
      offset: (this.currentPage - 1) * 30,
    });
  },
  components: {
    ShowList,
    // Pagination,
  },
};
</script>

<style lang="stylus" scoped>
.container
  margin-top 10px
  .good
    margin 0 40px
    h3
      height 40px
      border-bottom 2px solid #c20c0c
      font-size 24px
      font-weight normal
    .nav_list
      margin 16px 0 0 -37px
      display flex
      justify-content space-between
      .item
        width 150px
        margin-left 37px
        .item_img
          width 150px
          height 150px
        .name
          font-size 14px
          margin 13px 0 6px
          line-height 16px
          font-weight normal
        .desc
          line-height 18px
          color #999
          overflow hidden
          text-overflow ellipsis
          -webkit-box-orient vertical
          -webkit-line-clamp 2
  .rank_list
    margin 0 40px
    margin-top 40px
    .title
      display flex
      justify-content space-between
      border-bottom 2px solid #C20C0C
      padding 10px 0px
      h3
        font-size 24px
        font-weight normal
      .select
        margin 12px 0 0 20px
        .active
          color #c20c0c
        .top::after
          content '|'
          margin 0 10px
    .pagaination
      margin 20px 0
      text-align center
      display flex
      justify-content center
</style>
