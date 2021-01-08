<template>
  <div class="userInfo">
    <div class="avat">
      <img :src="userInfo.avatarUrl" alt="头像" />
    </div>
    <div class="userContent">
      <div class="u-title">
        <div class="u-name">
          <span class="name">{{userInfo.nickname}}</span>
          <img src="../img/lv.png" alt="lv" class="lv" />
          <img src="../img/sex.png" alt="sex" class="sex" />
        </div>
        <div class="edit">
          <a href="##">编辑个人资料</a>
        </div>
      </div>
      <div class="info-content">
        <ul class="info-list">
          <li class="one hv" @click="$router.push({name:'event',query:{id}})">
            <a>
              <span class="num">{{userEventList.length}}</span>
              <span>动态</span>
            </a>
          </li>
          <li class="hv" @click="$router.push({name:'follows',query:{id}})">
            <a>
              <span class="num">{{userInfo.follows}}</span>
              <span>关注</span>
            </a>
          </li>
          <li class="hv" @click="$router.push({name:'fans',query:{id}})">
            <a>
              <span class="num">{{userInfo.followeds}}</span>
              <span>粉丝</span>
            </a>
          </li>
        </ul>
        <p>
          <span class="area">所在地区：广东省 - 深圳市</span>
          <span>年龄：95后</span>
        </p>
        <p class="wb-cont">
          <span>社交网络:</span>
          <img src="../img/wb.png" alt="wb" class="wb-img" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "UHeader",
  data() {
    return {
      id: "",
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo.userInfo,
      userEventList: (state) => state.userInfo.userEventList,
    }),
  },
  methods: {
    ...mapActions([
      "getUserInfo",
      "getUserEventList",
    ]),
  },
  mounted() {
    const { id } = this.$route.query;
    this.id = id;
    this.getUserInfo(id);
    this.getUserEventList(id);
  },
};
</script>

<style lang="stylus" scoped>
.userInfo
  display flex
  border-bottom 43px
  .avat
    img
      padding 3px
      border 1px solid #ccc
      width 180px
      height 180px
      margin-right 50px
  .userContent
    width 670px
    .u-title
      display flex
      justify-content space-between
      width 100%
      height 36px
      line-height 36px
      margin-bottom 10px
      padding-bottom 10px
      border-bottom 1px solid #ddd
      .u-name
        margin-bottom 10px
        .name
          margin-top 3px
          font-size 22px
        .lv
          width 56px
          height 22px
          margin-left 15px
        .sex
          width 20px
          height 20px
          margin-left 6px
      .edit
        width 112px
        height 30px
        line-height 31px
        border-radius 5px
        text-align center
        border 1px solid #ddd
        box-shadow 0 2px 5px rgba(0, 0, 0, 0.2)
        background-color #f3f3f3
        &:hover
          cursor pointer
          background-color #f7f7f7
    .info-content
      .info-list
        display flex
        margin-bottom 20px
        li
          width 26px
          height 39px
          padding-left 20px
          padding-right 40px
          border-right 1px solid #ddd
          &.one
            padding-left 0
          &.hv
            cursor pointer
          &:hover a
            color #0c73c2
          a
            display flex
            flex-direction column
            .num
              margin-top -4px
              font-size 24px
      p
        margin-bottom 10px
        .area
          margin-right 20px
      .wb-cont
        display flex
        align-items center
        .wb-img
          width 24px
          height 24px
          margin-left 10px
</style>