<template>
  <div class="newDisc">
    <!-- 头 -->
    <div class="top">
      <i class="circle"></i>
      <a href="" class="title">新碟上架</a>
      <span class="more">
        <a href="">更多</a>
        <i class="arrow"></i>
      </span>
    </div>
    <!-- 轮播图 -->
    <div class="discSwiper">
      <a class="pre" @click="preRoll" ref="pre"></a>
      <div class="carousel">
        <div :class="{'showRoll':true,'p0':keyPoint===0,'p1':keyPoint===1,'p2':keyPoint===2,'p3':keyPoint===3,'p4':keyPoint===4}">
          <ul class="discList" v-for="(list,index) in discList" :key="index">
            <li v-for="album in list" :key="album.id" class="discItem">
              <a href="" class="cover">
                <img
                  :src="album.blurPicUrl"
                  alt=""
                  class="pic"
                />
              </a>
              <a href="" class="albumName">{{album.name}}</a>
              <a href="" class="artists">{{album.artist.name}}</a>
            </li>
          </ul>
        </div>
      </div>
      <a class="next" @click="nextRoll" ref="next"></a>
    </div>
  </div>
</template>

<script>
// import CarouselBottom from '../Carousel/CarouselBottom/CarouselBottom'
import {reqNewAlbum} from '@api/Discover/recommend' 
export default {
  name: 'NewDisc',
  data(){
    return{
      keyPoint:2,
      newAlbum:[]
    }
  },
  computed:{
    discList(){
      const discListFront=this.newAlbum.slice(0,5)
      const discListAfter=this.newAlbum.slice(5,10)
      let finalList=[]
      for(var i=1;i<4;i++){
        if(i===2){
          finalList.push(discListFront)
        }else{
          finalList.push(discListAfter)
        }
      }
      return finalList
    }
  },
  methods: {
    // 轮播向前滚
    preRoll() {
      if(this.preTrigger)return 
      this.preTrigger=true
      if(this.keyPoint===4){
        this.keyPoint=3
      }
      this.keyPoint--
      setTimeout(()=>{
        if(this.keyPoint<=1){
        this.keyPoint=4
      }
      },500)
      setTimeout(()=>{
        this.preTrigger=false
      },501)
    },
    // 轮播向后滚
    nextRoll() {
      if(this.nextTrigger)return 
      this.nextTrigger=true
      if(this.keyPoint===0){
        this.keyPoint=1
      }
      this.keyPoint++
      // 无缝
      setTimeout(()=>{
        if(this.keyPoint>=3){
          this.keyPoint=0
        }
      },500)
      // 节流定时器
      setTimeout(()=>{
        this.nextTrigger=false
      },501)
    },
    // 请求新碟
    async getNewAlbum() {
      const newAlbum = await reqNewAlbum()
      this.newAlbum = newAlbum.albums
    },
  },
  mounted(){
    this.getNewAlbum()
  }
}
</script>

<style lang="stylus" scoped>
.newDisc
  .top
    padding-right 10px
    border-bottom 2px solid #C10D0C
    height 33px
    color #666
    font-size 12px
    .circle
      float left
      display inline-block
      width 20px
      height 20px
      background url('../../../assets/Discover/images/sprit.png')
      background-position -232px -162px
      margin 5px 10px 0
    .title
      float left
      font-size 20px
      font-weight normal
      line-height 28px
      color #333
    .more
      float right
      margin-top 10px
      .arrow
        display inline-block
        background url('../../../assets/Discover/images/sprit.png')
        background-position 1px -240px
        width 12px
        height 12px
  .discSwiper
    display flex
    justify-content space-evenly
    align-items center
    height 186px
    margin 20px 0 37px
    border 1px solid #d3d3d3
    background-color rgb(245, 245, 245)
    .next, .pre
      width 17px
      height 17px
      &:hover
        cursor pointer
    .pre
      background-image url('../../../assets/Discover/images/sprit.png')
      background-position -261px -75px
      &:hover
        background-position -281px -75px
    .next
      background-image url('../../../assets/Discover/images/sprit.png')
      background-position -298px -75px
      &:hover
        background-position -318px -75px
    .carousel
      width 645px
      height 150px
      margin-top 30px
      overflow hidden
      position relative
      .showRoll
        display flex
        position absolute
        &.p1
          left 0px
          transition left 500ms
        &.p2
          left -645px
          transition left 500ms
        &.p3
          left -1290px
          transition left 500ms
        &.p0
          left 0px
        &.p4
          left -1290px
        .discList
          width 645px
          height 100%
          display flex
          justify-content space-between
          .discItem
            width 118px
            height 150px
            margin-left 10px
            display flex
            flex-direction column
            .pic
              width 100px
              height 100px
            .cover
              width 118px
              height 100px
              margin-bottom 5px
              background-image url('../../../assets/Discover/images/disc.png')
              background-position 0 -570px
            .albumName, .artists
              width 90%
              overflow hidden
              white-space nowrap
              text-overflow ellipsis
              line-height 18px
              &:hover
                text-decoration underline
            .albumName
              color #000
              
</style>
