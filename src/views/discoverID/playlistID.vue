<template>
  <div class="box-out">
    <div class="musicInfo">
      <!-- 左边 -->
      <div class="musicInfo-left">
        <div class="musicInfo-left-content">
          <!-- 作者信息 -->
          <div class="musicerinfo">
            <!-- 封面 -->
            <div class="imgbox">
              <div class="border">
                <img
                  :src="
                    usermusiclist.playlist
                      ? usermusiclist.playlist.coverImgUrl
                      : ''
                  "
                  alt=""
                />
              </div>
            </div>
            <!-- 歌曲信息 -->
            <div class="musicerinfo-right">
              <!-- 歌曲信息头部 -->
              <div class="musicerinfo-right-heder">
                <div class="logologo"></div>
                <h2 class="describe">
                  {{
                    usermusiclist.playlist ? usermusiclist.playlist.name : ""
                  }}
                </h2>
              </div>
              <!-- 头像/名称/时间 -->
              <div class="musicerlogo">
                <div class="logo">
                  <img
                    :src="
                      usermusiclist.playlist
                        ? usermusiclist.playlist.creator.avatarUrl
                        : ''
                    "
                    alt=""
                  />
                </div>
                <div class="musicername">
                  <a href="#">{{
                    usermusiclist.playlist
                      ? usermusiclist.playlist.creator.nickname
                      : ""
                  }}</a>
                  <img
                    style="width: 13px"
                    src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3774995461,1661224091&fm=26&gp=0.jpg"
                    alt=""
                  />
                </div>
                <div class="time">
                  <span>{{
                    usermusiclist.playlist
                      ? usermusiclist.playlist.createTime
                      : ""
                  }}</span>
                  <span>创建</span>
                </div>
              </div>
              <!-- 一排按钮 -->
              <div class="changebtn">
                <div class="btnplay">
                  <button class="playjinglinbox" @click="isplayhandel">
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
              <!-- 标签 -->
              <div class="title">
                <span>标签:</span>
                <button
                  v-for="(item, index) in usermusiclist.playlist
                    ? usermusiclist.playlist.tags
                    : ''"
                  :key="index"
                >
                  {{ item }}
                </button>
              </div>
              <!-- 简介 -->
              <div class="textbox" v-if="!flag">
                 
                <p class="texteare active" ref="txt">
                 <span>介绍:</span>
                  <pre>{{
                    usermusiclist.playlist
                      ? usermusiclist.playlist.description
                      : ""
                  }}</pre>
                </p>
                <div class="pos" @click="flag = true">
                  <a>展开</a>
                  <i class="down"></i>
                </div>
              </div>
              <div class="textbox" v-else>
                <p class="texteare">
                  <span>介绍:</span>
                 <pre>{{
                    usermusiclist.playlist
                      ? usermusiclist.playlist.description
                      : ""
                  }}</pre>
                </p>
                <div class="pos" @click="flag = false">
                  <a>收起</a>
                  <i class="up"></i>
                </div>
              </div>
            </div>
          </div>
          <!-- 歌曲列表 -->
          <div class="musicList">
            <div class="musictitle">
              <div class="musictitle-left">
                <span class="big">歌曲列表</span>
                <span>116首歌</span>
              </div>
              <div class="musictitle-right">
                <div class="left">
                  <i>1</i>
                  <span>生成外链播放器</span>
                </div>
                <div class="right">
                  <i>播放:</i>
                  <span class="num">123456</span>
                </div>
              </div>
            </div>
            <div class="musicListContent">
              <!-- 头部 -->
              <div class="musicListContent-Top">
                <div class="one"></div>
                <div class="two">歌曲标题</div>
                <div class="three">时长</div>
                <div class="four">歌手</div>
                <div class="five">专辑</div>
              </div>
              <!-- 尾部 -->
              <ul
                class="musicListContent-bottom"
                @mouseleave="handelleave()"
                @mouseover="handelover(index)"
                v-for="(item,index) in tracks"
                :key="item.id"
              >
                <li class="one">
                  <span class="indextxt">{{index+1}}</span>
                  <i class="iconfont icon-bofang"></i>
                </li>
                <li class="two">
                  <span
                    >{{item.name}}</span
                  >
                </li>
                <li class="three">
                  <span v-show="show !== index">15:16</span>
                  <div class="show" v-show="show === index">
                    <span class="iconfont icon-xiaolian"></span>
                    <span class="iconfont icon-yinle"></span>
                    <span class="iconfont icon-yuyan"></span>
                  </div>
                </li>
                <li class="four">
                  <span>{{item.ar[0].name}}</span>
                </li>
                <li class="five">
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
            <!-- 点击下载区 -->
            <div class="download">
              <span>查看更多内容,请下客户端</span>
              <button @click="handel">立即下载</button>
            </div>
            <!-- 评论 -->
            <Messages :commentsList='commentsList'></Messages>
            
            <Up />
          </div>
          
        </div>
        <aplayer
      
      class="mpthree"
      v-show="isplay"
      :music="{
        title: 'secret base~君がくれたもの~',
        artist: 'Silent Siren',
        src: url,
       pic: img
      }"
    />
      </div>
      <!-- 喜欢这首歌的人 -->
      <Likemusicer :likemusicer='likemusicer'></Likemusicer>
    </div>
    <!-- <ul>
      <li>123</li>
    </ul> -->
  </div>
