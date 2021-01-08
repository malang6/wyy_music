<template>
  <div class="newcdinfoOut">
    <div class="newcdinfoBox">
      <div class="newcdinfoContent">
        <div class="newcdleft">
          <div class="header">
            <div class="header-left">
              <img
                :src="musicsinfo.album ? musicsinfo.album.blurPicUrl : ''"
                alt=""
              />
            </div>
            <div class="header-right">
              <div class="top">
                <i class="logologo"></i>
                <h3>{{ musicsinfo.album ? musicsinfo.album.name : "" }}</h3>
              </div>
              <div class="center">
                <div class="center-top">
                  <span>歌手</span>:
                  <a href="">{{
                    musicsinfo.album ? musicsinfo.album.name : ""
                  }}</a>
                </div>
                <div class="center-center">
                  <span class="time">发行时间</span>:
                  <span>{{
                    musicsinfo.album ? musicsinfo.album.publishTime : ""
                  }}</span>
                </div>
              </div>
              <div class="bottom">
                <span>发行公司:</span>
                <span>{{
                  musicsinfo.album ? musicsinfo.album.company : ""
                }}</span>
              </div>
              <!-- 一排按钮 -->
              <!-- <div class="btnbox">
                <div>
                  <button>
                    <i class="one">1</i>
                    播放
                  </button>
                  <button>+</button>
                </div>
                <button>收藏</button>
                <button>(666)</button>
                <button>下载</button>
                <button>(666)</button>
              </div> -->
              <div class="changebtn">
                <div class="btnplay">
                  <button class="playjinglinbox">
                    <i class="iconfont icon-bofang"></i>
                    <span>播放</span>
                  </button>
                  <button class="addjinglin">+</button>
                </div>
                <button class="btn">
                  <i class="jl"></i>
                  <span>(952)</span>
                </button>
                <button class="btn">
                  <i class="jl"></i>
                  <span>(952)</span>
                </button>
                <button class="btn">
                  <i class="jl"></i>
                  <span>(952)</span>
                </button>
                <button class="btn">
                  <i class="jl"></i>
                  <span>(952)</span>
                </button>
              </div>
            </div>
          </div>
          <!-- 专辑介绍 -->
          <div class="textbox" v-if="!flag">
            <h5>专辑介绍:</h5>
            <!-- <p class="texteare">
              {{ musicsinfo.album.description }}
            </p> -->
            <pre class="texteare">
              {{ musicsinfo.album ? musicsinfo.album.description : "" }}
            </pre>
            <div class="pos" @click="flag = true">
              <a>展开</a>
              <i class="down"></i>
            </div>
          </div>
          <div class="textbox" v-else>
            <h5>专辑介绍:</h5>
            <pre class="texteare1">
              {{ musicsinfo.album ? musicsinfo.album.description : "" }}
            </pre>
            <div class="pos" @click="flag = false">
              <a>收起</a>
              <i class="up"></i>
            </div>
          </div>
          <!-- 列表 -->
          <div class="musiclist">
            <div class="musicHeader">
              <div class="left">
                <h3>包含所有歌曲</h3>
                <span class="num">3首歌</span>
              </div>
              <div class="right">
                <i>1</i>
                <a href="">生成外链播放器</a>
              </div>
            </div>
            <div class="musicList">
              <div class="musicList-header">
                <span class="one">1</span>
                <span class="two">歌曲标题</span>
                <span class="three">时长</span>
                <span class="four">歌手</span>
              </div>
              <ul class="musicList-content">
                <li
                  class="item"
                  v-for="(item, index) in musicsinfo.songs"
                  :key="item.id"
                >
                  <div class="index">
                    <span class="">{{ index + 1 }}</span>
                    <i class="iconfont icon-bofang"></i>
                  </div>
                  <div class="name">
                    <a href="">{{ item.name }}</a>
                  </div>
                  <div class="time">
                    <span class="top">16:16</span>
                    <span class="changeflag">
                      <i class="one"></i>
                      <i class="one"></i>
                      <i class="two"></i>
                      <i class="three"></i>
                    </span>
                  </div>
                  <div class="musicer">
                    <a
                      href="index"
                      v-for="(child, index) in item.ar"
                      :key="index"
                      >{{ child.name }}</a
                    >
                  </div>
                </li>
              </ul>
            </div>
            <Messages class="pinlun" :commentsList='messageslist'></Messages>
          </div>
        </div>
        <!-- 喜欢这首歌的人 -->
        <Likemusicer></Likemusicer>
      </div>
    </div>
  </div>
</template>

<script>
import playlistID from "../../api/playlistID";
import Likemusicer from "../../components/likemusicer/likemusicer";
import Messages from "../../components/Messages/index";
export default {
  name: "newcdinfo",
  data() {
    return {
      flag: false, //控制展开的
      isShow: false,
      musicsinfo: [], //新碟信息
      musiclist: [], //新碟列表
      messageslist: [], //评论
    };
  },
  components: {
    Messages,
    Likemusicer,
  },
  methods: {
    handelleave() {
      this.show = "";
      console.log(2);
    },
    handelover(index) {
      this.show = index;
      console.log(1);
    },
  },
  async mounted() {
    let { id } = this.$route.query;
    //获取新碟信息
    console.log("新碟", id);
    let res = await playlistID.getcdinfo(id);
    console.log("全部", res);
    console.log("拿到数据", res.songs);
    this.musicsinfo = res;

    let messageslist = await playlistID.getcommpoent(id);
    this.messageslist = messageslist.comments;
  },
};
</script>

<style lang='stylus' scoped>
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.newcdinfoOut {
  background-color: #f5f5f5;
}

.newcdinfoBox {
  width: 980px;
  background-color: #fff;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-top: none;
}

