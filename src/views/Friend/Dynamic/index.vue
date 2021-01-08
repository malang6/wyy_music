<template>
  <div>
    <!-- 文本内容 -->
    <div
      class="text"
      :class="{ retransmission: dynamic.isRetransmission }"
      v-html="dynamic.text"
    ></div>
    <!-- 引入歌曲 -->
    <div
      v-if="dynamic.type === '分享单曲'"
      class="song"
      :class="{ retransmission: dynamic.isRetransmission }"
    >
      <img :src="dynamic.content.song.img80x80" class="song-img" />
      <div class="insert-img"></div>
      <div>
        <div class="song-name">{{ dynamic.content.song.name }}</div>
        <span class="song-author">{{
          dynamic.content.song.artists
            .reduce((p, c) => p + c.name + "/", "")
            .slice(0, -1)
        }}</span>
      </div>
    </div>
    <!-- 引入专辑 -->
    <div v-if="dynamic.type === '分享专辑'" class="song">
      <img :src="dynamic.content.album.blurPicUrl" class="song-img" />
      <div class="insert-img"></div>
      <div>
        <div class="song-name">
          <span class="type">{{ dynamic.content.album.type }}</span
          >{{ dynamic.content.album.name }}
        </div>
        <span class="song-author">{{ dynamic.content.album.artist.name }}</span>
      </div>
    </div>
    <!-- 引入视频 -->
    <div v-if="dynamic.type === '分享MV'" class="video">
      <video v-show="isPlayVideo" :src="videoUrl"></video>
      <div
        v-show="!isPlayVideo"
        class="video-img"
        :style="`background:url(${dynamic.content.mv.imgurl});backgroundSize:cover`"
      >
        <!-- 视频标题 -->
        <div class="video-header">
          <span class="video-type"></span>
          <span class="video-name">{{ dynamic.content.mv.name }}</span>
          <span class="video-author"
            >-{{
              dynamic.content.mv.artists
                .reduce((p, c) => p + c.name + "/", "")
                .slice(0, -1)
            }}</span
          >
        </div>
      </div>
      <!-- 播放按钮 -->
      <span
        v-show="!isPlayVideo"
        class="play-btn"
        @click="playVideo(dynamic.content.mv.id)"
      ></span>
      <!-- 视频底部 -->
      <div v-show="!isPlayVideo" class="video-footer">
        <span class="play-count">
          <span class="play-count-icon"></span>
          {{ dynamic.content.mv.playCount }}
        </span>
        <span class="video-time">
          <span class="video-time-icon"></span>
          {{ dynamic.content.mv.duration | handleTime }}
        </span>
      </div>
    </div>
    <!-- 插入图片 -->
    <div v-if="dynamic.imageList">
      <!-- 小图 -->
      <div v-show="!isBigImg">
        <img
          v-for="(img, index) in dynamic.imageList"
          :key="index"
          @click="changeSize(true, index)"
          class="img"
          :class="{ retransmission: dynamic.isRetransmission }"
          :src="img"
        />
      </div>
      <!-- 大图 -->
      <div v-show="isBigImg" @click="changeSize(false)" class="img-big">
        <div class="img-big-deit">
          <span>
            <span class="pack"></span>
            收起
          </span>
          <span>
            <span class="origin"></span>
            查看原图
          </span>
          <span>
            <span class="down"></span>
            下载
          </span>
        </div>
        <img class="img-big-img" :src="dynamic.imageList[bigImgIndex]" alt="" />
      </div>
    </div>
    <!-- 操作 -->
    <div
      class="edit"
      :class="{ retransmission: dynamic.isRetransmission }"
      v-if="dynamic.type !== '转发动态'"
    >
      <span class="edit-star">
        <span class="edit-star-icon"></span>
        ({{ dynamic.likedCount }})
      </span>
      <span>转发（{{ dynamic.insiteForwardCount }}）</span>
      <span>评论（{{ dynamic.commentCount }}）</span>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Dynamic",
  data() {
    return {
      isBigImg: false, //是否显示大图
      bigImgIndex: 0, //大图下标
      isPlayVideo: false, //是否播放视频
    };
  },
  props: {
    dynamic: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["videoUrl"]),
  },
  methods: {
    ...mapActions(["getVideoUrl"]),
    //点击切换大小图
    changeSize(flag, index) {
      this.isBigImg = flag;
      this.bigImgIndex = index;
    },
    //播放视频
    playVideo(id) {
      if (!this.videoUrl) {
        this.$message.error("请求地址无效");
        return
      }
      this.isPlayVideo = true;
      //请求视频播放地址
      this.getVideoUrl(id);
    },
  },
  filters: {
    //时间格式化
    handleTime(value) {
      return dayjs(value).format("mm:ss");
    },
  },
};
</script>

