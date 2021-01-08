<template>
  <div>
    <div
      class="musicList-out"
      @click="flag = false"
      v-if="$route.path === '/discover/playlist'"
    >
      <div class="content">
        <!-- 头部 -->
        <Up></Up>
        <div class="musicList-header">
          <div @click="reqFenleihandel" @click.stop="flag = true">
            <span class="bigtext">{{ AllMusicList.cat }}</span>
            <button class="btn-out">
              <a class="btn">选择分类</a>
              <i class="iconfont icon-jy-Down-Outlined"></i>
            </button>
          </div>
          <a class="hot" @click="hothandel">热门</a>
        </div>
        <!-- 正方形 -->
        <div class="content-out">
          <ul class="content-box">
            <li
              class="content-item"
              v-for="item in AllMusicList.playlists"
              :key="item.id"
              @click="goMusicinfo(item.id)"
            >
              <div class="logobox">
                <img class="logo" :src="item.coverImgUrl" alt="xxx" />
              </div>
              <div>
                <span class="described">{{ item.name }}</span>
                <span class="musname"
                  >by {{ item.creator.nickname }}
                  <img
                    class="smallimg"
                    :src="
                      item.creator.avatarDetail
                        ? item.creator.avatarDetail.identityIconUrl
                        : ''
                    "
                    alt=""
                  />
                </span>
              </div>
            </li>
          </ul>
        </div>
        <!-- 分页器 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          prev-text="上一页"
          next-text="下一页"
          @current-change="
            getpagination(
              limit,
              $event * (limit - 1),
              more === false ? '' : 'hot'
            )
          "
        >
        </el-pagination>
        <!-- 卡片 -->
        <div class="card" v-show="flag">
          <!-- 全部风格按钮 -->
          <div class="header">
            <button class="btn">全部风格</button>
          </div>
          <!-- 卡片底部 -->
          <div class="card-right" @click="handel">
            <ul class="attrinfo">
              <li class="item" v-for="(item, index) in languages" :key="index">
                <a>{{ item.name }}</a>
              </li>
            </ul>
            <ul class="attrinfo2">
              <li class="item" v-for="(item, index) in styles" :key="index">
                <a>{{ item.name }}</a>
              </li>
            </ul>
            <ul>
              <li class="item" v-for="(item, index) in scenes" :key="index">
                <a>{{ item.name }}</a>
              </li>
            </ul>
            <ul>
              <li class="item" v-for="(item, index) in mengmeng" :key="index">
                <a>{{ item.name }}</a>
              </li>
            </ul>
            <ul>
              <li class="item" v-for="(item, index) in mengmeng" :key="index">
                <a>{{ item.name }}</a>
              </li>
            </ul>
          </div>
          <div class="card-left">
            <div class="box1">
              <i class="iconfont icon-yuyan"></i>
              <span class="box1-text">语种</span>
            </div>
            <div class="box2">
              <i class="iconfont icon-gangqin"></i>
              <span class="box1-text">风格</span>
            </div>
            <div class="box3">
              <i class="iconfont icon-icon-"></i>
              <span class="box1-text">场景</span>
            </div>
            <div class="box4">
              <i class="iconfont icon-xiaolian"></i>
              <span class="box1-text">情感</span>
            </div>
            <div class="box5">
              <i class="iconfont icon-yinle"></i>
              <span class="box1-text">主题</span>
            </div>
          </div>
          <Up></Up>
        </div>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import playlist from "../../api/playlistID";
