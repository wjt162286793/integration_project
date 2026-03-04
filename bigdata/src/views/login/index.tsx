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
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
 
  const onFinish = (values: LoginFormData) => {
    setLoading(true);
    console.log("Received values of form: ", values);
    setTimeout(() => {
      localStorage.setItem('bigdata_token','123456')
      setLoading(false);
      message.success(t('login.loginSuccess'));
      navigate('/dashBoard')
    });
  };
  const globalText = useContext(GlobalContext)


  useEffect(()=>{
  if(globalText.isSubAppFlag){
    // message.success("微前端模式直接登录！");
    let token = localStorage.getItem('intergration_token')
    if(token){
       navigate('/dashBoard')
    }
  }else{
          let token = localStorage.getItem('bigdata_token')
      if(token){
        navigate('/dashBoard')
      }
  }
  },[])
  
  const isSubAppFlag = globalText.isSubAppFlag

  return (
  <>
      {
      !isSubAppFlag && (
            <div className="loginPage">
      <Card className="mainCard">
        <div className="header">
          <Title level={2} className="title">
            {t('login.title')}
          </Title>
        </div>
 
        <Form
          name="normal_login"
          className=""
          initialValues={{ remember: true, username: 'admin', password: 'admin' }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: t('login.username') + '!' }]}
          >
            <Input
              prefix={<UserOutlined className="" />}
              placeholder={t('login.username')}
              className="formItem"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: t('login.password') + '!' }]}
          >
            <Input
              prefix={<LockOutlined className="" />}
              type="password"
              placeholder={t('login.password')}
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
              {t('common.login')}
            </Button>
            </Form.Item>
          </Form.Item>
        </Form>

      </Card>
    </div>
      )
    }
    {
      isSubAppFlag && <></>
    }
  </>


  );
};
 
export default LoginPage;

