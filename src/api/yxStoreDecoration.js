import request from '@/utils/request' 

export function getCodeURL(params) { 
    return request({
        url: 'api/yxStoreMenubar',
        method: 'get',
        params
    })
}
export function queryPage(params) { 
    return request({
        url: 'api/yxStoreTemplate/queryPage',
        method: 'get',
        params
    })
}
