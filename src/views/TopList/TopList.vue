<template>
  <div class="toplist" id="top">
    <div class="listType">
      <!-- 云音乐特色榜 -->
      <div class="specialList list">
        <h2 class="listTitle">云音乐特色榜</h2>
        <div>
          <div
            :class="{
              listItem: true,
              active: special.id ? special.id === currentId : false,
            }"
            v-for="special in specialList"
            :key="special.id"

            @click="getListInfo(special.id,special.updateFrequency)"
          >
            <img :src="special.coverImgUrl" alt="" class="pic" />
            <div class="info">
              <p class="whichList">{{ special.name }}</p>
              <p class="updateTime">{{ special.updateFrequency }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 全球媒体榜 -->
      <div class="globalList list">
        <h2 class="listTitle">全球媒体榜</h2>
        <div>
          <div
            :class="{
              listItem: true,
              active: global.id ? global.id === currentId : false,
            }"
            v-for="global in globalList"
            :key="global.id"
            @click="getListInfo(global.id,global.updateFrequency)"
          >
            <img :src="global.coverImgUrl" alt="" class="pic" />
            <div class="info">
              <p class="whichList">{{ global.name }}</p>
              <p class="updateTime">{{ global.updateFrequency }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="listContainer">
      <PlayList :songList="songList"/>
    </div>
    <!-- 回到顶部 -->
    <ReturnTop :returnUpIsShow="returnUpIsShow"/>
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import PlayList from './PlayList/PlayList'
import ReturnTop from '@comps/ReturnTop/ReturnTop'
import { reqTopList,reqListSong} from '@api/Discover/topList'
export default {
  name: 'Toplist',
  data() {
    return {
      topList: [],
      songList: [],
      updateFrequency: '',
      returnUpIsShow:'none'
    }
  },
  watch:{
    $route:{
      async handler(){
        if(!this.$route.query.id)return
        const songList = await reqListSong(this.$route.query.id)
        this.songList = songList.playlist 
      },
      immediate:true
    }
  },
  methods: {
    ...mapMutations(['saveData']),
    
    // 点击获取歌曲列表
    async getListInfo(currentId,updateFrequency) {
      this.$router.push({
        path:'/discover/toplist',
        query:{ id:currentId }
      })
      this.saveData({currentId,updateFrequency})
    },

    //组件挂载时获取歌单和更新数据
    async getDataBegin(){
      const topList = await reqTopList()
      this.topList = topList.list
      console.log(this.$route.query.id)
      if(this.$route.query.id){
        const currentId=+this.$route.query.id
        const updateFrequency=this.topList.find(list=>list.id===currentId).updateFrequency
        this.saveData({currentId,updateFrequency})
        return 
      }
      // 当路径没有id且第一次挂载时
      const {id:currentId,updateFrequency}=topList.list[0]
      this.saveData({currentId,updateFrequency})
      const songList = await reqListSong(currentId)
      this.songList = songList.playlist 
    },

    // 回到顶部
    scroll() {
      if (window.pageYOffset <= 105) {
        this.returnUpIsShow = "none"
      } else this.returnUpIsShow = "block";
    },
  },
  components: {
    PlayList,
    ReturnTop
  },
  computed: {
    specialList() {
      return this.topList.length ? this.topList.slice(0, 4) : []
    },
    globalList() {
      return this.topList.length ? this.topList.slice(4) : []
    },
    ...mapState({
      currentId:state=>state.topList.currentId
    })
  },
  mounted() {
    this.getDataBegin()
    window.addEventListener('scroll',this.scroll)
  },
  beforeDestroy(){
     window.removeEventListener('scroll',this.scroll)
  }
}
</script>

<style lang="stylus" scoped>
.toplist
  width 980px
  margin 0 auto
  border-left 1px solid rgb(211, 211, 211)
  border-right 1px solid rgb(211, 211, 211)
  background-color rgb(245, 245, 245)
  display flex
  .listType
    width 240px
    border-right 1px solid rgb(211, 211, 211)
    background-color rgb(249, 249, 249)
    .specialList
      margin-top 40px
    .globalList
      margin-top 20px
    .list
      width 100%
      .listTitle
        padding 0px 10px 12px 15px
        font-size 14px
        color rgb(0, 0, 0)
      .listItem
        padding 10px 0 10px 20px
        width 220px
        display flex
        &.active
          background-color rgb(230, 230, 230)
        &:hover
          cursor pointer
          background-color rgb(244, 242, 242)
        img
          width 40px
          height 40px
        .info
          margin-left 10px
          .whichList
            margin-bottom 8px
          .updateTime
            color #999
  .listContainer
    width 739px
    background-color rgb(255, 255, 255)

  // .returnTop
  //   position fixed
  //   border 1px solid #ccc
  //   border-radius 3px
  //   left 50%
  //   margin-left 500px
  //   bottom 100px
  //   background-color rgb(245, 245, 245)
  //   a
  //     width 50px
  //     display flex
  //     flex-direction column
  //     span 
  //       height 25px
  //       text-align center
  //       line-height 25px
</style>
