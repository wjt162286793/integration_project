import React, { useEffect, useImperativeHandle, useMemo, useState } from 'react'
import { Button, Col, Form, Input, Modal, Row, Select, Space, Table, message } from 'antd'
import type { TableProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { createPhysicalAssetApi, deletePhysicalAssetApi, dictPhysicalCategoryApi, physicalAssetListApi, updatePhysicalAssetApi } from '@/api'
import { v4 as uuidv4 } from 'uuid'

interface PhysicalAssetItem{
  id: string
  name: string
  category: string
  brand: string
  model: string
  serial_number?: string
  remark?: string
  img?: string
  purchase_date?: string
  purchase_price: number
  created_at: string
  updated_at: string
}

type PhysicalFilters = {
  id: string
  name: string
  category: string
}

export type PhysicalListRef = {
  openCreate: ()=>void
}

const PhysicalList = React.forwardRef<PhysicalListRef, { filters: PhysicalFilters }>(({ filters }, ref) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [loading,setLoading] = useState(false)
  const [list,setList] = useState<PhysicalAssetItem[]>([])
  const [page,setPage] = useState(1)
  const [pageSize,setPageSize] = useState(10)
  const [total,setTotal] = useState(0)
  const [modalOpen,setModalOpen] = useState(false)
  const [modalMode,setModalMode] = useState<'create'|'edit'>('create')
  const [editing,setEditing] = useState<PhysicalAssetItem | null>(null)
  const [categoryOptions,setCategoryOptions] = useState<{ value: string, label: string }[]>([])

  const columns: TableProps<PhysicalAssetItem>['columns'] = [
    { title: t('property.id'), dataIndex: 'id', key: 'id' },
    { title: t('property.name'), dataIndex: 'name', key: 'name' },
    { title: t('property.category'), dataIndex: 'category', key: 'category' },
    { title: t('property.brand'), dataIndex: 'brand', key: 'brand' },
    { title: t('property.model'), dataIndex: 'model', key: 'model' },
    { title: t('property.price'), dataIndex: 'purchase_price', key: 'purchase_price' },
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

  const fetchList = async (nextPage:number,nextPageSize:number,nextFilters:PhysicalFilters)=>{
    setLoading(true)
    const res:any = await physicalAssetListApi({ page: nextPage, pageSize: nextPageSize, ...nextFilters })
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
    dictPhysicalCategoryApi({}).then((res:any)=>{
      if(res && res.code === 200 && Array.isArray(res.data)){
        setCategoryOptions(res.data)
      }
    })
  },[])

  const openCreate = ()=>{
    setModalMode('create')
    setEditing(null)
    form.resetFields()
    setModalOpen(true)
  }

  useImperativeHandle(ref, ()=>({
    openCreate
  }))

  const openEdit = (record: PhysicalAssetItem)=>{
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
      name: values.name,
      category: values.category,
      brand: values.brand,
      model: values.model,
      serial_number: values.serial_number,
      purchase_date: values.purchase_date,
      purchase_price: values.purchase_price,
      img: values.img,
      remark: values.remark,
    }
    const api = modalMode === 'create' ? createPhysicalAssetApi : updatePhysicalAssetApi
    const res:any = await api(payload)
    if(res && res.code === 200){
      message.success(t('common.success'))
      closeModal()
      fetchList(1,pageSize,filters)
    }else{
      message.error(res?.msg || t('common.error'))
    }
  }

  const confirmDelete = (record: PhysicalAssetItem)=>{
    Modal.confirm({
      title: t('property.confirmDeleteTitle'),
      content: t('property.confirmDeleteContent'),
      okText: t('common.confirm'),
      cancelText: t('common.cancel'),
      onOk: async ()=>{
        const res:any = await deletePhysicalAssetApi({ id: record.id })
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
      <Table<PhysicalAssetItem>
        loading={loading}
        columns={columns}
        dataSource={list}
        rowKey='id'
        pagination={pagination}
      />
      <Modal
        title={modalMode === 'create' ? t('property.physicalCreateTitle') : t('property.physicalEditTitle')}
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
                <Form.Item name='name' label={t('property.name')} rules={[{ required: true, message: t('property.required') }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='category' label={t('property.category')} rules={[{ required: true, message: t('property.required') }]}>
                  <Select allowClear options={categoryOptions.map(item=>({ value: item.value, label: item.label }))} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='brand' label={t('property.brand')}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='model' label={t('property.model')}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='serial_number' label={t('property.serialNumber')}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='purchase_date' label={t('property.purchaseDate')}>
                  <Input placeholder='YYYY-MM-DD' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='purchase_price' label={t('property.purchasePrice')}>
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='img' label={t('property.img')}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='remark' label={t('property.remark')}>
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  )
})

export default PhysicalList
