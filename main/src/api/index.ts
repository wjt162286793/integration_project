import request from '@/utils/request'
const api_url = '/mainapi'

export interface ApiResponse<T = unknown> {
    code: number
    msg?: string
    data: T
}

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
export const loginApi = (data: any): Promise<ApiResponse<{ token?: string }>> => {
    return request({
        url:`${api_url}${api.login}`,
        method:'POST',
        data
    }) as unknown as Promise<ApiResponse<{ token?: string }>>
}

export const reqUserInfoApi = (): Promise<ApiResponse> => {
    return request({
        url:`${api_url}${api.reqUserInfo}`,
        method:'GET'
    }) as unknown as Promise<ApiResponse>
}
