<template>
  <div class="edit">
    <div class="title">
      <span>{{ $route.query.name }}</span>
      <span>></span>
      <span>编辑歌单</span>
    </div>
    <div class="form">
      <div>
        <ValidationProvider rules="required" v-slot="{ errors }">
          <span class="name">歌单名：</span>
          <input class="songs" type="text" v-model="name" />
          <p style="color: red">{{ errors[0] }}</p>
        </ValidationProvider>
      </div>
      <div>
        <span class="name">标签：</span>
        <span class="tag" v-for="item in tagSelected" :key="item">
          {{ item }}
          <span class="tag-close" @click="closeTag(item)">x</span>
        </span>
        <span class="label" @click="getTags">选择标签</span><br />
        <span>选择合适的标签,最多选三个</span>
      </div>
      <div>
        <span class="name">介绍：</span>
        <textarea class="description" v-model="description"></textarea>
      </div>
      <div>
        <span class="save" :class="{ active: name }" @click="save">保 存</span>
        <span class="cancel" @click="cancel">取 消</span>
      </div>
    </div>
    <div>
      <img class="img" :src="$route.query.image" alt="" />
    </div>
    <!-- 选择歌单标签窗口 -->
    <div v-if="showDelWindow" class="add-window">
      <div class="window-title">
        <span>选择标签</span>
        <span class="close" @click="hideWindow">×</span>
      </div>
      <div class="window-content">
        <span class="window-tip">选择合适的标签，最多可选三个</span>
        <div class="window-main" @click="selectTag">
          <ul class="window-category" v-for="(item, key) in newTags" :key="key">
            <div class="window-name">{{ key | key2Name }}：</div>
            <div>
              <li
                class="window-tag"
                v-for="tag in item"
                :key="tag.id"
                :data-name="tag.name"
              >
                {{ tag.name }}
                <span
                  v-if="tagSelected.includes(tag.name)"
                  :data-name="tag.name"
                  class="window-select"
                ></span>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div class="window-footer">
        <div class="save" @click="hideWindow('save')">保存并关闭</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "歌单名不能为空",
});

export default {
  name: "Edit",
  data() {
    return {
      name: "", //歌单名
      description: "", //歌单介绍
      earlyTags: [], //进来时有的标签
      isShowSaveBtn: false,
      showDelWindow: false, //是否显示选择标签窗口
      newTags: {}, //处理过后的所有tags数据
      tagSelected: [], //选择后的标签
    };
  },
  filters: {
    key2Name(value) {
      if (value === "0") return "语种";
      if (value === "1") return "风格";
      if (value === "2") return "场景";
      if (value === "3") return "情感";
      if (value === "4") return "主题";
    },
  },
  components: {
    ValidationProvider,
  },
  computed: {
    ...mapGetters(["tags"]),
  },
  methods: {
    ...mapActions(["getPlayListTags", "updatePlayList"]),
    ...mapMutations(["UPDATE_CREATE_PLAY_LIST"]),
    //取消编辑
    cancel() {
      this.$router.back();
    },
    //保存
    save() {
      if (!this.name) return;
      const data = {
        id: this.$route.query.id,
        name: this.name,
        desc: this.description,
        tags: this.tagSelected.join(";"),
      };
      //发送修改请求
      this.updatePlayList(data);
      //修改vuex数据
      this.UPDATE_CREATE_PLAY_LIST(data);
      this.$router.back();
    },
    //删除已选标签
    closeTag(name) {
      this.tagSelected = this.tagSelected.filter((item) => item !== name);
    },
    //点击选择标签
    selectTag(e) {
      const name = e.target.dataset.name;
      if (!name) return;
      if (this.tagSelected.includes(name)) {
        this.tagSelected = this.tagSelected.filter((item) => item !== name);
        return;
      }
      if (this.tagSelected.length >= 3) {
        console.log("最多选择三个标签");
        return;
      }
      this.tagSelected.push(name);
    },
    //点击选择标签
    async getTags() {
      //显示选择标签窗口
      this.showDelWindow = true;
      //请求标签
      await this.getPlayListTags();
      //处理标签数据
      this.newTags = this.tags.reduce((p, c) => {
        for (let i = 0; i <= 4; i++) {
          if (c.category === i) {
            p[i] ? p[i].push(c) : (p[i] = [c]);
          }
        }
        return p;
      }, {});
    },
    //关闭选择标签窗口
    hideWindow(save) {
      this.showDelWindow = false;
      if (save) return;
      this.tagSelected = "";
    },
  },
  watch: {
    $route() {
      this.name = this.$route.query.name;
      this.description = this.$route.query.description;
      this.earlyTags = this.$route.query.tags;
      this.tagSelected = this.earlyTags;
    },
  },
  mounted() {
    this.name = this.$route.query.name;
    this.description = this.$route.query.description;
    this.earlyTags = this.$route.query.tags;
    console.log(this.earlyTags)
    this.tagSelected = this.earlyTags;
  },
};
</script>

