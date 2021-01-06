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
