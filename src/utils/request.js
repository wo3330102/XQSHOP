import axios from 'axios'
import {
  Notification,
  MessageBox,
  Message
} from 'element-ui'
import router from '../router/index'
// import { getToken } from '@/utils/auth'  
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API:process.env.VUE_APP_BASE_API,
  // baseURL: 'https://api.xqshopify.com',
  // 超时
  timeout: 1000000
})
// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token 
  config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  const storeId = localStorage.getItem('storeId') 
  if ((config.method === 'post' || config.method === 'put') && config.url.indexOf('api/yxStoreProductReply')<0 && config.url.indexOf('api/yxStorePromotions/mod')<0) {
    config.data = {
      storeId: storeId,
      ...config.data
    }
  } else if (config.method === 'get') {
    config.params = {
      storeId: storeId,
      ...config.params
    }
  } 
  if(config.url.indexOf('onStatus') >-1){  
    if (config.method === 'post' || config.method === 'put') {
      delete config.data.storeId
    } else if (config.method === 'get') {
      delete config.params.storeId 
    }
  } 
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

function getToken() {
  let token = localStorage.getItem('token')
  if (token) {
    return token
  } else {
    return false 
  }
}
let pass = true;

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = res.data.msg
    if (code == 401) {
      console.log('过期')
    } else if (code === 500) {
      Message({
        message: msg,
        type: 'error'
      })
      return Promise.reject(new Error(msg))
    } else {
      return res.data
    }  
    console.log(res); 
  },
  error => {
    let {
      message
    } = error;  
    if (message == 'Request failed with status code 401') {
      // let token = localStorage.getItem('token');
      // if(token){
      //   message = '登入过期，请重新登入' 
      // } else {
      //   message = '尚未登入，请登入'
      // }
      // router.push('/login') 
      if(pass){ 
        pass = false;
        // MessageBox.confirm(
        //   '登录状态已过期，您可以继续留在该页面，或者重新登录',
        //   '系统提示', {
        //     confirmButtonText: '重新登录',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //   }
        // ).then(() => {
        //   localStorage.clear();
        //     router.push('/login')
        // })
        localStorage.clear();
            router.push('/login')
      } else {
        setTimeout(function(){
          pass = true;
        },2000)
      }
      
    } else if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      if(error.response.data.message){
        message = error.response.data.message
      } else {
        message = "系统接口" + message.substr(message.length - 3) + "异常";
      } 
    }
    if(pass){
      Message({
        message: message,
        type: 'error',
        duration: 5 * 1000
      })
    } 
    return Promise.reject(error)
  }
)

export default service