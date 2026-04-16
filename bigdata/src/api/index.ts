import request from '@/utils/request'


const login = '/bigData/login'
const fileList = '/bigdata/fileList'
const savehashTofile = '/bigdata/savehashTofile'
const deleteFile = '/bigdata/deleteFile'
const todoList = '/bigdata/workbench/todoList'
const createTodo = '/bigdata/workbench/createTodo'
const getTodoList = '/bigdata/workbench/todoList'
const getSysMsgList = '/bigdata/workbench/systemMessageList'
const virtualAssetList = '/bigdata/virtualAssetList'
const aiPropertyList = '/bigdata/aiPropertyList'

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

export const todoListApi = (params: any) => {
    return request({
        url: todoList,
        method: 'get',
        params
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

export const getTodoListApi = (params: any) => {
    return request({
        url: getTodoList,
        method: 'get',
        params
    })
}

export const createTodoApi = (data: any) => {
    return request({
        url: createTodo,
        method: 'post',
        data
    })
}

export const getSysMsgListApi = (params: any) => {
    return request({
        url: getSysMsgList,
        method: 'get',
        params
    })
}

export const virtualAssetListApi = (params: any) => {
    return request({
        url: virtualAssetList,
        method: 'get',
        params
    })
}

export const aiPropertyListApi = (params: any) => {
    return request({
        url: aiPropertyList,
        method: 'get',
        params
    })
}
