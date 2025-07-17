import React, { useState,useContext, useEffect  } from "react";
import {
  Button,
  Form,
  Input,
  message,
  Typography,
  Card,
} from "antd";
import { LockOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from 'react-router-dom'
import './index.less'
import { GlobalContext } from '@/global/context';
 
const { Title } = Typography;
 
interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}

 
const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate()
 
  const onFinish = (values: LoginFormData) => {
    setLoading(true);
    console.log("Received values of form: ", values);
    setTimeout(() => {
      setLoading(false);
      message.success("登录成功！");
      navigate('/dashboard')
    }, 1500);
  };
  const globalText = useContext(GlobalContext)


  useEffect(()=>{
  if(globalText.isSubAppFlag){
    // message.success("微前端模式直接登录！");
    let token = localStorage.getItem('intergration_token')
    if(token){
       navigate('/dashboard')
    }
    
  }
  },[])
 
  return (
    <div className="loginPage">
      <Card className="mainCard">
        <div className="header">
          <Title level={2} className="title">
            WJT数字系统登录
          </Title>
        </div>
 
        <Form
          name="normal_login"
          className=""
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入您的用户名!" }]}
          >
            <Input
              prefix={<UserOutlined className="" />}
              placeholder="用户名"
              className="formItem"
            />
          </Form.Item>
 
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入您的密码!" }]}
          >
            <Input
              prefix={<LockOutlined className="" />}
              type="password"
              placeholder="密码"
              className="formItem"
            />
          </Form.Item>
 
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
                          <Button
              type="primary"
              htmlType="submit"
              className="formItem"
              loading={loading}
            >
              登录
            </Button>
            </Form.Item>
          </Form.Item>
        </Form>

      </Card>
    </div>
  );
};
 
export default LoginPage;

