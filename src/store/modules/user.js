import { phoneLogin } from "@api/login"
export default {
    state: {
        profile: {},
        token: "",
        isShowLogin: false, //是否显示登录组件
        oldTimeTemp: 0,
    },
    getters: {},
    actions: {
        async getUserInfo(store, { phone, password }) {
            const res = await phoneLogin(phone, password);
            console.log(res)
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("avatarUrl", res.data.profile.avatarUrl);
            localStorage.setItem("userId", res.data.profile.userId);
            store.commit("GET_USERINFO", res);
            window.location.reload();
        },

    },
    mutations: {
        //登录请求获取用户信息
        GET_USERINFO(state, res) {
            state.token = res.data.token;
            state.profile = res.data.profile;
        },
        //关闭登录
        CHANGE_SHOW(state, flag) {
            state.isShowLogin = flag;
        },
        //退出登录
        EXIT(state) {
            state.token = ""
            state.profile = {}
        },
        // //请求间隔时间
        // TIME_TEMP(state,time){
        //     state.oldTimeTemp = time
        // }
    }
}

