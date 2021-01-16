import request from '@/utils/request'

export function getCitys() {
  return request({
    url: 'api/yxShippingTemplates/citys',
    method: 'get',
  })
}

export function getCommodity(params){
  return request({
    url: 'api/yxShippingTemplates/templatessProductList',
    method: 'get',
    params
  }) 
}

export function createShipping(data){
  return request({
    url:'api/yxShippingTemplates/createShipping',
    method:'post',
    data
  })
}

export function getPlanList(params){
  return request({
    url:'api/yxShippingTemplates/getYxShippingTemplatess',
    method:'get', 
    params
  })
} 

export function getPlanDetail(id){
  return request({
    url:'api/yxShippingTemplates/getShippingSet/'+id,
    method:'get', 
  })
} 

export function save(data){
  return request({
    url:'api/yxShippingTemplates/save',
    method:'post',
    data
  })
}

export function getPlan(params){
  return request({
    url:'api/yxShippingTemplates/getYxShippingTemplatess',
    method:'get',
    params,
  })
}