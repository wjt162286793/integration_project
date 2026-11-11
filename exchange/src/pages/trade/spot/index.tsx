import React, { useMemo, useState } from 'react'
import { Button, InputNumber, Select, Table, Tabs, Tag, message } from 'antd'
import { StarFilled, StarOutlined } from '@ant-design/icons'
import './index.less'

type Order = { key: number; side: '买入' | '卖出'; price: number; amount: number; status: string }
const markets = [
  { symbol: 'BTC/USDT', price: 117548.5, change: '+2.34%' },
  { symbol: 'ETH/USDT', price: 3540.45, change: '-1.20%' },
  { symbol: 'SOL/USDT', price: 180.43, change: '+5.70%' },
]
const asks = [117610.2, 117590.8, 117572.1, 117560.4]
const bids = [117548.5, 117531.8, 117506.2, 117490.7]

const SpotTrade: React.FC = () => {
  const [selected, setSelected] = useState(markets[0])
  const [side, setSide] = useState<'买入' | '卖出'>('买入')
  const [price, setPrice] = useState(selected.price)
  const [amount, setAmount] = useState(0)
  const [orders, setOrders] = useState<Order[]>([])
  const [favorite, setFavorite] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const total = useMemo(() => price * amount, [price, amount])

  const selectMarket = (market: typeof markets[number]) => {
    setSelected(market)
    setPrice(market.price)
  }
  const submitOrder = () => {
    if (!amount || amount <= 0) {
      messageApi.warning('请输入下单数量')
      return
    }
    setOrders((current) => [{ key: Date.now(), side, price, amount, status: '已挂单' }, ...current])
    setAmount(0)
    messageApi.success(`${side}委托已提交`)
  }

  const orderColumns = [
    { title: '方向', dataIndex: 'side', render: (value: string) => <span className={value === '买入' ? 'buy-text' : 'sell-text'}>{value}</span> },
    { title: '价格', dataIndex: 'price', render: (value: number) => value.toLocaleString() },
    { title: '数量', dataIndex: 'amount' },
    { title: '状态', dataIndex: 'status', render: (value: string) => <Tag color="blue">{value}</Tag> },
    { title: '操作', render: () => <Button type="link" onClick={() => messageApi.info('模拟订单已撤销')}>撤单</Button> },
  ]

  return (
    <div className="spot-page">
      {contextHolder}
      <div className="spot-topbar">
        <div className="pair-title"><button className="favorite" onClick={() => setFavorite(!favorite)}>{favorite ? <StarFilled /> : <StarOutlined />}</button><div><h2>{selected.symbol}</h2><span>现货交易</span></div></div>
        <div className="ticker"><strong className="buy-text">{selected.price.toLocaleString()}</strong><span>≈ ${selected.price.toLocaleString()} </span><b className={selected.change.startsWith('+') ? 'buy-text' : 'sell-text'}>{selected.change}</b></div>
        <div className="market-switch">{markets.map((market) => <button className={market.symbol === selected.symbol ? 'selected' : ''} key={market.symbol} onClick={() => selectMarket(market)}>{market.symbol}</button>)}</div>
      </div>
      <div className="spot-grid">
        <section className="chart-card"><div className="chart-head"><span>价格走势</span><Tabs size="small" defaultActiveKey="1" items={['1分钟', '15分钟', '1小时', '4小时', '1日'].map((item, index) => ({ key: String(index + 1), label: item }))} /></div><div className="fake-chart"><div className="chart-line" /><div className="chart-labels"><span>118,000</span><span>117,500</span><span>117,000</span><span>116,500</span></div></div></section>
        <section className="orderbook-card"><div className="section-title">订单簿 <small>深度</small></div><div className="book-head"><span>价格(USDT)</span><span>数量(BTC)</span></div><div className="book-rows">{asks.reverse().map((value) => <div key={value}><span className="sell-text">{value.toLocaleString()}</span><span>{(Math.random() * 2 + .3).toFixed(4)}</span></div>)}<div className="mid-price">{selected.price.toLocaleString()} <small>≈ 0.02%</small></div>{bids.map((value) => <div key={value}><span className="buy-text">{value.toLocaleString()}</span><span>{(Math.random() * 2 + .3).toFixed(4)}</span></div>)}</div></section>
        <section className="form-card"><div className="section-title">下单 <small>可用 12,580.42 USDT</small></div><div className="side-tabs"><button className={side === '买入' ? 'active-buy' : ''} onClick={() => setSide('买入')}>买入</button><button className={side === '卖出' ? 'active-sell' : ''} onClick={() => setSide('卖出')}>卖出</button></div><label>价格 (USDT)<InputNumber value={price} onChange={(value) => setPrice(value || 0)} controls={false} /></label><label>数量 (BTC)<InputNumber value={amount || null} onChange={(value) => setAmount(value || 0)} controls={false} placeholder="请输入数量" /></label><div className="amount-total">交易额 <span>{total.toFixed(2)} USDT</span></div><Button className="submit-order" type="primary" danger={side === '卖出'} onClick={submitOrder}>{side} BTC</Button></section>
      </div>
      <section className="orders-card"><div className="section-title">当前委托 <small>{orders.length} 条</small></div>{orders.length ? <Table size="small" rowKey="key" columns={orderColumns} dataSource={orders} pagination={false} /> : <div className="empty-orders">暂无当前委托<br /><small>提交限价单后会显示在这里</small></div>}</section>
    </div>
  )
}

export default SpotTrade
