
import request from '@/utils/request'
export function get(params) {
    return request({
      url: 'api/yxStorePromotions',
      method: 'get',
      params
    })
  }
  
  export function add(data) {
    return request({
      url: 'api/yxStorePromotions',
      method: 'post',
      data
    })
  }
  export function del(data) {
    return request({
      url: 'api/yxStorePromotions',
      method: 'delete', 
      data
    })
  }
  export function edit(data) {
    return request({
      url: 'api/yxStorePromotions',
      method: 'put',
      data
    })
  }  
  export function editStatus(params) {
    return request({
      url: 'api/yxStorePromotions/mod',
      method: 'post',
      params
    })
  } 

  