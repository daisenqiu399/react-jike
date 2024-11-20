import { Layout, Menu, Popconfirm } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserInfo, fetchUserInfo } from '@/store/modules/user'

const {Header,Sider}=Layout
function getItem(label,key,icon){
    return {
        key,
        icon,
        label,
    }
}
const items=[
    
  getItem('数据概览', '/home', <HomeOutlined />),
  getItem('内容管理', 'article', <DiffOutlined />),
  getItem('发布文章', 'publish', <EditOutlined />),
]
const GeekLayout=()=>{
const navigate=useNavigate()
const onMenuClick=(route)=>{
    // console.log(route)
    const path=route.key
    navigate(path)
}



//反向高亮 ：根据路由选择对应侧边栏高亮
const location=useLocation()
// console.log(location.pathname)
const selectedKey=location.pathname

//获取个人信息
const dispatch=useDispatch()
useEffect(()=>{
    dispatch(fetchUserInfo())
},[dispatch])


//退出登录确认回调
const onConfirm=()=>{
    // console.log('确认')
    dispatch(clearUserInfo())
    navigate('/login')
}
const name=useSelector(state=>state.user.userInfo.name)
    return (
        <Layout>
            <Header className="header">
                <div className="logo"/>
                    <div className="user-info">
                        <span className="user-name">{name}</span>
                        <span className="user-logout">
                            <Popconfirm title="是否确认退出?" okText="退出" cancelText="取消" onConfirm={onConfirm}>
                                <LogoutOutlined/> 退出
                            </Popconfirm>
                        </span>
                    </div>
            </Header>
            <Layout>
            <Sider>
                <Menu
                mode="inline"
                theme="dark"
                defaultSelectedKeys={selectedKey}
                style={{height:'100%',borderRight:0}}
                onClick={onMenuClick}
                items={items}
                >
                    
                </Menu>
            </Sider>
           <Layout className="layout-content" style={{padding:20}}>
            {/* 二级路由出口 */}
            <Outlet/>
           </Layout>
            </Layout>
        </Layout>
       
    )

}
export default GeekLayout