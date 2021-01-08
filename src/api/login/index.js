import axios from "@utils/axios"

//获取国家编码
export const getCountryList = ()=>{
    return axios({
        method:"GET",
        url:"/countries/code/list"
    })
}
//手机号登录
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
//退出登录
export const exitLogin = ()=>{
    return axios({
        method:"GET",
        url:"/logout"
    })
}
//发送短信验证码
export const smsCode = (phone)=>{
    return axios({
        method:"GET",
        url:"/captcha/sent?phone="+phone
    })
}
//校验验证码
export const verifyCode = (phone,captcha)=>{
    return axios({
        method:"GET",
        url:`/captcha/verify?phone=${phone}&captcha=${captcha}`
    })
}
//校验手机号是否已经注册
export const verifyPhone = (phone)=>{
    return axios({
        method:"GET",
        url:`/cellphone/existence/check?phone=${phone}`
    })
}
//注册
export const rejister = ({phone,captcha,password,nickname='abc'})=>{
    return axios({
        method:"GET",
        url:`/register/cellphone?phone=${phone}&password=${password}&captcha=${captcha}&nickname=${nickname}`
    })
}