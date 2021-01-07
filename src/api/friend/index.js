import axios from "@utils/axios"
//请求朋友页面-动态数据
export const reqFriendDynamic = () => {
    return axios({
        methods: "GET",
        url: "/event"
    })
}
//请求朋友页面-用户数据
export const reqUser = (uid) => {
    return axios({
        methods: "GET",
        url: "/user/detail",
        params:{
            uid
        }
    })
}
//请求视频播放地址
export const reqVideo = (id) => {
    return axios({
        methods: "GET",
        url: "/video/url",
        params: {
            id
        }
    })
}