</template>

<script>
import Aplayer from "vue-aplayer";
import playlist from "../../api/playlistID";
import Likemusicer from "../../components/likemusicer/likemusicer";
import Messages from "../../components/Messages/index";
import Up from "../../components/Up/index";
export default {
  name: "PlaylistID",
  components: {
    Messages,
    Up,
    Likemusicer,
    Aplayer,
  },
  data() {
    return {
      show: "",
      flag: false, //控制展开的
      usermusiclist: {},
      tracks: [], //歌曲列表
      likemusicer: [], //喜欢这首歌的人
      commentsList: [],
      isplay: false, //控制音乐
      url: "",
      img: "",
    };
  },
  methods: {
    handelleave() {
      this.show = "";
    },
    handelover(index) {
      this.show = index;
    },
    handel() {
      alert("萌萌萌");
    },
    playhandel() {
      alert("play");
    },
    //控制音乐
    async isplayhandel() {
      this.isplay = !this.isplay;
      let res = await playlist.getMusicurl(this.tracks[0].id);
      this.url = res.data[0].url;
      this.img = this.tracks[0].al.picUrl;
    },
    //自定义事件
    isplayflag() {
      this.isplay = !this.isplay;
    },
  },

  async mounted() {
    //自定义事件

    //获取到传递过来的query参数
    let { id } = this.$route.query;
    console.log(id);
    //获取歌单详情
    let result = await playlist.getMusicinfo(id);
    this.usermusiclist = result;
    this.tracks = result.playlist.tracks.slice(0, 10);
    this.likemusicer = result.playlist.subscribers;

    //获取歌单评论
    let res = await playlist.getComment(id);
    this.commentsList = res.comments;
  },
};
</script>

<style lang='stylus' scoped>
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.box-out {
  border: 1px solid #ccc;
  width: 100%;
  background-color: rgb(245, 245, 245);
}

.musicInfo {
  border: 1px solid #ccc;
  width: 980px;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
}

.musicInfo-left {
  width: 709px;
  // background-color: pink;
}

.musicInfo-right {
  // background-color: yellow;
  border: 1px solid transparent;
  border-left: 1px solid #ccc;
  flex: 1;
}

.musicInfo-left-content {
  box-sizing: border-box;
  width: 100%;
  padding: 47px 30px 40px 39px;
  // border: 1px solid red;
}

.musicInfo-left-content .imgbox {
  width: 208px;
  height: 208px;
}

.musicInfo-left-content .musicerinfo {
  width: 100%;
  // border: 1px solid black;
  display: flex;
}

.musicInfo-left-content .imgbox img {
  width: 100%;
  height: 100%;
}

.musicInfo-left-content .musicerinfo-right {
  flex: 1;
  // border: 1px solid red;
  margin-left: 30px;
}

.musicerinfo-right-heder {
  display: flex;
  flex-wrap: wrap;
}

.musicerinfo-right-heder .describe {
  width: 346px;
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
  color: #333;
  font-weight: 400;
  margin-left: 5px;
}

.musicerlogo {
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 20px;
}

.musicerlogo .logo {
  width: 35px;
  height: 35px;
  margin-right: 10px;
}

