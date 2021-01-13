import request from '@/utils/request'

export function getCitys() {
  return request({
    url: 'api/yxShippingTemplates/citys',
    method: 'get',
  })
}