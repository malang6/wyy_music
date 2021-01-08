<template>
  <div class="musicInfo-right">
    <div class="musicInfo-right-content">
      <div v-show="likemusicer">
        <h3>喜欢这首歌的人</h3>
        <div class="liketu">
          <img
            v-for="(item, index) in likemusicer"
            :key="index"
            :src="item.avatarUrl"
            alt=""
          />
        </div>
      </div>
      <!-- 相关推荐 -->
      <h3>相关推荐</h3>
      <div class="aboutOut">
        <div class="about-left">
          <img
            src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2546201747,775349232&fm=26&gp=0.jpg"
            alt=""
          />
        </div>
        <div class="about-right">
          <a href="">流行dj</a>
          <div class="about-button">
            <span>by</span>
            <a href="">鹤别蜡笔</a>
          </div>
        </div>
      </div>
      <div class="aboutOut">
        <div class="about-left">
          <img
            src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2546201747,775349232&fm=26&gp=0.jpg"
            alt=""
          />
        </div>
        <div class="about-right">
          <a href="">流行dj</a>
          <div class="about-button">
            <span>by</span>
            <a href="">鹤别蜡笔</a>
          </div>
        </div>
      </div>
      <!-- 网易云音乐多端下载 -->
      <div class="domn">
        <h3>网易云音乐多端下载</h3>
        <div class="logo">
          <div class="left"></div>
          <div class="center"></div>
          <div class="right"></div>
        </div>
        <span>同步歌单，随时畅听320k好音乐</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Likemusicer",
  props: ["likemusicer"],
};
</script>

<style style lang='stylus' scoped>
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
  width: 74px;
}

.musicListContent-bottom .two {
  width: 237px;
}

.musicListContent-bottom .three {
  width: 111px;
}

.musicListContent-bottom .four {
  width: 89px;
}

.musicListContent-bottom .five {
  width: 127px;
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
</style>