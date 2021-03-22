import request from '@/utils/request'

// export function getCates(params) {
//   return request({
//     url: 'api/yxStoreCategory',
//     method: 'get',
//     params
//   })
// }

// export function add(data) {
//   return request({
//     url: 'api/yxStoreCategory',
//     method: 'post',
//     data
//   })
// }

// export function del(id) {
//   return request({
//     url: 'api/yxStoreCategory/' + id,
//     method: 'delete'
//   })
// }

// export function edit(data) {
//   return request({
//     url: 'api/yxStoreCategory',
//     method: 'put',
//     data
//   })
// }

export function getCates(params) {
  return request({
    url: 'api/yxStoreTag',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/yxStoreTag/v1',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: 'api/yxStoreTag',
    method: 'delete', 
    data
  })
}
export function edit(data) {
  return request({
    url: 'api/yxStoreTag/v1',
    method: 'put',
    data
  })
}   

// 查询所有一级分类
export function getNewCategoryList(params){ 
  return request({
    url: 'api/yxStoreTag/v1/list',
    method: 'get',
    params
  })
}

// 查询下级分类
export function getNewCategoryListByPid(params){ 
  return request({
    url: 'api/yxStoreTag/v1/listByPid',
    method: 'get',
    params
  })
}
 
// 查询上级分类（用于第三级分类）

export function getParentCategory(params){ 
  return request({
    url: 'api/yxStoreTag/v1/tag',
    method: 'get',
    params
  })
}



export default { add, edit, del, getCates }
