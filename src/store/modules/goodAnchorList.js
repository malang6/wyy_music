import { recommondType, getHotTypeRadio, newTopList } from '@api/djradio'
export default {
  state: {
    goodAnchorList: [], //优秀电台列表
    hotRadioList: [], //热门电台
    newTopList: [],
    status: 0,
  },
  actions: {
    async getGoodAnchorList({ commit }, id) {
      const res = await recommondType(id)
      commit('SAVE_GETGOODANCHORLIST', res.data.djRadios)
    },
    // 获取热门电台
    async getHotRadioList({ commit }, { cateId, limit, offset=0 }) {
      const res = await getHotTypeRadio(cateId, limit, offset)
      commit('SAVE_HOTRADIOLIST', res.data.djRadios)
    },
    // 获取新晋电台
    async getNewTopList({ commit }, { type, limit, offset=0 }) {
      const res = await newTopList(type, limit, offset)
      commit('SAVE_NEWTOPLIST', res.data.toplist)
    },
  },
  mutations: {
    SAVE_GETGOODANCHORLIST(state, data) {
      state.goodAnchorList = data
    },
    SAVE_HOTRADIOLIST(state, data) {
      state.hotRadioList = data
    },
    SAVE_STATUS(state, data) {
      state.status = data
    },
    SAVE_NEWTOPLIST(state, data) {
      state.newTopList = data
    },
  },
  getters: {
    slicedGoodAnchorList(state) {
      return state.goodAnchorList.slice(0, 5)
    },
    totalPages(state){
      if(state.status) {
        state.goodAnchorList.length/31
      }
    }
  },
}
