<template>
  <div class="verCode">
    <div class="verCode-cont" v-if="verify">
      <div class="phone">
        <span>你的手机号：</span>
        <em>+86</em>
        <em>{{phoneNumber}}</em>
      </div>
      <p class="desc">为了安全，我们会给你发送短信验证码</p>
      <div class="code">
        <div class="u-word">
          <input
            type="text"
            class="js-input u-txt u-txt3"
            ref="one"
            v-model="one"
            @input="nextInput('one')"
          />
        </div>
        <div class="u-word">
          <input
            type="text"
            class="js-input u-txt u-txt3"
            ref="two"
            v-model="two"
            @input="nextInput('two')"
          />
        </div>
        <div class="u-word">
          <input
            type="text"
            class="js-input u-txt u-txt3"
            ref="three"
            v-model="three"
            @input="nextInput('three')"
          />
        </div>
        <div class="u-word">
          <input
            type="text"
            class="js-input u-txt u-txt3"
            ref="four"
            v-model="four"
            @input="nextInput('four')"
          />
        </div>
      </div>
      <div class="send">
        <span class="js-cd u-btn u-btn2 f-hide" v-if="second">{{time}}S</span>
        <a href="#" class="js-send u-btn" v-else>
          <i>重新发送</i>
        </a>
      </div>
      <div class="btn" @click="goNext">下一步</div>
    </div>
    <div class="tips" v-else>
      <p>
        该手机号已与云音乐账号
        <strong>{{nickName}}</strong>绑定，以后你可以直接用该手机号+密码登录
      </p>
      <div class="knowBtn" @click="doLogin">知道了</div>
    </div>
  </div>
</template>

<script>
import { smsCode, verifyCode, rejister, verifyPhone } from "@api/login";
export default {
  name: "VerCode",
  data() {
    return {
      second: true, //显示倒计时间
      phoneNum: this.phone,
      time: 59,
      one: "",
      two: "",
      three: "",
      four: "",
      verify: true,
      nickName: "", //昵称
    };
  },
  props: {
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  watch: {
    one: {
      handler(newVal) {
        if (newVal.length > 1) {
          this.one = newVal.slice(0, 1);
        }
      },
    },
    two: {
      handler(newVal) {
        if (newVal.length > 1) {
          this.two = newVal.slice(0, 1);
        }
      },
    },
    three: {
      handler(newVal) {
        if (newVal.length > 1) {
          this.three = newVal.slice(0, 1);
        }
      },
    },
    four: {
      handler(newVal) {
        if (newVal.length > 1) {
          this.four = newVal.slice(0, 1);
        }
      },
    },
  },
  computed: {
    //处理手机号
    phoneNumber() {
      let { phoneNum } = this;
      let tmp = "****";
      phoneNum = phoneNum.replace(/\d{4}(?=\d{4}$)/g, tmp);
      return phoneNum;
    },
    //处理验证码
    captcha() {
      let { one, two, three, four } = this;
      let str = one + two + three + four;
      return str;
    },
  },
  methods: {
    //生产随机nickname
    randomWord(randomFlag, min, max) {
      var str = "",
        range = min,
        arr = [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
        ];
      // 随机产生
      if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
      }
      for (var i = 0; i < range; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
      }
      return str;
    },
    // 点击下一步
    async goNext() {
      let { phoneNum, captcha } = this;
      phoneNum = +phoneNum;
      let res;
      res = await verifyCode(phoneNum, captcha);
      if (res.data) {
        res = await verifyPhone(phoneNum);
        let { nickname } = res.data;
        this.nickName = nickname;
        nickname = this.randomWord(true, 10, 22);
        if (!res.data.exist) {
          res = await rejister({
            phoneNum: this.phoneNum,
            captcha,
            password: this.password,
          });
        } else {
          res = await rejister({
            phone: this.phoneNum,
            captcha,
            password: this.password,
            nickname,
          });
          console.log(res);
          this.verify = false;
        }
      }
    },
    //点击我知道了，登录
    doLogin() {
      this.$store.commit("CHANGE_SHOW", false);
      this.$store.dispatch("getUserInfo", {
        phone: this.phoneNum,
        password: this.password,
      });
    },
    //自动跳到下一个input框事件
    nextInput(num) {
      if (num === "one") {
        this.$refs.one.blur();
        this.$refs.two.focus();
      }
      if (num === "two") {
        this.$refs.two.blur();
        this.$refs.three.focus();
      }
      if (num === "three") {
        this.$refs.three.blur();
        this.$refs.four.focus();
      }
      if (num === "four") {
        this.$refs.four.blur();
      }
    },
  },
  async mounted() {
    let { phoneNum } = this;
    phoneNum = +phoneNum;
    await smsCode(phoneNum);
    let timer = setInterval(() => {
      this.time = this.time - 1;
      if (this.time < 1) {
        clearInterval(timer);
        this.second = false;
      }
    }, 1000);
    this.$refs.one.focus();
  },
};
</script>

<style lang="stylus" scoped>
.verCode
  background-color #fff
  .verCode-cont
    padding 30px 0 43px
    width 220px
    margin 0 auto
    .phone
      margin-bottom 10px
      span
        color #666
      em
        font-size 12px
        color #333
        font-weight bold
        margin-right 5px
    .desc
      margin-bottom 20px
      color #666
    .code
      display flex
      position relative
      padding-top 30px
      .u-word
        content ''
        position relative
        bottom 0
        width 50px
        height 2px
        margin-right 10px
        background-color rgba(0, 0, 0, 0.1)
        &::after
          content ''
          position absolute
          bottom 0
          width 0px
          height 2px
          background-color #B82712
          transition width 200ms ease-in-out
          -webkit-transition width 200ms ease-in-out
        .u-txt3
          position absolute
          top -30px
          left -10px
          width 24px
          margin 0 13px
          border none
          font-size 24px
          outline none
        .u-txt
          height 19px
          text-align center
          padding 5px 6px 6px
          border-radius 2px
          line-height 19px
          box-sizing content-box
    .send
      display flex
      justify-content flex-end
    .u-btn
      display inline-block
      margin-top 6px
      margin-right 5px
      color #0C73C2
      font-size 12px
      line-height 18px
    .u-btn2
      padding 0 5px 0 0
      white-space nowrap
    .btn
      width 100%
      height 31px
      line-height 31px
      margin-top 10px
      text-align center
      border-radius 4px
      background-color #0C73C2
      margin-top 20px
      color #fff
      cursor pointer
  .tips
    padding 50px 50px 0
    p
      font-size 16px
      color #333
      padding 0 20px
      line-height 30px
      text-align center
      strong
        font-size 16px
    .knowBtn
      width 81px
      height 35px
      line-height 35px
      text-align center
      background #0c73c2
      color #ffffff
      margin 30px auto
      border-radius 5px
</style>