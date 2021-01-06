import axios from "@utils/axios"

export const reqFriendDynamic = () => {
    return axios({
        methods:"GET",
        url:"/event"
    })
}