<template>
  <div>
    <aplayer
      autoplay
      class="mpthree"
      @click="handel"
      :music="{
        title: 'secret base~君がくれたもの~',
        artist: 'Silent Siren',
        src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
        pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg',
      }"
    />
  </div>
</template>

<script>
import Aplayer from "vue-aplayer";
export default {
  name: "mpthree",
  components: {
    Aplayer,
  },
  props: ["isplay", "isplayflag"],
  methods: {
    handel() {
      console.log(1);
    },
  },
  mounted() {
    console.log(this.isplay);
  },
  updated() {
    console.log(this.isplay);
  },
  // beforeCreate(){

  // }
};
</script>

<style style lang='stylus' scoped>
.mpthree {
  width: 100%;
  position: fixed;
  left: 10px;
  bottom: 0px;
  background-color: #ccc;
}
</style>