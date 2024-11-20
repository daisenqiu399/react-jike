//用户相关的请求
//登录模块
import { request } from "@/utils"
export function loginAPI(formData){
 return request({
    url:'/authorizations',
    method:'POST',
    data:formData
 })
}

//获取用户信息
export function getProfileAPI(formData){
    return request({
        url:'user/profile',
        method:'GET'

    })
}