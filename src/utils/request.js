import axios from 'axios'

const instance = axios.create({
    baseURL: '/api',//公共的基础路径
    headers: {
        ////公共请求头
    }
})

//设置请求拦截器
instance.interceptors.request.use(
    (config) => {
        return config
    }
)

//设置响应拦截器
instance.interceptors.response.use(
    (response) => {
        console.log('res', response)
        if (response.data.code === 200) {
            console.log('进来了')
            return response.data
        }
        return Promise.reject(response.data.message)
    },
    (error) => {
        const message = error.message || '网络错误'
        return Promise.reject(message)
    }
)
export default instance