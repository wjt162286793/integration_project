import React, { useMemo, useState } from 'react'
import { Card, Col, Progress, Row, Select, Space, Statistic, Table, Tag, Tooltip } from 'antd'
import { CheckCircleOutlined, ExclamationCircleOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons'
import './index.less'

type QualityItem = { key: number; name: string; source: string; rule: string; score: number; issues: number; status: string; owner: string; checked: string }
const seed: QualityItem[] = [
  { key: 1, name: '用户画像标签库', source: 'dws_user_profile', rule: '完整性校验', score: 98.6, issues: 3, status: '正常', owner: '李明', checked: '10分钟前' },
  { key: 2, name: '订单明细数据集', source: 'dwd_order_detail', rule: '唯一性校验', score: 91.2, issues: 26, status: '待整改', owner: '周凯', checked: '24分钟前' },
  { key: 3, name: '供应链知识图谱', source: 'ads_supply_graph', rule: '一致性校验', score: 95.8, issues: 8, status: '待整改', owner: '赵敏', checked: '1小时前' },
  { key: 4, name: '交易行情快照', source: 'ods_market_tick', rule: '及时性校验', score: 99.9, issues: 0, status: '正常', owner: '王强', checked: '2小时前' },
]
const Quality: React.FC = () => {
  const [filter, setFilter] = useState('全部')
  const data = useMemo(() => seed.filter((item) => filter === '全部' || item.status === filter), [filter])
  const columns = [{ title: '数据资产', dataIndex: 'name', render: (value: string, item: QualityItem) => <div><strong>{value}</strong><small>{item.source}</small></div> }, { title: '检测规则', dataIndex: 'rule' }, { title: '质量评分', dataIndex: 'score', render: (value: number) => <div className="score-cell"><Progress percent={value} size="small" strokeColor={value > 95 ? '#16a673' : '#e9a52d'} showInfo={false} /><b>{value}</b></div> }, { title: '异常数', dataIndex: 'issues', render: (value: number) => <span className={value ? 'warning-number' : 'ok-number'}>{value}</span> }, { title: '状态', dataIndex: 'status', render: (value: string) => <Tag color={value === '正常' ? 'green' : 'orange'}>{value}</Tag> }, { title: '负责人', dataIndex: 'owner' }, { title: '最近检测', dataIndex: 'checked' }]
  return <div className="quality-page"><div className="page-heading"><div><span className="eyebrow">DATA GOVERNANCE</span><h2>数据质量中心</h2><p>通过规则检测持续监控数据的完整性、准确性和及时性。</p></div><Space><Select value={filter} onChange={setFilter} options={['全部', '正常', '待整改'].map((value) => ({ value, label: value === '全部' ? '全部状态' : value }))} /><Tooltip title="重新检测"><ReloadOutlined className="refresh-icon" /></Tooltip></Space></div><Row gutter={16} className="quality-stats"><Col xs={24} sm={8}><Card><Statistic title="平均质量评分" value={96.8} suffix="分" valueStyle={{ color: '#16a673' }} /><Progress percent={96.8} showInfo={false} strokeColor="#16a673" /></Card></Col><Col xs={24} sm={8}><Card><Statistic title="检测数据资产" value={128} suffix="项" prefix={<CheckCircleOutlined />} /></Card></Col><Col xs={24} sm={8}><Card><Statistic title="待处理质量问题" value={37} suffix="个" prefix={<ExclamationCircleOutlined />} valueStyle={{ color: '#e29b31' }} /></Card></Col></Row><Card className="quality-card" title={<><FilterOutlined /> 检测结果</>} extra={<span className="muted">最近更新：刚刚</span>}><Table rowKey="key" columns={columns} dataSource={data} pagination={{ pageSize: 6, showTotal: (total) => `共 ${total} 项` }} /></Card></div>
}
export default Quality
