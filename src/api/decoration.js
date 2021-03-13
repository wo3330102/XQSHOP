import request from '@/utils/request'
// 根据模板id查询可编辑的模块
export function getModuleListById(params) {
  return request({
    url: 'api/storeTemplateEdit/selectTemplateModule',
    method: 'get',
    params 
  })
}
//添加模块
export function addModule(data) {
    return request({
      url: 'api/storeTemplateEdit/addModule',
      method: 'post',
      data 
    })
}
//删除模块
export function delModule(data) {
    return request({
      url: `api/storeTemplateEdit/deleteModule/${data}`,
      method: 'post',
      data 
    })
}

//修改模块
export function updateModule(data) {
    return request({
      url: 'api/storeTemplateEdit/updateModule',
      method: 'post',
      data 
    })
}

//复制模块
export function copyModule(data) {
    return request({
      url: `api/storeTemplateEdit/copyModule/${data}`,
      method: 'post',
      data 
    })
}

//模板编辑
export function templateDesign(data) {
  return request({
    url: 'api/storeTemplateEdit/templateDesign',
    method: 'post',
    data 
  })
}


//模板保存
export function templateSave(data) {
  return request({
    url: 'api/storeTemplateEdit/templateSave',
    method: 'post',
    data 
  })
}

//查询模板
export function templateQuery(params) {
  return request({
    url: 'api/storeTemplateEdit/templateQuery',
    method: 'get',
    params
  })
}

// 获取跳转链接 
export function jumpLink(data) {
  return request({
    url: `api/storeTemplateEdit/jumpLink/${data}`,
    method: 'get',
    data
  })
}
