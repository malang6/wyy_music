import axios from 'axios'
import NProgress from 'nprogress'
import { Message } from 'element-ui'
import 'nprogress/nprogress'
const instance = axios.create({
  baseURL: '/api',
})
instance.interceptors.request.use((config) => {
  // Do something before request is sent
  NProgress.start()
  return config
})
instance.interceptors.response.use(
  (response) => {
    // Do something before response is sent
    NProgress.done()
    if (response.data.code === 200) {
      return response
    }
    Message.error('请求出错')
    return Promise.reject('请求出错')
  },
  (error) => {
    // Do something with response error
    NProgress.done()
    Message.error("网络错误，请刷新重试")
    return Promise.reject(error)
  }
)
export default instance