<style lang="stylus" scoped>
.edit
  padding 40px
  font-size 12px
  color #333
  .title
    margin-bottom 30px
    font-size 12px
    height 27px
    border-bottom 1px solid rgb(203, 203, 203)
  .title>span:nth-child(1)
    color #0c73c2
  .title>span:nth-child(2)
    color #999
  .title>span:nth-child(3)
    color #333
    font-weight bold
  .form
    float left
    margin-right 20px
  .form>div
    position relative
    padding-left 62px
    .name
      position absolute
      left 0px
      height 32px
      width 62px
      text-align right
    .name:nth-child(1)
      line-height 32px
    .songs
      outline none
      width 291px
      height 16px
      borderr-radius 3px
      padding 5px 6px 6px 6px
    .tag
      border-radius 11px
      padding 0 5px
      border 1px solid rgb(203, 203, 203)
      margin-right 5px
      .tag-close
        cursor pointer
    .label
      color #0c73c2
      cursor pointer
    .description
      width 302px
      height 122px
      padding 5px 6px 6px 6px
      resize none
      outline none
      border-radius 3px
    .save
      display inline-block
      height 31px
      width 80px
      border-radius 5px
      border 1px solid rgb(219, 219, 219)
      text-align center
      line-height 31px
      margin-right 20px
      margin-top 40px
      background rgb(245, 245, 245)
      cursor pointer
    .save.active
      background #fff
      box-shadow -2px 2px 2px #999
    .cancel
      display inline-block
      height 31px
      width 80px
      border-radius 5px
      border 1px solid rgb(219, 219, 219)
      text-align center
      line-height 31px
      margin-top 40px
      background #fff
      box-shadow -2px 2px 2px #999
      cursor pointer
  .form>div:nth-child(1)
    margin-bottom 30px
  .form>div:nth-child(2)
    height 52px
    line-height 30px
  .form>div:nth-child(3)
    margin-top 10px
  .img
    height 140px
    width 140px
  .add-window
    background #fff
    width 530px
    position fixed
    top 40%
    left 40%
    z-index 11
    box-shadow 0px 3px 20px black
    .window-title
      padding 0 20px
      height 39px
      background #2d2d2d
      color #fff
      font-size 14px
      line-height 39px
      .close
        color rgb(136, 136, 136)
        font-size 20px
        float right
        cursor pointer
    .window-content
      height 270px
      padding 15px
      overflow auto
      .window-tip
        color #999
        font-size 12px
        display inline-block
        margin-bottom 15px
      .window-main
        height 250px
      .window-category
        display flex
        margin-bottom 20px
        .window-name
          height 100%
          margin-top 10px
          line-height 31px
          white-space nowrap
        .window-tag
          cursor pointer
          display inline-block
          width 70px
          height 31px
          border-radius 5px
          border 1px solid rgb(215, 215, 215)
          background rgb(244, 244, 244)
          text-align center
          line-height 31px
          margin-right 15px
          margin-top 10px
          position relative
          user-select none
          .window-select
            background-image url('../../../assets/my/images/icon.png')
            background-position -25px -430px
            display inline-block
            width 18px
            height 18px
            position absolute
            top 19px
            right -5px
    .window-footer
      height 33px
      padding 8px 20px
      border-top 1px solid rgb(215, 215, 215)
      .save
        width 100px
        height 31px
        border-radius 5px
        background-image url('../../../assets/my/images/button2.png')
        background-position 101px -387px
        line-height 31px
        text-align center
        margin 0 auto
        color #fff
      .save:hover
        opacity 0.9
</style>
