import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, message } from 'antd'
import { assistantChatApi } from '@/api'
import './index.less'

type ChatMsg = {
  role: 'user' | 'assistant'
  content: string
}

const Index: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [list, setList] = useState<ChatMsg[]>([
    { role: 'assistant', content: '你好，我是交易所助手。你可以问我：订单状态、支付失败原因、行情接口怎么用等。' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bodyRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    const el = bodyRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }

  useEffect(() => {
    scrollToBottom()
  }, [list.length])

  const send = async () => {
    const text = input.trim()
    if (!text) return
    if (loading) return
    setInput('')
    setList((prev) => [...prev, { role: 'user', content: text }])
    setLoading(true)
    try {
      const res = await assistantChatApi({ message: text, session_id: sessionId })
      if (res.code === 200) {
        setSessionId(res.data.session_id)
        setList((prev) => [...prev, { role: 'assistant', content: res.data.reply }])
      } else {
        messageApi.error(res.msg || '请求失败')
      }
    } catch (e) {
      messageApi.error('网络异常')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setSessionId(null)
    setList([{ role: 'assistant', content: '你好，我是交易所助手。你可以问我：订单状态、支付失败原因、行情接口怎么用等。' }])
    setInput('')
  }

  return (
    <div className='assistantPage'>
      {contextHolder}
      <div className='assistantHeader'>
        <h3>AI 助手</h3>
        <Button onClick={reset}>清空会话</Button>
      </div>
      <div className='assistantBody' ref={bodyRef}>
        {list.map((item, idx) => (
          <div key={idx} className={`assistantMsg ${item.role}`}>
            <div className='role'>{item.role === 'user' ? '你' : '助手'}</div>
            <div className='bubble'>{item.content}</div>
          </div>
        ))}
      </div>
      <div className='assistantFooter'>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='输入你的问题，例如：我的订单为什么一直 pending？'
          onPressEnter={send}
          disabled={loading}
        />
        <Button type='primary' onClick={send} loading={loading}>
          发送
        </Button>
      </div>
    </div>
  )
}

export default Index
