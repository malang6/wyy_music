<template>
  <div class="playlist">
    <!-- 歌单信息部分 -->
    <div class="info">
      <img class="song-list-img" :src="playListInfo.image" />
      <div class="edit">
        <div class="edit-title">
          <div class="title-cate"></div>
          <span class="title">{{ playListInfo.name }}</span>
        </div>
        <div class="edit-user">
          <img class="avatar" :src="playListInfo.avatarUrl" alt="" />
          <span class="user-name">{{ playListInfo.nickName }}</span>
          <span class="create-time">{{ playListInfo.createTime }} 创建</span>
        </div>
        <div class="edit-btn">
          <div class="btn play">播放</div>
          <div class="btn plus"></div>
          <div class="btn collect">
            {{
              playListDetail.subscribedCount
                ? "(" + playListDetail.subscribedCount + ")"
                : "收藏"
            }}
          </div>
          <div class="btn share">
            {{
              playListDetail.subscribedCount
                ? "(" + playListDetail.shareCount + ")"
                : "分享"
            }}
          </div>
          <div class="btn down">下载</div>
          <div class="btn comment">
            {{
              playListDetail.subscribedCount
                ? "(" + playListDetail.commentCount + ")"
                : "评论"
            }}
          </div>
        </div>
        <div class="edit-label" v-if="playListInfo.tags.length">
          标签：
          <span
            class="label"
            v-for="(tag, index) in playListInfo.tags"
            :key="index"
            >{{ tag }}</span
          >
        </div>
        <div class="edit-description" v-if="playListInfo.description">
          <div v-if="playListInfo.simpleDescription && descriptionSimple">
            <p v-html="'介绍：' + playListInfo.simpleDescription"></p>
            <span
              class="open"
              @click="descriptionSimple = false"
              v-if="playListInfo.simpleDescription"
            >
              <span class="text">展开</span>
            </span>
          </div>
          <div v-else>
            <p v-html="'介绍：' + playListInfo.description"></p>
            <span
              class="close"
              @click="descriptionSimple = true"
              v-if="playListInfo.simpleDescription"
            >
              <span class="text">收起</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 歌单曲目 -->
    <div class="table" :class="{ border: +playListInfo.trackCount }">
      <div class="table-title">
        <span class="table-name">歌曲列表</span>
        <span class="table-total">{{ playListInfo.trackCount }}首歌</span>
        <span class="table-count"
          >播放：<span class="num">{{ playListInfo.playCount }}</span
          >次</span
        >
      </div>
      <div class="table-header" v-if="+playListInfo.trackCount">
        <div class="header order"></div>
        <div class="header title">歌曲标题</div>
        <div class="header time">时长</div>
        <div class="header singer">歌手</div>
        <div class="header album">专辑</div>
      </div>
      <!-- 没有歌曲的提示页面 -->
      <div class="noSong" v-else>
        <div class="noSong-tip">
          <span class="noSong-icon"></span>
          暂无音乐！
        </div>
        <div class="noSong-course">
          点击<span class="noSong-course-icon"></span
          >即可将你喜欢的音乐收藏到"我的音乐" 马上去发现
          <span class="noSong-course-discover">发现音乐</span>
        </div>
      </div>
      <div class="table-content">
        <div
          class="song-list"
          v-for="(item, index) in playListInfo.songList"
          :key="item.id"
        >
          <div class="song order">{{ index + 1 }}</div>
          <div class="song title">{{ item.name }}</div>
          <div class="song time">{{ item.time | timeFormat }}</div>
          <div class="song edit">
            <span class="song-btn add"></span>
            <span class="song-btn collect"></span>
            <span class="song-btn down"></span>
            <span class="song-btn share"></span>
            <span class="song-btn del"></span>
          </div>
          <div class="song singer">
            {{
              item.singerList.reduce((p, c) => p + c + " / ", "").slice(0, -3)
            }}
          </div>
          <div class="song album">{{ item.album }}</div>
        </div>
      </div>
    </div>
    <!-- 评论区域 -->
    <div class="comment" v-if="+playListInfo.trackCount">
      <div class="comment-title">
        <span class="title">评论</span>
        <span>共{{ playListDetail.commentCount }}条评论</span>
      </div>
      <div class="comment-ipt">
        <img class="avatar" :src="avatarUrl" />
        <div class="ipt">
          <span class="arrow">◆</span>
          <span class="arrow-inside">◆</span>
          <textarea class="textarea" cols="30" rows="10"> </textarea>
          <div class="edit">
            <div>
              <div class="expression"></div>
              <div class="call"></div>
            </div>
            <div>
              <span class="count">140</span>
              <div class="publish">评论</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 精彩评论内容 -->
      <Comment
        v-if="hotCommentList.length"
        :commentList="hotCommentList"
        :type="'精彩评论'"
      />
      <!-- 最新评论内容 -->
      <Comment
        v-if="commentList.length"
        :commentList="commentList"
        :type="'最新评论'"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import dayjs from "dayjs";
