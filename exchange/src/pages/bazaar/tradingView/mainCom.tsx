import React, { useEffect, useState } from 'react';
import { createChart, HistogramSeries, CandlestickSeries, LineSeries } from 'lightweight-charts';


const Index: React.FC = () => {
    const renderFun = () => {
        let chartDom = document.getElementById('main_chart_container');
        if (chartDom) {
            chartDom.innerHTML = '';
        }

        const chartOptions = {
            layout: {
                textColor: '#fff',
                background: { type: 'solid', color: '#000' }
            },
        };

        const chart = createChart(document.getElementById('main_chart_container'), chartOptions);

        // K线图配置 - 使用字面量写死30个数据点
        const candlestickSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
            priceScale: {
                position: 'right',
                visible: true
            }
        });

        // K线图数据 (30天, 2025-01-01至2025-01-30)
        const data1 = [
            { type: '1', open: 100.00, high: 105.20, low: 98.50, close: 102.80, time: 1735689600 },
            { type: '1', open: 102.80, high: 108.30, low: 101.20, close: 106.50, time: 1735776000 },
            { type: '1', open: 106.50, high: 109.80, low: 103.10, close: 104.30, time: 1735862400 },
            { type: '1', open: 104.30, high: 107.50, low: 101.80, close: 106.90, time: 1735948800 },
            { type: '1', open: 106.90, high: 112.40, low: 105.70, close: 110.20, time: 1736035200 },
            { type: '1', open: 110.20, high: 115.80, low: 108.50, close: 113.70, time: 1736121600 },
            { type: '1', open: 113.70, high: 118.20, low: 111.30, close: 116.50, time: 1736208000 },
            { type: '1', open: 116.50, high: 119.80, low: 114.20, close: 115.70, time: 1736294400 },
            { type: '1', open: 115.70, high: 120.50, low: 113.80, close: 119.20, time: 1736380800 },
            { type: '1', open: 119.20, high: 123.40, low: 117.50, close: 121.80, time: 1736467200 },
            { type: '1', open: 121.80, high: 125.60, low: 119.30, close: 120.50, time: 1736553600 },
            { type: '1', open: 120.50, high: 124.80, low: 118.70, close: 123.20, time: 1736640000 },
            { type: '1', open: 123.20, high: 128.50, low: 121.40, close: 126.70, time: 1736726400 },
            { type: '1', open: 126.70, high: 130.20, low: 124.30, close: 125.80, time: 1736812800 },
            { type: '1', open: 125.80, high: 129.50, low: 123.10, close: 128.30, time: 1736899200 },
            { type: '1', open: 128.30, high: 132.70, low: 126.50, close: 131.20, time: 1736985600 },
            { type: '1', open: 131.20, high: 135.40, low: 129.80, close: 133.70, time: 1737072000 },
            { type: '1', open: 133.70, high: 138.20, low: 132.10, close: 136.50, time: 1737158400 },
            { type: '1', open: 136.50, high: 140.80, low: 134.30, close: 138.70, time: 1737244800 },
            { type: '1', open: 138.70, high: 142.50, low: 136.90, close: 137.40, time: 1737331200 },
            { type: '1', open: 137.40, high: 141.20, low: 135.80, close: 139.60, time: 1737417600 },
            { type: '1', open: 139.60, high: 145.30, low: 138.20, close: 143.80, time: 1737504000 },
            { type: '1', open: 143.80, high: 148.50, low: 141.70, close: 146.20, time: 1737590400 },
            { type: '1', open: 146.20, high: 150.30, low: 144.10, close: 145.50, time: 1737676800 },
            { type: '1', open: 145.50, high: 149.80, low: 143.20, close: 147.90, time: 1737763200 },
            { type: '1', open: 147.90, high: 153.50, low: 146.30, close: 151.20, time: 1737849600 },
            { type: '1', open: 151.20, high: 155.80, low: 149.70, close: 153.40, time: 1737936000 },
            { type: '1', open: 153.40, high: 158.20, low: 151.50, close: 156.70, time: 1738022400 },
            { type: '1', open: 156.70, high: 160.50, low: 154.30, close: 155.80, time: 1738108800 },
            { type: '1', open: 155.80, high: 159.20, low: 153.10, close: 157.60, time: 1738195200 }
        ];
        candlestickSeries.setData(data1);

        // 折线图配置 - 使用字面量写死30个数据点
        const lineSeries = chart.addSeries(LineSeries, {
            title: 'Line Series',
            color: '#2962FF',
            lineWidth: 2,
            priceScaleId: 'right',
        });

        const data2 = [
            { type: '2', value: 102.30, time: 1735689600 },
            { type: '2', value: 103.80, time: 1735776000 },
            { type: '2', value: 105.10, time: 1735862400 },
            { type: '2', value: 104.20, time: 1735948800 },
            { type: '2', value: 106.50, time: 1736035200 },
            { type: '2', value: 107.20, time: 1736121600 },
            { type: '2', value: 108.50, time: 1736208000 },
            { type: '2', value: 109.10, time: 1736294400 },
            { type: '2', value: 110.30, time: 1736380800 },
            { type: '2', value: 111.20, time: 1736467200 },
            { type: '2', value: 112.50, time: 1736553600 },
            { type: '2', value: 113.70, time: 1736640000 },
            { type: '2', value: 114.30, time: 1736726400 },
            { type: '2', value: 115.80, time: 1736812800 },
            { type: '2', value: 116.50, time: 1736899200 },
            { type: '2', value: 117.90, time: 1736985600 },
            { type: '2', value: 118.70, time: 1737072000 },
            { type: '2', value: 119.50, time: 1737158400 },
            { type: '2', value: 120.80, time: 1737244800 },
            { type: '2', value: 121.50, time: 1737331200 },
            { type: '2', value: 122.90, time: 1737417600 },
            { type: '2', value: 123.70, time: 1737504000 },
            { type: '2', value: 124.90, time: 1737590400 },
            { type: '2', value: 125.80, time: 1737676800 },
            { type: '2', value: 127.20, time: 1737763200 },
            { type: '2', value: 128.50, time: 1737849600 },
            { type: '2', value: 129.30, time: 1737936000 },
            { type: '2', value: 130.70, time: 1738022400 },
            { type: '2', value: 131.50, time: 1738108800 },
            { type: '2', value: 132.90, time: 1738195200 }
        ];
        lineSeries.setData(data2);

        // 直方图配置 - 使用字面量写死30个数据点
        const histogramSeries = chart.addSeries(HistogramSeries, { color: '#26a69a' });

        const data3 = [
            { type: '3', value: 28.42, time: 1735689600 },
            { type: '3', value: 32.15, time: 1735776000 },
            { type: '3', value: 26.95, time: 1735862400 },
            { type: '3', value: 34.73, time: 1735948800 },
            { type: '3', value: 27.84, time: 1736035200 },
            { type: '3', value: 31.82, time: 1736121600 },
            { type: '3', value: 29.32, time: 1736208000 },
            { type: '3', value: 33.67, time: 1736294400 },
            { type: '3', value: 30.08, time: 1736380800 },
            { type: '3', value: 35.23, time: 1736467200 },
            { type: '3', value: 28.13, time: 1736553600 },
            { type: '3', value: 33.51, time: 1736640000 },
            { type: '3', value: 31.24, time: 1736726400 },
            { type: '3', value: 29.76, time: 1736812800 },
            { type: '3', value: 34.13, time: 1736899200 },
            { type: '3', value: 30.59, time: 1736985600 },
            { type: '3', value: 32.84, time: 1737072000 },
            { type: '3', value: 27.92, time: 1737158400 },
            { type: '3', value: 33.26, time: 1737244800 },
            { type: '3', value: 31.58, time: 1737331200 },
            { type: '3', value: 30.23, time: 1737417600 },
            { type: '3', value: 34.81, time: 1737504000 },
            { type: '3', value: 28.76, time: 1737590400 },
            { type: '3', value: 32.45, time: 1737676800 },
            { type: '3', value: 30.89, time: 1737763200 },
            { type: '3', value: 33.72, time: 1737849600 },
            { type: '3', value: 29.54, time: 1737936000 },
            { type: '3', value: 34.15, time: 1738022400 },
            { type: '3', value: 31.32, time: 1738108800 },
            { type: '3', value: 33.03, time: 1738195200 }
        ];
        histogramSeries.setData(data3);



        chart.timeScale().fitContent();


        chart.subscribeCrosshairMove((param) => {
            if (param.time && (param.time !== infoData.time)) {

                let candleData = null;
                let lineData = null;
                let histData = null;
                let Index = 0
                param.seriesData.forEach((value, key) => {
                    if (Index === 0) {
                        candleData = value
                    } else if (Index === 1) {
                        lineData = value
                    } else if (Index === 2) {
                        histData = value
                    }
                    Index++

                });
                const info = {
                    //time转化为时间格式
                    time: candleData.time,
                    filterTime: getTime(candleData.time),
                    open: candleData.open,
                    high: candleData.high,
                    low: candleData.low,
                    close: candleData.close,
                    line: lineData.value,
                    hist: histData.value,
                }
                setInfo(info)
            } else {

            }
        });

        const getTime = (time) => {
            const date = new Date(time * 1000);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}/${month}/${day}`;
        }

        // 添加点击事件
        chart.subscribeClick((param) => {
            console.log('图表点击事件:', {
                点击位置: param.point,
                点击时间: param.time ? new Date(param.time * 1000).toLocaleString() : '未选择时间'
            });
            // 标记
            if (param.time && candlestickSeries) {
                // const price = param.seriesPrices.get(candlestickSeries);
                // if (price !== undefined) {
                //     candlestickSeries.createPriceLine({
                //         price: price.close || price,
                //         color: '#FF6B6B',
                //         lineWidth: 2,
                //         lineStyle: 2, // 虚线
                //         axisLabelVisible: true,
                //         title: `点击位置: ${price.close || price}`
                //     });

                //     // 3秒后移除标记
                //     setTimeout(() => {
                //         candlestickSeries.removePriceLine();
                //     }, 3000);
                // }
            }
        });

    };

    const [infoData, setInfo] = useState({
        time: undefined,
        filterTime: undefined,
        open: undefined,
        high: undefined,
        low: undefined,
        close: undefined,
        line: undefined,
        hist: undefined,
    })

    useEffect(() => {
        renderFun();
        // const task = setInterval(() => {
        //     console.log('执行---')
        //     renderFun();
        // }, 3000);

        // return () => {
        //     clearInterval(task);
        // };
    }, []);

    return (
        <div className='tradingmainDom'>
            <div className='topTitle'>
                <h5>图表</h5>
                {
                    infoData.time && (
                        <div>
                            <span className='infoItem'>时间: <span className='value'>{infoData.filterTime}</span></span>
                            <span className='infoItem'>开: <span className='value'>{infoData.open}</span></span>
                            <span className='infoItem'>高: <span className='value'>{infoData.high}</span></span>
                            <span className='infoItem'>低: <span className='value'>{infoData.low}</span></span>
                            <span className='infoItem'>收: <span className='value'>{infoData.close}</span></span>
                            <span className='infoItem'>折线: <span className='value'>{infoData.line}</span></span>
                            <span className='infoItem'>直方图: <span className='value'>{infoData.hist}</span></span>
                        </div>
                    )
                }

            </div>
            <div className='mainChartOutDom'>
                <div
                    className='mainChartDom'
                    id='main_chart_container'
                    style={{ width: '100%', height: '400px' }}
                ></div>
            </div>
            <div className='chartBottomDom'>
                <h5>工具</h5>
                <ul className='toolsUl'>
                    <li>
                        <p className='label'>现货网络</p>
                        <p>低买高卖 / 震荡向上行情 / 断中长线</p>
                    </li>
                    <li>
                        <p className='label'>现货马丁格尔</p>
                        <p>信号触发 / 震荡行情 / 分批加仓 </p>
                    </li>
                    <li>
                        <p className='label'>策略交易</p>
                        <p>多种智能策略,祝您轻松交易</p>
                    </li>
                    <li>
                        <p className='label'>现货跟单</p>
                        <p>与全球顶级交易员一起赚钱 </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Index;
