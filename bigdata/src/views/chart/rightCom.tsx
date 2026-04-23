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

const getSeriesByKey = (list: Array<{ key: string; values: number[] }> | undefined, key: string, fallback: number[]) => {
  const hit = (list || []).find((i) => i.key === key)
  if (hit && Array.isArray(hit.values) && hit.values.length === 12) return hit.values.map((x) => Number(x || 0))
  return fallback
}

const RightCom: React.FC<Props> = ({ overview }) => {
  const { t, i18n } = useTranslation()

  const el1Ref = useRef<HTMLDivElement | null>(null)
  const el2Ref = useRef<HTMLDivElement | null>(null)
  const el3Ref = useRef<HTMLDivElement | null>(null)

  const chart1Ref = useRef<echarts.ECharts | null>(null)
  const chart2Ref = useRef<echarts.ECharts | null>(null)
  const chart3Ref = useRef<echarts.ECharts | null>(null)

  const moduleValues = useMemo(() => {
    const list = overview?.moduleUsageDistribution
    return [
      getValueByKey(list, 'digitalAssets', 1048),
      getValueByKey(list, 'dataDashboard', 735),
      getValueByKey(list, 'modelBuilding', 580)
    ]
  }, [overview])

  const domainValues = useMemo(() => {
    const list = overview?.applicationDomainDistribution
    return [
      getValueByKey(list, 'finance', 1048),
      getValueByKey(list, 'industry', 735),
      getValueByKey(list, 'agriculture', 150)
    ]
  }, [overview])

  const growthSeries = useMemo(() => {
    const list = overview?.mainAssetGrowth
    return {
      bitcoin: getSeriesByKey(list, 'bitcoin', [120, 132, 101, 134, 90, 230, 210, 230, 210, 230, 210, 230]),
      ethereum: getSeriesByKey(list, 'ethereum', [220, 182, 191, 234, 290, 330, 310, 330, 310, 330, 310, 330]),
      dogecoin: getSeriesByKey(list, 'dogecoin', [150, 232, 201, 154, 190, 330, 410, 330, 410, 330, 410, 330]),
      litecoin: getSeriesByKey(list, 'litecoin', [320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390]),
      ripple: getSeriesByKey(list, 'ripple', [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290])
    }
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
      title: { text: t('chart.moduleUsageDistribution'), left: 'center' },
      tooltip: { trigger: 'item' },
      legend: { orient: 'vertical', left: 'left' },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: moduleValues[0], name: t('chart.digitalAssets') },
            { value: moduleValues[1], name: t('chart.dataDashboard') },
            { value: moduleValues[2], name: t('chart.modelBuilding') }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    chart1Ref.current?.setOption(option1, true)
  }, [i18n.language, t, moduleValues])

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
      title: { text: t('chart.mainAssetGrowth'), left: 'center', top: '8px' },
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [
          t('chart.january'),
          t('chart.february'),
          t('chart.march'),
          t('chart.april'),
          t('chart.may'),
          t('chart.june'),
          t('chart.july'),
          t('chart.august'),
          t('chart.september'),
          t('chart.october'),
          t('chart.november'),
          t('chart.december')
        ]
      },
      yAxis: { type: 'value' },
      series: [
        { name: t('chart.bitcoin'), type: 'line', stack: 'Total', data: growthSeries.bitcoin },
        { name: t('chart.ethereum'), type: 'line', stack: 'Total', data: growthSeries.ethereum },
        { name: t('chart.dogecoin'), type: 'line', stack: 'Total', data: growthSeries.dogecoin },
        { name: t('chart.litecoin'), type: 'line', stack: 'Total', data: growthSeries.litecoin },
        { name: t('chart.ripple'), type: 'line', stack: 'Total', data: growthSeries.ripple }
      ]
    }
    chart3Ref.current?.setOption(option3, true)
  }, [i18n.language, t, growthSeries])

  return (
    <div className='data_right_box'>
      <div className='data_right_chart_item' id='rightChart1'>
        <div ref={el1Ref} className='chart_item_box'></div>
        <div className='chart_border_top'></div>
        <div className='chart_border_bottom'></div>
        <div className='chart_border_left'></div>
        <div className='chart_border_right'></div>
      </div>
      <div className='data_right_chart_item' id='rightChart2'>
        <div ref={el2Ref} className='chart_item_box'></div>
        <div className='chart_border_top'></div>
        <div className='chart_border_bottom'></div>
        <div className='chart_border_left'></div>
        <div className='chart_border_right'></div>
      </div>
      <div className='data_right_chart_item' id='rightChart3'>
        <div ref={el3Ref} className='chart_item_box'></div>
        <div className='chart_border_top'></div>
        <div className='chart_border_bottom'></div>
        <div className='chart_border_left'></div>
        <div className='chart_border_right'></div>
      </div>
    </div>
  )
}

export default RightCom
