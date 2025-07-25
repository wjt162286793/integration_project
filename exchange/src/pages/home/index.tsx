import React, { useEffect, useState } from 'react'
import Header from '@/component/Header'
import { Modal, Button, Checkbox, Form, Input } from 'antd'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'; // ✅ 正确导入
import { useRouteName } from '@/hooks/useRouteName';
import type { FormProps } from 'antd';
import './index.less'


import { useSelector, useDispatch } from 'react-redux';




import GoogleImg from '@/assets/img/google.png' 
import AppleImg from '@/assets/img/apple.png' 
import TelegramImg from '@/assets/img/telegram.png' 
import WalletImg from '@/assets/img/wallet.png' 


type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};
const Index: React.FC = () => {


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

    }, [])

    useEffect(() => {
        if (loadChild) {
            console.log(location, 'home--loadChild')
        }
    }, [loadChild])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        disPatch({type:'setUserInfo',data:{
            name:'admin',
            token:'123456',
            user_id:'1'
        }})
        handleCancel()
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        console.log(reduxData,'全局状态路由')
        localStorage.setItem('rx-token',reduxData.userInfoHandler.token)
    }, [reduxData])

    return (
        <div>
            <Header jumpRoute={jumpRoute} showModal={showModal}></Header>
            {
                loadChild && (
                    <Outlet></Outlet>
                )

            }
            <Modal
                title="登录"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
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
                    initialValues={{ remember: true, username: 'admin', password: 'admin' }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="账号"
                        name="username"
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