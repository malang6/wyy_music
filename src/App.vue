<template>
  <div id="app">
    <Discover v-if="true" />
    <TopList v-else-if="false" />
    <Carousel v-else />
  </div>
</template>

<script>
import Discover from '@views/Discover/Discover/Discover'
import TopList from '@views/Discover/Toplist/Toplist'
import Carousel from '@views/Discover/Discover/Carousel/Carousel'
export default {
  name: 'App',
  components: {
    Discover,
    TopList,
    Carousel,
  },
}
</script>

<style>
</style>
