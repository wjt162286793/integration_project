import React, { useCallback, useEffect, useState } from 'react'
import './header.less'
import { Button, message } from 'antd'
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { UiSubAppNavigationItem } from '../../../shared/ui-runtime'

const menuList: UiSubAppNavigationItem[] = [
    { name: '买币', path: 'buyCoin', key: 'buyCoin' },
    { name: '市场', path: 'bazaar', key: 'bazaar' },
    { name: '交易', path: 'trade/spot', key: 'spotTrade' },
    { name: '资产', path: 'assets', key: 'assets' },
    { name: 'web3(dev)', path: 'webThree', key: 'webThree' },
]

// 修改组件定义，添加props类型
const Index: React.FC<{
    jumpRoute: (item: UiSubAppNavigationItem) => void
    showModal: () => void
}> = ({ jumpRoute, showModal }) => {
    const isSubAppFlag = window.__POWERED_BY_WUJIE__

    const userToken = useSelector(state => state.userInfoHandler.token)

    const location = useLocation()
    const disPatch = useDispatch()

    const [messageApi, contextHolder] = message.useMessage();
    const [activeKey, setActiveKey] = useState('')
    const jumpItem = useCallback((item: UiSubAppNavigationItem) => {
        setActiveKey(item.key)
        jumpRoute(item)
    }, [jumpRoute])

    useEffect(() => {
        const list = location.pathname.split('/')
        if (list.includes('buyCoin')) {
            setActiveKey('buyCoin')
        } else if (list.includes('bazaar')) {
            setActiveKey('bazaar')
        } else if (list.includes('webThree')) {
            setActiveKey('webThree')
        } else if (list.includes('trade')) {
            setActiveKey('spotTrade')
        } else if (list.includes('assets')) {
            setActiveKey('assets')
        } else {
            setActiveKey('buyCoin')
        }

    }, [location.pathname])

    useEffect(() => {
        if (!isSubAppFlag) return

        window.$wujie?.props?.registerSubAppNavigation?.(
            menuList,
            activeKey,
            (item: UiSubAppNavigationItem) => jumpItem(item),
        )
    }, [activeKey, isSubAppFlag, jumpItem])


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
            {
                !isSubAppFlag && <div className='headerBox'>
                    <h1 className='exLogo'>wjt交易所</h1>
                    <ul className='menuList'>
                        {
                            menuList.map((item) => {
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
            }
        </>


    )
}

export default Index
