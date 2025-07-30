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



    const renderChat4 = ()=>{
const chartDom = document.getElementById('chart4');
const myChart = echarts.init(chartDom);

const option = {
  color: ['#12e366', '#58eb93', '#ff7887', '#ffa0ab'], // 自定义颜色数组
  tooltip: {
    trigger: 'item'
  },
  
  legend: {
    top: '5%',
    left: 'left', // 图例靠左排列
    orient: 'vertical', // 垂直排列（可选，默认水平）
    textStyle: {
      color: '#333' // 图例文字颜色
    }
  },
    grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '看涨买入' },
        { value: 735, name: '看涨卖出' },
        { value: 580, name: '看跌买入' },
        { value: 484, name: '看跌卖出' },
      ]
    }
  ]
};


option && myChart.setOption(option);
  }


  
      const renderChat5 = ()=>{
const chartDom = document.getElementById('chart5');
const myChart = echarts.init(chartDom);

const option = {
  color: ['#12e366','#ff7887'], 
// 添加图例配置
  legend: {
    data: ['看涨期权', '看跌期权'],
    top: 10
  },
  // X轴配置：时间轴（8:30-9:00，每5分钟递增）
  xAxis: {
    type: 'category',
    data: ['8:30', '8:35', '8:40', '8:45', '8:50', '8:55', '9:00'],
    name: '时间',
    nameLocation: 'middle',
    nameGap: 30
  },
  // Y轴配置：0.0-30.0，间隔5
  yAxis: {
    type: 'value',
    min: 0.0,
    max: 30.0,
    interval: 5.0,
    name: '数值',
    nameLocation: 'middle',
    nameGap: 40,
    axisLabel: {
      formatter: '{value}'
    }
  },
  // 散点图数据系列
  series: [
    {
      name: '看涨期权',
      type: 'scatter',
      symbolSize: 15,
      // 模拟看涨期权数据（x轴时间，y轴数值）
      data: [
        ['8:30', 26.2],
        ['8:35', 18.7],
        ['8:40', 22.3],
        ['8:45', 15.8],
        ['8:50', 24.2],
        ['8:55', 23.6],
        ['9:00', 25.3]
      ]
    },
    {
      name: '看跌期权',
      type: 'scatter',
      symbolSize: 15,
      // 模拟看跌期权数据（x轴时间，y轴数值）
      data: [
        ['8:30', 7.5],
        ['8:35', 10.1],
        ['8:40', 13.8],
        ['8:45', 15.4],
        ['8:50', 3.9],
        ['8:55', 12.3],
        ['9:00', 8.6]
      ]
    }
  ]
};


option && myChart.setOption(option);
  }


    const renderChat6 = ()=>{
const chartDom = document.getElementById('chart6');
const myChart = echarts.init(chartDom);

const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  legend: {
    data: ['持仓量', '成交量']
  },
  xAxis: [
    {
      type: 'category',
      data: ['8:00','8:05','8:10','8:15','8:20','8:25','8:30','8:35','8:40','8:45','8:50','8:55','9:00','9:05','9:10','9:15','9:20','9:25','9:30'
      ],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '持仓量(亿)',
      min: 45,
      max: 46,
      interval: 0.1,
      axisLabel: {
        formatter: '{value}'
      }
    },
    {
      type: 'value',
      name: '成交量(亿)',
      min: 0,
      max: 2.5,
      interval: 0.5,
      axisLabel: {
        formatter: '{value}'
      }
    }
  ],
  series: [

    {
      name: '持仓量',
      type: 'bar',
      data: [
        45.12,45.3,45.14,45.31,45.12,45.33,45.42,45.39,45.62,45.31,45.12,45.32,45.92,45.73,45.82,45.3,45.67,45.93
      ]
    },
    {
      name: '成交量',
      type: 'line',
      yAxisIndex: 1,
      data: [0.4,0.5,0.6,0.7,0.8,0.9,1.0,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2.0,2.1]
    }
  ]
};




option && myChart.setOption(option);
  }
 


  useEffect(()=>{

    renderChat1()
    renderChat2()
    renderChat3()
    renderChat4()
    renderChat5()
    renderChat6()

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
            <Col span={8}>
            <div className='chartDom'>
              <h6>看涨/看跌主动买卖量<Tag color="volcano">期权</Tag></h6>
             <div className='searchBox'>
                <Tag>8小时</Tag>
                <Tag>1天</Tag>
               </div>
               <div id='chart4' className='chartBox'></div>
            </div>
            </Col>
            
                        <Col span={8}>
            <div className='chartDom'>
              <h6>订单成交热力图<Tag color="geekblue">期权</Tag></h6>
             <div className='searchBox'>
               </div>
               <div id='chart5' className='chartBox'></div>
            </div>
            </Col>

                <Col span={8}>
            <div className='chartDom'>
              <h6>BTC合约持仓量及成交量<Tag color="geekblue">期权</Tag></h6>
             <div className='searchBox'>
                <Tag>5分钟</Tag>
                <Tag>1小时</Tag>
                <Tag>1天</Tag>
               </div>
               <div id='chart6' className='chartBox'></div>
            </div>
            </Col>
           </Row>
         </div>
      </div>
    )
}

export default Index
