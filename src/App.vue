<template>
  <div id="app">
    <Discover v-if="true"/>
    <TopList v-else/>
  </div>
</template>

<script>
import Discover from '@views/Discover/Discover/Discover'
import TopList from '@views/Discover/Toplist/Toplist'
export default {
  name: 'App',
  components: { 
    Discover,
    TopList 
  }
}
</script>

<style>
</style>
