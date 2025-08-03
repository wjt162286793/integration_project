import request from '@/utils/request'


const login = '/exchange/login'
const getInfo = '/exchange/userInfo'
const createBuy = '/exchange/pay/createBuy'
const buyInfo = '/exchange/pay/buyInfo'
const order = '/exchange/pay/order'
const cancelOrder = '/exchange/pay/cancelOrder'
const history = '/exchange/pay/history'
const payhd = '/exchange/pay/payhd'


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
