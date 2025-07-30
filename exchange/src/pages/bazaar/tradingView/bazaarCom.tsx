import React, { useState } from 'react'

import { Tabs, Input, Row, Col } from 'antd';
import type { TabsProps } from 'antd';


const data1 = [
    { name: 'BTC/USDT', scale: '2498.55亿 BTT', newPrice: '0.007978', range: '+1.93%' },
    { name: 'ETH/USDT', scale: '1287.32亿 BTT', newPrice: '0.000523', range: '-0.45%' },
    { name: 'SOL/USDT', scale: '876.21亿 BTT', newPrice: '0.002345', range: '+3.78%' },
    { name: 'ADA/USDT', scale: '654.89亿 BTT', newPrice: '0.000123', range: '+0.89%' },
    { name: 'DOT/USDT', scale: '543.21亿 BTT', newPrice: '0.000876', range: '-2.34%' },
    { name: 'DOGE/USDT', scale: '432.98亿 BTT', newPrice: '0.000001', range: '+5.67%' },
    { name: 'AVAX/USDT', scale: '321.76亿 BTT', newPrice: '0.001234', range: '-1.23%' },
    { name: 'LINK/USDT', scale: '210.54亿 BTT', newPrice: '0.000987', range: '+2.45%' },
    { name: 'LTC/USDT', scale: '198.32亿 BTT', newPrice: '0.000654', range: '-0.78%' },
    { name: 'UNI/USDT', scale: '187.65亿 BTT', newPrice: '0.000432', range: '+1.56%' },
    { name: 'AAVE/USDT', scale: '176.54亿 BTT', newPrice: '0.003210', range: '+4.32%' },
    { name: 'XMR/USDT', scale: '165.43亿 BTT', newPrice: '0.000876', range: '-3.12%' },
    { name: 'BCH/USDT', scale: '154.32亿 BTT', newPrice: '0.000543', range: '+0.98%' },
    { name: 'ALGO/USDT', scale: '143.21亿 BTT', newPrice: '0.000210', range: '-1.45%' },
    { name: 'ATOM/USDT', scale: '132.10亿 BTT', newPrice: '0.000987', range: '+2.78%' },
    { name: 'ICP/USDT', scale: '121.09亿 BTT', newPrice: '0.001357', range: '-0.32%' },
    { name: 'FIL/USDT', scale: '110.98亿 BTT', newPrice: '0.000654', range: '+1.21%' },
    { name: 'TRX/USDT', scale: '99.87亿 BTT', newPrice: '0.000002', range: '+6.78%' },
    { name: 'XLM/USDT', scale: '88.76亿 BTT', newPrice: '0.000043', range: '-2.56%' },
    { name: 'ETC/USDT', scale: '77.65亿 BTT', newPrice: '0.000321', range: '+0.54%' }
];

