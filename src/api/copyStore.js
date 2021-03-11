import request from '@/utils/request'

export function createSecret(data){
  return request({
    url:'api/yxStoreCopy',
    method:'post',
    data
  })
}

export function copy(params){
  return request({
    url:'api/yxStoreCopy',
    method:'get',
    params
  })
}

export function copyDetail(params){
  return request({
    url:'api/yxStoreCopy/syncCount',
    method:'get',
    params
  })
}