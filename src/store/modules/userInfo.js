import {getUserInfo,getUserEvent,getUserFolloweds,getUserFollowed} from "@api/userHome"
export default{
    state:{
        userInfo: {}, //用户详细信息
        listenSongs: 0, //累积听歌数量
        userEventList: [], //动态列表
        followedsList: [], //粉丝列表
        followedList: [], //关注列表
    },

    getter:{},

    actions:{
        async getUserInfo({commit},id){
            let userInfo = await getUserInfo(id);
            commit("GET_USER_INFO",{userInfo:userInfo.data.profile,listenSongs:userInfo.data.listenSongs});
        },
        async getUserEventList({commit},id){
            const userEvent = await getUserEvent(id);
            commit("GET_USER_EVENTLIST",userEvent);
        },
        async getFollowedsList({commit},id){
            const res = await getUserFolloweds(id);
            commit("GET_FOLLOWEDSLIST",res.data.followeds);
        },
        async getFollowedList({commit},id){
            const followed = await getUserFollowed(id);
            commit("GET_FOLLOWEDLIST",followed.data.follow);
        }
    },

    mutations:{
        GET_USER_INFO(state,{userInfo,listenSongs}){
            state.userInfo = userInfo;
            state.listenSongs = listenSongs
        },
        GET_USER_EVENTLIST(state,userEvent){
            state.userEvent = userEvent
        },
        GET_FOLLOWEDSLIST(state,followedsList){
            state.followedsList = followedsList
        },
        GET_FOLLOWEDLIST(state,followedList){
            state.followedList = followedList
        }
    }
}