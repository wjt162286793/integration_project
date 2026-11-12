
import React, { useEffect, useState } from 'react';
import menuList from './data';
import { PlusOutlined } from '@ant-design/icons';
import './index.less'
import FlowChat from './flowchat/index';
import Organization from './organization/index'
import Preview from './preview'

const EmptyDom:React.FC = () =>{
   return (
    <h4 className='emptyTitle'>
        当前未选择模型类型
    </h4>
   )
}



const Index: React.FC = () => {

  const [activeKey,setActiveKey] = useState<string>('')
  const [activeCom,setActiveCom] = useState<React.ReactNode>(<EmptyDom></EmptyDom>)
  const [loading,setLoading] = useState<boolean>(false)

  const useLinkClickHandler = (id:string,type:string) =>{
    setLoading(false)
      setActiveKey(id)
      switch(type){
        case 'flow':
          setLoading(true)
          setActiveCom(<FlowChat id={id}></FlowChat>);
        break
        case 'organization':
          setLoading(true)
          setActiveCom(<Organization id={id}></Organization>);
        break
        case 'mind':
        case 'pipeline':
        case 'topology':
          setLoading(true)
          setActiveCom(<Preview id={id} type={type as 'mind' | 'pipeline' | 'topology'} />)
        break
      }
  }

  const addChart = (type:string)=>{
    setLoading(false)
    setActiveKey('')
      switch(type){
        case 'flow':
          setLoading(true)
          setActiveCom(<FlowChat id={null}></FlowChat>)
                break
        case 'organization':
          setLoading(true)
          setActiveCom(<Organization id={null}></Organization>);
        break
        case 'mind':
        case 'pipeline':
        case 'topology':
          setLoading(true)
          setActiveCom(<Preview type={type as 'mind' | 'pipeline' | 'topology'} />)
        break
      }
  }


  return (
    <div className='mainBox'>
      <div className='leftMenu'>
        {
          menuList.map(Item => {
            return (
              <div key={Item.type}>
                <h4 className='Title'>
                  <span>{Item.name}</span>
                  <PlusOutlined className='addIcon' onClick={()=>addChart(Item.type)}/>
                  </h4>
                <ul>
                {
                  Item.children.map(item =>{
                    return (<li key={item.id} className={ activeKey === item.id?'liItemActive': 'liItem'} onClick={()=>useLinkClickHandler(item.id,item.type) } >
                       {item.name}
                    </li>)
                  })
                }
                </ul>

              </div>

            )

          })
        }
      </div>
      <div className='contentBox'>
           {loading && activeCom}
      </div>


    </div>


  );
};

export default Index;
