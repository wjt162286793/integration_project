import React,{ useEffect,useState } from 'react'
import { Col, Row  } from 'antd';
import * as echarts from 'echarts';


const ModeCom:React.FC = ()=>{


const option1 = {
    title:{
        text:'上周数字资产日增量',
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
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
      name: '增长量',
      type: 'bar',
      barWidth: '60%',
      data: [100, 130, 80, 220, 140, 20, 30]
    }
  ]
};
const option2 = {
    title:{
        text:'上周统计图表访问量',
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
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
      name: '增长量',
      type: 'bar',
      barWidth: '60%',
      data: [4426, 3467, 2468, 5430, 4740, 2620, 3130]
    }
  ]
};
const option3 = {
    title:{
        text:'上周模型日增量',
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
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
      name: '增长量',
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
      <h4>应用模块</h4>
      <Row>
      <Col span={8}>
      <div className='colContent'>
        <h5>数字资产</h5>
        <p className='desc'>数字资产是指企业或组织拥有或控制的、能够带来经济利益的数据资源。它通过专业化处理（如清洗、分析、建模）将原始数据转化为可量化、可交易的价值形态。</p>
        <div id='chartBox_1' className='workbranch_chartBox'></div>
      </div>
      </Col>
      <Col span={8}>
      <div className='colContent'>
        <h5>统计图表</h5>
        <p className='desc'>统计图表是通过图形化手段展示数据关系、趋势和模式的工具，旨在降低理解门槛，辅助决策。</p>
        <div id='chartBox_2' className='workbranch_chartBox'></div>
      </div>
      </Col>
      <Col span={8}>
      <div className='colContent'>
      <h5>模型构建</h5>
        <p className='desc'>模型构建是利用数学、统计学和计算机科学方法，从海量数据中提取规律并构建预测或决策模型的过程。</p>
        <div id='chartBox_3' className='workbranch_chartBox'></div>
      </div>
      </Col>
    </Row>
      </div>
    )

}

export default ModeCom