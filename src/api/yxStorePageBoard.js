import request from '@/utils/request' 

export function get(params) { 
    return request({
        url: 'api/yxStorePageBoard',
        method: 'get',
        params
    })
}

export function add(data) { 
    return request({
        url: 'api/yxStorePageBoard',
        method: 'post',
        data
    })
} 

export function edit(data) { 
    return request({
        url: 'api/yxStorePageBoard',
        method: 'put',
        data
    })
} 

export function del(data) { 
    return request({
        url: 'api/yxStorePageBoard',
        method: 'delete',
        data
    })
} 