import React,{useEffect, useState} from 'react';

import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';

import {historyApi} from '@/api'
interface DataType {
   id:string;
   get_type:string;
   get_value:string;
   to_type:string;
   pay_type:string;
   create_time:string;
}




const Index:React.FC = () => {

const navigate = useNavigate()

const [data,setData] = useState<DataType[]>([])
const columns: TableProps<DataType>['columns'] = [
    {
    title: '交易单号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '支出',
    key: 'to',
    render: (text,{to_type,to_value}) => <a style={{color:'#d93a2c'}}>{`${to_value} ${to_type}`}</a>,
  },
  {
    title: '获取',
    key: 'get',
    render: (text,{get_type,get_value}) => <a style={{color:'#4fb850'}}>{`${get_value} ${get_type}`}</a>,
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, row) => <Button type='primary' onClick={()=>getDetail(row)}>详情</Button>
  },
];

const getDetail = (row:DataType)=>{
   navigate(`/home/buyCoin/fast/payMethod?pay_id=${row.id}`)
}

useEffect(()=>{
  historyApi().then(res=>{
    if(res.code === 200){
      setData(res.data)
    }
  })
},[])

    return (
            <div className='historyDom'>
               <h4>交易历史</h4>
               <Table<DataType> 
                 columns={columns} 
                 dataSource={data} 
                 pagination={false} 
                 rowKey="id" // 使用数据项的id作为行唯一标识
               />
            </div>
    )
}

export default Index