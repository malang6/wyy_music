<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer v-if="$route.path!=='/my/artist'"  />
    <div class="btm_bar">
      <MusicPlayer/>
    </div>
  </div>
</template>

<script>
import Header from "@comps/Header";
import Footer from "@comps/Footer";
import MusicPlayer from "@comps/MusicPlayer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
    MusicPlayer
  }
};
</script>

<style lang="stylus" scoped>

</script>