import Comment from "./Comment";
export default {
  name: "PlayList",
  data() {
    return {
      descriptionSimple: true,
      playListInfo: {},
      avatarUrl: "",
    };
  },
  components: {
    Comment,
  },
  watch: {
    //监听路由
    $route() {
      this.getPlayListInfo();
    },
  },
  filters: {
    timeFormat(value) {
      return dayjs(value).format("mm:ss");
    },
  },
  computed: {
    ...mapGetters(["playListDetail", "commentList", "hotCommentList"]),
  },
  methods: {
    ...mapActions(["getPlayListDerail", "getPlayListComment"]),
    //请求更新歌单介绍数据和评论数据
    async getPlayListInfo() {
      const query = this.$route.query;
      //请求歌单详细数据
      await this.getPlayListDerail(query.id);
      //歌单详细数据提取
      this.playListInfo = {
        avatarUrl: query.avatarUrl, //用户头像
        createTime: dayjs(+query.createTime).format("YYYY-MM-DD"), //歌单创建时间
        tags: query.tags, //歌单标签
        nickName: query.nickName, //歌单创建者
        trackCount: query.trackCount, //歌单曲目数
        playCount: query.playCount, //歌单播放数量
        description:
          query.description && query.description.replace(/\n/g, "<br/>"), //歌单详细介绍
        simpleDescription:
          query.description &&
          (+query.description.length > 200
            ? query.description.replace(/\n/g, "<br/>").slice(0, 200) + "..."
            : ""), //歌单简单介绍
        image: query.image, //歌单封面图
        name: query.name, //歌单名
        songList: this.playListDetail.songList, //歌单歌曲
        id: this.playListDetail.id,
      };
      //请求歌单评论
      await this.getPlayListComment(query.id);
    },
  },
  mounted() {
    this.getPlayListInfo();
    //读取头像图片地址
    this.avatarUrl = localStorage.getItem("avatarUrl");
  },
};
</script>

