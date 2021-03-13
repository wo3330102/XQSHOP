import request from "@/utils/request";
import httpRequest from "@/utils/httpRequest.js";
// 查询已发布模版
export function getPublished(params) {
  return httpRequest({
    url: "api/yxStoreTemplate/getPublished",
    method: "post",
    data: params,
  });
}
// 查询模板列表
export function queryPage(params) {
  return request({
    url: "api/yxStoreTemplate/queryPage",
    method: "get",
    params,
  });
}
// 新增模板
export function yxStoreTemplate(params) {
  return request({
    url: "api/yxStoreTemplate",
    method: "post",
    data: params,
  });
}
// 删除模板
export function deleteAll(params) {
  return httpRequest({
    url: "api/yxStoreTemplate/deleteAll",
    method: "post",
    data: params,
  });
}

// 重命名
export function rename(params) {
  return httpRequest({
    url: "api/yxStoreTemplate",
    method: "put",
    data: params,
  });
}

// 发布模板
export function publish(params) {
  return httpRequest({
    url: "api/yxStoreTemplate/publish",
    method: "post",
    data: params,
  });
}
