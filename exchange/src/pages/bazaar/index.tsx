import React,{useEffect, useState} from 'react'
import {useLocation,useNavigate,Outlet} from 'react-router-dom'
import {Tabs} from 'antd'
import './index.less'

const items = [
  {
    key: 'currency',
    label: '币种',
  },
  {
    key: 'tradingData',
    label: '交易数据',
  },
];
const Index:React.FC = ()=>{


    const location = useLocation()
    const navigate = useNavigate()
    const [loadChild, setLoadChild] = useState(false)

    const [activeKey,setActiveKey] = useState('currency')
    const onChange = (key:string)=>{
        setActiveKey(key)
        navigate(`/home/bazaar/${key}`)
    }


    useEffect(()=>{
      console.log(location,'bazaar离得---')
      let list = location.pathname.split('/')
      if(location.pathname === '/home/bazaar'){
        onChange('currency')
      }else if(list.includes('currency')){
       navigate(`/home/bazaar/currency`)
       setActiveKey('currency')
      }else if(list.includes('tradingData')){
       navigate(`/home/bazaar/tradingData`)
       setActiveKey('tradingData')
      }
    },[])

    return (
        <div className='bazaarDom'>
           <Tabs activeKey={activeKey} items={items} onChange={onChange} />
           <Outlet/>
        </div>
    )
}

export default Index