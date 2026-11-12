import React, { useEffect, useState } from 'react'
import { Input, Row, Col, Tabs } from 'antd'
import { marketOverviewApi } from '@/api'

const BazaarComReal: React.FC = () => {
  const [search, setSearch] = useState('')
  const [activeKey, setActiveKey] = useState('1')
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    marketOverviewApi().then((res: any) => {
      if (res?.code === 200) setData(res.data || [])
    })
  }, [])
  const source = data.filter((item) => ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'DOGEUSDT'].includes(item.symbol))
  const virtualData = Array.from({ length: 100 }, (_, index) => {
    const item = source[index % Math.max(source.length, 1)]
    return item ? {
      ...item,
      virtualIndex: index,
      price: Number((item.price * (1 + ((index % 9) - 4) * 0.0002)).toFixed(item.price < 1 ? 6 : 2)),
      changePct: Number((item.changePct + ((index % 7) - 3) * 0.03).toFixed(4))
    } : null
  }).filter(Boolean) as any[]
  const visible = virtualData.filter((item) => item.symbol.toLowerCase().includes(search.toLowerCase()))
  const items = [{ key: '1', label: '市场' }, { key: '2', label: '市场异动' }]
  return <div className="bazaarComDom"><Tabs activeKey={activeKey} items={items} onChange={setActiveKey} className="dark-theme-tabs" /><div className="searchDom"><Input placeholder="搜索币对" value={search} onChange={(event) => setSearch(event.target.value)} /><div className="listDom1"><Row className="titleRow"><Col span={10}>名称/24小时量</Col><Col span={7} className="rightItem">最新价</Col><Col span={7} className="rightItem">涨跌幅</Col></Row>{visible.map((item) => <Row key={`${item.symbol}-${item.virtualIndex}`} className="dataRow"><Col span={10}><p>{item.symbol} <span style={{ color: '#b3611b' }}>10x</span></p><p style={{ color: '#888' }}>{item.volume ?? '--'}</p></Col><Col span={7} className="rightItem">{item.price}</Col><Col span={7} className="rightItem" style={{ color: item.changePct >= 0 ? '#4fb850' : '#d93a2c' }}>{item.changePct >= 0 ? '+' : ''}{item.changePct}%</Col></Row>)}{!visible.length && <div className="empty-orders">暂无市场数据</div>}</div></div></div>
}

export default BazaarComReal
