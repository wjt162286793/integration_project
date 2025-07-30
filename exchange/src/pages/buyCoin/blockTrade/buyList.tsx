import React from 'react'
import { Row, Col,Button,message } from 'antd'

const butListData = [
    {
        merchant: {
            name: '帝国联盟',
            formNum: 5000,
            successNum: '99.99',
            time: '22s'
        },
        alonePrice: '7.15',
        number: '10003.4',
        scope: {
            min: '1000000',
            max: '4922345.10'
        },
        payMethod: '支付宝'
    },
    {
        merchant: {
            name: '太平证券',
            formNum: 4020,
            successNum: '90.5',
            time: '12s'
        },
        alonePrice: '7.12',
        number: '11003.4',
        scope: {
            min: '800000',
            max: '4922345.12'
        },
        payMethod: '银行卡'
    },
    {
        merchant: {
            name: '长城银行',
            formNum: 320,
            successNum: '94.1',
            time: '1m30s'
        },
        alonePrice: '7.11',
        number: '11303.4',
        scope: {
            min: '1000000',
            max: '2922345.45'
        },
        payMethod: '银行卡'
    }
]
const Index: React.FC = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const buyHandler = ()=>{
      messageApi.info('功能建设中');
    }

    return (
        <div>
            {
                contextHolder
            }
            <Row className='titleRow'>
                <Col span={8}>商家</Col>
                <Col span={4}>单价</Col>
                <Col span={6}>数量/限额</Col>
                <Col span={3}>支付方式</Col>
                <Col span={3}>购买/出售</Col>
            </Row>
            {
                butListData.map((Item, Index) => {
                    return (
                        <Row key={Index} className='dataRow'>
                            <Col span={8}>
                                <p className='nameP'>
                                    {Item.merchant.name}
                                </p>
                                <p>
                                    {Item.merchant.formNum}单 . {Item.merchant.successNum}%成交率 . {Item.merchant.time}
                                </p>

                            </Col>
                            <Col span={4} >
                                <p className='nameP'>
                                    {Item.alonePrice} CNY
                                </p>

                            </Col>
                            <Col span={6}>
                            <p>{Item.number}</p>
                            <p>{Item.scope.min} - {Item.scope.max} CNY</p>
                            </Col>
                            <Col span={3}>{Item.payMethod}</Col>
                            <Col span={3}>
                            <Button type="primary" style={{background:'#31bd65'}} onClick={buyHandler}>购买</Button>
                            </Col>
                        </Row>
                    )
                })
            }

        </div>
    )
}

export default Index;