export default {
  state: {
    currentId: '',
    updateFrequency:'',
  },
  actions: {
    
    
  },
  mutations: {
    // 存储id和更新时间
    saveData (state, {currentId,updateFrequency }) { 
      state.currentId = currentId,
      state.updateFrequency=updateFrequency
    }
  },
}