.musicerlogo .logo img {
  width: 100%;
  height: 100%;
}

.musicername {
  margin-right: 30px;
}

.changebtn {
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

// 右边的css
.musicInfo-right-content {
  padding: 20px 40px 40px 30px;
  // border: 1px solid #666;
}

.musicInfo-right-content h3 {
  font-size: 12px;
  height: 24px;
  line-height: 24px;
  border-bottom: 1px solid black;
}

.musicInfo-right-content .liketu {
  margin-top: 20px;
  height: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.liketu img {
  width: 40px;
  height: 40px;
}

.aboutOut {
  margin-bottom: 10px;
  width: 100%;
  display: flex;
}

.about-left {
  width: 50px;
  height: 50px;
  // background-color: green;
}

.about-left img {
  width: 100%;
  height: 100%;
}

.about-right {
  box-sizing: border-box;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.about-button span {
  font-size: 12px;
  color: #999;
}

.about-button a {
  color: #666;
  margin-left: 5px;
}

.musictitle {
  width: 100%;
  height: 35px;
  // background-color: yellow;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
}

.musictitle-left {
  line-height: 35px;
}

.musictitle-left .big {
  font-size: 20px;
  color: black;
  padding-right: 10px;
}

.musictitle-right {
  display: flex;
  align-items: center;
}

.musictitle-right .left i {
  display: inline-block;
  width: 16px;
  heiht: 16px;
  background-color: yellow;
}

.musictitle-right .left {
  margin-right: 15px;
}

.musictitle-right .right .num {
  color: red;
}

.musicList {
  margin-top: 20px;
}

.musicListContent-Top {
  display: flex;
}

.musicListContent-Top div {
  height: 39px;
  line-height: 39px;
  text-indent: 15px;
  background-image: url('../../assets/index.png');
  // border-right: 1px solid #666;
  background-position: 0px 0px;
  box-shadow: 0px 0px 1px #666;
}

.musicListContent-Top div.one {
  width: 74px;
}

.musicListContent-Top div.two {
  width: 237px;
}

.musicListContent-Top div.three {
  width: 111px;
}

.musicListContent-Top div.four {
  width: 89px;
}

.musicListContent-Top div.five {
  width: 127px;
}

.musicListContent {
  border: 1px solid #666;
  border-top: 3px solid red;
}

.musicListContent-bottom {
  display: flex;
}

.musicListContent-bottom li {
  text-indent: 10px;
}

.musicListContent-bottom .one {
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  width: 74px;
}

.musicListContent-bottom .two {
  width: 237px;
}

.musicListContent-bottom .three {
  width: 111px;
}

.musicListContent-bottom .four {
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 89px;
}

.musicListContent-bottom .five {
  width: 127px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.musicListContent-bottom li.two span {
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.musicListContent ul:nth-of-type(odd) {
  background-color: #aeaeae;
}

.domn {
  margin-top: 20px;
}

.domn .logo div {
  width: 45px;
  height: 50px;
  // border: 1px solid red;
}

.domn .logo {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.domn span {
  margin-top: 20px;
  display: inline-block;
  font-size: 12px;
  color: #999;
}

.logo .left, .logo .center, .logo .right {
  background-image: url('../../assets/sprite.png');
}

.logo .left {
  background-position: 0px 52px;
}

.logo .center {
  background-position: -356px 59px;
}

.logo .right {
  background-position: -429px 60px;
}

.download {
  font-size: 14px;
  margin-top: 50px;
  height: 66px;
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.download button {
  width: 120px;
  height: 30px;
  border-radius: 15px;
  background-color: rgb(255, 78, 64);
  color: #fff;
  border: none;
  outline: none;
}

.logologo {
  width: 45px;
  height: 26px;
  background-image: url('../../assets/icon2.png');
  background-position: 161px -274px;
}

.textbox {
  // display: flex;
  position: relative;
  // border: 1px solid red;
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

.border {
  padding: 2px;
  border: 1px solid #666;
  box-shadow: 0px 0px 0px 1px #ccc;
}

// 多行文本超出出现...
.active {
  height: 200px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 13;
  overflow: hidden;
}

.mpthree {
  width: 100%;
  position: fixed;
  left: 10px;
  bottom: 0px;
  background-color: #ccc;
}
</style>