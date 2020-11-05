import request from '@/utils/request' 

export function get(params) { 
    return request({
        url: 'api/yxStorePlugRate',
        method: 'get',
        params
    })
}

export function add(data) { 
    return request({
        url: 'api/yxStorePlugRate',
        method: 'post',
        data
    })
} 

export function edit(data) { 
    return request({
        url: 'api/yxStorePlugRate',
        method: 'put',
        data
    })
}  