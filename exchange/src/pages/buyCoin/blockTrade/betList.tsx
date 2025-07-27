import React from 'react'
import { Row, Col, Button,message } from 'antd'

const butListData = [
    {
        merchant: {
            name: '火星资本',
            formNum: 5000,
            successNum: '99.39',
            time: '22s'
        },
        alonePrice: '7.43',
        number: '10003.4',
        scope: {
            min: '1000000',
            max: '4922345.10'
        },
        payMethod: '支付宝',
        doneType: 'buy'
    },
    {
        merchant: {
            name: '银河战舰',
            formNum: 59000,
            successNum: '95.29',
            time: '22s'
        },
        alonePrice: '7.42',
        number: '100430.4',
        scope: {
            min: '1000000',
            max: '5600000.10'
        },
        payMethod: '银行卡',
        doneType: 'sell'
    },
    {
        merchant: {
            name: '西欧证券联盟',
            formNum: 67000,
            successNum: '99.99',
            time: '22s'
        },
        alonePrice: '7.50',
        number: '100430.4',
        scope: {
            min: '10000000',
            max: '28000000.10'
        },
        payMethod: '银行卡',
        doneType: 'sell'
    },
]
const Index: React.FC = () => {

    const [messageApi, contextHolder] = message.useMessage();

    const sellHandler = () => {
        messageApi.info('功能建设中');
    }
    const buyHandler = () => {
        messageApi.info('功能建设中');
    }
    return (
        <div>
            {
                contextHolder
            }
            <Row className='titleRow'>
                <Col span={3}>单价</Col>
                <Col span={3}>剩余数量</Col>
                <Col span={6}>限额</Col>
                <Col span={6}>商家</Col>
                <Col span={3}>支付方式</Col>
                <Col span={3}>购买/出售</Col>
            </Row>
            {
                butListData.map((Item, Index) => {
                    return (
                        <Row key={Index} className='dataRow'>
                            <Col span={3}>
                                <p className='globalPriceP'>
                                    {Item.alonePrice} CNY
                                </p>
                            </Col>
                            <Col span={3} >
                                <p >
                                    {Item.number} USDT
                                </p>

                            </Col>
                            <Col span={6}>
                                <p>{Item.scope.min} - {Item.scope.max} CNY</p>
                            </Col>
                            <Col span={6}>
                            {Item.merchant.name}({Item.merchant.formNum}单/{Item.merchant.successNum})
                            </Col>
                            <Col span={3}>
                                <p>{Item.payMethod}</p>
                            </Col>
                            <Col span={3}>
                            {
                                Item.doneType === 'buy'?
                                <Button type="primary" style={{ background: '#ef6f8a' }} onClick={sellHandler}>出售</Button>
                                :
                                <Button type="primary" style={{ background: '#31bd65' }} onClick={buyHandler}>购买</Button>
                            }
                                
                            </Col>
                        </Row>
                    )
                })
            }

        </div>
    )
}

export default Index;