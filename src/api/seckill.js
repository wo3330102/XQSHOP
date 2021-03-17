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