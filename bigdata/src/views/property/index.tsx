import React, { useEffect, useMemo, useState } from 'react';
import { Table, Tag, Input, Button, Tabs } from 'antd';
import type { TableProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { aiPropertyListApi, virtualAssetListApi } from '@/api'
import './index.less'

interface VirtualAssetItem{
  id: string
  symbol: string
  name: string
  chain: string
  type: string
  contract_address: string
  decimals: number
  current_price: number
  price_change_24h: number
  status: string
  created_at: string
  updated_at: string
}

interface AiPropertyItem{
  id: string
  cname: string
  ename: string
  type: string
  level: number
  tags: string
  department_ename: string
  update_time: string
  create_time: string
  remark: string
  status: string
  context_length: number
}

const Index: React.FC = () => {
  const { t } = useTranslation();
  const [activeKey,setActiveKey] = useState<'ai' | 'virtual' | 'physical'>('virtual')
  const [keyword,setKeyword] = useState('')
  const [loading,setLoading] = useState(false)
  const [virtualList,setVirtualList] = useState<VirtualAssetItem[]>([])
  const [aiList,setAiList] = useState<AiPropertyItem[]>([])

  const fetchVirtualList = async ()=>{
    setLoading(true)
    const res:any = await virtualAssetListApi({})
    if(res && res.code === 200 && Array.isArray(res.data)){
      setVirtualList(res.data)
    }else{
      setVirtualList([])
    }
    setLoading(false)
  }

  const fetchAiList = async ()=>{
    setLoading(true)
    const res:any = await aiPropertyListApi({})
    if(res && res.code === 200 && Array.isArray(res.data)){
      setAiList(res.data)
    }else{
      setAiList([])
    }
    setLoading(false)
  }

  useEffect(()=>{
    if(activeKey === 'virtual'){
      fetchVirtualList()
    }
    if(activeKey === 'ai'){
      fetchAiList()
    }
  },[activeKey])

  const virtualTableData = useMemo(()=>{
    const kw = keyword.trim().toLowerCase()
    if(!kw) return virtualList
    return virtualList.filter(item=>{
      return String(item.name || '').toLowerCase().includes(kw) || String(item.symbol || '').toLowerCase().includes(kw)
    })
  },[keyword,virtualList])

  const aiTableData = useMemo(()=>{
    const kw = keyword.trim().toLowerCase()
    if(!kw) return aiList
    return aiList.filter(item=>{
      return String(item.cname || '').toLowerCase().includes(kw) || String(item.ename || '').toLowerCase().includes(kw)
    })
  },[keyword,aiList])

  const virtualColumns: TableProps<VirtualAssetItem>['columns'] = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Symbol', dataIndex: 'symbol', key: 'symbol' },
    { title: t('property.name'), dataIndex: 'name', key: 'name' },
    { title: 'Chain', dataIndex: 'chain', key: 'chain' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Contract', dataIndex: 'contract_address', key: 'contract_address' },
    { title: 'Decimals', dataIndex: 'decimals', key: 'decimals' },
    { title: 'Price', dataIndex: 'current_price', key: 'current_price' },
    { title: '24h%', dataIndex: 'price_change_24h', key: 'price_change_24h' },
    { title: t('property.status'), dataIndex: 'status', key: 'status' },
    { title: t('property.createTime'), dataIndex: 'created_at', key: 'created_at' },
    { title: t('property.updateTime'), dataIndex: 'updated_at', key: 'updated_at' },
  ];

  const aiColumns: TableProps<AiPropertyItem>['columns'] = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'CName', dataIndex: 'cname', key: 'cname' },
    { title: 'EName', dataIndex: 'ename', key: 'ename' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: t('property.level'), dataIndex: 'level', key: 'level' },
    {
      title: t('property.tags'),
      dataIndex: 'tags',
      key: 'tags',
      render: (val)=>{
        const tags = typeof val === 'string' ? val.split(',').map(s=>s.trim()).filter(Boolean) : []
        return (
          <>
            {tags.map((tag)=>(
              <Tag key={tag}>{tag}</Tag>
            ))}
          </>
        )
      }
    },
    { title: 'Department', dataIndex: 'department_ename', key: 'department_ename' },
    { title: t('property.status'), dataIndex: 'status', key: 'status' },
    { title: 'Context', dataIndex: 'context_length', key: 'context_length' },
    { title: 'Remark', dataIndex: 'remark', key: 'remark' },
    { title: t('property.createTime'), dataIndex: 'create_time', key: 'create_time' },
    { title: t('property.updateTime'), dataIndex: 'update_time', key: 'update_time' },
  ];

  return (<>
    <Tabs
      activeKey={activeKey}
      onChange={(key)=>setActiveKey(key as any)}
      items={[
        { key: 'ai', label: 'AI资产' },
        { key: 'virtual', label: '虚拟资产' },
        { key: 'physical', label: '实体资产' }
      ]}
    />
    {activeKey !== 'physical' && (
      <div className='searchBox'>
        <span className='searchLabel'>{t('property.searchAssetName')}</span>
        <Input placeholder={t('property.enterAssetName')} value={keyword} onChange={(e)=>setKeyword(e.target.value)} className='searchItem' />
        <Button className='searchBtn' type='primary'>{t('property.search')}</Button>
      </div>
    )}
    <div className='tableBox'>
      {activeKey === 'virtual' && <Table<VirtualAssetItem> loading={loading} columns={virtualColumns} dataSource={virtualTableData} rowKey='id' />}
      {activeKey === 'ai' && <Table<AiPropertyItem> loading={loading} columns={aiColumns} dataSource={aiTableData} rowKey='id' />}
      {activeKey === 'physical' && <div />}
    </div>
  </>)
}

export default Index;
