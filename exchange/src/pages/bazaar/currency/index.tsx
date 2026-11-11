import React, { useMemo, useState } from 'react'
import './index.less'
import { Row, Col, Button, Input, Segmented, message } from 'antd'
import { BellOutlined, StarFilled, StarOutlined } from '@ant-design/icons'

import BTCImg from '@/assets/img/BTC.png'
import ETHImg from '@/assets/img/ETH.png'
import DOGEImg from '@/assets/img/DOGE.png'
import USDTImg from '@/assets/img/USDT.png'
import SOLImg from '@/assets/img/SOL.png'

import {useNavigate} from 'react-router-dom'

const list = [
    {
        name: {
            label: '比特币',
            value: 'BTC',
            img: BTCImg
        },
        newPrice: '117548.5',
        range: '-1.2%',
        marketValue: '2.34万亿'
    },
    {
        name: {
            label: '以太坊',
            value: 'ETH',
            img: ETHImg
        },
        newPrice: '3540.45',
        range: '-2.3%',
        marketValue: '4310.82亿'
    },
    {
        name: {
            label: 'SOL',
            value: 'SOL',
            img: SOLImg
        },
        newPrice: '180.43',
        range: '-4.1%',
        marketValue: '984.6亿'
    },
    {
        name: {
            label: 'USDT',
            value: 'USDT',
            img: USDTImg
        },
        newPrice: '1.004',
        range: '+0.1%',
        marketValue: '1623.1亿'
    },
    {
        name: {
            label: 'DOGE',
            value: 'DOGE',
            img: DOGEImg
        },
        newPrice: '0.22156',
        range: '-7.2%',
        marketValue: '348.12亿'
    }
]
const Index: React.FC = () => {
    const navigate = useNavigate()
    const [filter, setFilter] = useState<'全部' | '自选'>('全部')
    const [search, setSearch] = useState('')
    const [favorites, setFavorites] = useState<string[]>(['BTC', 'ETH'])
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
    }), [favorites, filter, search])

    const toggleFavorite = (symbol: string) => {
      setFavorites((current) => current.includes(symbol) ? current.filter((item) => item !== symbol) : [...current, symbol])
    }

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
                                <span className='textSpan'>{Item.marketValue}</span>

                            </Col>
                            <Col span={3}>
                                <Button type="text" onClick={()=>toTradingView(Item.name.value)}>交易</Button>
                                <Button type="text" icon={<BellOutlined />} onClick={() => messageApi.success(`已设置 ${Item.name.value} 价格提醒`)}>提醒</Button>
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
