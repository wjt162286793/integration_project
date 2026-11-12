import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, InputNumber, Table, Tag, message } from 'antd'
import { StarFilled, StarOutlined } from '@ant-design/icons'
import { createChart, CandlestickSeries, HistogramSeries } from 'lightweight-charts'
import { cancelSpotOrderApi, createSpotOrderApi, marketKlineApi, marketOverviewApi, orderBookApi, spotOrdersApi } from '@/api'
import './index.less'

type Order = { id: string; side: 'buy' | 'sell'; price: number; amount: number; status: string }
type Market = { symbol: string; price: number; changePct: number }

const SpotChart: React.FC<{ symbol?: string }> = ({ symbol }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [hasData, setHasData] = useState(false)
  useEffect(() => {
    if (!symbol || !ref.current) return
    let chart: ReturnType<typeof createChart> | null = null
    let disposed = false
    marketKlineApi({ symbol, interval: '15m', limit: 500 }).then((res: any) => {
      if (disposed || res?.code !== 200 || !res.data?.length || !ref.current) return
      setHasData(true)
      chart = createChart(ref.current, {
        width: ref.current.clientWidth,
        height: 320,
        layout: { textColor: '#687386', background: { type: 'solid', color: '#fff' } },
        grid: { vertLines: { color: '#edf1f7' }, horzLines: { color: '#edf1f7' } },
        rightPriceScale: { borderColor: '#edf1f7' },
        timeScale: { borderColor: '#edf1f7' }
      })
      const candles = chart.addSeries(CandlestickSeries, {
        upColor: '#0baf70', downColor: '#e33e54', borderVisible: false,
        wickUpColor: '#0baf70', wickDownColor: '#e33e54'
      })
      const volume = chart.addSeries(HistogramSeries, { priceFormat: { type: 'volume' }, priceScaleId: '' })
      candles.setData(res.data)
      volume.setData(res.data.map((item: any) => ({
        time: item.time, value: item.volume,
        color: item.close >= item.open ? 'rgba(11,175,112,.45)' : 'rgba(227,62,84,.45)'
      })))
      chart.timeScale().fitContent()
    })
    return () => {
      disposed = true
      chart?.remove()
    }
  }, [symbol])
  return <div className="spot-chart">{!hasData && <div className="chart-empty">暂无价格走势数据</div>}<div ref={ref} className="spot-chart-canvas" /></div>
}

