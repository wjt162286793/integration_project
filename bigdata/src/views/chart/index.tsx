import React from 'react'
import './index.less'
import LeftCom from './leftCom'
import RightCom from './rightCom'
import MapCom from './mapCom'

export default function index() {
  return (
    <div className='chartDataBox'>
      <div className='titleBox'>
        大屏数据看板
      </div>
      <div className='contentBox'>
       <LeftCom />
       <MapCom />
       <RightCom />
      </div>
      </div>
  )
}
