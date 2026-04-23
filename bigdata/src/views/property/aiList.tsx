import React, { useEffect, useImperativeHandle, useMemo, useState } from 'react'
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Space, Table, Tag, message } from 'antd'
import type { TableProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { aiPropertyListApi, createAiPropertyApi, deleteAiPropertyApi, dictAiStatusApi, updateAiPropertyApi } from '@/api'
import { v4 as uuidv4 } from 'uuid'

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
  input_price?: number
  output_price?: number
}

type AiFilters = {
  id: string
  name: string
  level: string
  tags: string
  status: string
}

export type AiListRef = {
  openCreate: ()=>void
}

const AiList = React.forwardRef<AiListRef, { filters: AiFilters }>(({ filters }, ref) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [loading,setLoading] = useState(false)
  const [list,setList] = useState<AiPropertyItem[]>([])
  const [page,setPage] = useState(1)
  const [pageSize,setPageSize] = useState(10)
  const [total,setTotal] = useState(0)
  const [modalOpen,setModalOpen] = useState(false)
  const [modalMode,setModalMode] = useState<'create'|'edit'>('create')
  const [editing,setEditing] = useState<AiPropertyItem | null>(null)
  const [statusOptions,setStatusOptions] = useState<{ value: string, label: string }[]>([])

  const columns: TableProps<AiPropertyItem>['columns'] = [
    { title: t('property.id'), dataIndex: 'id', key: 'id' },
    { title: t('property.cname'), dataIndex: 'cname', key: 'cname' },
    { title: t('property.ename'), dataIndex: 'ename', key: 'ename' },
    { title: t('property.type'), dataIndex: 'type', key: 'type' },
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
    { title: t('property.department'), dataIndex: 'department_ename', key: 'department_ename' },
    { title: t('property.status'), dataIndex: 'status', key: 'status' },
    { title: t('property.contextLength'), dataIndex: 'context_length', key: 'context_length' },
    { title: t('property.remark'), dataIndex: 'remark', key: 'remark' },
    { title: t('property.createTime'), dataIndex: 'create_time', key: 'create_time' },
    { title: t('property.updateTime'), dataIndex: 'update_time', key: 'update_time' },
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

  const fetchList = async (nextPage:number,nextPageSize:number,nextFilters:AiFilters)=>{
    setLoading(true)
    const res:any = await aiPropertyListApi({ page: nextPage, pageSize: nextPageSize, ...nextFilters })
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
    dictAiStatusApi({}).then((res:any)=>{
      if(res && res.code === 200 && Array.isArray(res.data)){
        setStatusOptions(res.data)
      }
    })
  },[])

  const openCreate = ()=>{
    setModalMode('create')
    setEditing(null)
    form.resetFields()
    form.setFieldsValue({ level: '3' })
    setModalOpen(true)
  }

  useImperativeHandle(ref, ()=>({
    openCreate
  }))

  const openEdit = (record: AiPropertyItem)=>{
    setModalMode('edit')
    setEditing(record)
    form.resetFields()
    form.setFieldsValue({
      ...record,
      level: record.level !== undefined && record.level !== null ? String(record.level) : undefined
    })
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
      cname: values.cname,
      ename: values.ename,
      type: values.type,
      level: values.level,
      tags: values.tags,
      department_ename: values.department_ename,
      status: values.status,
      context_length: values.context_length,
      input_price: values.input_price,
      output_price: values.output_price,
      remark: values.remark,
    }
    const api = modalMode === 'create' ? createAiPropertyApi : updateAiPropertyApi
    const res:any = await api(payload)
    if(res && res.code === 200){
      message.success(t('common.success'))
      closeModal()
      fetchList(1,pageSize,filters)
    }else{
      message.error(res?.msg || t('common.error'))
    }
  }

  const confirmDelete = (record: AiPropertyItem)=>{
    Modal.confirm({
      title: t('property.confirmDeleteTitle'),
      content: t('property.confirmDeleteContent'),
      okText: t('common.confirm'),
      cancelText: t('common.cancel'),
      onOk: async ()=>{
        const res:any = await deleteAiPropertyApi({ id: record.id })
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
      <Table<AiPropertyItem>
        loading={loading}
        columns={columns}
        dataSource={list}
        rowKey='id'
        pagination={pagination}
      />
      <Modal
        title={modalMode === 'create' ? t('property.aiCreateTitle') : t('property.aiEditTitle')}
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
                <Form.Item name='cname' label={t('property.cname')} rules={[{ required: true, message: t('property.required') }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='ename' label={t('property.ename')} rules={[{ required: true, message: t('property.required') }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='type' label={t('property.type')} rules={[{ required: true, message: t('property.required') }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='level' label={t('property.level')} rules={[{ required: true, message: t('property.required') }]}>
                  <Select
                    options={[
                      { value: '1', label: '1' },
                      { value: '2', label: '2' },
                      { value: '3', label: '3' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='tags' label={t('property.tags')}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='department_ename' label={t('property.department')}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='status' label={t('property.status')}>
                  <Select allowClear options={statusOptions.map(item=>({ value: item.value, label: item.label }))} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='context_length' label={t('property.contextLength')}>
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='input_price' label={t('property.inputPrice')}>
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='output_price' label={t('property.outputPrice')}>
                  <InputNumber min={0} style={{ width: '100%' }} />
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

export default AiList
