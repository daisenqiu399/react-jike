import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select,Popconfirm } from 'antd'
//时间选择器 汉化包
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import img404 from 'src/assets/error.png'
import { useChannel } from '@/hooks/useChannel'
import { getArticleListAPI,delArticleAPI } from '@/apis/article'
import { useEffect, useState } from 'react'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    const {channelList}=useChannel()

    //准备列数据
    //定义状态枚举
    const status={
        1:<Tag color="warning">待审核</Tag>,
        2:<Tag color="success">审核通过</Tag>
    }

    
    const columns = [
        {
          title: '封面',
          dataIndex: 'cover',
          width:120,
          render: cover => {
            return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
          }
        },
        {
          title: '标题',
          dataIndex: 'title',
          width: 220
        },
        {
          title: '状态',
          dataIndex: 'status',

          //data-后端返回的状态，status
          //data===1:待审核 data===2:审核通过
          render: data =>status[data]
        },
        {
          title: '发布时间',
          dataIndex: 'pubdate'
        },
        {
          title: '阅读数',
          dataIndex: 'read_count'
        },
        {
          title: '评论数',
          dataIndex: 'comment_count'
        },
        {
          title: '点赞数',
          dataIndex: 'like_count'
        },
        {
          title: '操作',
          render: data => {
            return (
              <Space size="middle">
                <Button type="primary" shape="circle" icon={<EditOutlined />} />
                <Popconfirm
                title="删除文章"
                description='确认要删除当前文章吗'
                onConfirm={()=>onConfirm(data)}
                onText='Tes'
                cancelText='No'
                >
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                  
                  
                />
                </Popconfirm>
              
              </Space>
            )
          }
        }
      ]
      const data = [
          {
              id: '8218',
              comment_count: 0,
              cover: {
                images:['http://geek.itheima.net/resources/images/15.jpg'],
              },
              like_count: 0,
              pubdate: '2019-03-11 09:00:00',
              read_count: 2,
              status: 2,
              title: 'wkwebview离线化加载h5资源解决方案' 
          }
      ]

   //获取文章列表


    //筛选功能
  //准备参数
  const [reqData,setDate]=useState({
    status:'',
    channel_id:'',
    begin_oubdate:'',
    end_pubdate:'',
    page:1,
    per_page:4
  })

const [list,setList]=useState([])
const [count,setCount]=useState()
useEffect(()=>{
 async function getList(){
   const res=await getArticleListAPI(reqData)
   setList(res.data.results)
   setCount(res.data.total_count)
  }
  getList()
},[reqData])



  //获取当前的筛选数据
  const onFinish=(formValue)=>{
   console.log(formValue)
   setDate({
    ...reqData,
    channel_id:formValue.channel_id,
    status:formValue.status,
    begin_oubdate:formValue.date[0].format('YYYY-MM-DD'),
    end_pubdate:formValue.date[1].format('YYYY-MM-DD')
   })

   //重新拉取文章列表
   //reqData依赖项发生变化，就重复执行副作用函数getArticleListAPI
  }

  //分页
  const onPageChange=(page)=>{
    console.log(page)
    setDate({
      //修改参数依赖项，引发数据的重新渲染
      ...reqData,
      page

    })
  }

  //删除文章
  const onConfirm=async (value)=>{
    // console.log('点击删除了',value)
   await delArticleAPI(value.id)
    setDate({
      ...reqData
    })

  }
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: null }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              defaultValue="lucy"
              style={{ width: 120 }}
            >
              {/* <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option> */}
            {channelList.map(item=><Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={list} pagination={{
          total:count,
          pageSize:reqData.per_page,
          onChange:onPageChange
        }}/>
      </Card>
    </div>
  )
}

export default Article