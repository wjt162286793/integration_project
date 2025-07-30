import React,{useState,useEffect} from 'react';
import { Row, Col } from 'antd';


const Index: React.FC = () => {

    const [data,setData] = useState(
    [
  { price: '118,77.4', num: '0.56401', all: '1.79615', key: 1, ratio: 30 },
  { price: '23,456.7', num: '0.32154', all: '2.89012', key: 2, ratio: 25 },
  { price: '56,789.2', num: '0.87623', all: '3.45678', key: 3, ratio: 40 },
  { price: '90,123.5', num: '0.45678', all: '4.12345', key: 4, ratio: 15 },
  { price: '45,678.9', num: '0.98765', all: '5.67890', key: 5, ratio: 50 },
  { price: '78,901.3', num: '0.23456', all: '1.23456', key: 6, ratio: 35 },
  { price: '21,345.6', num: '0.76543', all: '2.34567', key: 7, ratio: 20 },
  { price: '65,432.1', num: '0.12345', all: '3.98765', key: 8, ratio: 45 },
  { price: '34,567.8', num: '0.65432', all: '4.56789', key: 9, ratio: 10 },
  { price: '87,654.2', num: '0.54321', all: '5.12345', key: 10, ratio: 55 },
  { price: '12,345.0', num: '0.43210', all: '1.87654', key: 11, ratio: 60 },
  { price: '54,321.9', num: '0.32109', all: '2.43210', key: 12, ratio: 28 },
  { price: '98,765.4', num: '0.21098', all: '3.54321', key: 13, ratio: 93 },
  { price: '23,456.7', num: '0.10987', all: '4.65432', key: 14, ratio: 47 },
  { price: '67,890.1', num: '0.98765', all: '5.76543', key: 15, ratio: 18 },
  { price: '34,567.8', num: '0.87654', all: '1.34567', key: 16, ratio: 52 },
  { price: '78,901.2', num: '0.76543', all: '2.98765', key: 17, ratio: 38 },
  { price: '45,678.9', num: '0.65432', all: '3.12345', key: 18, ratio: 72 },
  { price: '89,012.3', num: '0.54321', all: '4.76543', key: 19, ratio: 42 },
  { price: '56,789.0', num: '0.43210', all: '5.34567', key: 20, ratio: 12 },
  { price: '10,123.4', num: '0.32109', all: '1.98765', key: 21, ratio: 58 },
  { price: '61,234.5', num: '0.21098', all: '2.54321', key: 22, ratio: 31 },
  { price: '21,345.6', num: '0.10987', all: '3.65432', key: 23, ratio: 29 },
  { price: '72,345.6', num: '0.99876', all: '4.23456', key: 24, ratio: 48 },
  { price: '32,456.7', num: '0.88765', all: '5.87654', key: 25, ratio: 74 },
  { price: '83,456.7', num: '0.77654', all: '1.45678', key: 26, ratio: 53 },
  { price: '43,567.8', num: '0.66543', all: '2.12345', key: 27, ratio: 36 },
  { price: '94,567.8', num: '0.55432', all: '3.76543', key: 28, ratio: 84 },
  { price: '54,678.9', num: '0.44321', all: '4.34567', key: 29, ratio: 44 },
  { price: '15,678.9', num: '0.33210', all: '5.98765', key: 30, ratio: 88 },
  { price: '90,123.5', num: '0.45678', all: '4.12345', key: 4, ratio: 15 },
  { price: '45,678.9', num: '0.98765', all: '5.67890', key: 5, ratio: 50 },
  { price: '78,901.3', num: '0.23456', all: '1.23456', key: 6, ratio: 35 },
  { price: '21,345.6', num: '0.76543', all: '2.34567', key: 7, ratio: 20 },
  { price: '65,432.1', num: '0.12345', all: '3.98765', key: 8, ratio: 45 },
  { price: '34,567.8', num: '0.65432', all: '4.56789', key: 9, ratio: 10 },
  { price: '87,654.2', num: '0.54321', all: '5.12345', key: 10, ratio: 55 },
  { price: '12,345.0', num: '0.43210', all: '1.87654', key: 11, ratio: 60 },
  { price: '54,321.9', num: '0.32109', all: '2.43210', key: 12, ratio: 28 },
  { price: '98,765.4', num: '0.21098', all: '3.54321', key: 13, ratio: 93 },
  { price: '23,456.7', num: '0.10987', all: '4.65432', key: 14, ratio: 47 },
  { price: '67,890.1', num: '0.98765', all: '5.76543', key: 15, ratio: 18 },
  { price: '34,567.8', num: '0.87654', all: '1.34567', key: 16, ratio: 52 },
  { price: '78,901.2', num: '0.76543', all: '2.98765', key: 17, ratio: 38 },
]
)  

useEffect(() => {
   let task =   setInterval(() => {
        setData(data.map((item) => ({
            ...item,
            ratio: Math.floor(Math.random() * 101)
        })))
    }, 1000)
    //组件销毁时清除定时器
    return () => {
        clearInterval(task)
    }
}, []);

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
               <Row>
                {
                    data.map((item,index) => (
                        <Row key={index} className='orderdataRow' style={{
                            position: 'relative',
                            overflow: 'hidden',
                            backgroundColor: '#0d3c1d'
                        }}>
                          <div style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            height: '100%',
                            width: `${item.ratio}%`,
                            backgroundColor: 'black',
                            transition: 'width 0.5s ease'
                          }}></div>
                          <Col span={10} style={{position: 'relative', zIndex: 1}}>
                            <p>{item.price}</p>
                          </Col>
                            <Col span={7} className='rightItem'>
                                {item.num}
                            </Col>
                            <Col span={7} className='rightItem'>
                                {item.all}
                            </Col>
                        </Row>
                    ))
                }
               </Row>
            </div>

        </div>
    )
}

export default Index