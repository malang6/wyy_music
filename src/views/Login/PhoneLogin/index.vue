<template>
  <div class="phoneLogin">
    <div class="container">
      <PhoneInput @getPhone="getPhone" :msg.sync="msg" />
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
      <span class="other-l" @click="otherLogin">
        <a>&lt; 其他登录方式</a>
      </span>
      <span @click="()=>$emit('update:isPhoneLogin', false)" class="rej">
        <a>没有账号？免费注册 ></a>
      </span>
    </div>
  </div>
</template>

<script>
import PhoneInput from "../PhoneInput";
export default {
  name: "PhoneLogin",
  data() {
    return {
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
  components: {
    PhoneInput,
  },
  methods: {
    //获取手机号
    getPhone(phone) {
      this.phone = phone;
    },
    //登录
    login() {
      let { phone, password } = this;
      if (
        !/^((13[0-9])|(17[0-3,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/.test(phone)
      ) {
        return (this.msg = "请输入正确的手机号");
      }
      phone = +phone;

      this.$store.dispatch("getUserInfo", { phone, password });
      if (this.$store.state.token) return;
      this.$store.commit("CHANGE_SHOW", false);
    },
    //点击其他的登录方式
    otherLogin() {
      this.$emit("update:isLogin", false);
      this.$emit("update:isPhoneLogin", false);
    },
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
    .rej:hover
      cursor pointer
</style>