const SpotTrade: React.FC = () => {
  const [markets, setMarkets] = useState<Market[]>([])
  const [selected, setSelected] = useState<Market | null>(null)
  const [side, setSide] = useState<'buy' | 'sell'>('buy')
  const [price, setPrice] = useState(0)
  const [amount, setAmount] = useState(0)
  const [orders, setOrders] = useState<Order[]>([])
  const [book, setBook] = useState<{ asks: { price: number; amount: number }[]; bids: { price: number; amount: number }[] }>({ asks: [], bids: [] })
  const [favorite, setFavorite] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const total = useMemo(() => price * amount, [price, amount])

  const selectMarket = (market: Market) => {
    setSelected(market)
    setPrice(market.price)
  }
  const loadOrders = () => spotOrdersApi({ status: 'open' }).then((res: any) => {
    if (res?.code === 200) setOrders(res.data || [])
  })
  useEffect(() => {
    marketOverviewApi().then((res: any) => {
      if (res?.code === 200) {
        const next = res.data || []
        setMarkets(next)
        if (next[0]) selectMarket(next[0])
      }
    })
  }, [])
  useEffect(() => {
    if (!selected) return
    const loadBook = () => orderBookApi({ symbol: selected.symbol }).then((res: any) => {
      if (res?.code === 200) setBook(res.data)
    })
    loadBook()
    const timer = window.setInterval(loadBook, 1200)
    loadOrders()
    return () => window.clearInterval(timer)
  }, [selected])
  const submitOrder = () => {
    if (!selected || !amount || amount <= 0 || !price || price <= 0) {
      messageApi.warning('请输入下单数量')
      return
    }
    createSpotOrderApi({ symbol: selected.symbol, side, orderType: 'limit', price, amount }).then((res: any) => {
      if (res?.code !== 200) return messageApi.error(res?.msg || '下单失败')
      setAmount(0)
      loadOrders()
      messageApi.success(`${side === 'buy' ? '买入' : '卖出'}委托已提交`)
    }).catch(() => messageApi.error('下单失败'))
  }

  const orderColumns = [
    { title: '方向', dataIndex: 'side', render: (value: string) => <span className={value === 'buy' ? 'buy-text' : 'sell-text'}>{value === 'buy' ? '买入' : '卖出'}</span> },
    { title: '价格', dataIndex: 'price', render: (value: number) => value.toLocaleString() },
    { title: '数量', dataIndex: 'amount' },
    { title: '状态', dataIndex: 'status', render: (value: string) => <Tag color="blue">{value === 'open' ? '挂单中' : value}</Tag> },
    { title: '操作', render: (_: unknown, row: Order) => <Button type="link" onClick={() => cancelSpotOrderApi(row.id).then(() => loadOrders())}>撤单</Button> },
  ]

  return (
    <div className="spot-page">
      {contextHolder}
      <div className="spot-topbar">
        <div className="pair-title"><button className="favorite" onClick={() => setFavorite(!favorite)}>{favorite ? <StarFilled /> : <StarOutlined />}</button><div><h2>{selected?.symbol || '--'}</h2><span>现货交易</span></div></div>
        <div className="ticker"><strong className="buy-text">{selected?.price?.toLocaleString() || '--'}</strong><span>≈ ${selected?.price?.toLocaleString() || '--'} </span><b className={(selected?.changePct || 0) >= 0 ? 'buy-text' : 'sell-text'}>{selected ? `${selected.changePct >= 0 ? '+' : ''}${selected.changePct}%` : '--'}</b></div>
        <div className="market-switch">{markets.map((market) => <button className={market.symbol === selected?.symbol ? 'selected' : ''} key={market.symbol} onClick={() => selectMarket(market)}>{market.symbol}</button>)}</div>
      </div>
      <div className="spot-grid">
        <section className="chart-card"><div className="chart-head"><span>价格走势</span><span>15分钟 K 线</span></div><SpotChart symbol={selected?.symbol} /></section>
        <section className="orderbook-card"><div className="section-title">订单簿 <small>深度</small></div><div className="book-head"><span>价格(USDT)</span><span>数量</span></div><div className="book-rows">{book.asks.slice().reverse().map((row) => <div key={`a-${row.price}`}><span className="sell-text">{row.price.toLocaleString()}</span><span>{row.amount}</span></div>)}<div className="mid-price">{selected?.price?.toLocaleString() || '--'}</div>{book.bids.map((row) => <div key={`b-${row.price}`}><span className="buy-text">{row.price.toLocaleString()}</span><span>{row.amount}</span></div>)}</div></section>
        <section className="form-card"><div className="section-title">下单 <small>余额由后端返回</small></div><div className="side-tabs"><button className={side === 'buy' ? 'active-buy' : ''} onClick={() => setSide('buy')}>买入</button><button className={side === 'sell' ? 'active-sell' : ''} onClick={() => setSide('sell')}>卖出</button></div><label>价格 (USDT)<InputNumber value={price} onChange={(value) => setPrice(value || 0)} controls={false} /></label><label>数量<InputNumber value={amount || null} onChange={(value) => setAmount(value || 0)} controls={false} placeholder="请输入数量" /></label><div className="amount-total">交易额 <span>{total.toFixed(2)} USDT</span></div><Button className="submit-order" type="primary" danger={side === 'sell'} onClick={submitOrder}>{side === 'buy' ? '买入' : '卖出'} {selected?.symbol.replace('USDT', '') || ''}</Button></section>
      </div>
      <section className="orders-card"><div className="section-title">当前委托 <small>{orders.length} 条</small></div>{orders.length ? <Table size="small" rowKey="id" columns={orderColumns} dataSource={orders} pagination={false} /> : <div className="empty-orders">暂无当前委托<br /><small>提交限价单后会显示在这里</small></div>}</section>
    </div>
  )
}

export default SpotTrade
