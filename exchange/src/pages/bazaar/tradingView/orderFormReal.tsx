import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import { orderBookApi } from '@/api'

const OrderFormReal: React.FC = () => {
  const [data, setData] = useState<{ asks: { price: number; amount: number }[]; bids: { price: number; amount: number }[] }>({ asks: [], bids: [] })
  useEffect(() => {
    const load = () => orderBookApi({ symbol: 'BTCUSDT' }).then((res: any) => {
      if (res?.code === 200) setData(res.data)
    })
    load()
    const timer = window.setInterval(load, 1200)
    return () => window.clearInterval(timer)
  }, [])
  const rows = [...data.asks.slice().reverse(), ...data.bids]
  const maxTotal = Math.max(...rows.map((row) => row.amount), 1)
  return <div className="orderFormDom"><div className="title">订单表</div><div className="content"><Row className="titleRow"><Col span={10}>价格(USDT)</Col><Col span={7} className="rightItem">数量(BTC)</Col><Col span={7} className="rightItem">合计(BTC)</Col></Row>{rows.map((item, index) => {
    const total = rows.slice(0, index + 1).reduce((sum, row) => sum + row.amount, 0)
    const ratio = Math.min(96, Math.max(10, (item.amount / maxTotal) * 86))
    const isAsk = index < data.asks.length
    return <Row key={`${item.price}-${index}`} className="orderdataRow" style={{ position: 'relative', overflow: 'hidden', backgroundColor: isAsk ? '#351b20' : '#0d3c1d' }}>
      <div style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: `${ratio}%`, backgroundColor: '#000', transition: 'width .5s ease' }} />
      <Col span={10} style={{ position: 'relative', zIndex: 1 }}><p className={isAsk ? 'sell-text' : 'buy-text'}>{item.price.toLocaleString()}</p></Col>
      <Col span={7} className="rightItem" style={{ position: 'relative', zIndex: 1 }}>{item.amount.toFixed(5)}</Col>
      <Col span={7} className="rightItem" style={{ position: 'relative', zIndex: 1 }}>{total.toFixed(5)}</Col>
    </Row>
  })}{!rows.length && <div className="empty-orders">暂无订单簿数据</div>}</div></div>
}

export default OrderFormReal
