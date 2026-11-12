import React, { useEffect, useRef, useState } from 'react'
import { createChart, CandlestickSeries, HistogramSeries, LineSeries } from 'lightweight-charts'
import { marketKlineApi } from '@/api'

const MainComReal: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let chart: ReturnType<typeof createChart> | null = null
    const load = async () => {
      try {
        const res: any = await marketKlineApi({ symbol: 'BTCUSDT', interval: '15m', limit: 500 })
        if (res?.code !== 200 || !res.data?.length || !ref.current) {
          setError(res?.msg || '暂无行情数据')
          return
        }
        chart = createChart(ref.current, { width: ref.current.clientWidth, height: 400, layout: { textColor: '#fff', background: { type: 'solid', color: '#000' } } })
        const resize = () => {
          if (ref.current) chart?.applyOptions({ width: ref.current.clientWidth })
        }
        window.addEventListener('resize', resize)
        const candles = chart.addSeries(CandlestickSeries, {
          upColor: '#26a69a',
          downColor: '#ef5350',
          borderVisible: false,
          wickUpColor: '#26a69a',
          wickDownColor: '#ef5350'
        })
        const line = chart.addSeries(LineSeries, { color: '#2962ff', lineWidth: 2, priceScaleId: 'right' })
        const volume = chart.addSeries(HistogramSeries, { color: '#26a69a', priceFormat: { type: 'volume' }, priceScaleId: '' })
        candles.setData(res.data)
        line.setData(res.data.map((item: any) => ({ time: item.time, value: item.close })))
        volume.setData(res.data.map((item: any) => ({ time: item.time, value: item.volume, color: item.close >= item.open ? '#26a69a' : '#ef5350' })))
        chart.timeScale().fitContent()
        window.setTimeout(resize, 0)
        ;(chart as any).__resize = resize
      } catch {
        setError('行情数据加载失败')
      }
    }
    load()
    return () => {
      if (chart) {
        window.removeEventListener('resize', (chart as any).__resize)
        chart.remove()
      }
    }
  }, [])

  return <div className="tradingmainDom">
    <div className="topTitle"><h5>图表</h5>{error && <span>{error}</span>}</div>
    <div className="mainChartOutDom"><div ref={ref} className="mainChartDom" /></div>
    <div className="chartBottomDom"><h5>工具</h5><ul className="toolsUl">
      <li><p className="label">现货网络</p><p>低买高卖 / 震荡向上行情 / 断中长线</p></li>
      <li><p className="label">现货马丁格尔</p><p>信号触发 / 震荡行情 / 分批加仓</p></li>
      <li><p className="label">策略交易</p><p>多种智能策略，祝您轻松交易</p></li>
      <li><p className="label">现货跟单</p><p>与全球顶级交易员一起赚钱</p></li>
    </ul></div>
  </div>
}

export default MainComReal
