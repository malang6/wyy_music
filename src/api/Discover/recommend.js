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
// 每日推荐歌单/recommend/resource
// 榜单 
// 新碟上架 /album/newest