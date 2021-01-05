<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "@comps/Header";
import Footer from "@comps/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="stylus" scoped>
#app
  min-width 982px
  background-color #f5f5f5
</style>
  



