import React, { useEffect, useRef, useState } from 'react';
import { Input, Button, Tabs, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import AiList, { AiListRef } from './aiList'
import VirtualList, { VirtualListRef } from './virtualList'
import PhysicalList, { PhysicalListRef } from './physicalList'
import { dictAiStatusApi, dictPhysicalCategoryApi, dictVirtualStatusApi, dictVirtualTypeApi } from '@/api'
import './index.less'

type DictItem = { value: string, label: string }

const Index: React.FC = () => {
  const { t } = useTranslation();
  const [activeKey,setActiveKey] = useState<'ai' | 'virtual' | 'physical'>('virtual')
  const [aiQuery,setAiQuery] = useState({ id:'', name:'', level:'', tags:'', status:'' })
  const [virtualQuery,setVirtualQuery] = useState({ id:'', name:'', status:'', type:'' })
  const [physicalQuery,setPhysicalQuery] = useState({ id:'', name:'', category:'' })
  const [aiFilters,setAiFilters] = useState({ id:'', name:'', level:'', tags:'', status:'' })
  const [virtualFilters,setVirtualFilters] = useState({ id:'', name:'', status:'', type:'' })
  const [physicalFilters,setPhysicalFilters] = useState({ id:'', name:'', category:'' })

  const [aiStatusList,setAiStatusList] = useState<DictItem[]>([])
  const [virtualStatusList,setVirtualStatusList] = useState<DictItem[]>([])
  const [virtualTypeList,setVirtualTypeList] = useState<DictItem[]>([])
  const [physicalCategoryList,setPhysicalCategoryList] = useState<DictItem[]>([])
  const aiRef = useRef<AiListRef>(null)
  const virtualRef = useRef<VirtualListRef>(null)
  const physicalRef = useRef<PhysicalListRef>(null)

  useEffect(()=>{
    dictAiStatusApi({}).then((res:any)=>{
      if(res && res.code === 200 && Array.isArray(res.data)) setAiStatusList(res.data)
    })
    dictVirtualStatusApi({}).then((res:any)=>{
      if(res && res.code === 200 && Array.isArray(res.data)) setVirtualStatusList(res.data)
    })
    dictVirtualTypeApi({}).then((res:any)=>{
      if(res && res.code === 200 && Array.isArray(res.data)) setVirtualTypeList(res.data)
    })
    dictPhysicalCategoryApi({}).then((res:any)=>{
      if(res && res.code === 200 && Array.isArray(res.data)) setPhysicalCategoryList(res.data)
    })
  },[])

  const onSearch = ()=>{
    if(activeKey === 'ai'){
      setAiFilters({ ...aiQuery })
      return
    }
    if(activeKey === 'virtual'){
      setVirtualFilters({ ...virtualQuery })
      return
    }
    setPhysicalFilters({ ...physicalQuery })
  }

  const onReset = ()=>{
    const nextAi = { id:'', name:'', level:'', tags:'', status:'' }
    const nextVirtual = { id:'', name:'', status:'', type:'' }
    const nextPhysical = { id:'', name:'', category:'' }
    setAiQuery(nextAi)
    setVirtualQuery(nextVirtual)
    setPhysicalQuery(nextPhysical)
    setAiFilters(nextAi)
    setVirtualFilters(nextVirtual)
    setPhysicalFilters(nextPhysical)
  }

  const onEnterSearch = (e:any)=>{
    if(e && e.key === 'Enter'){
      onSearch()
    }
  }

  const onAdd = ()=>{
    if(activeKey === 'ai'){
      aiRef.current?.openCreate()
      return
    }
    if(activeKey === 'virtual'){
      virtualRef.current?.openCreate()
      return
    }
    physicalRef.current?.openCreate()
  }

  return (<>
    <Tabs
      activeKey={activeKey}
      onChange={(key)=>setActiveKey(key as any)}
      items={[
        { key: 'ai', label: t('property.tabAi') },
        { key: 'virtual', label: t('property.tabVirtual') },
        { key: 'physical', label: t('property.tabPhysical') }
      ]}
    />
    <div className='searchBox'>
      {activeKey === 'ai' && (
        <>
          <span className='searchLabel'>{t('property.id')}</span>
          <Input placeholder={t('property.placeholderId')} value={aiQuery.id} onChange={(e)=>setAiQuery({...aiQuery,id:e.target.value})} onKeyDown={onEnterSearch} className='searchItem' />
          <span className='searchLabel'>{t('property.name')}</span>
          <Input placeholder={t('property.placeholderName')} value={aiQuery.name} onChange={(e)=>setAiQuery({...aiQuery,name:e.target.value})} onKeyDown={onEnterSearch} className='searchItem' />
          <span className='searchLabel'>{t('property.level')}</span>
          <Select
            value={aiQuery.level || undefined}
            onChange={(val)=>{
              const next = { ...aiQuery, level: val || '' }
              setAiQuery(next)
              setAiFilters(next)
            }}
            placeholder={t('property.placeholderLevel')}
            allowClear
            className='searchItem'
            options={[
              { value: '1', label: '1' },
              { value: '2', label: '2' },
              { value: '3', label: '3' },
            ]}
          />
          <span className='searchLabel'>{t('property.tags')}</span>
          <Input placeholder={t('property.placeholderTags')} value={aiQuery.tags} onChange={(e)=>setAiQuery({...aiQuery,tags:e.target.value})} onKeyDown={onEnterSearch} className='searchItem' />
          <span className='searchLabel'>{t('property.status')}</span>
          <Select
            value={aiQuery.status || undefined}
            onChange={(val)=>{
              const next = { ...aiQuery, status: val || '' }
              setAiQuery(next)
              setAiFilters(next)
            }}
            placeholder={t('property.status')}
            allowClear
            className='searchItem'
            options={aiStatusList.map(item=>({ value: item.value, label: item.label }))}
          />
        </>
      )}
      {activeKey === 'virtual' && (
        <>
          <span className='searchLabel'>{t('property.id')}</span>
          <Input placeholder={t('property.placeholderId')} value={virtualQuery.id} onChange={(e)=>setVirtualQuery({...virtualQuery,id:e.target.value})} onKeyDown={onEnterSearch} className='searchItem' />
          <span className='searchLabel'>{t('property.name')}</span>
          <Input placeholder={t('property.placeholderName')} value={virtualQuery.name} onChange={(e)=>setVirtualQuery({...virtualQuery,name:e.target.value})} onKeyDown={onEnterSearch} className='searchItem' />
          <span className='searchLabel'>{t('property.status')}</span>
          <Select
            value={virtualQuery.status || undefined}
            onChange={(val)=>{
              const next = { ...virtualQuery, status: val || '' }
              setVirtualQuery(next)
              setVirtualFilters(next)
            }}
            placeholder={t('property.status')}
            allowClear
            className='searchItem'
            options={virtualStatusList.map(item=>({ value: item.value, label: item.label }))}
          />
          <span className='searchLabel'>{t('property.assetType')}</span>
          <Select
            value={virtualQuery.type || undefined}
            onChange={(val)=>{
              const next = { ...virtualQuery, type: val || '' }
              setVirtualQuery(next)
              setVirtualFilters(next)
            }}
            placeholder={t('property.placeholderType')}
            allowClear
            className='searchItem'
            options={virtualTypeList.map(item=>({ value: item.value, label: item.label }))}
          />
        </>
      )}
      {activeKey === 'physical' && (
        <>
          <span className='searchLabel'>{t('property.id')}</span>
          <Input placeholder={t('property.placeholderId')} value={physicalQuery.id} onChange={(e)=>setPhysicalQuery({...physicalQuery,id:e.target.value})} onKeyDown={onEnterSearch} className='searchItem' />
          <span className='searchLabel'>{t('property.name')}</span>
          <Input placeholder={t('property.placeholderName')} value={physicalQuery.name} onChange={(e)=>setPhysicalQuery({...physicalQuery,name:e.target.value})} onKeyDown={onEnterSearch} className='searchItem' />
          <span className='searchLabel'>{t('property.category')}</span>
          <Select
            value={physicalQuery.category || undefined}
            onChange={(val)=>{
              const next = { ...physicalQuery, category: val || '' }
              setPhysicalQuery(next)
              setPhysicalFilters(next)
            }}
            placeholder={t('property.placeholderCategory')}
            allowClear
            className='searchItem'
            options={physicalCategoryList.map(item=>({ value: item.value, label: item.label }))}
          />
        </>
      )}
      <div className='searchActions'>
        <Button className='searchBtn' type='primary' onClick={onSearch}>{t('common.search')}</Button>
        <Button className='resetBtn' onClick={onReset}>{t('common.reset')}</Button>
      </div>
      <div className='addAction'>
        <Button className='addBtn' type='primary' onClick={onAdd}>{t('common.add')}</Button>
      </div>
    </div>
    <div className='tableBox'>
      {activeKey === 'virtual' && <VirtualList ref={virtualRef} filters={virtualFilters} />}
      {activeKey === 'ai' && <AiList ref={aiRef} filters={aiFilters} />}
      {activeKey === 'physical' && <PhysicalList ref={physicalRef} filters={physicalFilters} />}
    </div>
  </>)
}

export default Index;
