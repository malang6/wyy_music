import axios from "@utils/axios"

export const getCountryList = ()=>{
    return axios({
        method:"GET",
        url:"/countries/code/list"
    })
}
export const phoneLogin = (phone,password)=>{
    return axios({
        method:"POST",
        url:"/login/cellphone",
        data:{
            phone,
            password,
        }
    })
}
export const exitLogin = ()=>{
    return axios({
        method:"GET",
        url:"/logout"
    })
}