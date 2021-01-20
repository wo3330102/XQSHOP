import request from '@/utils/request'
export function getShop(username, password, code, uuid) {
    return request({
        url: 'auth/login',
        method: 'post',
        data: {
            username,
            password,
            code,
            uuid
        }
    })
}

export function getStoreTemplate() {
    return request({
        url: 'api/yxSystemStoreTemplate/queryPage',
        method: 'get', 
    })
} 