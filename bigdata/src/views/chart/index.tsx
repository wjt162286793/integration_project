import React, { useEffect, useState } from 'react'
import './index.less'
import { useTranslation } from 'react-i18next'
import LeftCom from './leftCom'
import RightCom from './rightCom'
import MapCom from './mapCom'
import { chartOverviewApi } from '@/api'
import type { ApiResponse, ChartOverviewData } from './types'

export default function index() {
  const { t } = useTranslation();
  const [overview, setOverview] = useState<ChartOverviewData | null>(null)

  useEffect(() => {
    chartOverviewApi({}).then((res: ApiResponse<ChartOverviewData>) => {
      if (res && res.code === 200) {
        setOverview(res.data)
      }
    })
  }, [])
  return (
    <div className='chartDataBox'>
      <div className='titleBox'>
        {t('chart.title')}
      </div>
      <div className='contentBox'>
       <LeftCom overview={overview} />
       <MapCom overview={overview} />
       <RightCom overview={overview} />
      </div>
      </div>
  )
}
