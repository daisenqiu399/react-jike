//路由配置
import Layout from "../pages/Layout";
import Login from '@/pages/Login'
import { AuthRoute } from "@/components/AuthRoute";

import {createBrowserRouter} from 'react-router-dom'

const router=createBrowserRouter([
    {
        path:'/',
        element:<AuthRoute><Layout/></AuthRoute>
    },
    {
        path:'/login',
        element:<Login/> 
    }

])

export default router