import React, { useEffect, useState } from 'react'
import { Button, Col, Row, message } from 'antd'
import { otcMerchantsApi } from '@/api'

const OtcListReal: React.FC<{ side: 'buy' | 'sell' }> = ({ side }) => {
  const [data, setData] = useState<any[]>([])
  const [messageApi, contextHolder] = message.useMessage()
  useEffect(() => {
    otcMerchantsApi({ side }).then((res: any) => {
      if (res?.code === 200) setData(res.data || [])
      else messageApi.error(res?.msg || '商家列表加载失败')
    }).catch(() => messageApi.error('商家列表加载失败'))
  }, [side])
  return <div>{contextHolder}<Row className="titleRow"><Col span={8}>商家</Col><Col span={4}>单价</Col><Col span={6}>数量/限额</Col><Col span={3}>支付方式</Col><Col span={3}>操作</Col></Row>{data.map((item) => <Row key={item.id} className="dataRow"><Col span={8}><p className="nameP">{item.name}</p><p>{item.orderCount}单 · {item.completionRate}%成交率 · {item.responseTime}</p></Col><Col span={4}><p className="nameP">{item.unitPrice} CNY</p></Col><Col span={6}><p>{item.availableAmount}</p><p>{item.minLimit} - {item.maxLimit} CNY</p></Col><Col span={3}>{item.paymentMethod}</Col><Col span={3}><Button type="primary" onClick={() => messageApi.info('请先通过快捷交易创建订单')}>{side === 'buy' ? '购买' : '出售'}</Button></Col></Row>)}{!data.length && <div className="empty-orders">暂无可用商家</div>}</div>
}

export default OtcListReal
