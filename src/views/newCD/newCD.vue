<template>
  <div>
    <div class="newcdOut" v-if="$route.path === '/discover/album'">
      <!-- 热门新碟 -->
      <div class="newcdbox">
        <div class="hotcd">
          <div class="header">
            <h3>热门新碟</h3>
          </div>
          <!-- 热门新碟列表 -->
          <ul class="headerList">
            <li
              class="item"
              v-for="item in pagelist"
              :key="item.id"
              @click="gocdinfo(item.id)"
            >
              <div class="logo">
                <img :src="item.picUrl" alt="" />
              </div>
              <span class="musicname">{{ item.name }}</span>
              <span class="musicer">{{
                item.artist ? item.artist.name : ""
              }}</span>
            </li>
          </ul>
        </div>
        <!-- 全部新碟 -->
        <div class="allcd">
          <div class="allcdHeader">
            <h3 class="title">全部新碟</h3>
            <div class="allList" @click="gettypepage">
              <a data-index="ALL">全部</a>
              <a data-index="ZH">华语</a>
              <a data-index="EA">欧美</a>
              <a data-index="KR">韩国</a>
              <a data-index="JP">日本</a>
            </div>
          </div>
          <ul class="headerList">
            <li
              class="item"
              v-for="(item, index) in allcd"
              :key="index"
              @click="gocdinfo(item.id)"
            >
              <div class="logo">
                <img :src="item.blurPicUrl" alt="" />
              </div>
              <span class="musicname">{{ item.artist.alias[0] }}</span>
              <span class="musicer">{{ item.name }}</span>
            </li>
          </ul>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          prev-text="上一页"
          next-text="上一页"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
        <Up></Up>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import playlistID from "../../api/playlistID";
import Up from "../../components/Up/index";
export default {
  name: "NewCD",
  components: {
    Up
  },
  data() {
    return {
      offset: 0,
      limit: 35,
      total: 0, //总数
      allnewcdlist: [], //热门新碟所有数据
      pagelist: [], //点击分页器后的数据
      allcd: [], //全部新碟
      types: "" //目前分页器的类型
    };
  },
  methods: {
    async getnewcdlist(offset, limit) {
      let res = await playlistID.getnewCdList(offset, limit);
      console.log("+++", res);
      this.allnewcdlist = res.monthData;
      this.pagelist = res.monthData.slice(0, 10);
    },
    async getAllcd(offset, limit, area) {
      let res = await playlistID.getAllcd(offset, limit, area);
      console.log(res);
      this.allcd = res.albums;
      this.total = res.total;
    },
    //分页器
    async handleCurrentChange(page) {
      console.log(page);
      console.log(this.allnewcdlist);
      console.log(this.pagelist);
      this.pagelist = this.allnewcdlist.slice((page - 1) * 10, page * 10);
      //this.pagelist = this.allnewcdlist.slice(page, page * 10);
      if (this.types) {
        let type = this.types;
        console.log(type);
        this.getAllcd(page * this.limit, this.limit, type);
        return;
      }
      this.getAllcd(page * this.limit, this.limit);
    },
    //分类分页器
    gettypepage(event) {
      // console.log("e", event.target.dataset.index);
      // let type = event.target.dataset.index;
      const arr = ["ALL", "ZH", "EA", "KR", "JP"];
      let type = arr.find(item => item === event.target.dataset.index);
      this.types = type;
      this.getAllcd(this.limit, this.limit, type);
    },
    gocdinfo(id) {
      this.$router.push({
        name: "Newcdinfo",
        query: {
          id
        }
      });
    }
  },
  async mounted() {
    this.getnewcdlist(this.offset, this.limit);
    this.getAllcd(this.offset, this.limit);
  }
};
</script>

<style lang="stylus" scoped>
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.newcdOut {
  background-color: rgb(245, 245, 245);
}

.newcdbox {
  width: 980px;
  background-color: #fff;
  margin: 0 auto;
  padding: 40px;
}

.hotcd .header h3 {
  font-weight: 400;
  border-bottom: 3px solid red;
  padding-bottom: 10px;
}

.headerList {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: space-between;
}

.headerList .item {
  display: flex;
  flex-direction: column;
  width: 153px;
  height: 178px;
  font-size: 12px;
  margin-right: 11px;
  padding-bottom: 20px;
}

.headerList .item .logo {
  width: 153px;
  height: 130px;
}

.headerList .item .logo img {
  width: 153px;
  height: 130px;
}

.headerList .item .musicname {
  font-size: 16px;
  padding: 5px 0;
}

.allcd .allcdHeader {
  margin-top: 30px;
  display: flex;
  border-bottom: 3px solid red;
  padding-bottom: 10px;
  align-items: center;
}

.allList a {
  text-decoration: none;
  margin-left: 10px;
  color: rgb(102, 102, 102);
}

.allList a:hover {
  text-decoration: underline;
}

.allList a:after {
  content: '|';
  margin-left: 10px;
}

.allcd .allcdHeader .allList .item {
  // display: flex;
  float: left;
}

.allcd .allcdHeader .allList .item a {
  border-right: 1px solid black;
}

.allcd .allcdHeader .title {
  font-weight: 400;
  font-size: 22px;
}

.headerList .item .musicer {
  color: #666;
}

.headerList .item .musicname, .headerList .item .musicer {
  white-space: nowrap;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
}

.el-pagination {
  text-align: center;
}
</style>
