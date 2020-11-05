import request from '@/utils/request'

export function get(params) {
  return request({
    url: 'api/yxStoreProduct',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/yxStoreProduct/addOrSave',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/yxStoreProduct/' + id,
    method: 'delete'
  })
}

export function delMany(data) {
  return request({
    url: 'api/yxStoreProduct',
    method: 'delete',
    data
  })
}

export function edit(data) {
  return request({
    url: 'api/yxStoreProduct',
    method: 'put',
    data
  })
}

export function onsale(id, data) {
  return request({
    url: 'api/yxStoreProduct/onsale/' + id,
    method: 'post',
    data
  })
}

export function recovery(id) {
  return request({
    url: 'api/yxStoreProduct/recovery/' + id,
    method: 'delete'
  })
}

export function isFormatAttr(id, data) {
  return request({
    url: 'api/yxStoreProduct/isFormatAttr/' + id ,
    method: 'post',
    data
  })
}

export function setAttr(id, data) {
  return request({
    url: 'api/yxStoreProduct/setAttr/' + id,
    method: 'post',
    data
  })
}

export function clearAttr(id) {
  return request({
    url: 'api/yxStoreProduct/clearAttr/' + id,
    method: 'post'
  })
}

export function getAttr(id) {
  return request({
    url: 'api/yxStoreProduct/attr/' + id,
    method: 'get'
  })
}

export function getInfo(e) {
  return request({
    url: 'api/yxStoreProduct/info/' + e.id + '/' + e.storeId,
    method: 'get'
  })
}

export function onsaleAll(data) {
  return request({
    url: 'api/yxStoreProduct/onsaleAll',
    method: 'post',
    data
  })
}



