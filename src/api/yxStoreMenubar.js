import request from '@/utils/request' 

export function get(params) { 
    return request({
        url: 'api/yxStoreMenubar',
        method: 'get',
        params
    })
}

export function add(data) { 
    return request({
        url: 'api/yxStoreMenubar',
        method: 'post',
        data
    })
} 

export function edit(data) { 
    return request({
        url: 'api/yxStoreMenubar',
        method: 'put',
        data
    })
} 

export function del(data) { 
    return request({
        url: 'api/yxStoreMenubar',
        method: 'delete',
        data
    })
} 