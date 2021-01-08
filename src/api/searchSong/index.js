import axios from "@utils/axios"

// 对歌名进行搜索
export const searchSong = (keywords)=>{
    return axios({
        method:"GET",
        url:"/search?keywords="+keywords
    })
}