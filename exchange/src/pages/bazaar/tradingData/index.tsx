import React, { useEffect } from 'react'
import {Row,Col,Tag} from 'antd'
import './index.less'
import * as echarts from 'echarts';



const Index:React.FC = ()=>{


  const renderChat1 = ()=>{
const chartDom = document.getElementById('chart1');
const myChart = echarts.init(chartDom);

const option = {
  xAxis: {
    type: 'category',
    data: ['17:30','17:40','17:50','18:00','18:10','18:20','18:30'],
    axisLabel: {
      interval: 0,          // 强制显示所有刻度
      rotate: 30,           // 旋转30度避免重叠
      margin: 15,           // 增加与轴线的距离
      fontSize: 12          // 适当缩小字体
    },
    axisTick: {
      alignWithLabel: true  // 刻度线与标签对齐
    }
  },
  yAxis: {
    type: 'value',
    min: 0.84,
    max: 0.87,
    interval: 0.01,
    axisLabel: {
      // 优化后的格式化器
      formatter: (value: number) => value.toFixed(2).replace(/\.00$/, '')
    }
  },
  series: [
    {
      data: [0.85,0.85,0.85,0.87,0.87,0.86,0.86],
      type: 'line'
    }
  ]
};

option && myChart.setOption(option);
  }

   const renderChat2 = ()=>{
const chartDom = document.getElementById('chart2');
const myChart = echarts.init(chartDom);

const option = {
  xAxis: {
    type: 'category',
    data: ['17:30','17:40','17:50','18:00','18:10','18:20','18:30'],
    axisLabel: {
      interval: 0,          // 强制显示所有刻度
      rotate: 30,           // 旋转30度避免重叠
      margin: 15,           // 增加与轴线的距离
      fontSize: 12          // 适当缩小字体
    },
    axisTick: {
      alignWithLabel: true  // 刻度线与标签对齐
    }
  },
  yAxis: {
    type: 'value',
    min: 3.15,
    max: 3.20,
    interval: 0.01,
    axisLabel: {
      // 优化后的格式化器
      formatter: (value: number) => value.toFixed(2).replace(/\.00$/, '')
    }
  },
  series: [
    {
      data: [3.15,3.18,3.20,3.18,3.20,3.15,3.18],
      type: 'line'
    }
  ]
};

option && myChart.setOption(option);
  }


  const renderChat3 = ()=>{
const chartDom = document.getElementById('chart3');
const myChart = echarts.init(chartDom);

const option = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['USDT场外溢价','USDC场外溢价']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['13:10','13:20','13:30','13:40','13:50','14:00'],
        axisLabel: {
      interval: 0,          // 强制显示所有刻度
      rotate: 30,           // 旋转30度避免重叠
      margin: 15,           // 增加与轴线的距离
      fontSize: 12          // 适当缩小字体
    },
    axisTick: {
      alignWithLabel: true  // 刻度线与标签对齐
    }
  },
  yAxis: {
    type: 'value',
    min: 99.10,
    max: 99.80,
    interval: 0.1,
    axisLabel: {
      // 优化后的格式化器
      formatter: (value: number) => value.toFixed(2).replace(/\.00$/, '')
    }
  },
  series: [
    {
      name: 'USDT场外溢价',
      type: 'line',
   
      data: [99.75,99.65,99.73,99.78,99.75,99.68]
    },
    {
      name: 'USDC场外溢价',
      type: 'line',
    
      data: [99.20,99.23,99.30,99.25,99.25,99.28]
    }
  ]
};


option && myChart.setOption(option);
  }

 

  useEffect(()=>{

    renderChat1()
    renderChat2()
    renderChat3()


  },[])






    return (
      <div className='tradingDom'>
         <div className='searchDom'>
            
         </div>
         <div className='chartDoms'>
           <Row>
            <Col span={8}>
            <div className='chartDom'>
               <h6>BTC多账户比 <Tag color="volcano">合约</Tag></h6>
               <div className='searchBox'>
                <Tag>5分钟</Tag>
                <Tag>1小时</Tag>
                <Tag>1天</Tag>
               </div>
               <div id='chart1' className='chartBox'>
                 
               </div>
            </div>
            </Col>
            <Col span={8}>
            <div className='chartDom'>
              <h6>BTC杠杆多空比 <Tag color="geekblue">现货</Tag></h6>
              <div className='searchBox'>
                <Tag>5分钟</Tag>
                <Tag>1小时</Tag>
                <Tag>1天</Tag>
               </div>
               <div id='chart2' className='chartBox'></div>
            </div>
            </Col>
            <Col span={8}>
            <div className='chartDom'>
              <h6>USDT & USDC场外溢价 <Tag color="geekblue">现货</Tag></h6>
                            <div className='searchBox'>
                <Tag>5分钟</Tag>
                <Tag>1小时</Tag>
                <Tag>1天</Tag>
               </div>
               <div id='chart3' className='chartBox'></div>
            </div>
            </Col>
           </Row>
         </div>
      </div>
    )
}

export default Index