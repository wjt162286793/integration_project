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
    console.log(location.pathname, 'buyCoin--location.pathname--初始化')
      if (location.pathname === '/home/buyCoin') {
        onChange('fast')
      } else {
        let list = location.pathname.split('/')
        if (list.includes('fast')) {
          // onChange('fast')
          
          if(list.includes('portal')){
            navigate(`/home/buyCoin/fast/portal`)
          }else if(list.includes('payMethod')){
            navigate(`/home/buyCoin/fast/payMethod`)
          }else{
            navigate(`/home/buyCoin/fast`)
          }
          setActiveKey('fast')
        } else if (list.includes('blockTrade')) {
          if(list.includes('buyList')){
            navigate(`/home/buyCoin/blockTrade/buyList`)
          }else if(list.includes('sellList')){
            navigate(`/home/buyCoin/blockTrade/sellList`)
          }else if(list.includes('betList')){
            navigate(`/home/buyCoin/blockTrade/betList`)
          }else{
            navigate(`/home/buyCoin/blockTrade`)
          }
          setActiveKey('blockTrade')
        }
      }
  }, [])


  const onChange = (key: string) => {
    setActiveKey(key)
    navigate(`/home/buyCoin/${key}`)
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