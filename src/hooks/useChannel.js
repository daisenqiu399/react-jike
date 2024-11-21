//封装获取频道列表的逻辑
import { useState,useEffect } from "react"
import { getChannelAPI } from "@/apis/article"

function useChannel(){
    const [channelList,setChannelList]=useState([])
    useEffect(()=>{
     //调用接口
    const getChannelList=async()=>{
     const res= await getChannelAPI()
     setChannelList(res.data.channels)
    }
    getChannelList()
    },[])

    //把组件要用到的数据return
    return{
        channelList
    }
}

export {useChannel}