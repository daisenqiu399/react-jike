import { Layout, Menu, Popconfirm } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet } from 'react-router-dom'

const {Header,Sider}=Layout
const GeekLayout=()=>{
    const navigate=useNavigate()
const onMenuClick=(route)=>{
  
    console.log(route)
    const path=route.key
    navigate(path)

}
    return (
        <Layout>
            <Header className="header">
                <div className="logo"/>
                    <div className="user-info">
                        <span className="user-name">user.name</span>
                        <span className="user-logout">
                            <Popconfirm title="是否确认退出?" okText="退出" cancelText="取消">
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
                defaultSelectedKeys={['1']}
                style={{height:'100%',borderRight:0}}
                onClick={onMenuClick}
                >
                    <Menu.Item icon={<HomeOutlined/>} key="/home">
                    数据概览
                    </Menu.Item>
                    <Menu.Item icon={<DiffOutlined/>} key="/article">
                   内容管理
                    </Menu.Item>
                    <Menu.Item icon={<EditOutlined/>} key="/publish">
                    发布文章
                    </Menu.Item>
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