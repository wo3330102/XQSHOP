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

export function delPlan(data){
  return request({
    url:'api/yxShippingTemplates/deleteShippingPlan',
    method:'post',
    data,
  }) 
}

export function del(data){ 
  return request({
    url:'api/yxShippingTemplates/deleteAll',
    method:'delete',
    data,
  })
}

export function getCustomProduct(params){
  return request({
    url:'api/yxShippingTemplates/customProutList',
    method:'get',
    params
  })
}

export function addCustomProduct(data){
  return request({
    url:'api/yxShippingTemplates/addProduct',
    method:'post',
    data
  })
}

export function deleteTemplateProudct(data){
  return request({
    url:'api/yxShippingTemplates/deleteTemplateProudct',
    method:'post',
    data
  })
}

export function getPlanName(id){
  return request({
    url:'api/yxShippingTemplates/freeNameHists/'+id,
    method:'get'
  })
}

