//路由配置
import Layout from "../pages/Layout";
import Login from '@/pages/Login'
import { AuthRoute } from "@/components/AuthRoute";

import { createBrowserRouter } from 'react-router-dom'
import Publish from "@/pages/Publish";
import Article from "@/pages/Article";
import Home from "@/pages/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                   path:'home',
                // 默认二级路由首页
                // index: true,
                element: <Home />
            },

            {
                path: 'article',
                element: <Article />
            },

            {
                path: 'publish',
                element: <Publish />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    }

])

export default router