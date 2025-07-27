import React, { useEffect, useState } from 'react'
import { Tabs, Button } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'; // 导入useNavigate hook
import './index.less'

const Index: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const [activeKey, setActiveKey] = useState('')
  const [loadChild, setLoadChild] = useState(false)





  useEffect(() => {
    setLoadChild(true)
      if (location.pathname === '/home/buyCoin') {
        onChange('fast')
      } else {
        let list = location.pathname.split('/')
        // 保留当前Query参数
        const queryParams = location.search;
        
        if (list.includes('fast')) {
          if(list.includes('portal')){
            navigate(`/home/buyCoin/fast/portal${queryParams}`)
          }else if(list.includes('payMethod')){
            navigate(`/home/buyCoin/fast/payMethod${queryParams}`)
          }else{
            navigate(`/home/buyCoin/fast${queryParams}`)
          }
          setActiveKey('fast')
        } else if (list.includes('blockTrade')) {
          if(list.includes('buyList')){
            navigate(`/home/buyCoin/blockTrade/buyList${queryParams}`)
          }else if(list.includes('sellList')){
            navigate(`/home/buyCoin/blockTrade/sellList${queryParams}`)
          }else if(list.includes('betList')){
            navigate(`/home/buyCoin/blockTrade/betList${queryParams}`)
          }else{
            navigate(`/home/buyCoin/blockTrade${queryParams}`)
          }
          setActiveKey('blockTrade')
        }
      }
  }, [location.search]) // 添加location.search依赖，确保参数变化时重新执行


  const onChange = (key: string) => {
    setActiveKey(key)
    // 保留Query参数
    navigate(`/home/buyCoin/${key}${location.search}`)
  };





  return (
    <div className='buyCoinBox'>
      <div className='banner'>
        <div className='header'>
          <Tabs
            activeKey={activeKey}
            onChange={onChange}
            items={[
              {
                label: `快捷交易`,
                key: 'fast',
              },
              {
                label: `大宗交易`,
                key: 'blockTrade',
              }
            ]}
          />
        </div>
         {
          loadChild && (<Outlet></Outlet>)
         }
        
      </div>

    </div>
  )
}

export default Index