import React, { use, useEffect, useState } from 'react'
import { Button, Row, Col, Tag, Checkbox, message } from 'antd'
import { useNavigate } from 'react-router-dom';
import { Flex, Radio, Card } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import CodeImg from '@/assets/img/code.jpg'
import {
  RightOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import './index.less'
import useAuthCheck from '@/hooks/useAuthCheck'; // 导入登录检查Hook
import { buyInfoApi, orderApi, cancelOrderApi,payhdApi } from '@/api'
import { useSearchParams } from 'react-router-dom';

const options: CheckboxGroupProps<string>['options'] = [
  { label: '支付宝', value: 'zfb' },
  { label: '微信支付', value: 'wx' },
];


const Index: React.FC = () => {

  const [searchParams] = useSearchParams();


  const islogin = useAuthCheck()

  const [payType, setPayType] = useState('')
  const changeRadio = (e) => {
    setPayType(e.target.value)
  }

  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);
  const onChangeForm = (e) => {
    setChecked(e.target.checked)
  }

  const [order, setOrder] = useState(false)
  const [paySuccess, setPaySuccess] = useState(false)
  const orderHandler = () => {
    orderApi({
      id: payInfo.id,
      pay_from: payType,
      pay_with: 'chinaBank'
    }).then(res => {
      messageApi.success('委托单下单成功,请尽快支付');
      setOrder(true)
    })
  }

  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
      if (order === true) {
          createWs();
      } 
      // else if (socket) {
      //     socket.close(1000, '订单状态变更');
      //     setSocket(null);
      // }
      // 卸载时清理掉这个ws
      return () => {
          if (socket) {
              socket.close(1000, '组件卸载');
          }
      };
  }, [order])
  
  const createWs = () => {
      const payId = searchParams.get('pay_id');
      if (!payId) {
          messageApi.error('缺少支付ID，无法建立连接');
          return;
      }
  
      const newSocket = new WebSocket('ws://localhost:8001');
      setSocket(newSocket);
  
      newSocket.onopen = () => {
          // ✅ 在连接成功后发送数据
          newSocket.send(payId);
      };
  
      newSocket.onmessage = (e) => {
          try {
              // ✅ 建议解析JSON格式数据
              const data = JSON.parse(e.data);
              if (data.status === 'success') {
                  setPaySuccess(true);
                  messageApi.success('支付成功')
              }
          } catch (error) {
              // 处理非JSON格式数据
              if (e.data === 'success') {
                  setPaySuccess(true);
              }
          }
      };
  
      newSocket.onerror = (error) => {
          messageApi.error('支付状态监听失败，请刷新页面重试');
      };
  
      newSocket.onclose = (event) => {
          // 根据关闭码判断是否需要重连
          if (event.code !== 1000 && order) {
              // 非正常关闭且订单状态仍为true时重连
              setTimeout(createWs, 3000);
          }
      };
  };



 

  useEffect(()=>{
    if(paySuccess){
      buyInfoApi({ id: payInfo.id }).then(res => {
      if (res.code === 200) {
        setPayInfo(res.data)
      } else {
      }
    })
    }

  },[paySuccess])


  const payHandler = () => {
    // 调用支付接口
    payhdApi({
      id: payInfo.id,
      pay_from: payType,
      pay_with: 'chinaBank'
    }).then(res => {
      if (res.code === 200) {
        messageApi.success('模拟进行扫码支付');
      } else {
      }
    })
    
  }

  const jumptoPortal = () => {
    navigate('/home/buyCoin/fast/portal')
  }
  const [messageApi, contextHolder] = message.useMessage();

  const [payInfo, setPayInfo] = useState(null)


  const cancelHandler = () => {
    cancelOrderApi({ id: payInfo.id }).then(res => {
      if (res.code === 200) {
        messageApi.success('取消支付')
        setPayInfo(res.data)
      }
    })
  }

  const callBack = ()=>{
    navigate('/home/buyCoin/fast/portal')
  }


  useEffect(() => {
    const payId = searchParams.get('pay_id');
    buyInfoApi({ id: payId }).then(res => {
      if (res.code === 200) {
        setPayInfo(res.data)
      } else {
        messageApi.error('该交易单不存在')
      }
    })
  }, [])

  useEffect(() => {
    if (payInfo) {
      if(payInfo.status){
        setOrder(true)
        setPayType(payInfo.pay_from)
        setChecked(true)
      }

    }
  }, [payInfo])


  return (
    <>
      {
        islogin ? (<div className='payMethodDom'>
          {/* 必须渲染contextHolder以提供message上下文 */}
          {contextHolder}
          <p className='breadCrumbs'>
            <span className='breadCrumbsItem' onClick={jumptoPortal}>快捷交易</span>
            &nbsp;<RightOutlined />&nbsp;
            <span className='breadCrumbsItem'>选择付款方式</span>
          </p>
          <h3>选择付款方式</h3>
          <Radio.Group
            block
            options={options}
            value={payType}
            optionType="button"
            onChange={changeRadio}
            disabled={order} // 添加禁用条件
          />
          {
            payType && (<>
              <h3>选择委托单</h3>

              <Row>
                <Col span={12} className='colItem'>
                  <Card type="inner" title="委托单">
                    <div className='delegateDom'>
                      <div className='delegateTitle'>
                        <Tag color="#bcff2f" style={{ padding: '6px 8px' }}><span style={{ color: '#000' }}>推荐</span></Tag>
                        <span className='coinNum'>{`${payInfo.to_value} ${payInfo.to_type}`}</span>
                      </div>
                      <div className='entrustInfo'>
                        <div className='left'>
                          <h6 className='bankTitle'>中华XX银行</h6>
                          <span>21000单 . 99.9%成交率 . 20s</span>
                        </div>
                        <Checkbox
                          onChange={onChangeForm}
                          checked={checked}
                          disabled={order} // 添加禁用条件
                        ></Checkbox>
                      </div>
                      
                      <Button style={{ width: '100%' }} type='primary' disabled={order} onClick={orderHandler}>下&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单</Button>
                    </div>
                  </Card>
                </Col>
                <Col span={12} className='colItem'>
                  <Card type="inner" title="订单预览">
                    <p className='infoItem'>
                      <span className='normal'>交易类型</span>
                      <span className='weight'>{payInfo.pay_type === 'buy' ? '购买' : '出售'}</span>
                    </p>
                    <p className='infoItem'>
                      <span className='normal'>我要支付</span>
                      <span className='weight'>{`${payInfo.to_value} ${payInfo.to_type}`}</span>
                    </p>

                    <p className='infoItem'>
                      <span className='normal'>买币途径</span>
                      <span className='weight'>{payType === 'zfb' ? '支付宝' : '微信'}</span>
                    </p>
                    <p className='infoItem'>
                      <span className='normal'>我将收到</span>
                      <span className='weight'>{`${payInfo.get_value} ${payInfo.get_type}`}</span>
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
                      <span>{payInfo.id}</span>
                    </p>
                    <p className='orderItem'>
                      <span>下单时间</span>
                      <span>{payInfo.create_time}</span>
                    </p>
                    <p className='orderItem'>
                      <span>数量</span>
                      <span>{`${payInfo.to_value} ${payInfo.to_type}`}</span>
                    </p>
                    <p className='orderItem'>
                      <span>总金额</span>
                      <span>{`${payInfo.get_value} ${payInfo.get_type}`}</span>
                    </p>
                    <p className='orderItem'>
                      <span>支付方式</span>
                      <span>{payInfo.pay_from === 'zfb' ? '支付宝' : '微信'}</span>
                    </p>
                  </div>
                </Col>
                {
                  (payInfo.status === 'pending' || !payInfo.status) && (
                    <Col span={12}>
                      <img src={CodeImg} alt="" style={{ width: '300px', height: '300px', cursor: 'pointer' }} onClick={payHandler} />
                    </Col>
                  )
                }

              </Row>
              {
                (payInfo.status === 'pending' || !payInfo.status) && (
                  <p style={{ color: '#ff2633' }}>作者注:此处的支付二维码为本人的微信号,服务端没有实现具体的支付二维码。左键单击二维码可以模仿支付功能。</p>
                )
              }

              {
                (payInfo.status === 'pending' || !payInfo.status) && (
                  <div className='paySureDom'>
                    <Button type='primary'>我已支付</Button>
                    <Button type="link" style={{ color: '#000' }} onClick={cancelHandler}>取消支付</Button>
                  </div>
                )
              }
              {
                payInfo.status === 'cancel' && (
                  <div className='paySureDom'>
                    <p className='cancelTitle'>订单已取消</p>
                    <Button type='primary' onClick={callBack} style={{ marginLeft: '24px' }}>返回</Button>
                  </div>
                )
              }
              {
                payInfo.status === 'success' && (
                  <div className='paySureDom'>
                    <p className='successTitle'>支付成功</p>
                    <Button type='primary' onClick={callBack} style={{ marginLeft: '24px' }}>返回</Button>
                  </div>
                )
              }


            </>
            )
          }


        </div>) : <></>
      }
    </>

  )
}

export default Index