const data2 = [
    {
      name: 'BTC/USDT',
      time: '2023-08-01 12:00:00',
      log: '5分钟跌幅',
      range: '-2.11%'
    }, {
      name: 'ETH/USDT',
      time: '2023-08-01 12:05:00',
      log: '10分钟涨幅',
      range: '+1.53%'
    }, {
      name: 'BNB/USDT',
      time: '2023-08-01 12:10:00',
      log: '15分钟跌幅',
      range: '-0.87%'
    }, {
      name: 'SOL/USDT',
      time: '2023-08-01 12:15:00',
      log: '30分钟涨幅',
      range: '+3.22%'
    }, {
      name: 'ADA/USDT',
      time: '2023-08-01 12:20:00',
      log: '1小时跌幅',
      range: '-1.45%'
    }, {
      name: 'XRP/USDT',
      time: '2023-08-01 12:25:00',
      log: '24小时涨幅',
      range: '+5.67%'
    }, {
      name: 'DOT/USDT',
      time: '2023-08-01 12:30:00',
      log: '5分钟涨幅',
      range: '+0.33%'
    }, {
      name: 'DOGE/USDT',
      time: '2023-08-01 12:35:00',
      log: '10分钟跌幅',
      range: '-0.92%'
    }, {
      name: 'AVAX/USDT',
      time: '2023-08-01 12:40:00',
      log: '15分钟涨幅',
      range: '+2.15%'
    }, {
      name: 'MATIC/USDT',
      time: '2023-08-01 12:45:00',
      log: '30分钟跌幅',
      range: '-1.78%'
    }, {
      name: 'LTC/USDT',
      time: '2023-08-01 12:50:00',
      log: '1小时涨幅',
      range: '+0.65%'
    }, {
      name: 'LINK/USDT',
      time: '2023-08-01 12:55:00',
      log: '24小时跌幅',
      range: '-3.21%'
    }, {
      name: 'BCH/USDT',
      time: '2023-08-01 13:00:00',
      log: '5分钟涨幅',
      range: '+0.77%'
    }, {
      name: 'ALGO/USDT',
      time: '2023-08-01 13:05:00',
      log: '10分钟涨幅',
      range: '+1.22%'
    }, {
      name: 'TRX/USDT',
      time: '2023-08-01 13:10:00',
      log: '15分钟跌幅',
      range: '-0.45%'
    }, {
      name: 'XLM/USDT',
      time: '2023-08-01 13:15:00',
      log: '30分钟涨幅',
      range: '+0.89%'
    }, {
      name: 'ATOM/USDT',
      time: '2023-08-01 13:20:00',
      log: '1小时跌幅',
      range: '-1.12%'
    }, {
      name: 'VET/USDT',
      time: '2023-08-01 13:25:00',
      log: '24小时涨幅',
      range: '+4.33%'
    }, {
      name: 'FIL/USDT',
      time: '2023-08-01 13:30:00',
      log: '5分钟跌幅',
      range: '-0.67%'
    }, {
      name: 'UNI/USDT',
      time: '2023-08-01 13:35:00',
      log: '10分钟涨幅',
      range: '+1.89%'
    }
];

const Index: React.FC = () => {

    const [activeKey, setActiveKey] = useState('1');
    const onChange = (key: string) => {
        console.log(key);
        setActiveKey(key)
    };




    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '市场',
        },
        {
            key: '2',
            label: '市场异动',
        },
    ];

    return (
        <div className='bazaarComDom'>
            <Tabs activeKey={activeKey} items={items} onChange={onChange} className="dark-theme-tabs" />
            
                {
                    activeKey === '1' && (
                        
                        <div className='searchDom'>
                            <Input placeholder="搜索币对" />
                            <div className='listDom1'>
                                <Row className='titleRow'>
                                    <Col span={10}>
                                        名称/24小时量
                                    </Col>
                                    <Col span={7} className='rightItem'>
                                        最新价
                                    </Col>
                                    <Col span={7} className='rightItem'>
                                        涨跌幅
                                    </Col>
                                </Row>
                                {
                                    data1.map((item) => (
                                        <Row key={item.name} className='dataRow'>
                                            <Col span={10}>
                                                <p>{item.name} <span style={{ color: '#b3611b' }}>10x</span></p>
                                                <p style={{color:'#888'}}>{item.scale}</p>
                                            </Col>
                                            <Col span={7} className='rightItem'>
                                                {item.newPrice}
                                            </Col>
                                            <Col span={7} className='rightItem' style={ item.range.includes('-') ? {color:'#d93a2c'} : {color:'#4fb850'}}>
                                                {item.range}
                                            </Col>
                                        </Row>
                                    ))
                                }

                            </div>
                        </div>
                  

                    )
                }
                {
                    activeKey === '2' && (
                        <div className='searchDom'>
                       <div className='listDom2'>
                                {
                                    data2.map((item) => (
                                        <Row key={item.name} className='dataRow'>
                                            <Col span={10}>
                                                <p>{item.name}</p>
                                                <p style={{color:'#888'}}>{item.time}</p>
                                            </Col>
                                            <Col span={7} className='rightItem' style={ item.range.includes('-') ? {color:'#d93a2c'} : {color:'#4fb850'}}>
                                                {item.log}
                                            </Col>
                                            <Col span={7} className='rightItem' style={ item.range.includes('-') ? {color:'#d93a2c'} : {color:'#4fb850'}}>
                                                {item.range}
                                            </Col>
                                        </Row>
                                    ))
                                }
                       </div>
                       </div>
                    )
                }

            </div>
       
    )
}

export default Index