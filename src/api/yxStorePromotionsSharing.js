import request from '@/utils/request'
export function getShare(params) {
  return request({
    url: 'api/yxStorePromotionsSharing',
    method: 'get',
    params
  })
}

export function get() {
  return request({
    url: 'api/yxStorePromotionsSharing/promotion',
    method: 'get', 
  })
}



export function add(data) {
  return request({
    url: 'api/yxStorePromotionsSharing',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: 'api/yxStorePromotionsSharing',
    method: 'delete',
    data
  })
}
export function edit(data) {
  return request({
    url: 'api/yxStorePromotionsSharing',
    method: 'put',
    data
  })
}
export function editStatus(params) {
  return request({
    url: 'api/yxStorePromotionsSharing/mod',
    method: 'post',
    params
  })
}
export function getStatistics(params){
  return request({
    url: 'api/yxStoreSharingItem/sharing',
    method: 'get',
    params
  })
}