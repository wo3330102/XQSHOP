import request from '@/utils/request' 

// 获取会员分组
export function getLevels(){
  return request({
    url:'api/coupon/getLevels',
    method:'get', 
  })
}

// 新增优惠券
export function addCoupon(data){
  return request({
    url:'api/coupon',
    method:'post',
    data
  })
}

// 修改优惠券
export function editCoupon(data){
  return request({
    url:'api/coupon',
    method:'put',
    data
  })
}

// 删除优惠券 
export function delCoupon(data){
  return request({
    url:'api/coupon',
    method:'delete',
    data
  })
}

// 修改优惠券状态 
export function changeStatus(params){
  return request({
    url:'api/coupon/isOpen',
    method:'get',
    params
  })
}

// 获取事件类型列表
export function getEvents(){
  return request({
    url:'api/coupon/event/getEvents',
    method:'get', 
  })
}

// 获取私人优惠券列表
export function getPersonCoupons(){
  return request({
    url:'api/coupon/event/getPersonCoupons',
    method:'get',
  })
}

// 新增优惠券事件
export function addCouponEvent(data){
  return request({
    url:'api/coupon/event',
    method:'post',
    data
  })
}

// 编辑优惠券事件
export function editCouponEvent(data){
  return request({
    url:'api/coupon/event',
    method:'put',
    data
  })
}

// 删除优惠券事件 
export function delCouponEvent(data){
  return request({
    url:'api/coupon/event',
    method:'delete',
    data
  })
}