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


    useEffect(()=>{
      console.log('监测路由变化',location.search)
      if(location.search){
        setShowTabs(false)
      }else{
        setShowTabs(true)
      }
    },[location.search])
    const onChange = (key:string)=>{
        setActiveKey(key)
        navigate(`/home/bazaar/${key}`)
    }

    const [showTabs,setShowTabs] = useState(true)
    useEffect(()=>{
      const queryParams = location.search;
      let list = location.pathname.split('/')
      if(location.pathname === '/home/bazaar'){
        onChange('currency')
      }else if(list.includes('currency')){
       navigate(`/home/bazaar/currency`)
       setActiveKey('currency')
      }else if(list.includes('tradingData')){
       navigate(`/home/bazaar/tradingData`)
       setActiveKey('tradingData')
      }else if(list.includes('tradingView')){
        navigate(`/home/bazaar/tradingView${queryParams}`)
        setActiveKey('currency')
      }
    },[])



    return (
        <div className='bazaarDom'>
          {
            showTabs && (
              <Tabs activeKey={activeKey} items={items} onChange={onChange} style={{margin:'24px 350px 0px 350px'}}/>
            )
          }
           <Outlet/>
        </div>
    )
}

export default Index