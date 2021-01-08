<template>
  <div class="anchor_station">
    <div class="anchor_cont">
      <!-- 头部导航 -->
      <AnchorHeader></AnchorHeader>
      <template v-if="$route.path === '/discover/djradio'">
        <!-- 歌曲列表 -->
        <div class="songList">
          <AnchorContent :recommondList="recommondList"></AnchorContent>
          <AnchorRecommond :topList="topList"></AnchorRecommond>
        </div>
        <!--电台 -->
        <div class="radio_type">
          <AnchorRadioType
            v-for="(item, index) in recommondType"
            :key="'a' + index"
            :recommondData="item['a' + index]"
          ></AnchorRadioType>
        </div>
      </template>
      <template v-else>
        <router-view></router-view>
      </template>
    </div>
  </div>
</template>

<script>
import { recommond, getTopList, recommondType } from "../../api/djradio";
import AnchorHeader from "./AnchorHeader";
import AnchorContent from "./AnchorContent";
import AnchorRadioType from "./AnchorRadioType";
import AnchorRecommond from "./AnchorRecommond/";
// import Category from "@views/category";
export default {
  name: "Djradio",
  data() {
    return {
      recommondList: [], //推荐节目
      topList: [], //节目榜
      recommondType: [], //推荐电台
    };
  },
  async mounted() {
    // 获取推荐节目
    const recommondList = await recommond();
    this.recommondList = recommondList.data.djRadios;
    // 获取节目榜
    const topList = await getTopList(10);
    this.topList = topList.data.toplist;
    const arr = [3, 2, 2001, 6];
    for (let i = 0; i < arr.length; i++) {
      const res = await recommondType(arr[i], 30);
      this.recommondType.push({ [`a${i}`]: res.data.djRadios });
    }
  },
  components: {
    AnchorHeader,
    AnchorContent,
    AnchorRadioType,
    AnchorRecommond,
    // Category,
  },
};
</script>

<style lang="stylus" scoped>
.anchor_cont
  width 980px
  min-height 700px
  margin 0 auto
  background-color #fff
  border 1px solid #d3d3d3
  border-width 0 1px
  padding 40px
  .songList
    margin-top 10px
    margin-left 33px
    display flex
    justify-content space-between
</style>