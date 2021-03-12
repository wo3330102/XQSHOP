import request from '@/utils/request'
export function addCoupon(data){
  return request({
    url:'api/coupon',
    method:'post',
    data
  })
}