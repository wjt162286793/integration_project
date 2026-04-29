import request from '@/utils/request'


const login = '/auth/login'
const fileList = '/bigdata/fileList'
const savehashTofile = '/bigdata/savehashTofile'
const deleteFile = '/bigdata/deleteFile'
const fileCheck = '/bigdata/file/check'
const todoList = '/bigdata/workbench/todoList'
const createTodo = '/bigdata/workbench/createTodo'
const getTodoList = '/bigdata/workbench/todoList'
const getSysMsgList = '/bigdata/workbench/systemMessageList'
const virtualAssetList = '/bigdata/virtualAssetList'
const aiPropertyList = '/bigdata/aiPropertyList'
const physicalAssetList = '/bigdata/physicalAssetList'
const dictAiStatus = '/bigdata/dict/aiStatus'
const dictVirtualStatus = '/bigdata/dict/virtualStatus'
const dictVirtualType = '/bigdata/dict/virtualType'
const dictPhysicalCategory = '/bigdata/dict/physicalCategory'
const createAiProperty = '/bigdata/createAiProperty'
const updateAiProperty = '/bigdata/updateAiProperty'
const deleteAiProperty = '/bigdata/deleteAiProperty'
const createVirtual = '/bigdata/createVirtual'
const updateVirtual = '/bigdata/updateVirtual'
const deleteVirtual = '/bigdata/deleteVirtual'
const createPhysicalAsset = '/bigdata/createPhysicalAsset'
const updatePhysicalAsset = '/bigdata/updatePhysicalAsset'
const deletePhysicalAsset = '/bigdata/deletePhysicalAsset'
const chartOverview = '/bigdata/chart/overview'
const modeBuildFlowList = '/bigdata/modeBuild/flow/list'
const modeBuildFlowDetail = '/bigdata/modeBuild/flow/detail'
const modeBuildFlowCreate = '/bigdata/modeBuild/flow/create'
const modeBuildFlowSave = '/bigdata/modeBuild/flow/save'
const modeBuildFlowUpdateMeta = '/bigdata/modeBuild/flow/updateMeta'
const modeBuildFlowDelete = '/bigdata/modeBuild/flow/delete'
const modeBuildOrgList = '/bigdata/modeBuild/org/list'
const modeBuildOrgDetail = '/bigdata/modeBuild/org/detail'
const modeBuildOrgCreate = '/bigdata/modeBuild/org/create'
const modeBuildOrgSave = '/bigdata/modeBuild/org/save'
const modeBuildOrgUpdateMeta = '/bigdata/modeBuild/org/updateMeta'
const modeBuildOrgDelete = '/bigdata/modeBuild/org/delete'

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

export const fileCheckApi = (params: any) => {
    return request({
        url: fileCheck,
        method: 'get',
        params
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

export const physicalAssetListApi = (params: any) => {
    return request({
        url: physicalAssetList,
        method: 'get',
        params
    })
}

export const dictAiStatusApi = (params: any) => {
    return request({
        url: dictAiStatus,
        method: 'get',
        params
    })
}

export const dictVirtualStatusApi = (params: any) => {
    return request({
        url: dictVirtualStatus,
        method: 'get',
        params
    })
}

export const dictVirtualTypeApi = (params: any) => {
    return request({
        url: dictVirtualType,
        method: 'get',
        params
    })
}

export const dictPhysicalCategoryApi = (params: any) => {
    return request({
        url: dictPhysicalCategory,
        method: 'get',
        params
    })
}

export const createAiPropertyApi = (data: any) => {
    return request({
        url: createAiProperty,
        method: 'post',
        data
    })
}

export const updateAiPropertyApi = (data: any) => {
    return request({
        url: updateAiProperty,
        method: 'post',
        data
    })
}

export const deleteAiPropertyApi = (data: any) => {
    return request({
        url: deleteAiProperty,
        method: 'post',
        data
    })
}

export const createVirtualApi = (data: any) => {
    return request({
        url: createVirtual,
        method: 'post',
        data
    })
}

export const updateVirtualApi = (data: any) => {
    return request({
        url: updateVirtual,
        method: 'post',
        data
    })
}

export const deleteVirtualApi = (data: any) => {
    return request({
        url: deleteVirtual,
        method: 'post',
        data
    })
}

export const createPhysicalAssetApi = (data: any) => {
    return request({
        url: createPhysicalAsset,
        method: 'post',
        data
    })
}

export const updatePhysicalAssetApi = (data: any) => {
    return request({
        url: updatePhysicalAsset,
        method: 'post',
        data
    })
}

export const deletePhysicalAssetApi = (data: any) => {
    return request({
        url: deletePhysicalAsset,
        method: 'post',
        data
    })
}

export const chartOverviewApi = (params: any) => {
    return request({
        url: chartOverview,
        method: 'get',
        params
    })
}

export const modeBuildFlowListApi = (params: any) => {
    return request({
        url: modeBuildFlowList,
        method: 'get',
        params
    })
}

export const modeBuildFlowDetailApi = (params: any) => {
    return request({
        url: modeBuildFlowDetail,
        method: 'get',
        params
    })
}

export const modeBuildFlowCreateApi = (data: any) => {
    return request({
        url: modeBuildFlowCreate,
        method: 'post',
        data
    })
}

export const modeBuildFlowSaveApi = (data: any) => {
    return request({
        url: modeBuildFlowSave,
        method: 'post',
        data
    })
}

export const modeBuildFlowUpdateMetaApi = (data: any) => {
    return request({
        url: modeBuildFlowUpdateMeta,
        method: 'post',
        data
    })
}

export const modeBuildFlowDeleteApi = (data: any) => {
    return request({
        url: modeBuildFlowDelete,
        method: 'post',
        data
    })
}

export const modeBuildOrgListApi = (params: any) => {
    return request({
        url: modeBuildOrgList,
        method: 'get',
        params
    })
}

export const modeBuildOrgDetailApi = (params: any) => {
    return request({
        url: modeBuildOrgDetail,
        method: 'get',
        params
    })
}

export const modeBuildOrgCreateApi = (data: any) => {
    return request({
        url: modeBuildOrgCreate,
        method: 'post',
        data
    })
}

export const modeBuildOrgSaveApi = (data: any) => {
    return request({
        url: modeBuildOrgSave,
        method: 'post',
        data
    })
}

export const modeBuildOrgUpdateMetaApi = (data: any) => {
    return request({
        url: modeBuildOrgUpdateMeta,
        method: 'post',
        data
    })
}

export const modeBuildOrgDeleteApi = (data: any) => {
    return request({
        url: modeBuildOrgDelete,
        method: 'post',
        data
    })
}
