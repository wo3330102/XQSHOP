import request from '@/utils/request'
export function addCoupon(data){
  return request({
    url:'api/coupon',
    method:'post',
    data
  })
}

// 获取会员分组
export function getLevels(){
  return request({
    url:'api/coupon/getLevels',
    method:'get', 
  })
}