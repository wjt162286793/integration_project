import React, { useMemo, useState } from 'react'
import { Badge, Button, Col, Drawer, List, Row, Tag, message } from 'antd'
import { CheckOutlined, ClockCircleOutlined, MailOutlined, RightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

type Todo = { id: number; title: string; source: string; status: '待处理' | '进行中' | '已完成'; priority: '高' | '中' | '低'; due: string }
type InboxMessage = { id: number; title: string; source: string; time: string; text: string; unread: boolean }

const todoSeed: Todo[] = [
  { id: 1, title: '构建 1 个流程图模型', source: '模型构建', status: '待处理', priority: '高', due: '今天 18:00' },
  { id: 2, title: '新增一条以太坊数字资产', source: '数字资产', status: '待处理', priority: '中', due: '明天 12:00' },
  { id: 3, title: '提交标签画像的流程审批', source: '模型构建', status: '进行中', priority: '高', due: '周五' },
  { id: 4, title: '完成采购流程图节点配置', source: '模型构建', status: '已完成', priority: '低', due: '昨天' },
]
const messageSeed: InboxMessage[] = [
  { id: 1, title: '模型已发布', source: '系统通知', time: '刚刚', text: '你构建的用户画像模型已经发布完成，可以前往模型构建模块查看详情。', unread: true },
  { id: 2, title: '数字资产新增成功', source: '数字资产中心', time: '今天 10:32', text: '你新增的用户画像标签库已经通过校验并进入应用中状态。', unread: true },
  { id: 3, title: '数据质量日报已生成', source: '数据质量', time: '昨天 18:20', text: '昨日数据质量评分为 96.8 分，共发现 3 个待处理问题。', unread: false },
]

const ListCom: React.FC = () => {
  const navigate = useNavigate()
  const [todos, setTodos] = useState(todoSeed)
  const [messages, setMessages] = useState(messageSeed)
  const [activeMessage, setActiveMessage] = useState<InboxMessage | null>(null)
  const [messageApi, contextHolder] = message.useMessage()
  const pendingCount = useMemo(() => todos.filter((item) => item.status !== '已完成').length, [todos])
  const unreadCount = useMemo(() => messages.filter((item) => item.unread).length, [messages])

  const completeTodo = (todo: Todo) => {
    setTodos((current) => current.map((item) => item.id === todo.id ? { ...item, status: '已完成' } : item))
    messageApi.success('待办已完成')
  }
  const openMessage = (item: InboxMessage) => {
    setActiveMessage(item)
    setMessages((current) => current.map((message) => message.id === item.id ? { ...message, unread: false } : message))
  }

  return <div className="listBox">
    {contextHolder}
    <Row gutter={20}>
      <Col xs={24} lg={12}><div className="panel-heading"><Badge count={pendingCount} offset={[10, 8]}><h5>待办事项</h5></Badge><Button type="link" onClick={() => navigate('/dashBoard/inbox?tab=todo')}>查看全部 <RightOutlined /></Button></div><div className="todoListBox"><List bordered dataSource={todos.slice(0, 4)} renderItem={(item) => <List.Item actions={[item.status !== '已完成' && <Button key="done" type="link" icon={<CheckOutlined />} onClick={() => completeTodo(item)}>完成</Button>] }><div className="todoItem"><div><p>{item.title}</p><small><ClockCircleOutlined /> {item.due} · {item.source}</small></div><Tag color={item.status === '已完成' ? 'green' : item.priority === '高' ? 'red' : 'blue'}>{item.status}</Tag></div></List.Item>} /></div></Col>
      <Col xs={24} lg={12}><div className="panel-heading"><Badge count={unreadCount} offset={[10, 8]}><h5><MailOutlined /> 系统消息</h5></Badge><Button type="link" onClick={() => navigate('/dashBoard/inbox?tab=message')}>查看全部 <RightOutlined /></Button></div><div className="msgListBox"><List bordered dataSource={messages.slice(0, 4)} renderItem={(item) => <List.Item onClick={() => openMessage(item)} className={item.unread ? 'message-unread' : ''}><div className="msgItem"><div><p>{item.title}</p><small>{item.source} · {item.time}</small></div>{item.unread && <Badge status="processing" text="未读" />}</div></List.Item>} /></div></Col>
    </Row>
    <Drawer title={activeMessage?.title} open={Boolean(activeMessage)} onClose={() => setActiveMessage(null)} width={440}>{activeMessage && <div className="message-detail"><Tag color="blue">{activeMessage.source}</Tag><p>{activeMessage.text}</p><small>{activeMessage.time}</small></div>}</Drawer>
  </div>
}
export default ListCom
