import React, { useEffect } from 'react'
import * as echarts from 'echarts';
import { useTranslation } from 'react-i18next';
const RightCom: React.FC = () => {
  const { t } = useTranslation();

    const option1 = {
        title: {
            text: t('chart.moduleUsageDistribution'),
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: t('chart.digitalAssets') },
                    { value: 735, name: t('chart.dataDashboard') },
                    { value: 580, name: t('chart.modelBuilding') },
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
    };

    const option2 = {
        title: {
            text: t('chart.applicationDomainDistribution'),
            left: 'center',
            top: '8px'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',  
            right: '5%',         
            top: 'center'       
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
                    { value: 1048, name: t('chart.finance') },
                    { value: 735, name: t('chart.industry') },
                    { value: 150, name: t('chart.agriculture') },
                ]
            }
        ]
    };

    const option3 = {
        title: {
            text: t('chart.mainAssetGrowth'),
            left: 'center',
            top: '8px'
        },
        tooltip: {
            trigger: 'axis'
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
            data: [t('chart.january'), t('chart.february'), t('chart.march'), t('chart.april'), t('chart.may'), t('chart.june'), t('chart.july'), t('chart.august'), t('chart.september'), t('chart.october'), t('chart.november'), t('chart.december')]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: t('chart.bitcoin'),
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210, 230, 210, 230, 210, 230]
            },
            {
                name: t('chart.ethereum'),
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310, 330, 310, 330, 310, 330]
            },
            {
                name: t('chart.dogecoin'),
                type: 'line',
                stack: 'Total',
                data: [150, 232, 201, 154, 190, 330, 410, 330, 410, 330, 410, 330]
            },
            {
                name: t('chart.litecoin'),
                type: 'line',
                stack: 'Total',
                data: [320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390]
            },
            {
                name: t('chart.ripple'),
                type: 'line',
                stack: 'Total',
                data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290]
            }
        ]
    };


    const renderChart1 = () => {
        const chartDom = document.getElementById('item_chart_Box_4');
        console.log(chartDom, '111')
        const Chart = echarts.init(chartDom, 'dark');
        Chart.setOption(option1);
    }
    const renderChart2 = () => {
        const chartDom = document.getElementById('item_chart_Box_5');
        const Chart = echarts.init(chartDom, 'dark');
        Chart.setOption(option2);
    }
    const renderChart3 = () => {
        const chartDom = document.getElementById('item_chart_Box_6');
        const Chart = echarts.init(chartDom, 'dark');
        Chart.setOption(option3);
    }

    useEffect(() => {
        renderChart1()
        renderChart2()
        renderChart3()
    }, [])

    return (
        <div className='data_right_box'>
            <div className='data_right_chart_item' id='rightChart1'>
                <div id='item_chart_Box_4' className='chart_item_box'>
                </div>
                <div className='chart_border_top'></div>
                <div className='chart_border_bottom'></div>
                <div className='chart_border_left'></div>
                <div className='chart_border_right'></div>
            </div>
            <div className='data_right_chart_item' id='rightChart2'>
                <div id='item_chart_Box_5' className='chart_item_box'></div>
                <div className='chart_border_top'></div>
                <div className='chart_border_bottom'></div>
                <div className='chart_border_left'></div>
                <div className='chart_border_right'></div>
            </div>
            <div className='data_right_chart_item' id='rightChart3'>
                <div id='item_chart_Box_6' className='chart_item_box'></div>
                <div className='chart_border_top'></div>
                <div className='chart_border_bottom'></div>
                <div className='chart_border_left'></div>
                <div className='chart_border_right'></div>
            </div>
        </div>
    )

}

export default RightCom
