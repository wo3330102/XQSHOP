import request from '@/utils/request'
// 根据商品id获取评论列表
export function getCommentListById(params) {
  return request({
    url: 'api/getYxStoreProductReplyList',
    method: 'get',
    params 
  })
}
// 审核评论
export function reviewComment(data) {
  return request({
    url: 'api/yxStoreProductReply/updateStatusAll',
    method: 'put',
    data 
  })
}

// 根据商品id获取SKU
export function getSKUListById(id) {
  return request({
    url: 'api/getYxStoreProductSku/'+id,
    method: 'get', 
  })
}

// 新增评论
export function addComment(data) {
  return request({
    url: 'api/yxStoreProductReply',
    method: 'post',
    data 
  })
}
// // 删除
// export function deleteAll(data) {
//   return request({
//     url: 'api/yxStoreProductReply/deleteAll',
//     method: 'get',
//     data
//   })
// }
// 控制当前商品评论列表是否展示
export function editMainStatus(data) {
  return request({
    url: 'api/yxStoreProductReply/'+data.isShowReply+'/'+data.productId,
    method: 'put', 
  })
}
// 修改多条评论是否展示
export function editStatus(status,data) {
  return request({
    url: 'api/yxStoreProductReply/updateIsShowAll/'+status,
    method: 'put',
    data
  })
}
// 删除评论
export function del(data) {
  return request({
    url: 'api/yxStoreProductReply/deleteAll',
    method: 'delete',
    data
  })
} 
// 修改评论内容
export function editComment(data){
  return request({
    url:'api/yxStoreProductReply',  // /updateById
    method:'put',
    data
  })
}
// 置顶
export function topping(data){
  return request({
    url:'api/yxStoreProductReply/updateIsTop/1',  // /updateById
    method:'put',
    data
  })
} 



// export function getCommentListById(params) {
//   return request({
//     url: 'api/getYxStoreProductReply',
//     method: 'get',
//     params
//   })
// }

