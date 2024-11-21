import {
   Card,
   Breadcrumb,
   Form,
   Button,
   Radio,
   Input,
   Upload,
   Space,
   Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { getChannelAPI,createArticleAPI } from '@/apis/article'
import { useEffect, useState } from 'react'

const { Option } = Select

const Publish = () => {
   const [channelList,setChannelList]=useState([])
   useEffect(()=>{
    //调用接口
   const getChannelList=async()=>{
    const res= await getChannelAPI()
    setChannelList(res.data.channels)
   }
   getChannelList()
   },[])

   //提交表单、
   const onFinish=(formValue)=>{
      console.log(formValue)
      const {title,content,channel_id}=formValue
      //按照接口文档的格式处理收集到的数据
      const reqData={
         title,
         content,
         cover:{
            type:0,
            images:[]
         },
         channel_id
      }
      createArticleAPI(reqData)
   }

   //上传回调
   const [imageList,setImageList]=useState([])
   const onChange=(value)=>{
      console.log('上传回调',value)
      setImageList(value.fileList)
   }

   //切换封面类型

   const [imageType,setImageType]=useState(0)
   const onTypeChange=(e)=>{
   console.log('切换了封面',e.target.value)
   setImageType(e.target.value)
   }
  
  
   return (
      <div className="publish">
         <Card
            title={
               <Breadcrumb separator=">">
                  <Breadcrumb.Item>
                     <Link to="/home">首页</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>发布文章</Breadcrumb.Item>
               </Breadcrumb>
            }
         >
            <Form
               labelCol={{ span: 4 }}
               wrapperCol={{ span: 16 }}
               initialValues={{ type: 0 }}
               onFinish={onFinish}
            >
               <Form.Item
                  label="标题"
                  name="title"
                  rules={[{ required: true, message: '请输入文章标题' }]}
               >
                  <Input placeholder="请输入文章标题" style={{ width: 400 }} />
               </Form.Item>
               <Form.Item
                  label="频道"
                  name="channel_id"
                  rules={[{ required: true, message: '请选择文章频道' }]}
               >
                  <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                     {/* <Option value={}>推荐</Option> */}
                     {channelList.map(item=><Option key={item.id} value={item.id}>{item.name}</Option>)}
                  </Select>
               </Form.Item>

               <Form.Item label="封面">
                  <Form.Item name="type">
                     <Radio.Group onChange={onTypeChange}>
                        <Radio value={1}>单图</Radio>
                        <Radio value={3}>三图</Radio>
                        <Radio value={0}>无图</Radio>
                     </Radio.Group>
                  </Form.Item>
                  {imageType>0 &&  <Upload
                     name="image"
                     listType="picture-card"
                     className="avatar-uploader"
                     showUploadList
                     action={'http://geek.itheima.net/v1_0/upload'}
                     onChange={onChange}
                  >
                     <div style={{ marginTop: 8 }}>
                        <PlusOutlined />
                     </div>
                  </Upload>}
                 
               </Form.Item>
               <Form.Item
                  label="内容"
                  name="content"
                  rules={[{ required: true, message: '请输入文章内容' }]}
               >
                  <ReactQuill
                     className="publish-quill"
                     theme="snow"
                     placeholder="请输入文章内容"
                  />
               </Form.Item>
               <Form.Item wrapperCol={{ offset: 4 }}>
                  <Space>
                     <Button size="large" type="primary" htmlType="submit">
                        发布文章
                     </Button>
                  </Space>
               </Form.Item>
            </Form>
         </Card>
      </div>
   )
}

export default Publish