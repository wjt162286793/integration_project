import React from 'react'
import './index.less'
import { useTranslation } from 'react-i18next'
import LeftCom from './leftCom'
import RightCom from './rightCom'
import MapCom from './mapCom'

export default function index() {
  const { t } = useTranslation();
  return (
    <div className='chartDataBox'>
      <div className='titleBox'>
        {t('chart.title')}
      </div>
      <div className='contentBox'>
       <LeftCom />
       <MapCom />
       <RightCom />
      </div>
      </div>
  )
}
