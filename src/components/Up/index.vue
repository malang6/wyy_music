<template>
  <div class="Upout">
    <div class="Upbox" v-show="isShow" @click="goUp">
      <span>^</span>
      <span>TOP</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Up",
  data() {
    return {
      isShow: 0,
      //   scrollY: "",
    };
  },
  methods: {
    handleScroll() {
      //获取滚动条位置
      let scrollY = document.documentElement.scrollTop;
      this.isShow = scrollY;
    },
    goUp() {
      //   console.log("+++++++++");
      //   setInterval(() => {
      //     document.documentElement.scrollTop -= 100;
      //   }, 1000);
      window.scroll(0, 0);
    },
  },
  mounted() {
    //监听系统滚动条
    window.addEventListener("scroll", this.handleScroll, true);
  },
};
</script>

<style lang="stylus" scoped>
.Upbox {
  width: 50px;
  height: 50px;
  background-color: rgb(245, 245, 245);
  border: 1px solid #ccc;
  box-shadow: 10px 10px 5px #888888;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 80%;
  top: 80%;
}

.Upbox span {
  height: 25px;
}
</style>