import request from '@/utils/request'
const api_url = '/api'


const api = {
    test:'/',
    login:'/portal/login',
    reqUserInfo:'/portal/userInfo',
}

export const testApi = ()=>{
    return request({
        url:'/api/',
        params:null,
        method:'GET'
    })
}
export const loginApi = (data:any)=>{
    return request({
        url:`${api_url}${api.login}`,
        method:'POST',
        data
    })
}

export const reqUserInfoApi = ()=>{
    return request({
        url:`${api_url}${api.reqUserInfo}`,
        method:'GET'
    })
}
