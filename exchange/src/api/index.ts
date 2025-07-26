import request from '@/utils/request'

const login = '/exchange/login'
const getInfo = '/exchange/userInfo'


export const loginApi = (data: any) => {
    return request({
        url: '/exchangeApi'+login,
        method: 'post',
        data
    })
}

export const getInfoApi = (params: any) => {
    return request({
        url: '/exchangeApi'+getInfo,
        method: 'get',
        params
    })
}