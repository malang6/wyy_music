<template>
  <div>
    <div v-if="$route.path === '/discover' || $route.path === '/'">
      <!-- <button @click="handleClick">播放按钮</button> -->
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Discover",
  methods: {
    ...mapActions(["getSongsDetail"]),
    handleClick() {},
  },
  mounted() {
    const token = window.localStorage.getItem("token");
    if (token) this.getSongsDetail(347230);
  },
};
</script>

<style>
</style>