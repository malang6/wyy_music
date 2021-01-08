<template>
  <div>
    <div v-if="$route.path === '/' || $route.path === '/discover'">
      Discover
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
export default {
  name: "Discover"
};
</script>

<style></style>
