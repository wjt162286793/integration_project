import request from '@/utils/request'


const login = '/exchange/login'
const getInfo = '/exchange/userInfo'
const createBuy = '/exchange/pay/createBuy'
const buyInfo = '/exchange/pay/buyInfo'
const order = '/exchange/pay/order'
const cancelOrder = '/exchange/pay/cancelOrder'
const history = '/exchange/pay/history'
const payhd = '/exchange/pay/payhd'
const otcMerchants = '/exchange/pay/merchants'
const marketOverview = '/exchange/market/overview'
const marketSymbols = '/exchange/market/symbols'
const marketKline = '/exchange/market/kline'
const marketTicker = '/exchange/market/ticker'
const marketRates = '/exchange/market/rates'
const orderBook = '/exchange/account/orderbook'
const assets = '/exchange/account/assets'
const spotOrders = '/exchange/account/orders'


export const loginApi = (data: any) => {
    return request({
        url: login,
        method: 'post',
        data
    })
}

export const getInfoApi = (params: any) => {
    return request({
        url: getInfo,
        method: 'get',
        params
    })
}

export const createBuyApi = (data: any) => {
    return request({
        url: createBuy,
        method: 'post',
        data
    })
}

export const buyInfoApi = (params: any) => {
    return request({
        url: buyInfo,
        method: 'get',
        params
    })
}

export const orderApi = (data: any) => {
    return request({
        url: order,
        method: 'post',
        data
    })
}

export const cancelOrderApi = (params: any) => {
    return request({
        url: cancelOrder,
        method: 'get',
        params
    })
}

export const historyApi = (params: any) => {
    return request({
        url: history,
        method: 'get',
        params
    })
}

export const payhdApi = (data: any) => {
    return request({
        url: payhd,
        method: 'post',
        data
    })
}
export const otcMerchantsApi = (params?: any) => request({ url: otcMerchants, method: 'get', params })

export const marketOverviewApi = () => request({ url: marketOverview, method: 'get' })
export const marketSymbolsApi = () => request({ url: marketSymbols, method: 'get' })
export const marketKlineApi = (params: any) => request({ url: marketKline, method: 'get', params })
export const marketTickerApi = (params: any) => request({ url: marketTicker, method: 'get', params })
export const marketRatesApi = () => request({ url: marketRates, method: 'get' })
export const orderBookApi = (params: any) => request({ url: orderBook, method: 'get', params })
export const assetsApi = () => request({ url: assets, method: 'get' })
export const spotOrdersApi = (params?: any) => request({ url: spotOrders, method: 'get', params })
export const createSpotOrderApi = (data: any) => request({ url: spotOrders, method: 'post', data })
export const cancelSpotOrderApi = (id: string) => request({ url: `${spotOrders}/${id}/cancel`, method: 'post' })
