import request from '@/utils/request'
const api_url = '/bigProxy'

const login = '/bigData/login'
const fileList = '/bigdata/fileList'
const savehashTofile = '/bigdata/savehashTofile'
const deleteFile = '/bigdata/deleteFile'

export const loginApi = (data: any) => {
    return request({
        url: api_url+login,
        method: 'post',
        data
    })
}

export const fileListApi = (data: any) => {
    return request({
        url: api_url+fileList,
        method: 'get',
        data
    })
}

export const savehashTofileApi = (data: any) => {
    return request({
        url: api_url+savehashTofile,
        method: 'post',
        data
    })
}

export const deleteFileApi = (data: any) => {
    return request({
        url: api_url+deleteFile,
        method: 'post',
        data
    })
}