import request from '@/utils/request'
export function getlist(params) { 
  return request({
    url: 'api/yxStoreProductRecommend/recommend',
    method: 'get',
    params
  })
}

export function getInfo(params) {
  return request({
    url: 'api/yxStoreProductRecommend/recommend_info',
    method: 'get',
    params
  })
}

export function editStatus(params) {
  return request({
    url: 'api/yxStorePlugRecommend/openOrClose/'+params.storeId + '/' + params.isOpen,
    method: 'get',  
  })
}

export function edit(data) {
  return request({
    url: 'api/yxStoreProductRecommend/update_recommend_info',
    method: 'put',
    data
  })
}

export function updateConfig(data) {
  return request({
    url: 'api/yxStorePlugRecommend/updateConfig',
    method: 'put',
    data
  })
}

export function getConfig(params) { 
  return request({
    url: 'api/yxStorePlugRecommend/getConfig',
    method: 'get',
    params
  })
}

// export function add(data) {
//   return request({
//     url: 'api/yxStorePromotions',
//     method: 'post',
//     data
//   })
// }
// export function del(data) {
//   return request({
//     url: 'api/yxStorePromotions',
//     method: 'delete', 
//     data
//   })
// } 
// export function editStatus(params) {
//   return request({
//     url: 'api/yxStorePromotions/mod',
//     method: 'post',
//     params
//   })
// } 