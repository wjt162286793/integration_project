import React, { useMemo, useState } from 'react'
import { Button, Card, Col, Drawer, Form, Input, InputNumber, Modal, Popconfirm, Row, Select, Space, Statistic, Table, Tag, message } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons'
import type { DataType } from './type'
import './index.less'

type AssetRecord = DataType & { category: string; description: string }

const seedAssets: AssetRecord[] = [
  { id: 1, name: 'AI模型', price: 100000, source: '智能孵化基地', tags: ['大模型', 'AI研发'], status: '应用中', type: 'AI资产', category: '模型服务', level: 2, liable_name: '王惊涛', create_time: '2022-02-11', update_time: '2024-05-20', description: '面向企业知识问答与智能分析的基础模型资产。' },
  { id: 2, name: '大水币', price: 450000, source: '加密资产管理部', tags: ['加密货币', '虚拟货币'], status: '封闭中', type: '虚拟资产', category: '数字货币', level: 3, liable_name: '王惊涛', create_time: '2024-01-01', update_time: '2025-06-16', description: '数字资产实验室中的模拟加密资产。' },
  { id: 3, name: '用户画像标签库', price: 82000, source: '数据中台', tags: ['标签', '画像'], status: '应用中', type: '数据资产', category: '数据集', level: 1, liable_name: '李明', create_time: '2024-03-18', update_time: '2025-01-08', description: '沉淀用户行为和偏好的标准化标签数据集。' },
  { id: 4, name: '供应链知识图谱', price: 236000, source: '产业数据中心', tags: ['图谱', '供应链'], status: '已下架', type: '数据资产', category: '知识图谱', level: 2, liable_name: '赵敏', create_time: '2023-09-12', update_time: '2024-12-01', description: '供应商、商品与订单关系网络。' },
]

const emptyAsset: Omit<AssetRecord, 'id' | 'create_time' | 'update_time'> = { name: '', price: 0, source: '', tags: [], status: '应用中', type: '数据资产', category: '数据集', level: 1, liable_name: '', description: '' }

