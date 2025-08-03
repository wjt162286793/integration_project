import request from '@/utils/request'


const login = '/bigData/login'
const fileList = '/bigdata/fileList'
const savehashTofile = '/bigdata/savehashTofile'
const deleteFile = '/bigdata/deleteFile'

export const loginApi = (data: any) => {
    return request({
        url: login,
        method: 'post',
        data
    })
}

export const fileListApi = (data: any) => {
    return request({
        url: fileList,
        method: 'get',
        data
    })
}

export const savehashTofileApi = (data: any) => {
    return request({
        url: savehashTofile,
        method: 'post',
        data
    })
}

export const deleteFileApi = (data: any) => {
    return request({
        url: deleteFile,
        method: 'post',
        data
    })
}