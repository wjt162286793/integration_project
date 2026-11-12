import React, { useEffect, useState } from 'react'
import './index.less'
import BazaarCom from './bazaarComReal'
import MainCom from './mainComReal'
import OrderForm from './orderFormReal'
import { ConfigProvider, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { marketTickerApi } from '@/api';
import { getUiPreferences, subscribeUiPreferences, themes } from '../../../../../shared/ui-runtime';
import type { UiPreferences } from '../../../../../shared/ui-runtime';
const Index: React.FC = () => {
    const navigate = useNavigate();
    const [uiPreferences, setUiPreferences] = useState<UiPreferences>(getUiPreferences);
    useEffect(() => subscribeUiPreferences(setUiPreferences), []);
    const [ticker, setTicker] = useState<any>(null);
    useEffect(() => {
        marketTickerApi({ symbol: 'BTCUSDT', interval: '15m' }).then((res: any) => {
            if (res?.code === 200) setTicker(res.data);
        });
    }, []);

    const backList = () => {
        navigate('/home/bazaar/currency')
    }

    return (
        <ConfigProvider theme={{ token: { colorPrimary: themes[uiPreferences.theme].color }, algorithm: theme.darkAlgorithm }}>
            <div className='tradingViewDom'>
                <ul className='headerBox'>
                    <li className='libox1'>BTC/USDT <span>10x</span></li>
                    <li className='liBox2'>
                        <span>{ticker?.close ?? '--'}</span>
                        <span>{ticker ? `${ticker.change >= 0 ? '+' : ''}${ticker.change} (${ticker.changePct >= 0 ? '+' : ''}${ticker.changePct}%)` : '--'}</span>
                    </li>
                    <li className='liBox3'>
                        <span>比特币 价格</span>
                        <span className='priceSp'>${ticker?.close ?? '--'}</span>
                    </li>
                    <li className='liBox3'>
                        <span>24小时最低</span>
                        <span className='priceSp'>{ticker?.low ?? '--'}</span>
                    </li>
                    <li className='liBox3'>
                        <span>24小时最高</span>
                        <span className='priceSp'>{ticker?.high ?? '--'}</span>
                    </li>
                    <li className='liBox3'>
                        <span>24小时量(BTC)</span>
                        <span className='priceSp'>{ticker?.volume ?? '--'}</span>
                    </li>
                    <li className='liBox3'>
                        <span>24小时额(USDT)</span>
                        <span className='priceSp'>{ticker?.volume && ticker?.close ? (ticker.volume * ticker.close).toFixed(2) : '--'}</span>
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
