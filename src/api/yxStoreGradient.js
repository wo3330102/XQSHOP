import request from '@/utils/request'

export function get(params) {
    return request({
        url: 'api/yxStoreGradient',
        method: 'get',
        params
    })
}

export function add(data) {
    return request({
        url: 'api/yxStoreGradient',
        method: 'post',
        data
    })
}

export function edit(data) {
    return request({
        url: 'api/yxStoreGradient',
        method: 'put',
        data
    })
}

export function del(data) {
    return request({
        url: 'api/yxStoreGradient',
        method: 'delete',
        data
    })
}

export function changeMenuBarStatus(params) {
    return request({
        url: 'api/yxStoreGradient/mod',
        method: 'post',
        params
    })
}

export function getStatus(params) {
    return request({
        url: 'api/yxStoreGradient/gradientConfigs',
        method: 'get',
        params
    })
}

export function changeStatus(data) {
    return request({
        url: 'api/yxStoreGradient/isOpne',
        method: 'post',
        data
    })
}