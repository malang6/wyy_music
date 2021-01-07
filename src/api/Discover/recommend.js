import request from '@utils/request'
// 请求热门歌单分类
export const reqHotSongList = () => { 
  return request({
    method: "GET",
    url:"/playlist/hot"
  })
}
// 首页幻灯片
export const reqBanner = () => { 
  return request({
    method: "GET",
    url:"/homepage/block/page"
  })
}
// 网友精选歌单
export const reqHotListOnline = () => { 
  return request({
    method: "GET",
    url:"/top/playlist"
  })
}

// 入驻歌手
export const reqHotSinger = () => { 
  return request({
    method: "GET",
    url:"/toplist/artist"
  })
}

// 热门dj
export const reqHotDj = () => { 
  return request({
    method: "GET",
    url:"/dj/toplist/popular"
  })
}

// 新碟上架
export const reqNewAlbum = () => { 
  return request({
    method: "GET",
    url:"/album/newest"
  })
}

// 每日推荐歌单/recommend/resource
// 榜单 
// 新碟上架 /album/newest
// 网友精选歌单/top/playlist
// 精品歌单/top/playlist/highquality