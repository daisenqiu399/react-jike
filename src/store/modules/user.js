//和用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";
// import { userStore } from "react-redux";
import { request,setToken as _settoken,getToken } from "@/utils";
import { removeToken } from "@/utils";

const userStore=createSlice({
    name:"user",
    //数据状态
    initialState:{
        token:getToken()||'',
        userInfo:{}
    },
    //同步修改方法
    reducers:{
        setToken(state,action){
            state.token=action.payload
            //localstorage也存一份
            // localStorage.setItem('token_key',action.payload)
            _settoken(action.payload)
        },
        setUserInfo(state,action){
         state.userInfo=action.payload
        },

        clearUserInfo(state){
            state.token=''
            state.userInfo={}
            removeToken()
        }

    }
})

//解构出actionCreate
const {setToken,setUserInfo,clearUserInfo}=userStore.actions
//获取reducer函数
const userReducer=userStore.reducer

//异步加载 完成登录获取token
const fetchLogin=(loginForm)=>{
    return async(dispatch)=>{
        //发送异步请求
const res=await  request.post('/authorizations',loginForm)
        //提交同步action进行token的存入
      dispatch(setToken(res.data.token))
    }
}

//获取个人信息异步方法
const fetchUserInfo=(loginForm)=>{
    return async(dispatch)=>{
        //发送异步请求
        const res =await request.get('/user/profile')
        dispatch(setUserInfo(res.data))

    }
}

export {fetchLogin,setToken,fetchUserInfo,clearUserInfo}
export default userReducer