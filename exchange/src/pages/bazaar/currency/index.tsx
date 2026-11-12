import React, { useEffect, useMemo, useState } from 'react'
import './index.less'
import { Row, Col, Button, Input, Segmented, message } from 'antd'
import { StarFilled, StarOutlined } from '@ant-design/icons'

import BTCImg from '@/assets/img/BTC.png'
import ETHImg from '@/assets/img/ETH.png'
import DOGEImg from '@/assets/img/DOGE.png'
import USDTImg from '@/assets/img/USDT.png'
import SOLImg from '@/assets/img/SOL.png'

import {useNavigate} from 'react-router-dom'
import { marketOverviewApi } from '@/api'

const imageMap: Record<string, string> = { BTC: BTCImg, ETH: ETHImg, SOL: SOLImg, USDT: USDTImg, DOGE: DOGEImg }
const labelMap: Record<string, string> = { BTC: '比特币', ETH: '以太坊', SOL: 'Solana', USDT: 'Tether', DOGE: 'Dogecoin' }
const supportedAssets = new Set(Object.keys(imageMap))

const Index: React.FC = () => {
    const navigate = useNavigate()
    const [filter, setFilter] = useState<'全部' | '自选'>('全部')
    const [search, setSearch] = useState('')
    const [favorites, setFavorites] = useState<string[]>(['BTC', 'ETH'])
    const [list, setList] = useState<any[]>([])
    const [messageApi, contextHolder] = message.useMessage();
    const startWithFn = (str: string) => {
        return str.startsWith('-')
    }

    const toTradingView = (name:string)=>{
       navigate(`/home/bazaar/tradingView?type=${name}`)
    }

    const visibleList = useMemo(() => list.filter((item) => {
      const matchesSearch = `${item.name.label}${item.name.value}`.toLowerCase().includes(search.toLowerCase())
      return matchesSearch && (filter === '全部' || favorites.includes(item.name.value))
    }), [favorites, filter, search, list])

    const toggleFavorite = (symbol: string) => {
      setFavorites((current) => current.includes(symbol) ? current.filter((item) => item !== symbol) : [...current, symbol])
    }

    useEffect(() => {
      marketOverviewApi().then((res: any) => {
        if (res?.code === 200) {
          setList((res.data || []).filter((item: any) => supportedAssets.has(String(item.symbol).replace('USDT', ''))).map((item: any) => {
            const asset = String(item.symbol).replace('USDT', '')
            return {
              name: { label: labelMap[asset] || asset, value: asset, img: imageMap[asset] },
              newPrice: item.price,
              range: `${item.changePct >= 0 ? '+' : ''}${item.changePct}%`,
              marketValue: item.marketValue
            }
          }))
        } else {
          messageApi.error(res?.msg || '市场行情加载失败')
        }
      }).catch(() => messageApi.error('市场行情加载失败'))
    }, [messageApi])

    return (<div className='currencyDom'>
        {contextHolder}
        <div className="market-heading">
          <div><h5>市场行情</h5><p className="tips">追踪热门资产价格、涨跌幅与市值，快速进入交易。</p></div>
          <div className="market-tools"><Segmented value={filter} onChange={(value) => setFilter(value as '全部' | '自选')} options={['全部', '自选']} /><Input allowClear prefix="⌕" placeholder="搜索币种" value={search} onChange={(event) => setSearch(event.target.value)} /></div>
        </div>
        <div className='listDom'>
            <Row className='titleRow'>
                <Col span={12}>名称</Col>
                <Col span={3}>最新价</Col>
                <Col span={3}>涨跌幅</Col>
                <Col span={3}>市值</Col>
                <Col span={3}>操作</Col>
            </Row>
            {
                visibleList.map(Item => {
                    return (
                        <Row className='dataRow' key={Item.name.value}>
                            <Col span={12} className='nameCol'>
                                <Button type="text" className="favorite-btn" onClick={() => toggleFavorite(Item.name.value)}>{favorites.includes(Item.name.value) ? <StarFilled /> : <StarOutlined />}</Button>
                                <img src={Item.name.img} />
                                <div>
                                    <p className='labelP'>{Item.name.label}</p>
                                    <p className='nameP'>{Item.name.value}</p>
                                </div>
                            </Col>
                            <Col span={3}>
                                <span className='textSpan'>${Item.newPrice}</span>

                            </Col>
                            <Col span={3}>
                                <span className='textSpan' style={startWithFn(Item.range) === true ? { color: '#ec0a2b' } : { color: '#10d269' }}>{Item.range}</span>

                            </Col>
                            <Col span={3}>
                                <span className='textSpan'>{Item.marketValue ?? '--'}</span>

                            </Col>
                            <Col span={3} className="action-col">
                                <Button type="text" onClick={()=>toTradingView(Item.name.value)}>交易</Button>
                                <Button type="text" onClick={() => messageApi.success(`已设置 ${Item.name.value} 价格提醒`)}>提醒</Button>
                            </Col>
                        </Row>
                    )
                })
            }

        </div>
        {!visibleList.length && <div className="market-empty">没有找到匹配的资产</div>}
    </div>)
}

export default Index
