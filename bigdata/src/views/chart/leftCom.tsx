import React, { useEffect } from 'react'
import * as echarts from 'echarts';
const LeftCom: React.FC = () => {

    const option1 = {
        title: {
            text: '日用户量统计',
            left: 'center',
            top: '8px'
        },
        xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [1000, 1230, 1424, 1218, 1350, 700, 560],
                type: 'line'
            }
        ]
    };

    const option2 = {
                title: {
            text: '应用领域占比',
            left: 'center',
            top: '8px'
        },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',  // 设置纵向排列
    right: '5%',         // 距离右侧5%
    top: 'center'        // 垂直居中对齐
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
        { value: 1048, name: '金融' },
        { value: 735, name: '工业' },
        { value: 150, name: '农业' },
      ]
    }
  ]
};

const option3 = {
    title: {
            text: '主要区域',
            left: 'center',
            top: '8px'
 },
  xAxis: {
    type: 'category',
    data: ['北京', '上海', '广州', '深圳', '西安', '成都', '杭州']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [260, 200, 150, 180, 90, 110, 130],
      type: 'bar'
    }
  ]
};


    const renderChart1 = () => {
        const chartDom = document.getElementById('item_chart_Box_1');
        const Chart = echarts.init(chartDom, 'dark');
        Chart.setOption(option1);
    }
    const renderChart2 = () => {
        const chartDom = document.getElementById('item_chart_Box_2');
        const Chart = echarts.init(chartDom, 'dark');
        Chart.setOption(option2);
    }
    const renderChart3 = () => {
        const chartDom = document.getElementById('item_chart_Box_3');
        const Chart = echarts.init(chartDom, 'dark');
        Chart.setOption(option3);
    }

    useEffect(() => {
        renderChart1()
        renderChart2()
        renderChart3()
    }, [])

    return (
        <div className='data_left_box'>
            <div className='data_left_chart_item' id='leftChart1'>
                <div id='item_chart_Box_1' className='chart_item_box'>
                </div>
                <div className='chart_border_top'></div>
                <div className='chart_border_bottom'></div>
                <div className='chart_border_left'></div>
                <div className='chart_border_right'></div>
            </div>
            <div className='data_left_chart_item' id='leftChart2'>
                <div id='item_chart_Box_2' className='chart_item_box'></div>
                <div className='chart_border_top'></div>
                <div className='chart_border_bottom'></div>
                <div className='chart_border_left'></div>
                <div className='chart_border_right'></div>
            </div>
            <div className='data_left_chart_item' id='leftChart3'>
                <div id='item_chart_Box_3' className='chart_item_box'></div>
                <div className='chart_border_top'></div>
                <div className='chart_border_bottom'></div>
                <div className='chart_border_left'></div>
                <div className='chart_border_right'></div>
            </div>
        </div>
    )

}

export default LeftCom
