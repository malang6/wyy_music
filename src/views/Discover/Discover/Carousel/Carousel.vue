<template>
  <div class="discSwiper">
    <a class="pre" @click="preRoll" ref="pre"></a>
    <div class="carousel">
      <div class="showRoll">
        <ul class="discList" v-for="item in 4" :key="item">
          <li v-for="item in 5" :key="item" class="discItem">
            <a href="" class="cover">
              <img
                src="../../../../assets/Discover/images/discCover.jpg"
                alt=""
                class="pic"
              />
            </a>
            <a href="" class="albumName">狼殿下 影视原声碟PART.1</a>
            <a href="" class="artists">群星</a>
          </li>
        </ul>
      </div>
    </div>
    <a class="next" @click="nextRoll" ref="next"></a>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  methods:{
    // 向前滚
    preRoll(){

    },
    // 向后滚
    nextRoll(){
      console.log(this.$refs.next)
    }
  }
}
</script>

<style lang="stylus" scoped>
.discSwiper
  display flex
  align-items center
  height 186px
  margin 20px 0 37px
  border 1px solid #d3d3d3
  background-color rgb(245, 245, 245)
  .next, .pre
    width 17px
    height 17px
  .pre
    background-image url('../../../../assets/Discover/images/sprit.png')
    background-position -261px -75px
    &:hover
      background-position -281px -75px
  .next
    background-image url('../../../../assets/Discover/images/sprit.png')
    background-position -298px -75px
    &:hover
      background-position -318px -75px
  .carousel
    width 645px
    height 150px
    margin-top 30px
    overflow hidden
    background-color yellow
    position relative
    .showRoll
      display flex
      position absolute
      left -645px
      .discList
        width 100%
        height 100%
        display flex
        justify-content space-between
        .discItem
          width 118px
          height 150px
          margin-left 10px
          display flex
          flex-direction column
          .cover
            width 118px
            height 100px
            margin-bottom 5px
            background-image url('../../../../assets/Discover/images/disc.png')
            background-position 0 -570px
          .albumName, .artists
            width 90%
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
            line-height 18px
</style>
