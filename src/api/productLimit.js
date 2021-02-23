import request from '@/utils/request'
// 新增优惠商品
export function addLimited(data){
  return request({
    url:'api/productLimit/addLimited',
    method:'post',
    data
  })
}

// 查询可选商品列表
export function getOptionalProduct(params){
  return request({
    url:'api/productLimit/getOptionalProduct',
    method:'get',
    params
  })
}

// 删除优惠商品
export function delLimited(data){
  return request({
    url:'api/productLimit/delLimited',
    method:'post',
    data
  })
}

// 修改单个商品是否开启
export function isStatus(data){
  return request({
    url:'api/productLimit/isStatus',
    method:'post',
    data
  })
} 

// 修改插件是否开启
export function isOpne(data){
  return request({
    url:'api/productLimit/isOpne',
    method:'post',
    data
  })
}

// 修改限量商品信息
export function updateLimited(data){ 
  return request({
    url:'api/productLimit/updateLimited',
    method:'post',
    data
  })
} 