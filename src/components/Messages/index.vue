<template>
  <div class="MessageOut">
    <div class="MessageBox">
      <!-- 头部 -->
      <div class="MessageHeader">
        <h3>评论</h3>
        <span>共5条评论</span>
      </div>
      <!-- 留言区 -->
      <div class="MessageContent">
        <div class="top">
          <div class="img">
            <img
              src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50"
              alt=""
            />
          </div>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="评论"
          ></textarea>
        </div>
        <div class="diy">
          <span></span>
        </div>
      </div>
      <!-- 留言区的下面 -->
      <div class="bottom">
        <div class="left">
          <div class="iconfont icon-xiaolian"></div>
          <div class="txt">@</div>
        </div>
        <div class="right">
          <span class="txt">123</span>
          <button>评论</button>
        </div>
      </div>
      <!-- 最近评论 -->
      <div class="newMessages-out">
        <div class="newMessages-box">
          <div class="newMessages-header">
            <span>最新评论({{ commentsList.length }})</span>
          </div>
          <div class="newMessages"  v-for="(item, index) in commentsList"
              :key="index">
            <div class="logo">
              <img
                :src="item.user.avatarUrl"
                alt=""
              />
            </div>
            <div class="user-say">
              <!-- 上方 -->
              <div class="top">
                <a href="">{{item.user.nickname}}:</a>
                <img
                  src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4761340149/f4bf/64a1/1ea2/31a08617d7dfddb21fffdb92390ce268.png"
                  alt=""
                />
                <img
                  src="//p1.music.126.net/G2KYG9JjrGGP5grSaXOZaw==/109951163309837705.png"
                  alt=""
                />
                <span>:{{item.content}}</span>
              </div>
              <!-- 中间 -->
              <div class="center">
                <a href="">萌萌萌</a>
                <span>:</span>
                <span class="txt">我想你了</span>
              </div>
              <!-- 效果 -->
              <div class="style">
                <div class="one">
                  <div class="two"></div>
                </div>
              </div>
              <!-- 下面 -->
              <div class="buttom">
                <span class="time">06:06</span>
                <div class="right">
                  <i class="one" v-show="!isShow" @click="isShow = true"></i>
                  <i class="two" v-show="isShow" @click="isShow = false"></i>
                  <span>(6)</span>
                  <span class="change">|</span>
                  <a href="">回复</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: ["commentsList"],
  data() {
    return {
      isShow: false,
    };
  },
};
</script>

<style lang='stylus' scoped>
.style div {
  width: 0;
  height: 0;
  border: 5px solid transparent;
}

.style div.one {
  border-bottom: 5px solid #ccc;
  position: relative;
  left: 20px;
  top: -42px;
}

.style div.two {
  border-bottom: 5px solid #fff;
  position: absolute;
  top: -4px;
  left: -5px;
}

.diy, .diy span {
  display: inline-block;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-right: 10px solid #000;
  position: relative;
  top: 36px;
  left: -581px;
}

.diy span {
  border-right: 10px solid #fff;
  position: absolute;
  top: -10px;
  left: -8px;
}

.diy {
}

.MessageHeader {
  height: 35px;
  display: flex;
  align-items: center;
  border-bottom: 3px solid red;
}

.MessageHeader span {
  font-size: 12px;
  margin-left: 15px;
  color: #ccc;
}

.MessageContent {
  display: flex;
}

.MessageContent .top .img {
  width: 50px;
  height: 50px;
  border: 1px solid black;
}

.MessageContent .top .img img {
  width: 100%;
  height: 100%;
}

.MessageContent .top {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.MessageContent .top textarea {
  width: 556px;
  height: 86px;
  resize: none;
  outline: none;
  margin-left: 25px;
}

.bottom {
  display: flex;
  justify-content: space-between;
}

.bottom .left {
  height: 33px;
  display: flex;
  align-items: center;
  padding-left: 80px;
}

.bottom .left .txt {
  height: 33px;
  line-height: 31px;
  font-size: 16px;
  margin-left: 10px;
}

.bottom .right {
  height: 33px;
  line-height: 33px;
}

.bottom .right .txt {
  color: #ccc;
  font-size: 12px;
  margin-right: 10px;
}

.newMessages-header {
  margin-top: 10px;
  height: 21px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 2px;
  font-size: 12px;
  color: #ccc;
}

.newMessages {
  display: flex;
  padding-top: 15px;
}

.newMessages .logo {
  width: 50px;
  height: 50px;
  border: 1px solid black;
}

.newMessages .logo img {
  width: 100%;
  height: 100%;
}

.newMessages .user-say {
  width: 640px;
  padding-left: 15px;
}

.newMessages .top img {
  width: 13px;
  height: 13px;
  padding-left: 5px;
}

.newMessages .top span {
  padding-left: 10px;
}

.newMessages .center {
  margin-top: 5px;
  background-color: #ccc;
}

.newMessages .center .txt {
  display: inline-block;
  padding: 5px;
}

.newMessages .center span {
  padding: 0 3px;
}

.buttom {
  display: flex;
  justify-content: space-between;
}

.buttom .time {
  font-size: 12px;
  color: #fafafa;
}

.buttom .time {
  height: 21px;
  line-height: 21px;
  font-size: 12px;
  color: #ccc;
}

.buttom .right .one, .buttom .right .two {
  display: inline-block;
  width: 21px;
  height: 21px;
  line-height: 21px;
  background-image: url('../../assets/playbar.png');
}

.buttom .right {
  display: flex;
  align-items: center;
}

.buttom .right .one {
  background-position: 90px 115px;
  margin-right: 5px;
}

.buttom .right .two {
  background-position: 90px 85px;
  margin-right: 5px;
}

.buttom .right .change {
  padding: 0 5px;
}
</style>
