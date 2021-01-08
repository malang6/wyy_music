<template>
  <div
    class="music_player"
    :class="{ isShow: stateLock || isLock ? 'isShow' : '' }"
    @mouseenter="handleShow('up')"
    @mouseleave="handleShow('down')"
  >
    <audio id="audioPlay" ref="audio" @timeupdate="updateTime"></audio>
    <div class="play_line" title="展开播放条 "></div>
    <div class="center">
      <!-- 暂停/上一首 -->
      <div class="status">
        <a class="pre"></a>
        <a
          :class="{
            pause_play: play ? '' : 'pause_play',
            play: play ? 'play' : ''
          }"
          @click="handlePlayOrPause"
        ></a>
        <a class="next"></a>
      </div>
      <!-- 歌曲图片 -->
      <img
        class="logo"
        :src="songList[0] ? songList[0].songMsg.picUrl : ''"
        v-if="songList[0]"
      />
      <div class="logo defaultImg" v-else></div>
      <!-- 播放进度条 -->
      <div class="play">
        <!-- 进度条头部标题 -->
        <div class="title">
          <a class="name hid">{{
            songList[0] ? songList[0].songMsg.name : ""
          }}</a>
          <span
            class="author hid"
            v-for="author in songList[0] ? songList[0].author : []"
            :key="author.id"
            >{{ author.name }}/</span
          >
          <a class="link" title="来自电台分享" v-show="songList[0]"></a>
        </div>
        <!--进度条-->
        <div class="noop">
          <div class="process_bar" ref="runfatbar">
            <div
              class="ready"
              :style="{
                width:
                  processBarWidth * 414.98 > 414.98
                    ? 414.98
                    : processBarWidth * 414.98 + 'px'
              }"
            ></div>
            <div class="current" :style="{ width: processBarWidth + '%' }">
              <span class="btn" @mousedown="handleDown" ref="runBar"></span>
            </div>
          </div>
          <div class="time">
            <em class="start">{{
              songCurrentTime ? songCurrentTime : "00:00"
            }}</em>
            /
            <em class="end">{{ songList[0] ? songList[0].totalTime : "" }}</em>
          </div>
        </div>
      </div>
      <!-- 功能区 -->
      <div class="fun">
        <div class="left">
          <a class="col icn" title="收藏"></a>
          <a class="share icn" title="分享"></a>
        </div>
        <div class="right">
          <a class="volume icn"></a>
          <a
            class="play_mode icn"
            :class="{
              single_circle: play_mode === 0,
              loop: play_mode === 1,
              random: play_mode === 2
            }"
            :title="play_title"
            @click="handleShowPlayMode"
          >
            <a v-show="isShowPlayMode">{{ play_title }}</a>
          </a>
          <a
            class="play_list icn"
            title="播放列表"
            @click="isShowPlayList = !isShowPlayList"
            >{{ songList.length }}</a
          >
          <div class="play-list" v-if="isShowPlayList">
            <div class="list_head">
              <div class="title">
                <h4>播放列表({{ songList.length }})</h4>
                <a class="addAll">
                  <span class="ico ico_add"></span>
                  收藏全部
                </a>
                <span class="line"></span>
                <a class="clear">
                  <span class="ico icn_del"></span>
                  清除
                </a>
                <p class="lytit">你好,hello,world</p>
                <span class="close">x</span>
              </div>
            </div>
            <div class="list_body">
              <div class="msk"></div>
              <div class="list">
                <ul>
                  <li
                    class="item active"
                    v-for="item in songList"
                    :key="item.id"
                  >
                    <div class="col col_1"><div class="playicn"></div></div>
                    <div class="col col_2">{{ item.songMsg.name }}</div>
                    <div class="col col_3">
                      <div class="icns">
                        <i class="ico icn_del" title="删除">删除</i>
                        <i class="ico icn_dl" title="下载">下载</i>
                        <i class="ico icn_share" title="分享">分享</i>
                        <i class="ico icn_add" title="收藏">收藏</i>
                      </div>
                    </div>
                    <div class="col col_4">
                      <a
                        :title="au.name"
                        v-for="au in item.author"
                        :key="au.id"
                        >{{ au.name }}</a
                      >
                    </div>
                    <div class="col col_5">{{ item.totalTime }}</div>
                    <div class="col col_6">
                      <a class="ico ico-src" title="来自榜单"></a>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="bline"><span class="scrol"></span></div>

              <div class="msk2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 固定 -->
    <div class="lock">
      <a
        class="lock_bottom"
        :class="{ isLock: isLock ? 'isLock' : '' }"
        @click="handleLock"
      ></a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getSongUrl } from "../../api/btmPlayMusic";
