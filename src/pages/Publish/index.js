import {
   Card,
   Breadcrumb,
   Form,
   Button,
   Radio,
   Input,
   Upload,
   Space,
   Select,
   message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { getChannelAPI,createArticleAPI,getArticleById,updateArticleAPI } from '@/apis/article'
import { useEffect, useState } from 'react'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {
  //获取频道数据
const {channelList}=useChannel()

   //提交表单、
   const onFinish=(formValue)=>{
      console.log(formValue)
      //校验封面类型imageType是否和实际的图片列表imageList数量相等
      if(imageType!==imageList.length) return message.warning('封面类型和图片类型不匹配')
      const {title,content,channel_id}=formValue
      //按照接口文档的格式处理收集到的数据
      const reqData={
         title,
         content,
         cover:{
            type:imageType,
            images:imageList.map(item=>{
               if(item.response){
                  return item.response.data.url
               }else{
                  return item.url
               }
            }) //图片列表
         },
         channel_id
      }
      //调用不同的接口，新增调新增，更新调新增
      if(articleID){
         updateArticleAPI({...reqData,id:articleID})
      }else{
         createArticleAPI(reqData)
      }
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
  
  //回调数据
  //获取id
  const [searchParams]=useSearchParams()
 const articleID=searchParams.get('id')

 //获取实例
 const [form]=Form.useForm()
  console.log(articleID)
useEffect(()=>{
async function getArticleDetail(){
    const res=  await getArticleById(articleID)
    console.log('喜喜',res.data)
    form.setFieldValue({
      ...res.data,
      type:res.data.cover.type
    })
    //回填图片
    setImageType(res.data.cover.type)
    //显示图片
    setImageList(res.data.cover.images.map(url=>{
      return {url}
    }))
   }
   //调用实例，完成回填数据，只有id的时候才调用
if(articleID){
   getArticleDetail()
}
   

},[articleID,form]) 
   return (
      <div className="publish">
         <Card
            title={
               <Breadcrumb items={{
                  
               }}>
                  <Breadcrumb.Item>
                     <Link to="/home">首页</Link>
                  </Breadcrumb.Item>
                  {articleID?<Breadcrumb.Item>编辑文章</Breadcrumb.Item>:<Breadcrumb.Item>发布文章</Breadcrumb.Item>}
               </Breadcrumb>
            }
         >
            <Form
               labelCol={{ span: 4 }}
               wrapperCol={{ span: 16 }}
               initialValues={{ type: 0 }}
               onFinish={onFinish}
               form={form}
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
                     maxCount={imageType}
                     fileList={imageList}
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