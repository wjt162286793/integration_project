import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { marketOverviewApi } from '@/api'
import './index.less'

const TradingDataReal: React.FC = () => {
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    marketOverviewApi().then((res: any) => {
      if (res?.code === 200) setData(res.data || [])
    })
  }, [])
  return <div className="tradingDom"><div className="trading-data-panel"><h3>交易数据</h3><Table rowKey="symbol" dataSource={data.filter((item) => ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'DOGEUSDT'].includes(item.symbol))} pagination={false} columns={[
    { title: '交易对', dataIndex: 'symbol' },
    { title: '最新价', dataIndex: 'price' },
    { title: '涨跌幅', dataIndex: 'changePct', render: (value: number) => `${value >= 0 ? '+' : ''}${value}%` },
    { title: '成交量', dataIndex: 'volume' },
  ]} /></div></div>
}

export default TradingDataReal
