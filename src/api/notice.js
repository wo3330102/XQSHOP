import request from '@/utils/request';

// 获取店铺通知配置列表
export function getNotice(){
  return request({
    url:"api/notice/getNoticeConfigList/" + localStorage.getItem('storeId'),
    method:'get', 
  })
}

// 修改店铺通知
export function editNoticeStatus(data){
  return request({
    url:"api/notice/updateStoreNoticeConfig",
    method:'post', 
    data
  })
}

// 查询通知模板详情
export function getDetial(type){
  return request({
    url:"api/yxEmailTemplate/" + localStorage.getItem('storeId') + '/'+type,
    method:'get', 
  })
} 

// 新增运费模板
export function addTemp(data){
  return request({
    url:"api/yxEmailTemplate",
    method:'post', 
    data
  })
} 

// 新增运费模板
export function editTemp(data){
  return request({
    url:"api/yxEmailTemplate",
    method:'put', 
    data
  })
} 