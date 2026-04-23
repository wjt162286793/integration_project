import React, { useEffect, useImperativeHandle, useMemo, useState } from 'react'
import { Button, Col, Form, Input, Modal, Row, Select, Space, Table, message } from 'antd'
import type { TableProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { createVirtualApi, deleteVirtualApi, dictVirtualStatusApi, dictVirtualTypeApi, updateVirtualApi, virtualAssetListApi } from '@/api'
import { v4 as uuidv4 } from 'uuid'

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

type VirtualFilters = {
  id: string
  name: string
  status: string
  type?: string
}

export type VirtualListRef = {
  openCreate: ()=>void
}

const VirtualList = React.forwardRef<VirtualListRef, { filters: VirtualFilters }>(({ filters }, ref) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [loading,setLoading] = useState(false)
  const [list,setList] = useState<VirtualAssetItem[]>([])
  const [page,setPage] = useState(1)
  const [pageSize,setPageSize] = useState(10)
  const [total,setTotal] = useState(0)
  const [modalOpen,setModalOpen] = useState(false)
  const [modalMode,setModalMode] = useState<'create'|'edit'>('create')
  const [editing,setEditing] = useState<VirtualAssetItem | null>(null)
  const [statusOptions,setStatusOptions] = useState<{ value: string, label: string }[]>([])
  const [typeOptions,setTypeOptions] = useState<{ value: string, label: string }[]>([])

  const columns: TableProps<VirtualAssetItem>['columns'] = [
    { title: t('property.id'), dataIndex: 'id', key: 'id' },
    { title: t('property.symbol'), dataIndex: 'symbol', key: 'symbol' },
    { title: t('property.name'), dataIndex: 'name', key: 'name' },
    { title: t('property.chain'), dataIndex: 'chain', key: 'chain' },
    { title: t('property.assetType'), dataIndex: 'type', key: 'type' },
    { title: t('property.contractAddress'), dataIndex: 'contract_address', key: 'contract_address' },
    { title: t('property.decimals'), dataIndex: 'decimals', key: 'decimals' },
    { title: t('property.currentPrice'), dataIndex: 'current_price', key: 'current_price' },
    { title: t('property.priceChange24h'), dataIndex: 'price_change_24h', key: 'price_change_24h' },
    { title: t('property.status'), dataIndex: 'status', key: 'status' },
    { title: t('property.createTime'), dataIndex: 'created_at', key: 'created_at' },
    { title: t('property.updateTime'), dataIndex: 'updated_at', key: 'updated_at' },
    {
      title: t('property.actions'),
      key: 'actions',
      render: (_, record)=>(
        <Space>
          <Button type='link' onClick={()=>openEdit(record)}>{t('common.edit')}</Button>
          <Button type='link' danger onClick={()=>confirmDelete(record)}>{t('common.delete')}</Button>
        </Space>
      )
    }
  ]

  const fetchList = async (nextPage:number,nextPageSize:number,nextFilters:VirtualFilters)=>{
    setLoading(true)
    const res:any = await virtualAssetListApi({ page: nextPage, pageSize: nextPageSize, ...nextFilters })
    if(res && res.code === 200 && res.data){
      setList(Array.isArray(res.data.list) ? res.data.list : [])
      setTotal(Number(res.data.total || 0))
      setPage(Number(res.data.page || nextPage))
      setPageSize(Number(res.data.pageSize || nextPageSize))
    }else{
      setList([])
      setTotal(0)
    }
    setLoading(false)
  }

  useEffect(()=>{
    setPage(1)
    fetchList(1,pageSize,filters)
  },[filters])

  useEffect(()=>{
    fetchList(page,pageSize,filters)
  },[])

  useEffect(()=>{
    dictVirtualStatusApi({}).then((res:any)=>{
      if(res && res.code === 200 && Array.isArray(res.data)){
        setStatusOptions(res.data)
      }
    })
    dictVirtualTypeApi({}).then((res:any)=>{
      if(res && res.code === 200 && Array.isArray(res.data)){
        setTypeOptions(res.data)
      }
    })
  },[])

  const openCreate = ()=>{
    setModalMode('create')
    setEditing(null)
    form.resetFields()
    form.setFieldsValue({ type: 'coin' })
    setModalOpen(true)
  }

  useImperativeHandle(ref, ()=>({
    openCreate
  }))

  const openEdit = (record: VirtualAssetItem)=>{
    setModalMode('edit')
    setEditing(record)
    form.resetFields()
    form.setFieldsValue({ ...record })
    setModalOpen(true)
  }

  const closeModal = ()=>{
    setModalOpen(false)
    setEditing(null)
    form.resetFields()
  }

  const submitForm = async (values:any)=>{
    const payload = {
      id: modalMode === 'create' ? uuidv4() : editing?.id,
      symbol: values.symbol,
      name: values.name,
      chain: values.chain,
      type: values.type,
      contract_address: values.contract_address,
      decimals: values.decimals,
      current_price: values.current_price,
      price_change_24h: values.price_change_24h,
      status: values.status,
    }
    const api = modalMode === 'create' ? createVirtualApi : updateVirtualApi
    const res:any = await api(payload)
    if(res && res.code === 200){
      message.success(t('common.success'))
      closeModal()
      fetchList(1,pageSize,filters)
    }else{
      message.error(res?.msg || t('common.error'))
    }
  }

  const confirmDelete = (record: VirtualAssetItem)=>{
    Modal.confirm({
      title: t('property.confirmDeleteTitle'),
      content: t('property.confirmDeleteContent'),
      okText: t('common.confirm'),
      cancelText: t('common.cancel'),
      onOk: async ()=>{
        const res:any = await deleteVirtualApi({ id: record.id })
        if(res && res.code === 200){
          message.success(t('common.success'))
          fetchList(page,pageSize,filters)
        }else{
          message.error(res?.msg || t('common.error'))
        }
      }
    })
  }

  const pagination = useMemo(()=>({
    current: page,
    pageSize,
    total,
    showSizeChanger: true,
    onChange: (p:number,ps:number)=>{
      setPage(p)
      setPageSize(ps)
      fetchList(p,ps,filters)
    }
  }),[page,pageSize,total,filters])

  return (
    <>
      <Table<VirtualAssetItem>
        loading={loading}
        columns={columns}
        dataSource={list}
        rowKey='id'
        pagination={pagination}
      />
      <Modal
        title={modalMode === 'create' ? t('property.virtualCreateTitle') : t('property.virtualEditTitle')}
        open={modalOpen}
        onCancel={closeModal}
        footer={[
          <Button key='cancel' onClick={closeModal}>{t('common.cancel')}</Button>,
          <Button key='ok' type='primary' onClick={()=>form.submit()}>{t('common.save')}</Button>
        ]}
        width={720}
      >
        <div className='propertyModalBody'>
          <Form form={form} layout='horizontal' labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} labelAlign='right' onFinish={submitForm}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name='symbol' label={t('property.symbol')} rules={[{ required: true, message: t('property.required') }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='name' label={t('property.name')} rules={[{ required: true, message: t('property.required') }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='chain' label={t('property.chain')} rules={[{ required: true, message: t('property.required') }]}>
                  <Select
                    allowClear
                    options={typeOptions.map(item=>({ value: item.value, label: item.label }))}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='type' label={t('property.assetType')} rules={[{ required: true, message: t('property.required') }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='contract_address' label={t('property.contractAddress')}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='decimals' label={t('property.decimals')}>
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='current_price' label={t('property.currentPrice')}>
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='price_change_24h' label={t('property.priceChange24h')}>
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='status' label={t('property.status')}>
                  <Select allowClear options={statusOptions.map(item=>({ value: item.value, label: item.label }))} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  )
})

export default VirtualList
