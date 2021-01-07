import { reqUserPlayList, reqPlayListDerail, reqArtist, reqRadio, reqSubcount, reqPlayListComment } from "@api/my"
const state = {
    createPlayList: [], //创建的歌单
    collectPlayList: [], //收藏的歌单
    playListDetail: [], //歌单详情
    collectArtist: [], //收藏的歌手
    collectRadio: [], //收藏的电台
    subCountList: {}, //收藏的歌单、歌手和电台数量
    commentList: [], //歌单评论
    hotCommentList: [], //歌单热门评论
}
const getters = {
    createPlayList: state => state.createPlayList,
    collectPlayList: state => state.collectPlayList,
    playListDetail: state => state.playListDetail,
    collectArtist: state => state.collectArtist,
    collectRadio: state => state.collectRadio,
    subCountList: state => state.subCountList,
    commentList: state => state.commentList,
    hotCommentList: state => state.hotCommentList,
}
const actions = {
    //请求用户歌单
    async getUserPlayList({ commit }, uid) {
        const result = await reqUserPlayList(uid)
        commit("WRITE_USER_PLAY_LIST", result.data.playlist)
    },
    //请求歌单详情
    async getPlayListDerail({ commit }, id) {
        const result = await reqPlayListDerail(id)
        commit("WRITE_PLAY_LIST_DETAIL", result.data.playlist)
    },
    //请求收藏的歌手列表
    async getArtist({ commit }) {
        const result = await reqArtist()
        commit("WRITE_COLLECT_ARTIST", result.data.data)
    },
    //请求关注的电台
    async getRadio({ commit }, id) {
        const result = await reqRadio(id)
        commit("WRITE_COLLECT_RADIO", result.data.djRadios)
    },
    //获取用户收藏歌单，歌手，电台数量
    async getSubcount({ commit }) {
        const result = await reqSubcount()
        commit("WRITE_SUBCOUNT_LIST", result.data)
    },
    //获取歌单评论
    async getPlayListComment({ commit }, id) {
        const result = await reqPlayListComment(id)
        console.log(result.data)
        commit("WRITE_COMMENT", result.data)
    }
}
const mutations = {
    WRITE_USER_PLAY_LIST(state, res) {
        const createPlayList = res.filter(item => !item.subscribed)
        const collectPlayList = res.filter(item => item.subscribed)
        state.createPlayList = createPlayList.map(item => ({
            name: item.name, //歌单名
            image: item.coverImgUrl, //歌单封面图
            description: item.description, //歌单介绍
            createTime: item.createTime, //歌单创建时间
            tags: item.tags, //歌单标签
            trackCount: item.trackCount, //歌单歌曲数量
            nickName: item.creator.nickname, //歌单创建者
            avatarUrl: item.creator.avatarUrl, //歌单创建着头像
            playCount: item.playCount, //歌单播放数量
            id: item.id, //歌单id
        }))
        state.collectPlayList = collectPlayList.map(item => ({
            name: item.name, //歌单名
            image: item.coverImgUrl, //歌单封面图
            description: item.description, //歌单介绍
            createTime: item.createTime, //歌单创建时间
            tags: item.tags, //歌单标签
            trackCount: item.trackCount, //歌单歌曲数量
            nickName: item.creator.nickname, //歌单创建者
            avatarUrl: item.creator.avatarUrl, //歌单创建着头像
            playCount: item.playCount, //歌单播放数量
            id: item.id, //歌单id
        }))
    },
    WRITE_PLAY_LIST_DETAIL(state, res) {
        state.playListDetail = {
            name: res.name, //歌单名
            id: res.id, //id
            commentCount: res.commentCount, //歌单评论数
            shareCount: res.shareCount, //歌单分享数
            subscribedCount: res.subscribedCount, //歌单收藏数
            songList: res.tracks.map(item => ({
                name: item.name, //歌曲名
                time: item.dt, //歌曲时长
                singerList: item.ar.map(item => item.name), //歌手
                album: item.al.name, //所属专辑名
            }))
        }
    },
    WRITE_COLLECT_ARTIST(state, res) {
        state.collectArtist = res.map(item => ({
            name: item.name, //歌手名
            mvCount: item.mvSize, //包含mv数量
            albumCount: item.albumSize, //包含的专辑数量
            artistImg: item.picUrl, //歌手封面图
            id: item.id, //id
        }))
    },
    WRITE_COLLECT_RADIO(state, res) {
        state.collectRadio = res.map(item => ({
            name: item.name, //电台名
            nickName: item.dj.nickname, //电台创建者
            image: item.picUrl, //电台封面
            programCount: item.programCount, //电台期数
            newProgramCount: item.newProgramCount, //电台未读数量
            id: item.id, //id
        }))
    },
    WRITE_SUBCOUNT_LIST(state, res) {
        state.subCountList = res
    },
    WRITE_COMMENT(state, res) {
        state.commentList = res.comments.map(item => ({
            id:item.id, //id
            content: item.content, //评论内容
            avatarUrl: item.user.avatarUrl, //用户头像
            nickname: item.user.nickname, //用户名
            likedCount: item.likedCount, //评论点赞数
            beRepliedContent: item.beReplied[0] && item.beReplied[0].content, //引用评论内容
            beRepliedNickName: item.beReplied[0] && item.beReplied[0].user.nickname, //引用评论用户id
            time:item.time, //发布时间
        }))
        state.hotCommentList = res.hotComments.map(item => ({
            id:item.id, //id
            content: item.content, //评论内容
            avatarUrl: item.user.avatarUrl, //用户头像
            nickname: item.user.nickname, //用户名
            likedCount: item.likedCount, //评论点赞数
            beRepliedContent: item.beReplied[0] && item.beReplied[0].content, //引用评论内容
            beRepliedNickName: item.beReplied[0] && item.beReplied[0].user.nickname, //引用评论用户id
            time:item.time, //发布时间
        }))
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}