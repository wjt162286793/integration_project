import React, { useMemo, useState } from 'react'
import { Button, Card, Col, Drawer, List, Row, Segmented, Statistic, Tag, message } from 'antd'
import { AlertOutlined, CheckOutlined, CloseOutlined, ThunderboltOutlined } from '@ant-design/icons'
import './index.less'

type AlertItem = { id: number; title: string; detail: string; level: string; source: string; time: string; status: string }
const initialAlerts: AlertItem[] = [
  { id: 1, title: '订单明细数据质量下降', detail: '唯一性规则检测到 26 条重复记录，请及时处理。', level: '高', source: '数据质量中心', time: '10分钟前', status: '待确认' },
  { id: 2, title: '实时数据管道延迟', detail: 'Flink Job #1024 延迟超过 5 分钟，当前延迟 8.2 分钟。', level: '高', source: '实时数据平台', time: '24分钟前', status: '处理中' },
  { id: 3, title: 'API 调用量达到阈值', detail: '数据服务 API 今日调用量已达到日配额的 80%。', level: '中', source: '服务监控', time: '1小时前', status: '待确认' },
  { id: 4, title: '数据日报生成完成', detail: '昨日数据质量日报已生成，综合评分 96.8 分。', level: '低', source: '系统通知', time: '昨天', status: '已关闭' },
]
const AlertCenter: React.FC = () => {
  const [alerts, setAlerts] = useState(initialAlerts)
  const [filter, setFilter] = useState('全部')
  const [active, setActive] = useState<AlertItem | null>(null)
  const [messageApi, contextHolder] = message.useMessage()
  const visible = useMemo(() => alerts.filter((item) => filter === '全部' || item.status === filter), [alerts, filter])
  const updateStatus = (id: number, status: string) => { setAlerts((current) => current.map((item) => item.id === id ? { ...item, status } : item)); messageApi.success(`告警已${status === '处理中' ? '确认' : '关闭'}`) }
  return <div className="alert-page">{contextHolder}<div className="page-heading"><div><span className="eyebrow">OBSERVABILITY CENTER</span><h2>告警中心</h2><p>统一接收数据、模型和平台服务告警，快速定位并闭环处理。</p></div><Button type="primary" icon={<ThunderboltOutlined />} onClick={() => messageApi.success('告警规则检查完成')}>检查规则</Button></div><Row gutter={16} className="alert-stats"><Col xs={24} sm={8}><Card><Statistic title="活跃告警" value={alerts.filter((item) => item.status !== '已关闭').length} suffix="条" prefix={<AlertOutlined />} valueStyle={{ color: '#e05b59' }} /></Card></Col><Col xs={24} sm={8}><Card><Statistic title="高优先级" value={alerts.filter((item) => item.level === '高' && item.status !== '已关闭').length} suffix="条" /></Card></Col><Col xs={24} sm={8}><Card><Statistic title="平均响应时间" value={12} suffix="分钟" /></Card></Col></Row><Card className="alert-card"><div className="alert-toolbar"><Segmented value={filter} onChange={(value) => setFilter(String(value))} options={['全部', '待确认', '处理中', '已关闭']} /><span className="muted">共 {visible.length} 条记录</span></div><List dataSource={visible} renderItem={(item) => <List.Item className={`alert-item level-${item.level}`} actions={[item.status === '待确认' && <Button key="confirm" type="link" icon={<CheckOutlined />} onClick={() => updateStatus(item.id, '处理中')}>确认</Button>, item.status !== '已关闭' && <Button key="close" type="link" icon={<CloseOutlined />} onClick={() => updateStatus(item.id, '已关闭')}>关闭</Button>]} onClick={() => setActive(item)}><List.Item.Meta avatar={<span className="alert-icon"><AlertOutlined /></span>} title={<span>{item.title} <Tag color={item.level === '高' ? 'red' : item.level === '中' ? 'orange' : 'blue'}>{item.level}优先级</Tag><Tag>{item.status}</Tag></span>} description={<>{item.detail}<div className="alert-meta">{item.source} · {item.time}</div></>} /></List.Item>} /></Card><Drawer title="告警详情" open={Boolean(active)} onClose={() => setActive(null)}>{active && <div className="alert-detail"><Tag color="red">{active.level}优先级</Tag><h3>{active.title}</h3><p>{active.detail}</p><dl><dt>来源</dt><dd>{active.source}</dd><dt>发生时间</dt><dd>{active.time}</dd><dt>当前状态</dt><dd>{active.status}</dd></dl></div>}</Drawer></div>
}
export default AlertCenter
