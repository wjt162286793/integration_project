import React,{ useEffect,useState } from 'react'
import { Col, Row  } from 'antd';
import * as echarts from 'echarts';
import { t } from 'i18next';


const ModeCom:React.FC = ()=>{


const option1 = {
    title:{
        text:t('common.digitalAssetLabel'),
        left:'center'
    },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: [t('common.monday'), t('common.tuesday'), t('common.wednesday'), t('common.thursday'), t('common.friday'), t('common.saturday'), t('common.sunday')],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: t('common.growth'),
      type: 'bar',
      barWidth: '60%',
      data: [100, 130, 80, 220, 140, 20, 30]
    }
  ]
};
const option2 = {
    title:{
        text:t('common.dataBoardLabel'),
        left:'center'
    },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: [t('common.monday'), t('common.tuesday'), t('common.wednesday'), t('common.thursday'), t('common.friday'), t('common.saturday'), t('common.sunday')],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: t('common.growth'),
      type: 'bar',
      barWidth: '60%',
      data: [4426, 3467, 2468, 5430, 4740, 2620, 3130]
    }
  ]
};
const option3 = {
    title:{
        text:t('common.lastWeekModelDailyGrowth'),
        left:'center'
    },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: [t('common.monday'), t('common.tuesday'), t('common.wednesday'), t('common.thursday'), t('common.friday'), t('common.saturday'), t('common.sunday')],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: t('common.growth'),
      type: 'bar',
      barWidth: '60%',
      data: [13, 21, 20, 9, 14, 1, 3]
    }
  ]
};


const renderChart1 = ()=>{
 const dom = document.getElementById('chartBox_1')
 const chart = echarts.init(dom);
 chart.setOption(option1);
}



const renderChart2 = ()=>{
     const dom = document.getElementById('chartBox_2')
 const chart = echarts.init(dom);
 chart.setOption(option2);
}
const renderChart3 = ()=>{
     const dom = document.getElementById('chartBox_3')
 const chart = echarts.init(dom);
 chart.setOption(option3);
}


const renderChart = ()=>{
    renderChart1()
    renderChart2()
    renderChart3()
}



useEffect(()=>{
    renderChart()
},[])



    return (
      <div className='modeBox'>
      <h4>{t('common.appMode')}</h4>
      <Row>
      <Col span={8}>
      <div className='colContent'>
        <h5>{t('common.digitalAsset')}</h5>
        <p className='desc'>{t('common.digitalAssetDesc')}</p>
        <div id='chartBox_1' className='workbranch_chartBox'></div>
      </div>
      </Col>
      <Col span={8}>
      <div className='colContent'>
        <h5>{t('common.dataBoard')}</h5>
        <p className='desc'>{t('common.dataBoardDesc')}</p>
        <div id='chartBox_2' className='workbranch_chartBox'></div>
      </div>
      </Col>
      <Col span={8}>
      <div className='colContent'>
      <h5>{t('common.modeBuild')}</h5>
        <p className='desc'>{t('common.modeBuildDesc')}</p>
        <div id='chartBox_3' className='workbranch_chartBox'></div>
      </div>
      </Col>
    </Row>
      </div>
    )

}

export default ModeCom