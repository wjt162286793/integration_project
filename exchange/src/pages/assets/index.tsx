import React, { useMemo, useState } from 'react'
import { Button, Card, Col, Modal, Progress, Row, Statistic, Table, Tabs, Tag, message } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined, SwapOutlined, WalletOutlined } from '@ant-design/icons'
import './index.less'

type Asset = {
  key: string
  symbol: string
  name: string
  amount: number
  price: number
  change: number
  color: string
}

const initialAssets: Asset[] = [
  { key: 'usdt', symbol: 'USDT', name: 'Tether', amount: 12580.42, price: 1, change: 0.01, color: '#26a17b' },
  { key: 'btc', symbol: 'BTC', name: 'Bitcoin', amount: 0.1842, price: 117548.5, change: 2.34, color: '#f7931a' },
  { key: 'eth', symbol: 'ETH', name: 'Ethereum', amount: 2.86, price: 3540.45, change: -1.2, color: '#627eea' },
  { key: 'sol', symbol: 'SOL', name: 'Solana', amount: 18.5, price: 180.43, change: 5.7, color: '#9945ff' },
]

const Assets: React.FC = () => {
  const [assets] = useState(initialAssets)
  const [activeTab, setActiveTab] = useState('overview')
  const [modal, setModal] = useState<'充值' | '提现' | '划转' | null>(null)
  const [messageApi, contextHolder] = message.useMessage()

  const total = useMemo(() => assets.reduce((sum, item) => sum + item.amount * item.price, 0), [assets])
  const todayPnl = assets.reduce((sum, item) => sum + item.amount * item.price * item.change / 100, 0)

  const openAction = (action: '充值' | '提现' | '划转') => {
    setModal(action)
  }

  const confirmAction = () => {
    messageApi.success(`${modal}申请已提交，当前为演示数据`)
    setModal(null)
  }

  const columns = [
    {
      title: '资产',
      dataIndex: 'symbol',
      render: (_: string, item: Asset) => (
        <div className="asset-name">
          <span className="asset-icon" style={{ background: item.color }}>{item.symbol.slice(0, 1)}</span>
          <div><strong>{item.symbol}</strong><small>{item.name}</small></div>
        </div>
      ),
    },
    { title: '数量', dataIndex: 'amount', render: (value: number) => value.toLocaleString(undefined, { maximumFractionDigits: 6 }) },
    { title: '最新价格', dataIndex: 'price', render: (value: number) => `$${value.toLocaleString()}` },
    { title: '美元估值', render: (_: unknown, item: Asset) => `$${(item.amount * item.price).toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
    {
      title: '今日收益',
      render: (_: unknown, item: Asset) => <span className={item.change >= 0 ? 'positive' : 'negative'}>{item.change >= 0 ? '+' : ''}{(item.amount * item.price * item.change / 100).toFixed(2)} USDT</span>,
    },
    { title: '操作', render: () => <Button type="link" onClick={() => openAction('划转')}>划转</Button> },
  ]

  return (
    <div className="assets-page">
      {contextHolder}
      <div className="assets-heading">
        <div><span className="eyebrow">PORTFOLIO</span><h2>资产</h2><p>管理您的交易账户、资金账户与数字资产。</p></div>
        <div className="asset-actions">
          <Button onClick={() => openAction('充值')}>充值</Button>
          <Button onClick={() => openAction('提现')}>提现</Button>
          <Button type="primary" icon={<SwapOutlined />} onClick={() => openAction('划转')}>划转</Button>
        </div>
      </div>
      <Row gutter={[16, 16]} className="asset-stats">
        <Col xs={24} md={8}><Card><Statistic title="总资产估值 (USDT)" value={total} precision={2} prefix="$" suffix={<span className="muted">≈ ¥{(total * 7.18).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>} /></Card></Col>
        <Col xs={24} md={8}><Card><Statistic title="今日收益" value={todayPnl} precision={2} prefix={todayPnl >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} suffix=" USDT" valueStyle={{ color: todayPnl >= 0 ? '#0ecb81' : '#f6465d' }} /></Card></Col>
        <Col xs={24} md={8}><Card><Statistic title="资产币种" value={assets.length} prefix={<WalletOutlined />} suffix=" 种" /></Card></Col>
      </Row>
      <Card className="asset-card" bodyStyle={{ padding: 0 }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={[{ key: 'overview', label: '资产总览' }, { key: 'funding', label: '资金账户' }, { key: 'history', label: '资金流水' }]} />
        {activeTab === 'overview' && <Table rowKey="key" columns={columns} dataSource={assets} pagination={false} />}
        {activeTab === 'funding' && <div className="funding-panel"><div><h3>资金分布</h3><p>交易账户 <strong>$18,204.62</strong></p><Progress percent={68} strokeColor="#1769ff" showInfo={false} /><p>资金账户 <strong>$8,443.18</strong></p><Progress percent={32} strokeColor="#7c5cff" showInfo={false} /></div><div className="funding-note"><Tag color="blue">低风险</Tag><p>您的资产均处于模拟账户中，充值、提现和划转不会产生真实资金变动。</p></div></div>}
        {activeTab === 'history' && <div className="empty-history"><WalletOutlined /><p>暂无资金流水</p><span>完成充值、提现或划转后，记录会显示在这里</span></div>}
      </Card>
      <Modal title={`${modal}资产`} open={Boolean(modal)} onCancel={() => setModal(null)} onOk={confirmAction} okText="确认提交" cancelText="取消">
        <div className="action-modal"><p>当前为前端演示模式</p><div className="fake-address">0x71a3...90cF <Button type="link">复制</Button></div><small>提交后不会产生真实链上或账户变动。</small></div>
      </Modal>
    </div>
  )
}

export default Assets
