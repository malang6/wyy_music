<template>
  <div>
    <div class="comment-content">
      <div class="comment-header">{{ type }}</div>
      <div class="comment-item" v-for="item in commentList" :key="item.id">
        <img class="avatar" :src="item.avatarUrl" />
        <div>
          <div class="text">
            <span class="name">{{ item.nickname }}</span
            >:
            {{ item.content }}
          </div>
          <!-- 引用 -->
          <div v-if="item.beRepliedNickName" class="beReplied">
            <span class="arrow">◆</span>
            <span class="arrow-inside">◆</span>
            <span class="beReplied-name">{{ item.beRepliedNickName }}</span> :
            <span>{{ item.beRepliedContent }}</span>
          </div>
          <!-- 底部 -->
          <div class="footer">
            <span>{{ item.time | timeFormat }}</span>
            <div class="edit">
              <span class="star">
                <span class="count">({{ item.likedCount }})</span>
              </span>
              <span class="reply">回复</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "Comment",
  props: {
    commentList: {
      type: Array,
    },
    type: {
      type: String,
    },
  },
  filters: {
    timeFormat(value) {
      return dayjs(value).format("YYYY年MM月DD日");
    },
  },
};
</script>

<style lang="stylus" scoped>
.comment-content
  margin 0 30px
  .comment-header
    height 20px
    font-weight bold
    font-size 12px
    color #333
    border-bottom 1px solid #cfcfcf
    margin-top 30px
  .comment-item
    display flex
    padding 15px 0
    .avatar
      margin-right 10px
      height 50px
      width 50px
    .text
      font-size 12px
      width 616px
      .name
        color #0c73c2
    .beReplied
      width 578px
      padding 8px 19px
      border 1px solid #dedede
      background rgb(235, 235, 235)
      margin-top 10px
      position relative
      .arrow
        font-size 16px
        position absolute
        top -11px
        left 22px
        color #dedede
      .arrow-inside
        font-size 16px
        position absolute
        top -10px
        left 22px
        color rgb(235, 235, 235)
      .beReplied-name
        color #0c73c2
    .footer
      height 16px
      margin-top 15px
      font-size 12px
      color #999
      display flex
      justify-content space-between
      .edit
        .star
          height 14px
          background-image url('../../../../assets/my/images/icon2.png')
          background-position -148px 1px
          padding-left 20px
          margin-right 10px
          .count
            background rgb(245, 245, 245)
        .reply
          padding 0 10px
          border-left 1px solid rgb(211, 211, 211)
  .comment-item:nth-child(n+3)
    border-top 1px dotted #ccc
</style>