const Property: React.FC = () => {
  const [assets, setAssets] = useState<AssetRecord[]>(seedAssets)
  const [query, setQuery] = useState({ name: '', status: '全部', type: '全部' })
  const [editing, setEditing] = useState<AssetRecord | null>(null)
  const [editorOpen, setEditorOpen] = useState(false)
  const [detail, setDetail] = useState<AssetRecord | null>(null)
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  const filteredAssets = useMemo(() => assets.filter((asset) => (
    asset.name.toLowerCase().includes(query.name.toLowerCase()) &&
    (query.status === '全部' || asset.status === query.status) &&
    (query.type === '全部' || asset.type === query.type)
  )), [assets, query])

  const openEditor = (asset?: AssetRecord) => {
    setEditing(asset || null)
    setEditorOpen(true)
    form.setFieldsValue(asset || emptyAsset)
  }

  const saveAsset = async () => {
    const values = await form.validateFields()
    const today = new Date().toISOString().slice(0, 10)
    if (editing) {
      setAssets((current) => current.map((item) => item.id === editing.id ? { ...item, ...values, update_time: today } : item))
      messageApi.success('资产信息已更新')
    } else {
      setAssets((current) => [{ ...values, id: Date.now(), create_time: today, update_time: today }, ...current])
      messageApi.success('资产已创建')
    }
    setEditing(null)
    setEditorOpen(false)
    form.resetFields()
  }

  const removeAsset = (id: number) => {
    setAssets((current) => current.filter((item) => item.id !== id))
    messageApi.success('资产已删除')
  }

  const toggleStatus = (asset: AssetRecord) => {
    const status = asset.status === '已下架' ? '应用中' : '已下架'
    setAssets((current) => current.map((item) => item.id === asset.id ? { ...item, status, update_time: new Date().toISOString().slice(0, 10) } : item))
    messageApi.success(status === '已下架' ? '资产已下架' : '资产已重新上架')
  }

  const columns = [
    { title: '资产名称', dataIndex: 'name', fixed: 'left' as const, width: 190, render: (value: string, record: AssetRecord) => <div className="asset-title"><span className="asset-avatar">{value.slice(0, 1)}</span><div><strong>{value}</strong><small>{record.type}</small></div></div> },
    { title: '资产价值', dataIndex: 'price', render: (value: number) => `¥${value.toLocaleString()}` },
    { title: '归属部门', dataIndex: 'source' },
    { title: '分类', dataIndex: 'category', render: (value: string) => <Tag color="blue">{value}</Tag> },
    { title: '等级', dataIndex: 'level', render: (value: number) => <Tag color={value === 1 ? 'green' : value === 2 ? 'gold' : 'red'}>L{value}</Tag> },
    { title: '标签', dataIndex: 'tags', render: (tags: string[]) => <Space wrap size={[4, 4]}>{tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</Space> },
    { title: '状态', dataIndex: 'status', render: (value: string) => <span className={`status-dot ${value === '应用中' ? 'on' : value === '封闭中' ? 'pause' : 'off'}`}>{value}</span> },
    { title: '负责人', dataIndex: 'liable_name' },
    { title: '更新时间', dataIndex: 'update_time' },
    { title: '操作', fixed: 'right' as const, width: 190, render: (_: unknown, record: AssetRecord) => <Space size={4}><Button type="link" icon={<EyeOutlined />} onClick={() => setDetail(record)}>查看</Button><Button type="link" icon={<EditOutlined />} onClick={() => openEditor(record)}>编辑</Button><Popconfirm title={record.status === '已下架' ? '确认重新上架？' : '确认下架？'} onConfirm={() => toggleStatus(record)}><Button type="link">{record.status === '已下架' ? '上架' : '下架'}</Button></Popconfirm><Popconfirm title="确认删除这条资产？" onConfirm={() => removeAsset(record.id)}><Button danger type="text" icon={<DeleteOutlined />} /></Popconfirm></Space> },
  ]

  return <div className="property-page">
    {contextHolder}
    <div className="page-heading"><div><span className="eyebrow">DATA ASSET CENTER</span><h2>数字资产</h2><p>统一管理企业数据、模型与数字化资源。</p></div><Space><Button icon={<UploadOutlined />}>批量导入</Button><Button type="primary" icon={<PlusOutlined />} onClick={() => openEditor()}>新增资产</Button></Space></div>
    <Row gutter={16} className="property-stats"><Col xs={24} sm={8}><Card><Statistic title="资产总数" value={assets.length} suffix="项" /></Card></Col><Col xs={24} sm={8}><Card><Statistic title="应用中" value={assets.filter((item) => item.status === '应用中').length} suffix="项" valueStyle={{ color: '#16a673' }} /></Card></Col><Col xs={24} sm={8}><Card><Statistic title="资产总价值" value={assets.reduce((sum, item) => sum + item.price, 0)} prefix="¥" precision={0} /></Card></Col></Row>
    <Card className="property-card">
      <div className="searchBox"><Input allowClear prefix={<SearchOutlined />} placeholder="搜索资产名称" value={query.name} onChange={(event) => setQuery({ ...query, name: event.target.value })} /><Select value={query.type} onChange={(value) => setQuery({ ...query, type: value })} options={['全部', '数据资产', 'AI资产', '虚拟资产'].map((value) => ({ label: value === '全部' ? '全部类型' : value, value }))} /><Select value={query.status} onChange={(value) => setQuery({ ...query, status: value })} options={['全部', '应用中', '封闭中', '已下架'].map((value) => ({ label: value === '全部' ? '全部状态' : value, value }))} /><Button onClick={() => setQuery({ name: '', type: '全部', status: '全部' })}>重置</Button><span className="result-count">共 {filteredAssets.length} 项资产</span></div>
      <Table rowKey="id" columns={columns} dataSource={filteredAssets} scroll={{ x: 1200 }} pagination={{ pageSize: 6, showSizeChanger: true, showTotal: (total) => `共 ${total} 项` }} />
    </Card>
    <Drawer title="资产详情" open={Boolean(detail)} onClose={() => setDetail(null)} width={440}>{detail && <div className="asset-detail"><div className="detail-banner"><span className="asset-avatar large">{detail.name.slice(0, 1)}</span><div><h3>{detail.name}</h3><Tag color="blue">{detail.type}</Tag></div></div><dl><dt>资产描述</dt><dd>{detail.description}</dd><dt>资产价值</dt><dd>¥{detail.price.toLocaleString()}</dd><dt>归属部门</dt><dd>{detail.source}</dd><dt>负责人</dt><dd>{detail.liable_name}</dd><dt>创建时间</dt><dd>{detail.create_time}</dd><dt>更新时间</dt><dd>{detail.update_time}</dd></dl></div>}</Drawer>
    <Modal title={editing ? '编辑数字资产' : '新增数字资产'} open={editorOpen} onCancel={() => { setEditing(null); setEditorOpen(false); form.resetFields() }} onOk={saveAsset} okText="保存" cancelText="取消" destroyOnClose><Form form={form} layout="vertical" initialValues={emptyAsset}><Row gutter={16}><Col span={12}><Form.Item name="name" label="资产名称" rules={[{ required: true, message: '请输入资产名称' }]}><Input placeholder="如：用户画像标签库" /></Form.Item></Col><Col span={12}><Form.Item name="type" label="资产类型"><Select options={['数据资产', 'AI资产', '虚拟资产'].map((value) => ({ label: value, value }))} /></Form.Item></Col></Row><Row gutter={16}><Col span={12}><Form.Item name="price" label="资产价值"><InputNumber min={0} precision={0} style={{ width: '100%' }} /></Form.Item></Col><Col span={12}><Form.Item name="level" label="资产等级"><Select options={[1, 2, 3].map((value) => ({ label: `L${value}`, value }))} /></Form.Item></Col></Row><Form.Item name="category" label="资产分类"><Input /></Form.Item><Form.Item name="source" label="归属部门"><Input /></Form.Item><Form.Item name="liable_name" label="负责人"><Input /></Form.Item><Form.Item name="tags" label="标签"><Select mode="tags" placeholder="输入后回车添加标签" /></Form.Item><Form.Item name="description" label="资产描述"><Input.TextArea rows={4} /></Form.Item></Form></Modal>
  </div>
}

export default Property
