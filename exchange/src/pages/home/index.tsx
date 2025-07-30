import React, { useEffect, useState } from 'react'
import Header from '@/component/Header'
import { Modal, Button, Checkbox, Form, Input , message} from 'antd'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'; // ✅ 正确导入
import { useRouteName } from '@/hooks/useRouteName';
import type { FormProps } from 'antd';
import './index.less'


import { useSelector, useDispatch } from 'react-redux';


import GoogleImg from '@/assets/img/google.png' 
import AppleImg from '@/assets/img/apple.png' 
import TelegramImg from '@/assets/img/telegram.png' 
import WalletImg from '@/assets/img/wallet.png' 

import {loginApi,getInfoApi} from '@/api'

type FieldType = {
    account?: string;
    password?: string;
    remember?: string;
};
const Index: React.FC = () => {

    const [messageApi, contextHolder] = message.useMessage();

    const reduxData = useSelector(state => state)
    const disPatch = useDispatch()


    const navigate = useNavigate();
    const location = useLocation()

    const [loadChild, setLoadChild] = useState(false)



    const jumpRoute = (item) => {
        navigate(item.path)

    }

    useEffect(() => {
        setLoadChild(true)


      let token = localStorage.getItem('rx-token')
      if(token){
        getInfoApi().then(res=>{
          disPatch({
            type: 'setUserInfo',
            data: res.data
          })
        })
      }else{
      }

    }, [])

    useEffect(() => {
        if (loadChild) {
        }
    }, [loadChild])

   

    const showModal = () => {
        disPatch({type:'setLoginModalFlag',data:true})
    };

    const handleOk = () => {
       disPatch({type:'setLoginModalFlag',data:false})
    };

    const handleCancel = () => {
       disPatch({type:'setLoginModalFlag',data:false})
    };


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        loginApi({
            account:values.account,
            password:values.password
        }).then(res=>{
  
            messageApi.success('登录成功');
 
        disPatch({type:'setUserInfo',data:res.data})
        
        handleCancel()
        })
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    };

    useEffect(() => {
        if(reduxData?.userInfoHandler.token){
            localStorage.setItem('rx-token',reduxData?.userInfoHandler.token)
        }
    }, [reduxData])

    
    return (
        <div>
            {contextHolder}
            <Header jumpRoute={jumpRoute} showModal={showModal}></Header>
            {
                loadChild && (
                    <Outlet></Outlet>
                )

            }
            <Modal
                title="登录"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={reduxData.loginModalFlagHandler}
                onOk={handleOk}
                onCancel={handleCancel}
                width='800px'
                footer={false}

            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600,marginTop:'36px' }}
                    initialValues={{ remember: true, account: 'admin', password: 'admin' }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="账号"
                        name="account"
                        rules={[{ required: true, message: '请输入账号!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                <ul className='otherLogin'>
                    <li className='liItem'>
                       <div className='imgBox'>
                        <img src={GoogleImg} alt="" />
                       </div>
                       <p>Google</p>
                    </li>
                    <li className='liItem'>
                       <div className='imgBox'>
                        <img src={AppleImg} alt="" />
                       </div>
                       <p>Apple</p>
                    </li>
                    <li className='liItem'>
                       <div className='imgBox'>
                        <img src={TelegramImg} alt="" />
                       </div>
                       <p>Telegram</p>
                    </li>
                    <li className='liItem'>
                       <div className='imgBox'>
                        <img src={WalletImg} alt="" />
                       </div>
                       <p>Web3钱包</p>
                    </li>
                    <li className='titleItem'>
                        使用其他方式登录
                    </li>
                </ul>
            </Modal>

        </div>
    )
}

export default Index