import request from '@/utils/request'  

// 新增秒杀
export function addSeckill(data){
  return request({
    url:'api/seckill/add',
    method:'post',
    data
  })
} 

// 修改秒杀
export function editSeckill(data){
  return request({
    url:'api/seckill/update',
    method:'post',
    data
  })
} 

// 修改秒杀状态 
export function editSeckillStatus(data){
  return request({
    url:'api/seckill/status',
    method:'post',
    data
  })
} 

// 删除秒杀 
export function delSeckill(data){
  return request({
    url:'api/seckill',
    method:'delete',
    data
  })
} 

// 批量删除

export function delSeckillSelect(data){
  return request({
    url:'api/seckill/deleteIds',
    method:'delete',
    data
  })
}

// 获取秒杀规则 
export function getSeckillRules(id){
  return request({
    url:'api/seckill/ruleDetail/'+id,
    method:'get', 
  })
}

// 新增秒杀规则
export function addSeckillRules(data){
  return request({
    url:'api/seckillRule/add',
    method:'post',
    data
  })
}

// 修改秒杀规则
export function editSeckillRules(data){
  return request({
    url:'api/seckillRule/update',
    method:'post',
    data
  })
}

