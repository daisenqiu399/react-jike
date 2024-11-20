//测试token是否注入
import { request } from "@/utils"
import { useEffect } from "react"

const Layout=()=>{
    useEffect(()=>{
        request.get('/user/profile')
    },[])
    return <div>this is layout</div>

}
export default Layout