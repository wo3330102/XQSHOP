import request from '@/utils/request'

export function EditPay(data) {
  return request({
    url: 'api/PayPalConfig',
    method: 'PUT',
    data
  })
}

export function GetPayDetail(id) {
  return request({
    url: 'api/PayPalConfig/' + id,
    method: 'get'
    // params: id
  })
}

// 获取payssion详情
export function getPayssion(params){
  return request({
    url: 'api/payssionConfig/getPayssion',
    method: 'get', 
    params
  })
}

// 修改payssion
export function editPayssion(data){
  return request({
    url: 'api/payssionConfig',
    method: 'post',
    data
  })
}
  
// 获取COD 
export function getCOD(params){
  return request({
    url: 'api/codConfig/getCod',
    method: 'get',
    params
  })
}

// 修改COD 
export function editCOD(data){
  return request({
    url: 'api/codConfig',
    method: 'post',
    data
  })
}


