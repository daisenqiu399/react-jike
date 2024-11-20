//封装和文章相关的接口
import { request } from "@/utils"
export function getChannelAPI(){
    return request({
        url:'channels',
        method:'GET'
    })
}