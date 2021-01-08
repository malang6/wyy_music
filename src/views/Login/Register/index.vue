<template>
  <div class="rejister">
    <div class="rejisterCont" v-if="!isShowCode">
      <div class="phonecontent">
        <p class="phone-txt">手机号:</p>
        <PhoneInput @getPhone="getPhone" :pwdMsg.sync="pwdMsg" />
      </div>
      <div class="pwd">
        <p class="pwd-txt">密码:</p>
        <input
          type="password"
          placeholder="设置登录密码，不少于8位"
          v-model="password"
          @focus="regExpPwd"
          @blur="regExpPwd"
        />
      </div>
      <p v-if="pwdMsg" class="errorMsg">{{pwdMsg}}</p>
      <div class="btn" :class="isClick?'btn-click':''" @click="goRejister">下一步</div>
    </div>
    <VerCode v-else :phone="phone" :password="password" />
    <div class="bottom">
      <span class="other-l" @click="()=>$emit('update:isLogin', false)">
        <a>&lt; 返回登录</a>
      </span>
    </div>
  </div>
</template>

<script>
import PhoneInput from "../PhoneInput";
import VerCode from "./VerCode";

export default {
  name: "Register",
  data() {
    return {
      phone: "",
      password: "",
      pwdMsg: "", //密码错误提示信息
      // isClick: false, //下一步按钮是否可点击
      isShowCode: false, //是否显示发验证码界面
    };
  },
  components: {
    PhoneInput,
    VerCode,
  },
  watch: {
    password() {
      this.pwdMsg = "";
    },
  },
  computed: {
    //下一步按钮是否可点击
    isClick() {
      let { phone, password, pwdMsg } = this;
      if (phone && password && !pwdMsg) {
        return true;
      }
      return false;
    },
  },
  methods: {
    //获取手机号
    getPhone(phone) {
      this.phone = phone;
    },
    // //校验密码
    regExpPwd() {
      let { password } = this;
      if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(password)) {
        this.pwdMsg = "密码必须包含数字字母，长度为8-16位";
        return;
      }
    },
    //点击下一步，去发送验证码界面
    async goRejister() {
      let { phone, password, isClick } = this;
      if (!isClick) return;
      if (
        !/^((13[0-9])|(17[0-3,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/.test(phone)
      ) {
        return (this.pwdMsg = "请输入正确的手机号");
      }
      if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(password)) {
        this.pwdMsg = "密码必须包含数字字母，长度为8-16位";
        return;
      }

      this.isShowCode = true;
    },
  },
};
</script>

<style lang="stylus" scoped>
.rejister
  background-color #fff
  .rejisterCont
    padding 30px 0 43px
    width 220px
    margin 0 auto
    .phonecontent
      .phone-txt
        color #666
        margin-bottom 10px
    .pwd
      margin-top 10px
      .pwd-txt
        color #666
        margin-bottom 10px
      input
        width 92.5%
        height 15px
        padding 5px 6px 6px
        outline none
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
      background-color #eeeeee
      margin-top 20px
      color #ccc
      cursor pointer
    .btn-click
      background-color #3080cc
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