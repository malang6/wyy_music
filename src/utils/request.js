import axios from "axios";
import NProgress from 'nprogress'
const instance = axios.create({
  baseURL:"/api",
})
instance.interceptors.request.use(
  (config) => {
    NProgress.start()
    return config
  }
);
instance.interceptors.response.use(
  (response) => { 
    NProgress.done()
    // console.log(response)
    // 请求成功，状态码200
    if (response.data.code === 200) { 
      console.log('success')
      return response.data
    }
    // 请求状态码为2xx,但不是200
    const message = response.data.message || '请求失败'
    console.log(message)
    return Promise.reject(response.message)
  },
  // 响应失败，状态码非2xx
  (error) => {
		NProgress.done();
    const message = error.message || "网络错误";
    console.log(message)
		return Promise.reject(message);
	}
)
export default instance