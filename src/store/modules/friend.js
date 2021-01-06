import dayjs from "dayjs"

import { reqFriendDynamic } from "@api/friend"

const state = {
    friendDynamicList: []
}
const getters = {
    friendDynamicList: state => state.friendDynamicList
}
const actions = {
    //请求朋友动态数据
    async getFriendDynamic({ commit }) {
        const result = await reqFriendDynamic()
        console.log(result.data.event)
        commit("WRITE_FRIEND_DYNAMIC", result.data.event)
    }
}
const mutations = {
    WRITE_FRIEND_DYNAMIC(state, res) {
        state.friendDynamicList = res.map(item => ({
            id: item.id, //id
            avatarUrl: item.user.avatarUrl, //头像url
            nickName: item.user.nickname, //账号名
            text: JSON.parse(item.json).msg && JSON.parse(item.json).msg.replace(/\n/g, "<br/>"), //文本内容
            content:JSON.parse(item.json), //分享内容
            image:item.pics[0] && item.pics[0].originUrl, //分享图片
            showTime: dayjs(item.showTime).format('HH:mm'), //发布时间
            type: item.info.commentThread.resourceTitle && item.info.commentThread.resourceTitle.split("：")[0], //动态类型
            commentCount: item.info.commentCount, //评论数
            likedCount: item.info.likedCount, //点赞数
            insiteForwardCount: item.insiteForwardCount, //转发数
        }))
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}