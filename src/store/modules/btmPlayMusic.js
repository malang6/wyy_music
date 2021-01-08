import { getSongDetail } from "../../api/btmPlayMusic";
import dayjs from "dayjs";
export default {
  state: {
    songsList: [] //播放歌曲列表
    // songsUrlList: [] //播放地址列表
  },
  actions: {
    // 获取单首歌曲详细信息
    async getSongsDetail({ commit }, ids) {
      const res = await getSongDetail(ids);
      console.log(res);
      commit("SAVE_SONG_DETAIL", res.data.songs);
    }
    // async getSongUrl({ commit }, id) {
    //   const res = await getSongUrl(id);
    //   commit("SAVE_SONGS_URL", res.data.data);
    // }
  },
  mutations: {
    SAVE_SONG_DETAIL(state, data) {
      state.songsList = data;
    }
    // SAVE_SONGS_URL(state, data) {
    //   state.songsUrlList = data;
    // }
  },
  getters: {
    //播放地址数组
    /*  urlList(state) {
      let urlArr = [];
      state.songsUrlList.forEach(item =>
        urlArr.push({
          id: item.id,
          songUrl: item.url
        })
      );
      return urlArr;
    }, */
    // 等待播放歌曲列表
    songList(state) {
      let songArr = [];
      state.songsList.forEach(item =>
        songArr.push({
          id: item.id,
          songMsg: item.al,
          author: item.ar,
          dt: item.dt,
          totalTime: dayjs(item.dt).format("mm:ss")
        })
      );
      return songArr;
    }
  }
};
