import React, { useEffect, useRef, useState } from 'react';
import { createChart, CandlestickSeries, HistogramSeries, LineSeries } from 'lightweight-charts';
import { getKlineApi, getTickerApi } from '@/api';

type KlineItem = {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
};

type InfoData = {
    time?: number;
    filterTime?: string;
    open?: number;
    high?: number;
    low?: number;
    close?: number;
    ema7?: number;
    ema25?: number;
    volume?: number;
};

const intervalOptions = ['1m', '15m', '4h', '1d'];
const symbolOptions = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];

const Index: React.FC = () => {
    const chartRef = useRef<any>(null);
    const candleSeriesRef = useRef<any>(null);
    const volumeSeriesRef = useRef<any>(null);
    const ema7SeriesRef = useRef<any>(null);
    const ema25SeriesRef = useRef<any>(null);

    const [symbol, setSymbol] = useState('BTCUSDT');
    const [interval, setInterval] = useState('15m');
    const [showEma, setShowEma] = useState(true);
    const [showVolume, setShowVolume] = useState(true);
    const [infoData, setInfo] = useState<InfoData>({});
    const [ticker, setTicker] = useState<any>(null);

    const containerId = 'main_chart_container';

    const formatTime = (time: number) => {
        const date = new Date(time * 1000);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        return `${year}/${month}/${day} ${hour}:${minute}`;
    };

    const buildEma = (data: KlineItem[], period: number) => {
        if (!data.length) return [];
        const k = 2 / (period + 1);
        let ema = data[0].close;
        return data.map((item, index) => {
            if (index === 0) {
                ema = item.close;
            } else {
                ema = item.close * k + ema * (1 - k);
            }
            return { time: item.time, value: Number(ema.toFixed(8)) };
        });
    };

    const initChart = () => {
        const chartDom = document.getElementById(containerId);
        if (!chartDom) return;
        chartDom.innerHTML = '';

        const chart = createChart(chartDom, {
            layout: {
                textColor: '#d9d9d9',
                background: { type: 'solid', color: '#0b0b0b' }
            },
            grid: {
                vertLines: { color: '#1f1f1f' },
                horzLines: { color: '#1f1f1f' }
            },
            rightPriceScale: {
                borderColor: '#2a2a2a'
            },
            timeScale: {
                borderColor: '#2a2a2a',
                timeVisible: true,
                secondsVisible: false
            },
            crosshair: {
                mode: 1
            }
        });

        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350'
        });

        const volumeSeries = chart.addSeries(HistogramSeries, {
            color: '#2f7d32',
            priceFormat: { type: 'volume' },
            priceScaleId: ''
        });
        volumeSeries.priceScale().applyOptions({
            scaleMargins: { top: 0.8, bottom: 0 }
        });

        const ema7Series = chart.addSeries(LineSeries, {
            color: '#f5c542',
            lineWidth: 1
        });
        const ema25Series = chart.addSeries(LineSeries, {
            color: '#6f8cff',
            lineWidth: 1
        });

        chartRef.current = chart;
        candleSeriesRef.current = candleSeries;
        volumeSeriesRef.current = volumeSeries;
        ema7SeriesRef.current = ema7Series;
        ema25SeriesRef.current = ema25Series;

        chart.subscribeCrosshairMove((param: any) => {
            if (!param || !param.time) return;
            const candle = param.seriesData.get(candleSeriesRef.current);
            const volume = param.seriesData.get(volumeSeriesRef.current);
            const ema7 = param.seriesData.get(ema7SeriesRef.current);
            const ema25 = param.seriesData.get(ema25SeriesRef.current);
            if (candle) {
                setInfo({
                    time: candle.time,
                    filterTime: formatTime(candle.time),
                    open: candle.open,
                    high: candle.high,
                    low: candle.low,
                    close: candle.close,
                    ema7: ema7?.value,
                    ema25: ema25?.value,
                    volume: volume?.value
                });
            }
        });
    };

    const updateChart = (data: KlineItem[]) => {
        if (!chartRef.current || !candleSeriesRef.current) return;
        candleSeriesRef.current.setData(data);

        if (volumeSeriesRef.current) {
            const volumeData = data.map((item) => ({
                time: item.time,
                value: item.volume,
                color: item.close >= item.open ? '#2f7d32' : '#ab312e'
            }));
            volumeSeriesRef.current.setData(volumeData);
        }

        if (showEma) {
            const ema7 = buildEma(data, 7);
            const ema25 = buildEma(data, 25);
            ema7SeriesRef.current.setData(ema7);
            ema25SeriesRef.current.setData(ema25);
        } else {
            ema7SeriesRef.current.setData([]);
            ema25SeriesRef.current.setData([]);
        }

        if (volumeSeriesRef.current) {
            volumeSeriesRef.current.applyOptions({ visible: showVolume });
        }

        chartRef.current.timeScale().fitContent();
    };

    const fetchKline = async () => {
        const res = await getKlineApi({ symbol, interval, limit: 200 });
        if (res?.code === 200) {
            updateChart(res.data as KlineItem[]);
        }
    };

    const fetchTicker = async () => {
        const res = await getTickerApi({ symbol, interval });
        if (res?.code === 200) {
            setTicker(res.data);
        }
    };

    useEffect(() => {
        initChart();
        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.applyOptions({ width: document.getElementById(containerId)?.clientWidth || 0 });
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (chartRef.current) {
                chartRef.current.remove();
            }
        };
    }, []);

    useEffect(() => {
        fetchKline();
        fetchTicker();
        const task = setInterval(() => {
            fetchKline();
            fetchTicker();
        }, 5000);
        return () => clearInterval(task);
    }, [symbol, interval, showEma, showVolume]);

    const changeClass = (value: string, current: string) => (value === current ? 'toolbarBtn active' : 'toolbarBtn');

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
                            <span className='infoItem'>EMA7: <span className='value'>{infoData.ema7?.toFixed(2)}</span></span>
                            <span className='infoItem'>EMA25: <span className='value'>{infoData.ema25?.toFixed(2)}</span></span>
                            <span className='infoItem'>量: <span className='value'>{infoData.volume?.toFixed(2)}</span></span>
                        </div>
                    )
                }
            </div>

            <div className='chartToolbar'>
                <div className='toolbarGroup'>
                    {symbolOptions.map((item) => (
                        <button key={item} className={changeClass(item, symbol)} onClick={() => setSymbol(item)}>
                            {item.replace('USDT', '/USDT')}
                        </button>
                    ))}
                </div>
                <div className='toolbarGroup'>
                    {intervalOptions.map((item) => (
                        <button key={item} className={changeClass(item, interval)} onClick={() => setInterval(item)}>
                            {item}
                        </button>
                    ))}
                </div>
                <div className='toolbarGroup'>
                    <button className={showEma ? 'toolbarBtn active' : 'toolbarBtn'} onClick={() => setShowEma(!showEma)}>
                        EMA
                    </button>
                    <button className={showVolume ? 'toolbarBtn active' : 'toolbarBtn'} onClick={() => setShowVolume(!showVolume)}>
                        VOL
                    </button>
                </div>
                {ticker && (
                    <div className='tickerInfo'>
                        <span>最新价: {ticker.close?.toFixed(2)}</span>
                        <span style={{ color: ticker.changePct >= 0 ? '#2f7d32' : '#ab312e' }}>
                            {ticker.changePct >= 0 ? '+' : ''}{ticker.changePct?.toFixed(2)}%
                        </span>
                        <span>24h 高: {ticker.high?.toFixed(2)}</span>
                        <span>24h 低: {ticker.low?.toFixed(2)}</span>
                    </div>
                )}
            </div>

            <div className='mainChartOutDom'>
                <div
                    className='mainChartDom'
                    id={containerId}
                    style={{ width: '100%', height: '400px' }}
                ></div>
            </div>
            <div className='chartBottomDom'>
                <h5>工具</h5>
                <ul className='toolsUl'>
                    <li>
                        <p className='label'>现货网格</p>
                        <p>低买高卖 / 震荡行情 / 分批建仓</p>
                    </li>
                    <li>
                        <p className='label'>马丁格尔</p>
                        <p>信号触发 / 回撤加仓 / 风控提示</p>
                    </li>
                    <li>
                        <p className='label'>策略交易</p>
                        <p>多维指标组合,动态调整仓位</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Index;
