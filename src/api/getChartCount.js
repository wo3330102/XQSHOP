
import request from '@/utils/request'
export function getChartCount(params) {
    return request({
      url: 'api/data/getChartCount',
      method: 'get',
      params
    })
  } 

export function getHotProduct(params){
  return request({
    url: 'api/yxStoreProduct/hot',
    method: 'get',
    params
  })
  
}