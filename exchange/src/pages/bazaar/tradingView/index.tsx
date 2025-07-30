import React from 'react'
import './index.less'
import BazaarCom from './bazaarCom'
import MainCom from './mainCom'
import OrderForm from './orderForm'
import { ConfigProvider, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
const Index: React.FC = () => {
    const navigate = useNavigate();
    const backList = () => {
        navigate('/home/bazaar/currency')
    }

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#000' }, algorithm: theme.darkAlgorithm }}>
            <div className='tradingViewDom'>
                <ul className='headerBox'>
                    <li className='libox1'>BTC/USDT <span>10x</span></li>
                    <li className='liBox2'>
                        <span>118.150.5</span>
                        <span>+232.6(+0.20%)</span>
                    </li>
                    <li className='liBox3'>
                        <span>比特币 价格</span>
                        <span className='priceSp'>$118.193.0</span>
                    </li>
                    <li className='liBox3'>
                        <span>24小时最低</span>
                        <span className='priceSp'>117,818.0</span>
                    </li>
                    <li className='liBox3'>
                        <span>24小时最高</span>
                        <span className='priceSp'>118,458.0</span>
                    </li>
                    <li className='liBox3'>
                        <span>24小时量(BTC)</span>
                        <span className='priceSp'>1960.47</span>
                    </li>
                    <li className='liBox3'>
                        <span>24小时额(USDT)</span>
                        <span className='priceSp'>2.31亿</span>
                    </li>
                    <li className='liBox4' onClick={backList}>
                        返回市场列表
                    </li>
                </ul>
                <div className='contextBox'>
                    <BazaarCom></BazaarCom>
                    <MainCom></MainCom>
                    <OrderForm></OrderForm>
                </div>
            </div>
        </ConfigProvider>


    )
}

export default Index