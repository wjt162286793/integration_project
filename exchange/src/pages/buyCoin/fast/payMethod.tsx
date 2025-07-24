import React, { useState } from 'react'
import { Button, Row, Col, Tag, Checkbox } from 'antd'
import CodeImg from '@/assets/img/code.jpg'
import {
  RightOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import './index.less'

import { Flex, Radio, Card } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';


const options: CheckboxGroupProps<string>['options'] = [
  { label: '支付宝', value: 'zfb' },
  { label: '微信支付', value: 'wx' },
];


const Index: React.FC = () => {

  const [payType, setPayType] = useState('')
  const changeRadio = (e) => {
    setPayType(e.target.value)
  }

  const [checked, setChecked] = useState(false);
  const onChangeForm = (e) => {
    setChecked(e.target.checked)
  }

  const [order, setOrder] = useState(false)
  const orderHandler = () => {
    setOrder(true)
  }


  const [payStatus,setPaySuccess] = useState('pending')
  const payHandler = ()=> {
   setPaySuccess('success')
  }

  return (
    <div className='payMethodDom'>
      <p className='breadCrumbs'>
        <span className='breadCrumbsItem'>快捷交易</span>
        &nbsp;<RightOutlined />&nbsp;
        <span className='breadCrumbsItem'>选择付款方式</span>
      </p>
      <h3>选择付款方式</h3>
      <Radio.Group block options={options} value={payType} optionType="button" onChange={changeRadio} />
      {
        payType && (<>
          <h3>选择委托单</h3>

          <Row>
            <Col span={12} className='colItem'>
              <Card type="inner" title="委托单">
                <div className='delegateDom'>
                  <div className='delegateTitle'>
                    <Tag color="#bcff2f" style={{ padding: '6px 8px' }}><span style={{ color: '#000' }}>推荐</span></Tag>
                    <span className='coinNum'>7.3 CNY</span>
                  </div>
                  <div className='entrustInfo'>
                    <div className='left'>
                      <h6 className='bankTitle'>中华XX银行</h6>
                      <span>21000单 . 99.9%成交率 . 20s</span>
                    </div>
                    <Checkbox onChange={onChangeForm} checked={checked}></Checkbox>
                  </div>
                  <Button style={{ width: '100%' }} type='primary' disabled={!checked} onClick={orderHandler}>下&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单</Button>
                </div>
              </Card>
            </Col>
            <Col span={12} className='colItem'>
              <Card type="inner" title="订单预览">
                <p className='infoItem'>
                  <span className='normal'>我要支付</span>
                  <span className='weight'>100 CNY</span>
                </p>
                <p className='infoItem'>
                  <span className='normal'>单价</span>
                  <span className='normal'>1 USDT = 7.3 CNY</span>
                </p>
                <p className='infoItem'>
                  <span className='normal'>买币途径</span>
                  <span className='weight'>支付宝</span>
                </p>
                <p className='infoItem'>
                  <span className='normal'>我将收到</span>
                  <span className='weight'>13.69 USDT</span>
                </p>
              </Card>
            </Col>
          </Row>
        </>)
      }
      {
        (payType && order) && (<>
          <h3>订单详情</h3>
          <Row>
            <Col span={12}>
                      <div className='orderInfoDom'>
            <p className='orderItem'>
              <span>订单号</span>
              <span>123456654321</span>
            </p>
            <p className='orderItem'>
              <span>下单时间</span>
              <span>2024-06-01 00:00:00</span>
            </p>
            <p className='orderItem'>
              <span>单价(USDT)</span>
              <span>7.17 CNY</span>
            </p>
            <p className='orderItem'>
              <span>数量</span>
              <span>13.49 USDT</span>
            </p>
            <p className='orderItem'>
              <span>总金额</span>
              <span>100.00 CNY</span>
            </p>
            <p className='orderItem'>
              <span>支付方式</span>
              <span>支付宝</span>
            </p>
          </div>
          </Col>
            <Col span={12}>
            <img src={CodeImg} alt="" style={{width:'300px',height:'300px',cursor:'pointer'}} onClick={payHandler}/>
            </Col>
          </Row>
          <p style={{color:'#ff2633'}}>作者注:此处的支付二维码为本人的微信号,服务端没有实现具体的支付二维码。左键单击二维码可以模仿支付功能。</p>
          <div className='paySureDom'>
             <Button type='primary'>我已支付</Button>
             <Button type="link" style={{color:'#000'}}>取消订单</Button>
          </div>
          
        </>
        )
      }


    </div>
  )
}

export default Index