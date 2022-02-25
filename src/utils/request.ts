import axios from "axios"
import { networkConfig } from "./networkConfig"

// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: networkConfig.serverUrl,
    // 超时
    timeout: networkConfig.requestTimeout
})
// request拦截器
service.interceptors.request.use(config => {
    //console.log(config,111)
    return config
}, error => {
    console.log(error)
    return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(res => {
    //console.log(res,222)
    return res
}, error => {
    return Promise.reject(error)
})

export default service