<style lang="stylus" scoped>
.text
  margin-top 10px
  font-size 14px
  line-height 24px
.text.retransmission
  font-size 12px
.song
  padding 10px
  margin 4px 0 5px
  height 40px
  display flex
  background #f5f5f5
  position relative
  .insert-img
    height 22px
    width 22px
    background-image url('../../../assets/my/images/sprite.png')
    background-position -109px -79px
    position absolute
    top 20px
    left 20px
    z-index 10
  .song-img
    display inline-block
    height 40px
    width 40px
    margin-right 10px
  .song-name
    height 22px
    font-size 14px
    color #333
    .type
      color #e03f40
      border 1px solid #e03f40
      font-size 12px
      width 27px
      height 14px
      margin-right 5px
  .song-author
    height 22px
    font-size 12px
    color #666
.song.retransmission
  background #fff
.video
  position relative
  .video-img
    width 318px
    height 169px
    margin-top 10px
    padding 10px 10px
    .video-header
      height 15px
      .video-type
        margin-right 5px
        display inline-block
        width 21px
        height 12px
        background url('../../../assets/my/images/sprite.png')
        background-position 0 -210px
      .video-name
        font-size 12px
        color #fff
      .video-author
        font-size 12px
        color rgb(128, 128, 128)
  .play-btn
    display inline-block
    position absolute
    top 90px
    left 148px
    width 40px
    height 40px
    background-image url('../../../assets/my/images/sprite.png')
    background-position 0 -510px
    opacity 0.8
  .play-btn:hover
    opacity 1
    cursor pointer
  .video-footer
    padding 0 10px
    font-size 12px
    color #fff
    height 25px
    line-height 25px
    width 318px
    background black
    .play-count
      .play-count-icon
        display inline-block
        width 10px
        height 10px
        background-image url('../../../assets/my/images/sprite.png')
        background-position -50px -510px
    .video-time
      float right
      .video-time-icon
        display inline-block
        width 10px
        height 10px
        background-image url('../../../assets/my/images/sprite.png')
        background-position -50px -530px
.img
  height 338px
  margin-top 5px
  margin-right 5px
  max-width 338px
.img.retransmission
  width 110px
  height 110px
.img:hover
  cursor zoom-in
.img-big
  background rgb(245, 245, 245)
  padding 12px 20px
  .img-big-deit
    padding-bottom 8px
    font-size 12px
    color #666
    .pack
      display inline-block
      width 13px
      height 13px
      background url('../../../assets/my/images/sprite.png')
      background-position -108px -19px
    .origin
      display inline-block
      width 13px
      height 13px
      background url('../../../assets/my/images/sprite.png')
      background-position -180px -20px
    .down
      display inline-block
      width 13px
      height 13px
      background url('../../../assets/my/images/sprite.png')
      background-position -45px -58px
  .img-big-deit>span
    padding-right 10px
    cursor pointer
  .img-big-deit>span:nth-child(n+2)
    padding-left 10px
    border-left 1px solid rgb(215, 215, 215)
  .img-big-img
    width 525px
  .img-big-img:hover
    cursor zoom-out
.edit
  height 16px
  margin-top 18px
  font-size 12px
  color #0c73c2
  text-align right
  .edit-star
    .edit-star-icon
      display inline-block
      width 14px
      height 14px
      background-image url('../../../assets/my/images/sprite.png')
      background-position 0 -20px
.edit.retransmission
  opacity 0.5
.edit>span
  padding 0 10px
  cursor pointer
.edit>span:nth-child(n+2)
  border-left 1px solid #999
</style>
