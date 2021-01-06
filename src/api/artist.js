import axios from "@utils/axios.js";
// 获取入驻歌手(接口找不到)
export const getSingerList = (type, area, initial = -1) =>
  axios.get(`/artist/list?type=${type}&area=${area}&initial=${initial}&limit=60`);
// 获取热门歌手与
export const getHotSinger = () => axios.get("/top/artists");
