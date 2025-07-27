import React, { useEffect, useState } from 'react'
import './header.less'
import { Button,message } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// 修改组件定义，添加props类型
const Index: React.FC<{ jumpRoute: (item: any) => void }> = ({ jumpRoute, showModal }) => {

    const userToken = useSelector(state => state.userInfoHandler.token)

    const location = useLocation()
    const navigate = useNavigate()
    const disPatch = useDispatch()

    const [messageApi, contextHolder] = message.useMessage();
    const menuList = [
        {
            name: '买币',
            path: 'buyCoin',
            key: 'buyCoin'

        },
        {
            name: '市场',
            path: 'bazaar',
            key: 'bazaar'
        },
        {
            name: 'web3',
            path: 'webThree',
            key: 'webThree'
        }
    ]

    // 修改jumpItem函数，调用父组件方法
    const jumpItem = (item: any) => {

        setActiveKey(item.key)
        jumpRoute(item);
    }

    const [activeKey, setActiveKey] = useState('')

    useEffect(() => {
        let list = location.pathname.split('/')
        if (list.includes('buyCoin')) {
            setActiveKey('buyCoin')
        } else if (list.includes('bazaar')) {
            setActiveKey('bazaar')
        } else if (list.includes('webThree')) {
            setActiveKey('webThree')
        }else{
            setActiveKey('buyCoin')
        }

    }, [])

    useEffect(() => {
        if (activeKey) {
            let Item = menuList.find(item => item.key === activeKey)
            jumpItem(Item)
        }

    }, [activeKey])


    const toLogin = () => {
        showModal()
    }

    const toOutLogin = () => {
        
        disPatch({
            type: 'setUserInfo', data: {
                name: '',
                token: '',
                user_id: ''
            }
        })
        localStorage.removeItem('rx-token')
    
            messageApi.success('退出登录');

    }

    return (
        <>
                {contextHolder}
        <div className='headerBox'>
            <h1 className='exLogo'>wjt交易所</h1>
            <ul className='menuList'>
                {
                    menuList.map((item, index) => {
                        return (
                            <li className={item.key === activeKey ? 'activeMenuItem' : 'menuItem'} key={item.key} onClick={() => jumpItem(item)}>{item.name}</li>
                        )
                    })
                }

            </ul>
            {
                userToken && <Button className='loginBtn' type='primary' onClick={toOutLogin}>退出</Button>
            }
            {
                !userToken && <Button className='loginBtn' type='primary' onClick={toLogin}>登录</Button>
            }
        </div>
        </>


    )
}

export default Index