<style lang="stylus" scoped>
.playlist
  padding-bottom 50px
  min-height 100%
  .info
    padding 40px
    .song-list-img
      float left
      width 200px
      height 200px
      padding 4px
      border 1px solid #ccc
    .edit
      margin-left 230px
      margin-top 4px
      .edit-title
        margin-bottom 12px
        display flex
        align-items center
        .title
          font-size 20px
          color #333
          margin-left 6px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        .title-cate
          display inline-block
          height 24px
          width 54px
          background-image url('../../../assets/my/images/icon.png')
          background-position 0px -243px
      .edit-user
        font-size 12px
        display flex
        align-items center
        .avatar
          width 35px
          height 35px
          margin-right 10px
        .user-name
          margin-right 20px
          color #0c73c2
        .create-time
          color #999
      .edit-btn
        display flex
        align-items center
        .btn
          cursor pointer
          display inline-block
          height 21px
          padding 5px
          padding-left 30px
          background-image url('../../../assets/my/images/button2.png')
        .btn.play
          border-radius 5px 0 0 5px
          color #fff
          font-size 14px
          background-position -5px 3272px
          white-space nowrap
        .btn.plus
          background-position 0px 2403px
        .btn.collect
          border-radius 0 5px 5px 0
          margin 0 5px
          border-right 1px solid rgb(204, 204, 204)
          background-position 0px 2841px
          white-space nowrap
        .btn.share
          border-radius 0 5px 5px 0
          border-right 1px solid rgb(204, 204, 204)
          background-position 0px 2765px
          white-space nowrap
        .btn.down
          border-radius 0 5px 5px 0
          margin 0 5px
          border-right 1px solid rgb(204, 204, 204)
          background-position 0px 1229px
          white-space nowrap
        .btn.comment
          border-radius 0 5px 5px 0
          border-right 1px solid rgb(204, 204, 204)
          background-position 0px 2525px
          white-space nowrap
      .edit-label
        font-size 12px
        color #666
        .label
          display inline-block
          height 20px
          width 55px
          border 1px solid rgb(199, 199, 199)
          border-radius 11px
          margin-right 10px
          text-align center
          line-height 22px
          background-image url('../../../assets/my/images/button2.png')
          background-position -2px -1px
          cursor pointer
        .label:hover
          background #fff
      .edit-description
        line-height 18px
        margin-top 10px
        font-size 12px
        color #666
        .open
          display inline-block
          float right
          cursor pointer
          color #0c73c2
          width 40px
          background-image url('../../../assets/my/images/icon.png')
          background-position -39px -513px
          .text
            background #fff
        .close
          height 18px
          display inline-block
          float right
          cursor pointer
          color #0c73c2
          width 40px
          background-image url('../../../assets/my/images/icon.png')
          background-position -20px -515px
          .text
            background #fff
            border 1px solid #fff
  .table
    .table-title
      padding 0 10px 0 32px
      border-bottom 2px solid #c20c0c
      height 35px
      .table-name
        font-size 20px
        color #333
      .table-total
        font-size 12px
        color #666
        margin-left 20px
      .table-count
        margin-top 10px
        float right
        font-size 12px
        color #666
        .num
          color red
    .table-header
      display flex
      border-bottom 1px solid rgb(204, 204, 204)
      .header
        border-right 1px solid rgb(204, 204, 204)
        padding 8px 10px
        height 18px
        font-size 12px
        color #666
      .order
        width 74px
      .title
        width 303px
      .time
        width 111px
      .singer
        width 103px
      .album
        width 147px
        border none
    .noSong
      padding 105px
      .noSong-tip
        font-size 18px
        font-weight bold
        text-align center
        margin-bottom 38px
        .noSong-icon
          background url('../../../assets/my/images/icon.png')
          background-position 0 -347px
          display inline-block
          width 64px
          height 50px
      .noSong-course
        font-size 12px
        color #999
        text-align center
        .noSong-course-icon
          display inline-block
          width 16px
          height 14px
          margin 0px 7px 0px 9px
          background-image url('../../../assets/my/images/icon.png')
          background-position 0 -400px
        .noSong-course-discover
          color #0c73c2
        .noSong-course-discover:hover
          text-decoration underline
          cursor pointer
    .table-content
      .song-list
        display flex
        .song
          padding 8px 10px
          height 18px
          font-size 12px
          color #666
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        .order
          width 74px
          text-align center
        .title
          padding-right 30px
          width 273px
        .time
          width 111px
        .edit
          display none
          width 111px
          position relative
          .song-btn
            display inline-block
            height 18px
            width 18px
          .song-btn.add
            background url('../../../assets/my/images/icon.png')
            background-position 1px -699px
          .song-btn.add:hover
            background-position -21px -699px
            cursor pointer
          .song-btn.collect
            background url('../../../assets/my/images/icon.png')
            background-position -45px -86px
          .song-btn.collect:hover
            background-position -45px -109px
            cursor pointer
          .song-btn.down
            background url('../../../assets/my/images/icon.png')
            background-position -44px -136px
          .song-btn.down:hover
            background-position -44px -159px
            cursor pointer
          .song-btn.share
            background url('../../../assets/my/images/table.png')
            background-position -80px -173px
          .song-btn.share:hover
            background-position -103px -173px
            cursor pointer
          .song-btn.del
            background url('../../../assets/my/images/table.png')
            background-position 0 -216px
          .song-btn.del:hover
            background-position -20px -216px
            cursor pointer
        .singer
          width 83px
          padding-right 20px
        .album
          width 147px
          border none
      .song-list:nth-child(odd)
        background-color rgb(247, 247, 247)
      .song-list:hover .time
        display none
      .song-list:hover .edit
        display block
  .table.border
    border-bottom 1px solid #d9d9d9
  .comment
    margin 40px 0
    .comment-title
      padding 0 10px 0 32px
      height 35px
      font-size 12px
      color #666
      border-bottom 2px solid #c20c0c
      .title
        margin-right 20px
        font-size 20px
        color #333
    .comment-ipt
      margin-top 20px
      display flex
      .avatar
        height 50px
        width 50px
        margin-left 30px
      .ipt
        position relative
        margin-left 10px
        .textarea
          width 598px
          height 47px
          resize none
          outline none
          padding 5px 8px
          font-size 18px
        .arrow
          position absolute
          font-size 28px
          top 1px
          left -8px
          color black
        .arrow-inside
          position absolute
          font-size 26px
          top 2px
          left -6px
          color #fff
        .edit
          display flex
          justify-content space-between
          .expression
            height 22px
            width 22px
            display inline-block
            margin-right 10px
            background-image url('../../../assets/my/images/icon.png')
            background-position -37px -489px
          .call
            height 22px
            width 22px
            display inline-block
            background-image url('../../../assets/my/images/icon.png')
            background-position -58px -489px
          .count
            font-size 12px
            color #999
            margin-right 10px
          .publish
            display inline-block
            width 46px
            height 25px
            background-image url('../../../assets/my/images/button2.png')
            background-position 0px -471px
            border-radius 3px
            text-align center
            color #fff
            font-size 14px
            line-height 25px
</style>
