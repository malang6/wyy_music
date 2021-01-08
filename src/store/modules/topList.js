import { reqSongListComment } from '@api/Discover/topList'
export default {
  state: {
    currentId: '',
    updateFrequency: '',
    songCommentList: [],
    totalComment: 0,
  },
  actions: {
    async getComment ({ commit }, { currentId, time }) {
      const songCommentList = await reqSongListComment(currentId, time)
      commit('GET_COMMENT', songCommentList)
    }
  },
  mutations: {
    // 存储id和更新时间
    saveData (state, { currentId, updateFrequency }) {
      state.currentId = currentId,
        state.updateFrequency = updateFrequency
    },
    // 存储评论列表和总评论数
    GET_COMMENT (state, songCommentList) {
      state.songCommentList = songCommentList.comments
      state.totalComment = songCommentList.total
    },
  },
}