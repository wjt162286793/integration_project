import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col } from 'antd';
import VirtualList from '@/component/VirtualList';


const Index: React.FC = () => {

    const data = useMemo(() => {
        const base = [
            { price: '118,77.4', num: '0.56401', all: '1.79615' },
            { price: '23,456.7', num: '0.32154', all: '2.89012' },
            { price: '56,789.2', num: '0.87623', all: '3.45678' },
            { price: '90,123.5', num: '0.45678', all: '4.12345' },
            { price: '45,678.9', num: '0.98765', all: '5.67890' }
        ]
        const list: Array<{ price: string; num: string; all: string; key: number }> = []
        for (let i = 0; i < 5000; i += 1) {
            const b = base[i % base.length]
            list.push({ ...b, key: i + 1 })
        }
        return list
    }, [])

    const [tick, setTick] = useState(0)

useEffect(() => {
        const task = setInterval(() => {
            setTick((v) => v + 1)
        }, 1000)
        return () => clearInterval(task)
    }, [])

    const getRatio = (index: number) => {
        return (index * 9301 + tick * 49297) % 101
    }

    return (
        <div className='orderFormDom'>
            <div className='title'>订单表</div>
            <div className='content'>
                <Row className='titleRow'>
                    <Col span={10}>
                        价格(USDT)
                    </Col>
                    <Col span={7} className='rightItem'>
                        数量(BTC)
                    </Col>
                    <Col span={7} className='rightItem'>
                        合计(BTC)
                    </Col>
                </Row>
                <VirtualList
                    items={data}
                    itemHeight={32}
                    style={{ flex: 1 }}
                    getKey={(item) => item.key}
                    renderItem={(item, index) => {
                        const ratio = getRatio(index)
                        return (
                            <Row className='orderdataRow' style={{
                                position: 'relative',
                                overflow: 'hidden',
                                backgroundColor: '#0d3c1d'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    height: '100%',
                                    width: `${ratio}%`,
                                    backgroundColor: 'black',
                                    transition: 'width 0.5s ease'
                                }}></div>
                                <Col span={10} style={{ position: 'relative', zIndex: 1 }}>
                                    <p>{item.price}</p>
                                </Col>
                                <Col span={7} className='rightItem'>
                                    {item.num}
                                </Col>
                                <Col span={7} className='rightItem'>
                                    {item.all}
                                </Col>
                            </Row>
                        )
                    }}
                />
            </div>

        </div>
    )
}

export default Index
