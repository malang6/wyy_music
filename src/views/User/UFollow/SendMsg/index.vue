<template>
  <div class="sendMsg">
    <div class="send-container">
      <div class="send-bar">
        <span class="bar-title">发送私信</span>
        <span class="close" @click="$emit('update:showSend',false)">X</span>
      </div>
      <div class="send-content">
        <div class="name-cont">
          <div class="name-content">
            <div
              class="name-check"
              v-for="(list,index) in calcList"
              :key="index"
              :style="{left:100*index+'px'}"
            >
              <span>{{list.nickname}}</span>
              <span class="name-close" @click="closeName(list)">x</span>
            </div>
          </div>
          <div class="inpt-txt">
            <input type="text" class="name-c" @focus="inputfocus=true" />
            <label v-show="!inputfocus">选择或输入好友昵称</label>
            <ul v-if="inputfocus">
              <li
                v-for="item in calcFollowList"
                :key="item.userId"
                @click="handleCheck(item.userId)"
              >
                <img :src="item.avatarUrl" />
                <span>{{item.nickname}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="txt-area">
          <textarea v-model="txtArea"></textarea>
          <div class="send-bottom">
            <span>{{count!==0?count:'字数已达最大限制'}}</span>
            <span class="btn-send" @click="sendMsg">
              <i>发送</i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendText } from "@api/userHome";
export default {
  name: "SendMsg",
  data() {
    return {
      inputfocus: false,
      count: 200,
      txtArea: "", //文本框输入内容
      list: this.followList,
    };
  },
  props: {
    checkedId: {
      type: Number,
    },
    followList: {
      type: Array,
    },
  },
  watch: {
    //监视文本框输入的字数
    txtArea(newVal) {
      if (this.count === 0) {
        this.txtArea = newVal.slice(0, 200);
        return;
      }
      let count = 200;
      this.count = count - newVal.length;
    },
  },
  computed: {
    firstName() {
      let firstName = this.list.find((item) => item.userId === this.checkedId);
      return firstName.nickname;
    },
    calcFollowList: {
      get() {
        let calcFollowList = this.list.filter(
          (item) => item.userId !== this.checkedId
        );
        return calcFollowList;
      },
    },
    calcList() {
      let calcFollow = this.calcFollowList.map((item) => item.userId);
      let calcList = this.followList.filter((item) => {
        if (!calcFollow.includes(item.userId)) return item;
      });
      return calcList;
    },
    //处理Id
    sendId() {
      let id = "";
      let arr = this.calcList.map((item) => item.userId);
      id = arr.join(",");
      return id;
    },
  },
  methods: {
    // handleBlur() {
    //   this.inputfocus = false;
    // },

    handleCheck(id) {
      // console.log(id);
      this.list = this.list.filter((item) => item.userId !== id);
      this.inputfocus = false;
    },

    closeName(list) {
      const res = this.followList.find((item) => item.userId === list.userId);
      this.list.push(res);
    },

    //发送私信
    async sendMsg() {
      let { txtArea } = this;
      if (!txtArea) return;
      let id = this.sendId;
      await sendText(id, txtArea);
      this.$emit("update:showSend", false);
      this.$emit("changeShowSuccess")
    },
  },
};
</script>

<style lang="stylus" scoped>
.sendMsg
  position relative
  .send-container
    position absolute
    top -442px
    left 214px
    width 480px
    border-radius 4px
    box-shadow 0 5px 16px rgba(0, 0, 0, 0.8)
    background-color #fff
    .send-bar
      display flex
      justify-content space-between
      align-items center
      padding 0 10px
      color #fff
      width 100%
      height 38px
      font-size 14px
      border-radius 4px
      box-sizing border-box
      border-bottom-left-radius 0
      border-bottom-right-radius 0
      background-color #2d2d2d
      .bar-title
        font-weight bold
      .close
        cursor pointer
    .send-content
      padding 20px 40px 30px
      .name-cont
        position relative
        padding 5px 6px 6px
        border 1px solid #ccc
        height 30px
        box-sizing border-box
        margin-bottom 12px
        .name-content
          display flex
          align-items center
          .name-check
            display flex
            align-items center
            position absolute
            width 80px
            z-index 20
            top 3px
            background #f2f2f2
            padding 2px 5px
            margin 0 5px 5px 0
            border-radius 2px
            color #666
            span:nth-of-type(1)
              display inline-block
              width 70px
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              margin-right 2px
            .name-close
              margin-top -3px
            .name-close:hover
              cursor pointer
        .inpt-txt
          position relative
          .name-c
            position absolute
            z-index 10
            width 100%
            height 20px
            text-indent 90px
            border none
            outline none
            background transparent
          label
            position absolute
            top 2px
            left 104px
            color #999
          ul
            width 420px
            border 1px solid #999
            position absolute
            z-index 10
            top 24px
            left -7px
            li:nth-of-type(even)
              background-color #fff
            li
              position relative
              z-index 99
              display flex
              align-items center
              width 100%
              height 42px
              line-height 42px
              background #eee
              text-decoration none
              color #333
              box-sizing border-box
              padding 2px 6px 6px
              &:hover
                background #eee
                cursor pointer
              img
                width 30px
                height 30px
                margin-right 10px
      .txt-area
        position relative
        padding-bottom 40px
        textarea
          width 400px
          height 64px
          padding 5px 6px 6px
          box-sizing border-box
          resize none
          outline none
          border-color #ccc
        .send-bottom
          position absolute
          top 80px
          right 0
          span
            color #ccc
          span.btn-send
            display inline-block
            width 46px
            height 26px
            line-height 26px
            text-align center
            border-radius 4px
            background-color #3181cd
            color #fff
            margin-left 10px
            cursor pointer
            &:hover
              background-color #4497da

</style>