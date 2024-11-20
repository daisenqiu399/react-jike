import { Card, message } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'
import { Form, Input, Button, Checkbox } from 'antd'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const onFinish=async (values)=>{
    console.log(values)
    
    //触发异步action fetchLogin
   await dispatch(fetchLogin(values))
    //跳转到首页
    navigate('/')

    //提示一下用户
    message.success('登录成功')

   }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
       {/* 失焦检验 */}
        <Form onFinish={onFinish} validateTrigger="onBlur" >
      <Form.Item
      name="mobile"
      rules={[
        {
          required: true,
          message: '请输入手机号',
        },
        {
          pattern:/^1[3-9]\d{9}$/,
          message:'请输入正确的手机格式'
        }
      ]}
      >
        <Input size="large" placeholder="请输入手机号" />
      </Form.Item>
      <Form.Item
        name="code"
        rules={[
          {
            required: true,
            message: '请输入验证码',
          },
        ]}
      >
        <Input size="large" placeholder="请输入验证码" />
      </Form.Item>
      <Form.Item>
        <Checkbox className="login-checkbox-label">
          我已阅读并同意「用户协议」和「隐私条款」
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          登录
        </Button>
      </Form.Item>
    </Form>
      </Card>
    </div>
  )
}

export default Login