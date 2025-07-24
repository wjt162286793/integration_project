import React, { useEffect, useState } from 'react'
import { Input, Select, Space, Button } from 'antd'

// 首先在文件顶部添加图片导入
import BTCImg from '@/assets/img/BTC.png';
import ETHImg from '@/assets/img/ETH.png';
import bestPriceSvg from '@/assets/svg/bestPrice.svg'
import cnySvg from '@/assets/svg/cny.svg'
import getusdtSvg from '@/assets/svg/getusdt.svg'
import CNYImg from '@/assets/img/CNY.png'
import USDImg from '@/assets/img/USD.png'

import { Decimal } from 'decimal.js';
import { useNavigate } from 'react-router-dom';


const Index: React.FC = () => {

    const navigate = useNavigate()

    const num_options = [
        {
            label: 'BTC',
            value: 'BTC',
            img: <img src={BTCImg} alt="BTC" style={{ width: '14px', height: '14px' }} />
        },
        {
            label: 'ETH',
            value: 'ETH',
            img: <img src={ETHImg} alt="ETH" style={{ width: '14px', height: '14px' }} />
        },
    ];

    const entiry_options = [
        {
            label: 'CNY',
            value: 'CNY',
            img: <img src={CNYImg} alt="BTC" style={{ width: '14px', height: '14px' }} />
        },
        {
            label: 'USD',
            value: 'USD',
            img: <img src={USDImg} alt="ETH" style={{ width: '14px', height: '14px' }} />
        },
    ]


    const rateList = [
        {
            from: 'CNY',
            to: 'ETH',
            rateValue: '0.000037'
        },
        {
            from: 'ETH',
            to: 'CNY',
            rateValue: '26668.608'
        },
        {
            from: 'CNY',
            to: 'BTC',
            rateValue: '0.00000116'
        },
        {
            from: 'BTC',
            to: 'CNY',
            rateValue: '858926'
        },
        {
            from: 'USD',
            to: 'BTC',
            rateValue: '0.0000084'
        },
        {
            from: 'BTC',
            to: 'USD',
            rateValue: '119646.44'
        },
        {
            from: 'USD',
            to: 'ETH',
            rateValue: '0.002616'
        },
        {
            from: 'ETH',
            to: 'USD',
            rateValue: '2542.43'
        },
    ]



    const [doneType, setDoneType] = useState('buy')
    const changeDoneType = (type: string) => {
        setDoneType(type)
    }


    const [buy_value_1, setBuyValue1] = useState('CNY')
    const handleChange1 = (value: string) => {
        console.log(buy_value_1,);
        setBuyValue1(value)

    };
    const [buy_value_2, setBuyValue2] = useState('BTC')
    const handleChange2 = (value: string) => {
        console.log(`selected ${value}`);
        setBuyValue2(value)
    };

    const [buy_send, setBuySend] = useState('')

    const inputChange1 = (val: string) => {
        setBuySend(val)
        if (val) {
            let rate = rateList.find(item => item.from === buy_value_1 && item.to === buy_value_2)
            if (rate) {
                let value = getValueHandler(val, rate.rateValue)
                setBuyGet(value)
            }
        } else {
            setBuyGet('')
        }
    }

    const [buy_get, setBuyGet] = useState('')
    const inputChange2 = (val: string) => {
        setBuyGet(val)
        if (val) {
            let rate = rateList.find(item => item.from === buy_value_2 && item.to === buy_value_1)
            if (rate) {
                let value = getValueHandler(val, rate.rateValue)
                setBuySend(value)
            }
        } else {
            setBuySend('')
        }
    }


    useEffect(() => {
        inputChange1('')
        inputChange2('')
    }, [buy_value_1, buy_value_2])



    const [sell_value_1, setSellValue1] = useState('BTC')
    const handleChange3 = (value: string) => {
        setSellValue1(value)

    };
    const [sell_value_2, setSellValue2] = useState('CNY')
    const handleChange4 = (value: string) => {
        setSellValue2(value)
    };

    const [sell_send, setSellSend] = useState('0')

    const inputChange3 = (val: string) => {
        setSellSend(val)
        if (val) {
            let rate = rateList.find(item => item.from === sell_value_1 && item.to === sell_value_2)
            if (rate) {
                let value = getValueHandler(val, rate.rateValue)
                setSellGet(value)
            }
        } else {
            setSellGet('')
        }
    }

    const [sell_get, setSellGet] = useState('0')
    const inputChange4 = (val: string) => {
        setSellGet(val)
        if (val) {
            let rate = rateList.find(item => item.from === sell_value_2 && item.to === sell_value_1)
            if (rate) {
                let value = getValueHandler(val, rate.rateValue)
                setSellSend(value)
            }
        } else {
            setSellSend('')
        }
    }


    useEffect(() => {
        inputChange1('')
        inputChange2('')
    }, [buy_value_1, buy_value_2])

    useEffect(() => {
        inputChange3('')
        inputChange4('')
    }, [sell_value_1, sell_value_2])

    useEffect(()=>{
            inputChange1('')
            inputChange2('')
            inputChange3('')
            inputChange4('')
            setBuyValue1('CNY')
            setBuyValue2('BTC')
            setSellValue1('BTC')
            setSellValue2('CNY')      
    },[doneType])



    const getValueHandler = (value1: string, value2: string) => {
        const result = new Decimal(value1).times(new Decimal(value2));

        console.log(result.toString());
        //这里保留6位小数
        return result.toDecimalPlaces(6).toString()
    }

    const estimateHandler = (value: string): boolean => {
        // 检查值是否为空字符串（含仅空格情况）
        if (value.trim() === '') return false;
        
        try {
            // 使用Decimal进行精确数值解析
            const numericValue = new Decimal(value);
            
            // 检查是否为有效数字且严格大于0
            return numericValue.greaterThan(0);
        } catch (e) {
            // 解析失败时返回false
            return false;
        }
    }
    const coinDisabledHandler = ()=>{
        if(doneType === 'buy'){
           if(estimateHandler(buy_send) && estimateHandler(buy_get)){
             return false
           }else{
            return true
           }
        }else{
           if(estimateHandler(sell_send) && estimateHandler(sell_get)){
             return false
           }else{
            return true
           }
        }
    }

    const toPayHandler = ()=>{
        navigate('/home/buyCoin/fast/payMethod')
    }

    return (
        <>
            <div className='fastDom'>
                <div className='leftTips'>
                    <p className='bigTips'>C2C快捷交易</p>
                    <p className='bigTips'> 使用CNY购买</p>
                    <p className='bigTips'>USDT</p>
                    <p className='smallTips'>快捷交易为您自动匹配当前 C2C 市场购买 USDT 的最优价格之选。</p>
                </div>
                <div className='doneDom'>
                    <div className='done-dom'>
                        <div className='radioTitle'>
                            <div className='buy' onClick={() => changeDoneType('buy')} style={{ background: doneType === 'buy' ? '#fff' : '#eee' }}>
                                购买
                            </div>
                            <div className='sell' onClick={() => changeDoneType('sell')} style={{ background: doneType === 'sell' ? '#fff' : '#eee' }}>
                                出售
                            </div>
                            {
                                doneType === 'buy' ? <div className="triangle-left"></div> : <div className="triangle-right"></div>
                            }


                        </div>
                        {
                            doneType === 'buy' ? (
                                <div className='buyBox'>
                                    <div className='inputBox'>
                                        <span className='inputTitle'>我要支付</span>
                                        <Input className='inputItem' value={buy_send} onChange={(e) => inputChange1(e.target.value)} placeholder='0' />
                                        <div className='selectItem'>
                                            <Select
                                                style={{ width: '120px' }}

                                                value={buy_value_1}
                                                onChange={handleChange1}
                                                options={entiry_options}
                                                optionRender={(option) => (
                                                    <Space>
                                                        {
                                                            option.data.img
                                                        }
                                                        <span>
                                                            {option.data.label}
                                                        </span>
                                                    </Space>
                                                )}
                                            />
                                        </div>
                                        <span className='tipsTitle'>10 - 5000,000 CNY</span>
                                    </div>
                                    <div className='inputBox'>
                                        <span className='inputTitle'>我将收到</span>
                                        <Input className='inputItem' value={buy_get} onChange={(e) => inputChange2(e.target.value)} placeholder='0' />
                                        <div className='selectItem'>
                                            <Select
                                                style={{ width: '120px' }}

                                                value={buy_value_2}
                                                onChange={handleChange2}
                                                options={num_options}
                                                optionRender={(option) => (
                                                    <Space>
                                                        {
                                                            option.data.img
                                                        }
                                                        <span>
                                                            {option.data.label}
                                                        </span>
                                                    </Space>
                                                )}
                                            />
                                        </div>

                                    </div>
                                </div>
                            ) : (<div className='sellBox'>
                                <div className='inputBox'>
                                    <span className='inputTitle'>我要出售</span>
                                    <Input className='inputItem' value={sell_send} onChange={(e) => inputChange3(e.target.value)} placeholder='0' />
                                    <div className='selectItem'>
                                        <Select
                                            style={{ width: '120px' }}

                                            value={sell_value_1}
                                            onChange={handleChange3}
                                            options={num_options}
                                            optionRender={(option) => (
                                                <Space>
                                                    {
                                                        option.data.img
                                                    }
                                                    <span>
                                                        {option.data.label}
                                                    </span>
                                                </Space>
                                            )}
                                        />
                                    </div>
                                    <span className='tipsTitle'>10 - 5000,000 CNY</span>
                                </div>
                                <div className='inputBox'>
                                    <span className='inputTitle'>我将收到</span>
                                    <Input className='inputItem' value={sell_get} onChange={(e) => inputChange4(e.target.value)} placeholder='0' />
                                    <div className='selectItem'>
                                        <Select
                                            style={{ width: '120px' }}

                                            value={sell_value_2}
                                            onChange={handleChange4}
                                            options={entiry_options}
                                            optionRender={(option) => (
                                                <Space>
                                                    {
                                                        option.data.img
                                                    }
                                                    <span>
                                                        {option.data.label}
                                                    </span>
                                                </Space>
                                            )}
                                        />
                                    </div>

                                </div>
                            </div>)
                        }

                        <p className='priceTips'>
                            参考价格 1 USDT = 7.13 CNY
                        </p>
                        <Button className='coinBtn' type="primary" disabled={coinDisabledHandler()} onClick={toPayHandler}>选择付款方式</Button>
                      
                    </div>
                </div>
            </div>
            <div className='tipDom'>
                <h4>如何在快捷交易使用CNY购买USDT</h4>
                <ul className='tipList'>
                    <li className='tipItem'>
                        <img src={bestPriceSvg} alt="" />
                        <h5>快速匹配 USDT 最优价格之选</h5>
                        <p>选择 USDT 和 CNY ,并输入金额,C2C</p>
                        <p>快捷交易将自动匹配价格最优的委托单。</p>
                    </li>
                    <li className='tipItem'>
                        <img src={cnySvg} alt="" />
                        <h5>使用 CNY 付款</h5>
                        <p>选择您首选的USDT委托单,并在规定时间</p>
                        <p>内完成付款。</p>
                    </li>
                    <li className='tipItem'>
                        <img src={getusdtSvg} alt="" />
                        <h5>接受 USDT</h5>
                        <p>卖家确认收到付款后,您购买的USDT将</p>
                        <p>被转入您的账户。</p>
                    </li>
                </ul>
            </div>
            <div className='moreDom'>

            </div>
        </>

    )
}

export default Index