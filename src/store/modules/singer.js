import { getSingerList, getHotSinger } from "../../api/artist";
export default {
  state: {
    singerList: [], //歌手列表
    hotSingerList: [] //热门歌手
  },
  actions: {
    // 入驻歌手
    async getSinger({ commit }, { type, area, initial }) {
      const res = await getSingerList(type, area, initial);
      commit("SAVE_SINGER_LIST", res.data.artists);
    },
    // 获取热么歌手列表
    async getHotSingerList({ commit }) {
      const res = await getHotSinger();

      commit("SAVE_HOT_SINGER_LIST", res.data.artists);
    }
  },
  mutations: {
    SAVE_SINGER_LIST(state, data) {
      state.singerList = data;
    },
    SAVE_HOT_SINGER_LIST(state, data) {
      state.hotSingerList = data;
    }
  },
  getters: {
    sliceSingerList(state) {
      return state.singerList.slice(0, 10);
    },
    otherSingerList(state) {
      let newArr = [];
      state.singerList.forEach((item, index) => {
        if (index >= 10) {
          newArr.push(item);
        }
      });
      return newArr;
    },
    sliceHotSingeList(state) {
      return state.hotSingerList.slice(0, 10);
    },
    otherHotSinger(state) {
      let newArr = [];
      state.hotSingerList.forEach((item, index) => {
        if (index >= 10) {
          newArr.push(item);
        }
      });
      return newArr;
    }
  }
};
