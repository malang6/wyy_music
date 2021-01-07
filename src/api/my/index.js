import axios from "@utils/axios"
//请求用户歌单
export const reqUserPlayList = (uid) => {
    return axios({
        method: "GET",
        url: "/user/playlist",
        params: {
            uid
        }
    })
}
//请求歌单详情
export const reqPlayListDerail = (id) => {
    return axios({
        method: "GET",
        url: "/playlist/detail",
        params: {
            id
        }
    })
}
//请求收藏的歌手列表
export const reqArtist = () => {
    return axios({
        method: "GET",
        url: "/artist/sublist"
    })
}
//请求收藏的电台列表
export const reqRadio = () => {
    return axios({
        method: "GET",
        url: "/dj/sublist"
    })
}
//请求用户收藏歌单、歌手和电台数量
export const reqSubcount = () => {
    return axios({
        method: "GET",
        url: "/user/subcount"
    })
}
//请求歌单评论
export const reqPlayListComment = (id) => {
    return axios({
        method: "GET",
        url: "/comment/playlist",
        params:{
            id
        }
    })
}
//创建歌单
export const reqCreatePlayList = (name) => {
    return axios({
        method: "GET",
        url: "/playlist/create",
        params:{
            name
        }
    })
}
//删除歌单
export const reqDelPlayList = (id) => {
    return axios({
        method: "GET",
        url: "/playlist/delete",
        params:{
            id
        }
    })
}