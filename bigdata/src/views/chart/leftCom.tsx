import React, { useEffect, useMemo, useRef } from 'react'
import * as echarts from 'echarts'
import { useTranslation } from 'react-i18next'
import type { ChartOverviewData } from './types'

type Props = {
  overview: ChartOverviewData | null
}

const getValueByKey = (list: Array<{ key: string; value: number }> | undefined, key: string, fallback = 0) => {
  const hit = (list || []).find((i) => i.key === key)
  return hit ? Number(hit.value || 0) : fallback
}

const LeftCom: React.FC<Props> = ({ overview }) => {
  const { t, i18n } = useTranslation()

  const el1Ref = useRef<HTMLDivElement | null>(null)
  const el2Ref = useRef<HTMLDivElement | null>(null)
  const el3Ref = useRef<HTMLDivElement | null>(null)

  const chart1Ref = useRef<echarts.ECharts | null>(null)
  const chart2Ref = useRef<echarts.ECharts | null>(null)
  const chart3Ref = useRef<echarts.ECharts | null>(null)

  const dailyValues = useMemo(() => {
    const v = overview?.dailyUserValues
    if (Array.isArray(v) && v.length === 7) return v.map((x) => Number(x || 0))
    return [1000, 1230, 1424, 1218, 1350, 700, 560]
  }, [overview])

  const regionValues = useMemo(() => {
    const keys = ['beijing', 'shanghai', 'guangzhou', 'shenzhen', 'xiAn', 'chengdu', 'hangzhou']
    const list = overview?.mainRegions
    const fallback = [260, 200, 150, 180, 90, 110, 130]
    return keys.map((k, idx) => getValueByKey(list, k, fallback[idx]))
  }, [overview])

  const domainValues = useMemo(() => {
    const list = overview?.applicationDomainDistribution
    return [
      getValueByKey(list, 'finance', 1048),
      getValueByKey(list, 'industry', 735),
      getValueByKey(list, 'agriculture', 150)
    ]
  }, [overview])

  useEffect(() => {
    if (el1Ref.current) chart1Ref.current = echarts.init(el1Ref.current, 'dark')
    if (el2Ref.current) chart2Ref.current = echarts.init(el2Ref.current, 'dark')
    if (el3Ref.current) chart3Ref.current = echarts.init(el3Ref.current, 'dark')

    const onResize = () => {
      chart1Ref.current?.resize()
      chart2Ref.current?.resize()
      chart3Ref.current?.resize()
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      chart1Ref.current?.dispose()
      chart2Ref.current?.dispose()
      chart3Ref.current?.dispose()
      chart1Ref.current = null
      chart2Ref.current = null
      chart3Ref.current = null
    }
  }, [])

  useEffect(() => {
    const option1 = {
      title: { text: t('chart.dailyUserStatistics'), left: 'center', top: '8px' },
      xAxis: {
        type: 'category',
        data: [
          t('common.monday'),
          t('common.tuesday'),
          t('common.wednesday'),
          t('common.thursday'),
          t('common.friday'),
          t('common.saturday'),
          t('common.sunday')
        ]
      },
      yAxis: { type: 'value' },
      series: [{ data: dailyValues, type: 'line' }]
    }
    chart1Ref.current?.setOption(option1, true)
  }, [i18n.language, t, dailyValues])

  useEffect(() => {
    const option2 = {
      title: { text: t('chart.applicationDomainDistribution'), left: 'center', top: '8px' },
      tooltip: { trigger: 'item' },
      legend: { orient: 'vertical', right: '5%', top: 'center' },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: { show: false, position: 'center' },
          emphasis: { label: { show: true, fontSize: 40, fontWeight: 'bold' } },
          labelLine: { show: false },
          data: [
            { value: domainValues[0], name: t('chart.finance') },
            { value: domainValues[1], name: t('chart.industry') },
            { value: domainValues[2], name: t('chart.agriculture') }
          ]
        }
      ]
    }
    chart2Ref.current?.setOption(option2, true)
  }, [i18n.language, t, domainValues])

  useEffect(() => {
    const option3 = {
      title: { text: t('chart.mainRegions'), left: 'center', top: '8px' },
      xAxis: {
        type: 'category',
        data: [
          t('chart.beijing'),
          t('chart.shanghai'),
          t('chart.guangzhou'),
          t('chart.shenzhen'),
          t('chart.xiAn'),
          t('chart.chengdu'),
          t('chart.hangzhou')
        ]
      },
      yAxis: { type: 'value' },
      series: [{ data: regionValues, type: 'bar' }]
    }
    chart3Ref.current?.setOption(option3, true)
  }, [i18n.language, t, regionValues])

  return (
    <div className='data_left_box'>
      <div className='data_left_chart_item' id='leftChart1'>
        <div ref={el1Ref} className='chart_item_box'></div>
        <div className='chart_border_top'></div>
        <div className='chart_border_bottom'></div>
        <div className='chart_border_left'></div>
        <div className='chart_border_right'></div>
      </div>
      <div className='data_left_chart_item' id='leftChart2'>
        <div ref={el2Ref} className='chart_item_box'></div>
        <div className='chart_border_top'></div>
        <div className='chart_border_bottom'></div>
        <div className='chart_border_left'></div>
        <div className='chart_border_right'></div>
      </div>
      <div className='data_left_chart_item' id='leftChart3'>
        <div ref={el3Ref} className='chart_item_box'></div>
        <div className='chart_border_top'></div>
        <div className='chart_border_bottom'></div>
        <div className='chart_border_left'></div>
        <div className='chart_border_right'></div>
      </div>
    </div>
  )
}

export default LeftCom
