<template>
  <div class="phoneLogin">
    <div class="container">
      <div class="phone">
        <div class="ph-bar">
          <a class="current" @click="isShow=true">
            <span>+{{code?code:'86'}}</span>
            <span class="icn u-icn2 u-icn2-17"></span>
          </a>
          <input
            type="text"
            placeholder="请输入手机号"
            v-model="phone"
            :class="msg?'redtxt':''"
            @focus="msg=''"
          />
        </div>
        <ul class="ph-con" :class="isShow?'show':''" @click="chooseCountry">
          <li class="ph-item" v-for="(item,index) in country" :key="index" :data-index="index">
            <span>{{item.zh}}</span>
            <span>{{item.code}}</span>
          </li>
        </ul>
      </div>
      <div class="pwd">
        <input type="password" placeholder="请输入密码" v-model="password" />
      </div>
      <div class="check">
        <span class="left">
          <input type="checkbox" class="checked" />
          <span>自动登录</span>
        </span>
        <span class="right">忘记密码？</span>
      </div>
      <p v-if="msg" class="errorMsg">{{msg}}</p>
      <div class="btn" @click="login">
        <a>登 录</a>
      </div>
    </div>
    <div class="bottom">
      <span class="other-l" @click="$emit('update:isPhoneLogin', false)">
        <a>《 其他登录方式</a>
      </span>
      <span>
        <a>没有账号？免费注册 ></a>
      </span>
    </div>
  </div>
</template>

<script>
import { getCountryList } from "@api/login";
export default {
  name: "PhoneLogin",
  data() {
    return {
      countryList: [], //国家列表
      code: "", //国家码
      isShow: false, //是否显示列表
      phone: "", //手机号
      password: "", //密码
      msg: "", //错误提示
    };
  },
  props: {
    isPhoneLogin: {
      type: Boolean,
    },
  },
  computed: {
    country() {
      let countryArr = [];
      this.countryList.forEach((item) => {
        item.countryList.forEach((i) => countryArr.push(i));
      });
      return countryArr;
    },
  },
  methods: {
    //选则城市
    chooseCountry(event) {
      const { index } = event.target.dataset;
      // console.log(event.target, index);
      // console.log(this.country[index]);
      let code = (this.country[index] ? this.country[index] : []).code;
      this.code = code;
      this.isShow = false;
    },
    //登录
    login() {
      // let newTimeTemp = new Date().getTime();
      // let { oldTimeTemp } = this.$store.state;
      // if (newTimeTemp - oldTimeTemp < 120000) {
      //   this.msg = "请在两分钟之后再点击";
      //   return;
      // }
      let { phone, password } = this;
      if (
        !/^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/.test(phone)
      ) {
        return (this.msg = "请输入正确的手机号");
      }
      phone = +phone;

      this.$store.dispatch("getUserInfo", { phone, password });
      if (this.$store.state.token) return;
      this.$store.commit("CHANGE_SHOW", false);
     
    },
  },
  async mounted() {
    const res = await getCountryList();
    this.countryList = res.data.data;
  },
};
</script>

<style lang="stylus" scoped>
.phoneLogin
  background-color #fff
  .container
    padding 30px 0 43px
    width 220px
    margin 0 auto
    .phone
      .ph-bar
        display flex
        .current
          position relative
          display block
          height 29px
          line-height 30px
          padding 0 18px 0 5px
          border 0.5px solid #767676
          border-right none
          &:hover
            cursor pointer
          .icn
            position absolute
            top 14px
            right 7px
          .u-icn2
            display inline-block
            overflow hidden
            vertical-align middle
            background url('../img/icon2.png') no-repeat
          .u-icn2-17
            width 7px
            height 4px
            background-position -260px -450px
      .ph-con
        display none
        width 220px
        height 128px
        overflow-y scroll
        border 1px solid #ccc
        border-right none
        box-sizing border-box
        .ph-item
          width 92%
          height 32px
          line-height 32px
          padding 0 8px
          display flex
          justify-content space-between
          &:hover
            cursor pointer
            background-color #ccc
      .show
        display block
        position absolute
        background-color #fff
      input
        display inline-block
        width 82%
        height 16px
        padding 5px 8px
        outline none
      .redtxt
        color red
    .pwd
      margin-top 10px
      input
        width 92.5%
        height 15px
        padding 5px 6px 6px
        outline none
    .check
      display flex
      justify-content space-between
      margin-top 10px
      .checked
        margin-right 10px
    .errorMsg
      color red
      margin-top 5px
    .btn
      width 100%
      height 31px
      line-height 31px
      margin-top 10px
      text-align center
      border-radius 4px
      background-color #3080cc
      margin-top 20px
      &:hover
        cursor pointer
        background-color #4d96da
      a
        color #fff
  .bottom
    display flex
    justify-content space-between
    height 48px
    line-height 48px
    padding 0 19px
    border-top 1px solid #c6c6c6
    background-color #f7f7f7
    .other-l
      a
        color #3080cc
        &:hover
          cursor pointer
</style>