import request from '@/utils/request' 

// 获取会员分组
export function getLevels(){
  return request({
    url:'api/coupon/getLevels',
    method:'get', 
  })
}

// 新增
export function addCoupon(data){
  return request({
    url:'api/coupon',
    method:'post',
    data
  })
}

// 修改
export function editCoupon(data){
  return request({
    url:'api/coupon',
    method:'put',
    data
  })
}