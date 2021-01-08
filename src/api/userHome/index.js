import axios from "@utils/axios"

//获取用户详细信息
export const getUserInfo = (uid)=>{
    return axios({
        method:"GET",
        url:"/user/detail?uid="+uid
    })
}
//获取关注列表
export const getUserFollowed = (uid)=>{
    return axios({
        method:"GET",
        url:"/user/follows?uid="+uid
    })
}
//获取用户粉丝列表
export const getUserFolloweds = (uid)=>{
    return axios({
        method:"GET",
        url:"/user/followeds?uid="+uid
    })
}
//获取用户动态列表
export const getUserEvent = (uid)=>{
    return axios({
        method:"GET",
        url:"/user/event?uid="+uid
    })
}
//获取用户播放记录
export const getUserRecord = (uid,type=1)=>{
    return axios({
        method:"GET",
        url:`/user/record?uid=${uid}&type=${type}`
    })
}
//获取用户歌单
export const getUserPlayList = (uid)=>{
    return axios({
        method:"GET",
        url:`/user/playlist?uid=${uid}`
    })
}
//获取用户信息 , 歌单，收藏，mv, dj 数量
export const getUserLevel = ()=>{
    return axios({
        method:"GET",
        url:"/user/subcount"
    })
}
//发送私信/send/text
export const sendText = (id,msg)=>{
    return axios({
        method:"GET",
        url:`/send/text?user_ids=${id}&msg=${msg}`
    })
}