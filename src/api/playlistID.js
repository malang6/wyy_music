import request from '../utils/request'


export default {
    /* 
        获取歌单数据
    */
    getFenyeqiList(limit, offset, order = 'new', cat = '全部') {
        console.log(limit, offset, order)
        return request({
            method: 'GET',
            url: `/top/playlist?limit=${limit}&offset=${offset}&order=${order}&cat=${cat}`
        })
    },
    /* 
        获取分页器数据
    */
    // getFenyeqiList(limit,)
    /* 
        获取选择分类列表
    */
    getSelect() {
        return request({
            method: 'GET',
            url: '/playlist/catlist'
        })
    },

    //获取歌单详情
    getMusicinfo(id) {
        return request({
            method: 'GET',
            url: `/playlist/detail?id=${id}`
        })
    },

    //获取歌单评论
    getComment(id) {
        return request({
            method: 'GET',
            url: `/comment/playlist?id=${id}`
        })
    },
    //获取音乐url
    getMusicurl(id) {
        return request({
            method: 'GET',
            url: `/song/url?id=${id}`
        })
    },
    //新碟上架
    getnewCdList(offset, limit, year = 2021, month = 1) {
        return request({
            method: 'GET',
            url: `/top/album?offset=${offset}&limit=${limit}&year=${year}&month=${month}`
        })
    },
    //获取全部新碟
    getAllcd(offset, limit, area = 'All') {
        return request({
            method: 'GET',
            url: `/album/new?area=${area}&limit=${limit}&offset=${offset}`
        })
    },
    //获取新碟信息
    getcdinfo(id) {
        return request({
            method: 'GET',
            url: `album?id=${id}`
        })
    },
    //获取评论
    getcommpoent(id){
        return request({
            method:'GET',
            url:`/comment/album?id=${id}`
        })
    }
}