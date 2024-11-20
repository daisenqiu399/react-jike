//axios封装
import axios from 'axios'
import { getToken, removeToken } from './token'
import router from '@/router'

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})
// 添加请求拦截器
request.interceptors.request.use((config)=> {
  //操作这个config注入token数据
  //获取到token
  //按照后端的格式要求做token数据
  const token=getToken()
  if(token){
    config.headers.Authorization=`Bearer ${token}`
  }
    return config
  }, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
   
    return response.data
  }, (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。

   //监控401 token失效
  //  console.log(error)
   if(error.response.status===401){
    removeToken()
    router.navigate('/login')
    //刷新一下，跳到登录页
    window.location.reload()
   }
    return Promise.reject(error)
})

export { request }