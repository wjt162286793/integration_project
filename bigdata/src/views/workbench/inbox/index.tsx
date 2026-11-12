import React, { useMemo, useState } from 'react'
import { Badge, Button, Card, Drawer, Empty, List, Segmented, Tabs, Tag, message } from 'antd'
import { CheckOutlined, MailOutlined, ReloadOutlined } from '@ant-design/icons'
import { useSearchParams } from 'react-router-dom'
import './index.less'

type Todo = { id: number; title: string; source: string; status: string; priority: string; due: string }
type Msg = { id: number; title: string; source: string; time: string; text: string; unread: boolean }
const todoSeed: Todo[] = [
  { id: 1, title: '构建 1 个流程图模型', source: '模型构建', status: '待处理', priority: '高', due: '今天 18:00' },
  { id: 2, title: '新增一条以太坊数字资产', source: '数字资产', status: '待处理', priority: '中', due: '明天 12:00' },
  { id: 3, title: '提交标签画像的流程审批', source: '模型构建', status: '进行中', priority: '高', due: '周五' },
  { id: 4, title: '完成采购流程图节点配置', source: '模型构建', status: '已完成', priority: '低', due: '昨天' },
]
const messageSeed: Msg[] = [
  { id: 1, title: '模型已发布', source: '系统通知', time: '刚刚', text: '你构建的用户画像模型已经发布完成，可以前往模型构建模块查看详情。', unread: true },
  { id: 2, title: '数字资产新增成功', source: '数字资产中心', time: '今天 10:32', text: '你新增的用户画像标签库已经通过校验并进入应用中状态。', unread: true },
  { id: 3, title: '数据质量日报已生成', source: '数据质量', time: '昨天 18:20', text: '昨日数据质量评分为 96.8 分，共发现 3 个待处理问题。', unread: false },
]

const Inbox: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [tab, setTab] = useState(searchParams.get('tab') === 'message' ? 'message' : 'todo')
  const [todoFilter, setTodoFilter] = useState('全部')
  const [todos, setTodos] = useState(todoSeed)
  const [messages, setMessages] = useState(messageSeed)
  const [activeMessage, setActiveMessage] = useState<Msg | null>(null)
  const [messageApi, contextHolder] = message.useMessage()
  const visibleTodos = useMemo(() => todos.filter((item) => todoFilter === '全部' || item.status === todoFilter), [todoFilter, todos])

  const complete = (id: number) => {
    setTodos((current) => current.map((item) => item.id === id ? { ...item, status: '已完成' } : item))
    messageApi.success('待办已完成')
  }
  const openMessage = (item: Msg) => {
    setActiveMessage(item)
    setMessages((current) => current.map((message) => message.id === item.id ? { ...message, unread: false } : message))
  }

  return <div className="inbox-page">{contextHolder}<div className="inbox-heading"><div><span className="eyebrow">WORKSPACE CENTER</span><h2>待办与站内信</h2><p>集中处理工作任务和系统通知，重要事项不再遗漏。</p></div><Button icon={<ReloadOutlined />} onClick={() => messageApi.success('列表已刷新')}>刷新</Button></div><Card className="inbox-card"><Tabs activeKey={tab} onChange={setTab} items={[{ key: 'todo', label: <span>待办事项 <Badge count={todos.filter((item) => item.status !== '已完成').length} /></span> }, { key: 'message', label: <span><MailOutlined /> 站内信 <Badge count={messages.filter((item) => item.unread).length} /></span> }]} />{tab === 'todo' && <><div className="inbox-toolbar"><Segmented value={todoFilter} onChange={(value) => setTodoFilter(String(value))} options={['全部', '待处理', '进行中', '已完成']} /></div><List dataSource={visibleTodos} locale={{ emptyText: <Empty description="暂无待办" /> }} renderItem={(item) => <List.Item actions={item.status !== '已完成' ? [<Button key="complete" type="primary" ghost icon={<CheckOutlined />} onClick={() => complete(item.id)}>完成</Button>] : [<Tag color="green">已完成</Tag>]}><List.Item.Meta title={<span>{item.title} <Tag color={item.priority === '高' ? 'red' : 'blue'}>{item.priority}优先级</Tag></span>} description={`${item.source} · 截止 ${item.due}`} /></List.Item>} /></>}{tab === 'message' && <List dataSource={messages} locale={{ emptyText: <Empty description="暂无站内信" /> }} renderItem={(item) => <List.Item className={item.unread ? 'inbox-message unread' : 'inbox-message'} onClick={() => openMessage(item)}><List.Item.Meta avatar={<span className="message-icon"><MailOutlined /></span>} title={<span>{item.title} {item.unread && <Badge status="processing" text="未读" />}</span>} description={<>{item.source} · {item.time}<p>{item.text}</p></>} /></List.Item>} />}</Card><Drawer title={activeMessage?.title} open={Boolean(activeMessage)} onClose={() => setActiveMessage(null)} width={440}>{activeMessage && <div className="message-detail"><Tag color="blue">{activeMessage.source}</Tag><p>{activeMessage.text}</p><small>{activeMessage.time}</small></div>}</Drawer></div>
}
export default Inbox
