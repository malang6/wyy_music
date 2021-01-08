<template>
  <div class="uFollow">
    <div class="uFollow">
      <h3 class="l-follow">{{this.$route.name === "follows" ? '关注':'粉丝'}}({{followList.length}})</h3>
      <ul class="uf-content">
        <li
          v-for="item in followList"
          :key="item.userId"
          :class="lastList.indexOf(item) !== -1 ? 'last':''"
        >
          <a href="###" class="avaimg">
            <img :src="item.avatarUrl" />
          </a>
          <div class="info">
            <p class="name">
              <a href="###">{{item.nickname}}</a>
              <i class="icn u-icn u-icn-s-00"></i>
            </p>
            <div class="p-3">
              <p>
                <a href="###">
                  动态
                  <em class="s-cf7">{{item.eventCount}}</em>
                </a>
                <span class="line">|</span>
              </p>
              <p>
                <a href="###">
                  关注
                  <em class="s-cf7">{{item.follows}}</em>
                </a>
                <span class="line">|</span>
              </p>
              <p>
                <a href="###">
                  粉丝
                  <em class="s-cf7">{{item.followeds}}</em>
                </a>
              </p>
            </div>
            <p class="s-fc3 f-thide">{{item.signature}}</p>
          </div>
          <div class="oper">
            <a class="u-btn u-btn-7 f-tdn" v-if="item.mutual" @click="handleClick(item.userId)">
              <i>发私信</i>
            </a>
            <a class="u-btn u-btn-8 f-tdn" v-else>
              <i class="u-txt-8">关注</i>
            </a>
            <p class="s-fc4" v-if="item.mutual">
              <i class="u-icn u-icn-66"></i>
              相互关注
            </p>
          </div>
        </li>
      </ul>
    </div>
    <SendMsg
      v-if="showSend"
      :checkedId="checkedId"
      :followList="followList"
      :showSend.sync="showSend"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import SendMsg from "./SendMsg";
export default {
  name: "UFollow",
  data() {
    return {
      showSend: false,
      checkedId: 0,
    };
  },
  watch: {
    $route: {
      handler() {
        let urlName = this.$route.name;
        this.getFollowList(urlName);
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      followedsList: (state) => state.userInfo.followedsList,
      followedList: (state) => state.userInfo.followedList,
    }),
    //遍历展示的列表
    followList() {
      let followList =
        this.$route.name === "follows" ? this.followedList : this.followedsList;
      return followList;
    },
    //获取数组倒数两位
    lastList() {
      const lastList = this.followList.slice(-2);
      return lastList;
    },
  },
  methods: {
    ...mapActions(["getFollowedsList", "getFollowedList"]),
    //获取列表信息
    getFollowList(urlName) {
      const { id } = this.$route.query;
      if (urlName === "follows") {
        this.getFollowedList(id);
      }
      if (urlName === "fans") {
        this.getFollowedsList(id);
      }
    },
    handleClick(id) {
      this.showSend = true;
      this.checkedId = id;
    },
  },
  components: {
    SendMsg,
  },
};
</script>

<style lang="stylus" scoped>
.uFollow
  margin-top 30px
  .uFollow
    h3.l-follow
      font-size 20px
      color #666
      line-height 28px
      font-weight normal
      border-bottom 2px solid #c20c0c
      padding-bottom 6px
    .uf-content
      display flex
      width 900px
      flex-wrap wrap
      border-left 1px solid #d5d5d5
      li.last
        border-bottom 1px solid #d5d5d5
      li
        display flex
        width 409px
        height 80px
        padding 20px 20px 0 20px
        border-right 1px solid #d5d5d5
        &:nth-of-type(3n), &:nth-of-type(4n)
          background-color #fafafa
        .avaimg
          img
            width 60px
            height 60px
        .info
          width 255px
          margin-left 10px
          p.name
            a
              font-size 14px
              display inline-block
              color #0c73c2
              max-width 235px
              vertical-align middle
          .p-3
            display flex
            margin-bottom 6px
            p
              a
                &:hover
                  text-decoration underline
                em
                  color #0c73c2
              span
                margin 0 8px
                color #999
          .f-thide
            margin-bottom 6px
            color #666
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
        .oper
          p
            margin-top 5px
            text-align center
            color #999
            .u-icn
              display inline-block
              overflow hidden
              vertical-align middle
              background url('../img/button.png') no-repeat 0 0
            .u-icn-67
              width 13px
              height 10px
              background-position -60px -470px
          .u-btn
            background url('../img/button.png') no-repeat 0 0
          .u-btn-7
            background-position 0 -810px
            &:hover
              background-position 0 -845px
          .u-btn-8
            background-position 0 -720px
            &:hover
              background-position -80px -720px
          .f-tdn
            display inline-block
            width 75px
            height 31px
            text-decoration none
            cursor pointer
            i
              display inline-block
              height 29px
              line-height 29px
              padding-left 30px
              text-align left
              &.u-txt-8
                color #fff
</style>