<template>
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
        @focus="clearError"
      />
    </div>
    <ul class="ph-con" :class="isShow?'show':''" @click="chooseCountry">
      <li class="ph-item" v-for="(item,index) in country" :key="index" :data-index="index">
        <span>{{item.zh}}</span>
        <span>{{item.code}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getCountryList } from "@api/login";
export default {
  name: "PhoneInput",
  data() {
    return {
      countryList: [], //国家列表
      code: "", //国家码
      isShow: false, //是否显示列表
      phone: "", //手机号
    };
  },
  props: {
    msg: {
      type: String,
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
  watch: {
    phone(newVal) {
      newVal = newVal.replace(/[a-zA-Z_\u4e00-\u9fa5]+$/g, "");
      this.phone = newVal;
      this.$emit("getPhone", newVal);
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
    clearError(){
      this.$emit('update:msg','');
      this.$emit('update:pwdMsg','')
    }
  },
  async mounted() {
    const res = await getCountryList();
    this.countryList = res.data.data;
  },
};
</script>

<style lang="stylus" scoped>
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
</style>