import dayjs from "dayjs";
export default {
  name: "MusicPlayer",
  data() {
    return {
      isLock:
        JSON.parse(window.sessionStorage.getItem("statusObj"))?.isLock || false,
      stateLock: 0,
      isShowPlayMode: false,
      play_mode:
        JSON.parse(window.sessionStorage.getItem("statusObj"))?.play_mode || 0, // 0-单曲循环 1-循环 2-随机
      play: false,
      isShowPlayList: false, // 显示播放列表
      songUrlList: [], //播放地址列表
      currentTime: "", //当前播放时间
      processBarWidth: null // 音乐进度条
    };
  },
  computed: {
    ...mapGetters(["songList"]),
    // 播放模式提示信息
    play_title() {
      let str;
      if (this.play_mode === 0) {
        str = "单曲循环";
      }
      if (this.play_mode === 1) {
        str = "循环";
      }
      if (this.play_mode === 2) {
        str = "随机";
      }
      return str;
    },
    // 计算时间
    songTotalTime() {
      const totalTime = dayjs(
        this.songList ? this.songList[0].totalTime : 0
      ).format("mm:ss");
      return totalTime;
    },
    // 换算当前事件
    songCurrentTime() {
      const currentTime = dayjs(this.currentTime ? this.currentTime : 0).format(
        "mm:ss"
      );
      return currentTime;
    }
  },
  methods: {
    // 移动进度条
    handleDown() {
      console.log(1);
    },
    // 更新当前事件
    updateTime() {
      const audio = document.getElementById("audioPlay");
      //当前事件
      let currentTime = audio.currentTime * 1000;
      this.currentTime = currentTime;

      // 总时间
      const duration = audio.duration * 1000;
      // 进度条长度
      this.processBarWidth = (currentTime / duration) * 100;
    },
    // 播放或暂停
    async handlePlayOrPause() {
      this.play = !this.play;
      const id = this.songList[0] ? this.songList[0].id : "";
      const res = await getSongUrl(id);
      this.songUrlList = res.data.data;
      if (!this.$refs.audio.src) {
        this.$refs.audio.src = this.songUrlList[0]
          ? this.songUrlList[0].url
          : "";
      }

      const audio = document.getElementById("audioPlay");
      this.play ? audio.play() : audio.pause();
    },
    // 临时存储状态栏数据
    saveBtmStatus(count) {
      if (count === 0) {
        let statusObj = {
          isLock: false,
          play_mode: 0
        };
        window.sessionStorage.setItem("statusObj", JSON.stringify(statusObj));
      }
      let statusObj = {
        isLock: this.isLock,
        play_mode: this.play_mode
      };
      window.sessionStorage.setItem("statusObj", JSON.stringify(statusObj));
    },
    // 播放模式切换
    handleShowPlayMode() {
      if (this.flag) return;
      this.flag = true;
      if (this.play_mode < 2) {
        this.play_mode = this.play_mode + 1;
      } else {
        this.play_mode = 0;
      }
      this.saveBtmStatus();
      this.isShowPlayMode = !this.isShowPlayMode;
      this.timer = setTimeout(() => {
        this.isShowPlayMode = false;
      }, 2000);
      setTimeout(() => {
        this.flag = false;
      }, 2500);
    },
    // 底部滑动
    handleShow(params) {
      params === "up" ? (this.stateLock = 1) : (this.stateLock = 0);
    },
    // 底部状态锁
    handleLock() {
      this.isLock = !this.isLock;
      this.saveBtmStatus();
    }
  },

  async mounted() {
    this.saveBtmStatus(0);
  }
};
</script>

<style lang="stylus" scoped>
@import './index.stylus'
</style>