.newcdinfoContent {
  display: flex;
}

.newcdleft {
  border-right: 1px solid #ccc;
  width: 642px;
  padding: 47px 30px 40px 39px;
}

.newcdright {
  flex: 1;
  padding: 20px 40px 40px 30px;
  border: 1px solid #ccc;
  border-top: none;
  border-bottom: none;
}

.header {
  display: flex;
}

.header-left {
  width: 209px;
  height: 177px;
  border: 1px solid black;
}

.header-left img {
  width: 100%;
  height: 100%;
}

.header .top {
  height: 30px;
  display: flex;
  align-items: center;
}

.header .top h3 {
  font-weight: 400;
  padding-left: 10px;
}

.logologo {
  width: 45px;
  height: 26px;
  background-image: url('../../assets/icon2.png');
  background-position: 161px -274px;
}

.header .header-right {
  margin-left: 20px;
}

.header-right .center-top {
  margin-top: 5px;
  font-size: 12px;
}

.header-right .center-top span {
  color: #666;
}

.header-right .center-top a {
  text-decoration: none;
}

.header-right .center-top a:hover {
  text-decoration: underline;
}

.header-right .center {
  font-size: 14px;
  color: #666;
}

.header-right .bottom {
  margin-top: 5px;
  font-size: 14px;
  color: #666;
}

.header-right .center-center {
  margin-top: 5px;
}

.changebtn {
  margin-top: 10px;
  text-align: center;
  width: 90px;
  height: 30px;
  line-height: 30px;
  display: flex;
}

.btnplay {
  display: flex;
}

.btnplay button {
  background-color: rgb(63, 142, 216);
  outline: none;
  color: #fff;
  outline: none;
  border: none;
}

.playjinglinbox {
  width: 61px;
  border-radius: 5px;
}

.btnplay .addjinglin {
  width: 31px;
  height: 31px;
  border-radius: 5px;
}

.btn {
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  margin-left: 6px;
  border-radius: 5px;
}

.btn .jl {
  display: inline-block;
  width: 25px;
  height: 26px;
  background-image: url('./nice.png');
  background-position: 126px 181px;
  margin-left: 10px;
}

.title {
  margin-top: 20px;
  font-size: 12px;
  color: #666;
}

.title button {
  outline: none;
  border: none;
  width: 56px;
  height: 20px;
  border-radius: 10px;
  color: #666;
  margin-left: 5px;
}

button:hover {
  color: #d0d0d0;
}

.pos {
  width: 60px;
  height: 30px;
  display: flex;
  align-items: center;
  // position: absolute;
  // left: 328px;
  // top: 163px;
  float: right;
}

.pos .down, .pos .up {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url('../../assets/sprite.png');
  background-position: -9px -258px;
}

.pos a {
  color: blue;
}

.pos .up {
  background-position: -49px -258px;
}

.textbox {
  margin-top: 10px;
}

.musicHeader {
  display: flex;
  margin-top: 50px;
  height: 35px;
  border-bottom: 3px solid red;
  justify-content: space-between;
  box-sizing: border-box;
}

.musicHeader .left {
  display: flex;
  align-items: center;
}

.musicHeader .left h3 {
  font-weight: 400;
}

.musicHeader .left .num {
  font-size: 12px;
  color: #999;
  margin-left: 10px;
}

.musicHeader .right {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.musicList-header span {
  padding: 8px 10px;
  display: inline-block;
  height: 20px;
  line-height: 20px;
  background-color: rgb(247, 247, 247);
  border: 1px solid #ccc;
  border-top: none;
  box-shadow: 0px 1px 0px 1px #ccc;
}

.musicList-header .one {
  color: #fff;
  width: 73px;
}

.musicList-header .two {
  width: 269px;
}

.musicList-header .three {
  width: 93px;
}

.musicList-header .four {
  width: 118px;
}

.musicList-content {
  // border: 1px solid red;
}

.musicList-content .item {
  height: 30px;
  line-height: 30px;
  display: flex;
  color: #999;
}

.musicList-content .item .index {
  width: 95px;
  display: flex;
  justify-content: space-around;
}

.musicList-content .item .name {
  text-indent: 10px;
  width: 296px;
}

.musicList-content .item a {
  color: #000;
  text-decoration: none;
}

.musicList-content .item a:hover {
  text-decoration: underline;
}

.musicList-content .item .time {
  text-indent: 10px;
  width: 118px;
}

.musicList-content .item .musicer {
  text-indent: 10px;
}

.musicList-content .item .time span {
  text-indent: 10px;
  width: 118px;
}

.musicList-content .time .changeflag i {
  display: inline-block;
  width: 18px;
  height: 18px;
  color: red;
  background-image: url('./table.png');
}

.musicList-content .time .changeflag .one {
  background-position: 0px 198px;
}

.musicList-content .time .changeflag .two {
  background-position: 0px 178px;
}

.musicList-content .time .changeflag .three {
  background-position: -103px 198px;
}

.musicList-content .item:hover .time .top {
  display: none;
}

.time .changeflag {
  display: none;
}

.musicList-content .item:hover .time .changeflag {
  display: block;
}

.musicList-content .item:nth-of-type(odd) {
  background-color: #eaeaea;
}

.pinlun {
  margin-top: 50px;
}

.texteare {
  // word-wrap: break-word;
  // word-break: break-all;
  white-space: pre-wrap; /* css3.0 */
  height: 666px;
  display: -webkit-box;
  -webkit-box-orient: vertical; // 文本行排列方向
  -webkit-line-clamp: 2; // 设置几行之后出现溢出省略号
  overflow: hidden;
}

.texteare1 {
  white-space: pre-wrap;
}
</style>