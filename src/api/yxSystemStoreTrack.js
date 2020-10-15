
import request from '@/utils/request'
export function get(params) {
    return request({
      url: 'api/yxSystemStoreTrack',
      method: 'get',
      params
    })
  }
  
  export function add(data) {
    return request({
      url: 'api/yxSystemStoreTrack',
      method: 'post',
      data
    })
  }
  export function del(data) {
    return request({
      url: 'api/yxSystemStoreTrack',
      method: 'delete', 
      data
    })
  }
  export function edit(data) {
    return request({
      url: 'api/yxSystemStoreTrack',
      method: 'put',
      data
    })
  }  