import Up from "../../components/Up/index";
export default {
  name: "Playlist",
  components: {
    Up
  },
  data() {
    return {
      flag: false, //用于控制卡片显示/隐藏的
      AllMusicList: {}, //所有歌曲信息
      limit: 35, //分页器取出多少数量
      offset: 0, //分页器的页码
      total: 1, //总数
      languages: [], //语种
      styles: [], //风格
      scenes: [], //场景
      mengmeng: [], //情感
      theme: [], //主题
      more: "" //判断是最新数据，还是最热数据  true为热门
    };
  },
  mounted() {
    this.getpagination(this.limit, this.offset * this.limit);
  },
  methods: {
    //  封装一个请求分页器的函数
    async getpagination(limit, offset, order = "hot") {
      let AllMusicList = await playlist.getFenyeqiList(limit, offset, order);

      this.total = AllMusicList.total;
      this.AllMusicList = AllMusicList;
      this.more = AllMusicList.more;
    },

    async reqFenleihandel() {
      if (this.languages.length) return;
      let result = await playlist.getSelect();
      result.sub.forEach(item => {
        if (item.category === 0) {
          this.languages.push(item);
        }
        if (item.category === 1) {
          this.styles.push(item);
        }
        if (item.category === 2) {
          this.scenes.push(item);
        }
        if (item.category === 3) {
          this.mengmeng.push(item);
        }
        if (item.category === 4) {
          this.theme.push(item);
        }
      });
    },
    //热门数据
    async hothandel() {
      let AllMusicList = await playlist.getFenyeqiList(
        this.limit,
        this.offset,
        "hot"
      );

      this.AllMusicList = AllMusicList;
      this.total = AllMusicList.total;
      this.more = AllMusicList.more;
    },
    goMusicinfo(id) {
      this.$router.push({
        name: "PlaylistID",
        query: {
          id
        }
      });
    },
    handel() {
      alert(
        "萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌萌？"
      );
    }
  }
};
</script>
<style lang="stylus" scoped>
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.musicList-out {
  position: relative;
  padding: 40px;
  width: 100%;
  background-color: #f5f5f5;
}

.content {
  width: 980px;
  background-color: #fff;
  margin: 0 auto;
  padding-bottom: 30px;
}

.musicList-header {
  height: 40px;
  border-bottom: 2px solid #c20c0c;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  width: 900px;
  margin: 0 auto;
}

.musicList-header .bigtext {
  font-size: 24px;
  font-family: 'Microsoft Yahei', Arial, Helvetica, sans-serif;
}

.musicList-header .btn-out {
  outline: none;
  border: none;
  display: inline-block;
  margin: 2px 0 0 12px;
  font-size: 12px;
  width: 100px;
  height: 31px;
  line-height: 31px;
  text-align: center;
  background-color: rgb(246, 246, 246);
}

.musicList-header .btn-out:hover {
  background-color: #ccc;
}

.musicList-header .hot {
  border: 1px solid black;
  text-align: center;
  background-color: rgb(198, 12, 12);
  width: 46px;
  height: 29px;
  line-height: 29px;
  color: #fff;
  font-size: 12px;
  // box-shadow: red 0px 0px 10px;
}

.musicList-header .hot:hover {
  text-decoration: underline;
}

.content-out {
  background-color: #fff;
  width: 980px;
  margin: 0 auto;
  margin-top: 30px;
}

.content-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.content-item {
  width: 130px;
  height: 188px;
  padding: 0px 40px 30px 26px;
}

.content-box .content-item .logobox {
  width: 140px;
  height: 140px;
  // background-color: red;
}

.content-box .content-item .logobox .logo {
  width: 100%;
  height: 100%;
}

.content-box .content-item .described, .content-box .content-item .musname {
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.content-box .content-item .musname {
  margin-top: 5px;
  font-size: 12px;
  color: #999;
}

.el-pagination {
  text-align: center;
  margin: 30px 0;
}

.card {
  width: 720px;
  height: 437px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  top: 106px;
  left: 536px;
  box-shadow: 0px 0px 3px #000;
  border-radius: 1px;
}

// .active {
// display: none;
// }
.card .header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #ccc;
}

.card .btn {
  width: 75px;
  height: 26px;
  font-size: 12px;
  margin-left: 30px;
}

.card .card-left {
  width: 100px;
  height: calc(100% - 60px);
  border-right: 1px solid #ccc;
}

.card-left div {
  padding-top: 15px;
  font-size: 12px;
  float: right;
}

.card-left .box1, .card-left .box2, .card-left .box3, .card-left .box4, .card-left .box5 {
  width: 71px;
  height: 27px;
}

.card-left .box2 {
  height: 73px;
}

.card-left .box3 {
  height: 64px;
}

.card-left .box4 {
  height: 49px;
}

.card-left .box5 {
  height: 69px;
}

.card-left .box1-text {
  font-weight: 700;
  margin-left: 10px;
}

.card div .iconfont {
  font-size: 20px;
}

.card .card-right {
  width: 620px;
  height: calc(100% - 60px);
  // background-color: pink;
  float: right;
}

.card .card-right ul {
  margin-bottom: 30px;
  height: 40px;
  // background-color: yellow;
  display: flex;
  padding: 0 10px;
  align-items: flex-end;
  flex-wrap: wrap;
}

.card .card-right ul li a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
  padding: 0 10px;
  border-right: 1px solid black;
}

.card .card-right ul li a:hover {
  text-decoration: underline;
}

.smallimg {
  width: 13px;
  height: 13px;
}
</style>
