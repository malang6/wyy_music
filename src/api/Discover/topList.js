import request from '@utils/request'

// 请求所有榜单
export const reqTopList = () => { 
  return request({
    method: "GET",
    url:"/toplist"
  })
}

// 请求榜单内容
export const reqListSong = (listId) => { 
  return request({
    method: "GET",
    url:"/playlist/detail?id="+listId
  })
}

// 请求歌单评论
export const reqSongListComment = (listId,time='') => { 
  return request({
    method: "GET",
    url:`/comment/playlist?id=${listId}${time?'&before='+time:''}`
  })
}

// 发表歌单评论
export const commentSongList = (t,type,id,content) => { 
  return request({
    method: "GET",
    url: "/comment",
    params: {
      t,
      type,
      id,
      content
    }
  })
}
