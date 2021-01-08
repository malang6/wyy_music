<template>
  <div class="rank">
    <div class="rank-title">
      <div class="left">
        <h3 class="l-rank">听歌排行</h3>
        <h3 class="lj-l">累积听歌{{listenSongs}}首</h3>
        <img src="../../img/tanhao.png" alt="tanhao" class="tanhao" />
      </div>
      <div class="right">
        <a href="###" class="zjyz">
          <em>最近一周</em>
        </a>
        <a href="###" class="alltime">所有时间</a>
      </div>
    </div>
    <div class="rank-content">
      <ul>
        <li v-for="(userRecord,index) in userRecordList" :key="index">
          <div class="two-con">
            <div class="hd">
              <span class="num">{{index+1}}.</span>
              <span class="ply p-icon"></span>
            </div>
            <div class="song">
              <div class="ttc">
                <span class="txt">
                  <a>
                    <b>{{userRecord.song.name}}</b>
                  </a>
                  <span>
                    <em class="line">-</em>
                    <span>
                      <a class="g-n">{{userRecord.song.ar[0].name}}</a>
                    </span>
                  </span>
                </span>
              </div>
              <div class="opt">
                <a class="u-icn u-icn-81 icn-add" href="###"></a>
                <span class="icn icn-fav"></span>
                <span class="icn icn-share"></span>
                <span class="icn icn-dl"></span>
              </div>
            </div>
          </div>
          <div class="tops">
            <span class="bg" :style="{width:`${progressBar*userRecord.playCount}%`}"></span>
            <span class="time-num">{{userRecord.playCount}}次</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserRecord } from "@api/userHome";
export default {
  name: "Rank",
  data() {
    return {
      userRecordList: [],
    };
  },
  computed: {
    ...mapState({
      listenSongs: (state) => state.userInfo.listenSongs,
    }),
    progressBar() {
      let progress;
      progress = 100 / this.userRecordList[0].playCount;
      return progress;
    },
  },
  async mounted() {
    const { id } = this.$route.query;
    const userRecord = await getUserRecord(id);
    this.userRecordList = userRecord.data.weekData.slice(0, 10);
  },
};
</script>

<style lang="stylus" scoped>
.rank
  margin-top 30px
  .rank-title
    display flex
    align-items center
    justify-content space-between
    border-bottom 2px solid #c20c0c
    padding-bottom 6px
    .left
      display flex
      align-items center
      h3.l-rank
        font-size 20px
        color #666
        line-height 28px
        font-weight normal
      h3.lj-l
        margin-top 5px
        margin-left 10px
        line-height 26px
        font-weight 400
        font-size 12px
        color #666
      .tanhao
        width 20px
        margin-left 10px
    .right
      .zjyz
        em
          font-size 12px
          font-weight bold
          color #333
          padding-right 8px
          border-right 1px solid #999
      .alltime
        padding-left 8px
  .rank-content
    li
      display flex
      justify-content space-between
      height 38px
      background #fff
      &:nth-child(even)
        background #f7f7f7
      &:hover
        background #eeeeee
      &:hover .two-con .opt
        display block
      .two-con
        display flex
        align-items center
        .hd
          .num
            display inline-block
            padding-left 5px
            padding-right 8px
            width 37px
            height 38px
            line-height 38px
            text-align right
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            font-size 16px
            color #666
          .p-icon
            background url('../../img/index.png') no-repeat 0 0
          .ply
            display inline-block
            margin-bottom 5px
            width 26px
            height 24px
            cursor pointer
            background-position -9px -204px
      .song
        position relative
        width 480px
        padding-left 10px
        .txt
          position relative
          display inline-block
          max-width 99%
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          a
            b
              font-weight bold
              color #333
          .line
            padding 0 5px
            color #AEAEAE
          .g-n
            color #AEAEAE
        .opt
          position absolute
          display none
          top 0
          right 0
          a.icn-add
            margin-top -11px
          a.u-icn
            display inline-block
            overflow hidden
            vertical-align middle
            background url('../../img/icon.png') no-repeat 0 0
          a.u-icn-81
            width 13px
            height 13px
            background-position 0 -700px
          span.icn
            display inline-block
            width 18px
            height 16px
            margin 2px 0 0 8px
            overflow hidden
            text-indent -999px
            cursor pointer
            background url('../../img/table.png') no-repeat 0 0
          span.icn-fav
            background-position 0 -174px
          span.icn-share
            background-position 0 -195px
          span.icn-dl
            background-position -81px -174px
      .tops
        position relative
        width 319px
        line-height 38px
        .bg
          position absolute
          height 38px
          z-index 10
          background-color #4EB4F5
          opacity 0.1
        .time-num
          position absolute
          z-index 11
          padding-left 10px
          color #666
</style>