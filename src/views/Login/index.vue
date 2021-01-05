<template>
  <div class="login" :style="{height:height}">
    <div class="login-container">
      <div class="login-bar">
        <span>{{isPhoneLogin?'手机号登录':'登录'}}</span>
        <a @click="$store.commit('CHANGE_SHOW',false)">X</a>
      </div>
      <div v-if="!isPhoneLogin">
        <div class="container">
          <div class="left">
            <img src="./img/platform.png" alt="platform" />
            <div class="btn btnLogin" @click="phoneLogin">
              <a>手机号登录</a>
            </div>
            <div class="btn btnRij">
              <a>注 册</a>
            </div>
          </div>
          <div class="right">
            <ul class="loginList">
              <li class="loginItem">
                <a>
                  <i class="u-mlg2 u-mlg2-wx"></i>
                  微信登录
                </a>
              </li>
              <li class="loginItem">
                <a>
                  <i class="u-mlg2 u-mlg2-qq"></i>
                  QQ登录
                </a>
              </li>
              <li class="loginItem">
                <a>
                  <i class="u-mlg2 u-mlg2-sn"></i>
                  微博登录
                </a>
              </li>
              <li class="loginItem">
                <a>
                  <i class="u-mlg2 u-mlg2-wy"></i>
                  网易邮箱账号登录
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="c-bottom">
          <input type="checkbox" :checked="isChecked" @click="isChecked = !isChecked" />
          同意
          <a href="#">《服务条款》</a>
          <a href="#">《隐私政策》</a>
          <a href="#">《儿童隐私政策》</a>
        </div>
        <div class="qrcode_bar">
          <img src="./img/qrcode_bar.png" alt="qrcode_bar" />
        </div>
      </div>
      <PhoneLogin v-else :isPhoneLogin.sync="isPhoneLogin"/>
    </div>
    <div class="checkedTxt" :class="btxt?'b-txt':''">
      <span>请先勾选同意《服务条款》《隐私政策》《儿童隐私政策》</span>
    </div>
  </div>
</template>

<script>
import PhoneLogin from "./PhoneLogin";
export default {
  name: "Login",
  data() {
    return {
      isChecked: false, //是否勾选
      btxt: false, //是否显示文字
      isPhoneLogin: false, //是否是手机登录界面
      height: "370px",
    };
  },
  methods: {
    //手机号登录
    phoneLogin() {
      if (!this.isChecked) {
        this.btxt = true;
        setTimeout(() => {
          this.btxt = false;
        }, 1500);
        return;
      }
      this.isPhoneLogin = true;
      this.height = 0;
    },
  },
  components: {
    PhoneLogin,
  },
};
</script>

<style lang="stylus" scoped>
.login
  position relative
  width 530px
  border-radius 4px
  box-shadow 0 5px 16px rgba(0, 0, 0, 0.8)
  .login-container
    .login-bar
      display flex
      justify-content space-between
      align-items center
      width 100%
      height 38px
      padding 0 20px
      box-sizing border-box
      background-color #242424
      border-top-left-radius 4px
      border-top-right-radius 4px
      span
        font-size 14px
        font-weight bold
        color #fff
      a
        font-size 14px
        cursor pointer
  .container
    width 100%
    height 252px
    padding 40px 0 39px 0
    background #fff
    display flex
    justify-content space-around
    .left
      display flex
      flex-direction column
      width 224px
      height 202px
      img
        width 224px
        height 120px
      .btn
        width 100%
        height 31px
        line-height 31px
        margin-top 10px
        text-align center
        border-radius 4px
      .btnLogin
        background-color #3080cc
        &:hover
          cursor pointer
          background-color #4d96da
        a
          color #fff
      .btnRij
        height 31px
        box-shadow 0 2px 5px rgba(0, 0, 0, 0.2)
        background-color #f3f3f3
        a
          color #222
        &:hover
          cursor pointer
          background-color #f7f7f7
    .right
      padding 3px 0 3px 39px
      height 215px
      border-left 1px dotted #333
      .loginList
        .loginItem
          padding-top 15px
          a
            i.u-mlg2
              display inline-block
              vertical-align middle
              margin-right 12px
              width 38px
              height 38px
              background url('./img/logo.png') no-repeat 0 0
            i.u-mlg2-wx
              background-position -150px -670px
            i.u-mlg2-qq
              background-position -190px -670px
            i.u-mlg2-sn
              background-position -231px -670px
            i.u-mlg2-wy
              background-position -271px -670px
          &:hover
            cursor pointer
            text-decoration underline
  .c-bottom
    position absolute
    top 314px
    left 30px
    color #bbb
    a
      color #3080cc
      &:hover
        text-decoration underline
  .qrcode_bar
    position absolute
    top 317px
    right 0
    img
      width 52px
      height 52px
  .checkedTxt
    display none
    position relative
    z-index 1000
    width 200px
    margin -135px auto 0
    background-color #333
    padding 10px
    span
      color #fff
      font-size 14px
  .b-txt
    display block
</style>