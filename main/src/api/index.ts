import request from '@/utils/request'
const api_url = '/api'


const api = {
    test:'/',
    login:'/login',
    getRoutes:'/getRoutes'
}


export const loginApi = (data:any)=>{
    return request.post({
        url:`${api_url}${api.login}`,
        data
    })
}
export const testApi = ()=>{
    return request({
        url:'/api/',
        params:null,
        method:'GET'
    })
}