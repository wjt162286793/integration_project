import React from 'react'
import './index.less'
import { Row, Col, Button } from 'antd'

import BTCImg from '@/assets/img/BTC.png'
import ETHImg from '@/assets/img/ETH.png'
import DOGEImg from '@/assets/img/DOGE.png'
import USDTImg from '@/assets/img/USDT.png'
import SOLImg from '@/assets/img/SOL.png'


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


    const startWithFn = (str: string) => {
        return str.startsWith('-')
    }

    return (<div className='currencyDom'>
        <h5>
            今日行情
        </h5>
        <p className='tips'>
            查看欧易支持的数百种数字货币的最新价格、每日涨跌幅、市值等实时数据。
        </p>
        <div className='listDom'>
            <Row className='titleRow'>
                <Col span={12}>名称</Col>
                <Col span={3}>最新价</Col>
                <Col span={3}>涨跌幅</Col>
                <Col span={3}>市值</Col>
                <Col span={3}>操作</Col>
            </Row>
            {
                list.map(Item => {
                    return (
                        <Row className='dataRow' key={Item.name.value}>
                            <Col span={12} className='nameCol'>
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
                                <Button type="text">交易</Button>
                                <Button type="text">闪兑</Button>
                            </Col>
                        </Row>
                    )
                })
            }

        </div>
    </div>)
}

export default Index