import dayjs from "dayjs"

import { reqFriendDynamic, reqUser, reqVideo } from "@api/friend"

const state = {
    friendDynamicList: [],
    userInfo: {},
    videoUrl:""
}
const getters = {
    friendDynamicList: state => state.friendDynamicList,
    userInfo: state => state.userInfo,
    videoUrl: state => state.videoUrl,
}
const actions = {
    //请求朋友动态数据
    async getFriendDynamic({ commit }) {
        const result = await reqFriendDynamic()
        commit("WRITE_FRIEND_DYNAMIC", result.data.event)
    },
    //请求用户数据
    async getUser({ commit },id) {
        const result = await reqUser(id)
        // console.log("用户数据",result.data)
        commit("WRITE_USER_INFO", result.data)
    },
    //请求视频播放地址
    async getVideoUrl({commit},id) {
        const result = await reqVideo(id)
        commit("WRITE_VIDEO_URL",result.data.urls)
    }
}
const mutations = {
    WRITE_FRIEND_DYNAMIC(state, res) {
        state.friendDynamicList = res.map(item => ({
            id: item.id, //id
            avatarUrl: item.user.avatarUrl, //头像url
            nickName: item.user.nickname, //账号名
            text: JSON.parse(item.json).msg && JSON.parse(item.json).msg.replace(/\n/g, "<br/>"), //文本内容
            content: JSON.parse(item.json), //分享内容
            imageList: item.pics && item.pics.map(item => item.originUrl), //分享图片
            showTime: dayjs(item.showTime).format('HH:mm'), //发布时间
            type: item.info.commentThread.resourceTitle && item.info.commentThread.resourceTitle.split("：")[0], //动态类型
            commentCount: item.info.commentCount, //评论数
            likedCount: item.info.likedCount, //点赞数
            insiteForwardCount: item.insiteForwardCount, //转发数
        }))
    },
    WRITE_USER_INFO(state, res) {
        state.userInfo = {
            nickName: res.profile.nickname, //用户名
            avatarUrl: res.profile.avatarUrl, //头像url
            eventCount:res.profile.eventCount, //动态数
            follows:res.profile.follows, //关注数
            followers:res.profile.followeds, //粉丝数
        }
    },
    //删除广告
    DEL_ADVERTISEMENT(state, id) {
        state.friendDynamicList = state.friendDynamicList.filter(item => item.id !== id)
    },
    WRITE_VIDEO_URL(state,res){
        state.videoUrl = res[0]
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}