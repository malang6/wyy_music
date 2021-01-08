<template>
  <div class="edit-image">
    <!-- 导航栏 -->
    <div class="nav">{{ name }} > 编辑歌单 > 编辑封面</div>
    <!-- 内容 -->
    <div>
      <div class="upLoad">
        <input
          class="upLoad-btn"
          type="file"
          name="上传封面"
          accept=".jpg,.png,.bmp"
          @change="getUploadFile"
        />
        <span class="btn-tip">支持jpg、png、bmp格式的图片，且文件小于20M</span>
      </div>
      <div class="image">
        <div class="big-img">
          <img src="../../../assets/my/images/default_cover.png" alt="" />
        </div>
        <div class="small-img">
          <div>歌单封面预览</div>
          <img class="l-img" :src="image" alt="" />
          <div class="img-tip">大尺寸封面（180x180像素）</div>
          <img class="s-img" :src="image" alt="" />
          <div class="img-tip">小尺寸封面（40x40像素）</div>
        </div>
      </div>
      <div class="edit">
        <span class="btn">保 存</span>
        <span class="btn">取 消</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditImage",
  data() {
    return {
      name: "",
      image: "",
    };
  },
  mounted() {
    this.name = this.$route.query.name;
    this.image = this.$route.query.image;
  },
  methods: {
    getUploadFile(e) {
      console.log(e.target.files);
    },
  },
};
</script>

<style lang="stylus" scoped>
.edit-image
  padding 40px
  .nav
    height 28px
    font-size 12px
    color #333
    font-weight bold
    border-bottom 1px solid #cbcbcb
  .upLoad
    height 31px
    padding 26px 0 30px 0
    .upLoad-btn
      display inline-block
      outline none
    .btn-tip
      color #999
      font-size 12px
      line-height 32px
  .image
    display flex
    .big-img
      width 322px
      height 322px
      border 1px solid rgb(215, 215, 215)
      margin-right 40px
    .small-img
      padding-left 40px
      border-left 1px solid rgb(235, 235, 235)
      .l-img
        width 180px
        height 180px
        margin 15px 0
      .s-img
        width 40px
        height 40px
        margin 15px 0
      .img-tip
        color #999
        font-size 12px
  .edit
    height 31px
    margin-top 40px
    .btn
      padding 5px 20px
      height 32px
      border-radius 3px
      border 1px solid #999
      margin-right 20px
</style>
