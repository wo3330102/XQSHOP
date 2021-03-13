import request from '@/utils/request'

export function addMain(data){
  return request({
    url:'api/yxComposeProduct',
    method:'post',
    data
  })
}
// 批量添加
export function addSecond(data){
  return request({
    url:'api/yxComposeProduct/save/second',
    method:'post',
    data
  })
}

export function changeStatus(params){
  return request({
    url:'api/yxComposeProduct/openOrClose',
    method:'get',
    params
  })
}

export function getDetail(params){ 
  return request({
    url:'api/yxComposeProduct/detail',
    method:'get',
    params
  })
}

export function del(data){
  return request({
    url:'api/yxComposeProduct',
    method:'delete',
    data
  }) 
} 

export function saveSecond(data){
  return request({
    url:'api/yxComposeProduct',
    method:'put',
    data
  })
}

export function getOption(params){
  return request({
    url:'api/yxComposeProduct/config',
    method:'get',
    params
  })
}

export function saveOption(data){
  return request({
    url:'api/yxComposeProduct/saveConfig',
    method:'post',
    data
  })
}