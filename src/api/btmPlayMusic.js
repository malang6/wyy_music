import axios from "@utils/axios.js";
// 获取歌曲信息
export const getSongDetail = ids => axios.get(`/song/detail?ids=${ids}`);
// 获取歌曲播放地址
export const getSongUrl = id => axios.get(`/song/url?id=${id}`);
