import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/yxSystemStore',
    method: 'post',
    data
  })
}

// export function getShop() {
//   return request({
//     url: 'api/yxSystemStore',
//     method: 'get'
//   })
// }

export function getShopId() {
  return request({
    url: 'api/yxSystemStore/storeId',
    method: 'get'
  })
}


export function getShopById(id) {
  return request({
    url: 'api/yxSystemStore/'+id,
    method: 'get'
  })
}

export function getAll() {
  return request({
    url: 'api/yxSystemStore/all',
    method: 'get'
  })
}

export function getL(data) {
  return request({
    url: 'api/yxSystemStore/getL',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/yxSystemStore/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/yxSystemStore',
    method: 'put',
    data
  })
}

export function changeTem(data){
  return request({
    url: 'api/yxSystemStore/updateTempLink',
    method: 'put',
    data
  })
}

// 获取国家列表

export function getContryList(params){
  return request({
    url: 'api/yxCountryData',
    method: 'get',
    params
  })
}

export default { getL, add, edit, del, getShopId, getAll }
// getShop,
