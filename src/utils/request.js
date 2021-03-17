import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import router from '../router/index'
// import { getToken } from '@/utils/auth'  
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'


// 正在进行中的请求列表
let reqList = []

/**
 * 阻止重复请求
 * @param {array} reqList - 请求缓存列表
 * @param {string} url - 当前请求地址
 * @param {function} cancel - 请求中断函数
 * @param {string} errorMessage - 请求中断时需要显示的错误信息
 */
const stopRepeatRequest = function (reqList, url, cancel, errorMessage) {
  const errorMsg = errorMessage || ''
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i] === url) {
      cancel(errorMsg)
      return
    }
  }
  reqList.push(url)
}

/**
 * 允许某个请求可以继续进行
 * @param {array} reqList 全部请求列表
 * @param {string} url 请求地址
 */
const allowRequest = function (reqList, url) {
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i] === url) {
      reqList.splice(i, 1)
      break
    }
  }
}



// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分 'http://192.168.1.204:8008/admin'||
  baseURL:process.env.VUE_APP_BASE_API, //
  // 超时
  timeout: 1000000
})
// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token 
  config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  const storeId = localStorage.getItem('storeId')
  if ((config.method === 'post' || config.method === 'put') && config.url.indexOf('api/yxStoreProductReply') < 0 && config.url.indexOf('api/yxStorePromotions/mod') < 0) {
    // 判断post,put是否需要增加storeId 
    let cancel
    // 设置cancelToken对象
    config.cancelToken = new axios.CancelToken(function (c) {
      cancel = c
    })
    // 阻止重复请求。当上个请求未完成时，相同的请求不会进行
    stopRepeatRequest(reqList, config.url, cancel, '请勿重复请求')
    if (config.data) {
      if (!config.data.notStoreId && !(config.data instanceof Array)) {
        config.data = { 
          ...config.data,
          storeId: storeId,
        }
      }
    }
  } else if (config.method === 'get') {
    config.params = {
      storeId: storeId,
      ...config.params
    }
  }
  // 去除参数
  if (config.url.indexOf('api/yxSystemStore/storeId') > -1) {
    delete config.params.storeId
  }

  if (config.url.indexOf('onStatus') > -1) {
    if (config.method === 'post' || config.method === 'put') {
      delete config.data.storeId
    } else if (config.method === 'get') {
      delete config.params.storeId
    }
  }

  if (config.method === 'delete') {
    return MessageBox.confirm('是否确认删除?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      return config
    })
  } else {
    return config
  }
}, error => { 
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
    // 增加延迟，相同请求不得在短时间内重复发送
    setTimeout(() => {
      allowRequest(reqList, res.config.url)
    }, 1000) 
    // 未设置状态码则默认成功状态 
    const code = res.data.status || 200; 
    // 获取错误信息
    const msg = res.data.msg
    if (code == 401) {
      console.log('过期')
    } else if (code !== 200) {
      Message({
        message: msg,
        type: 'error'
      }) 
      return false;
    }  else {
      return res.data
    } 
  },
  error => {
    // 增加延迟，相同请求不得在短时间内重复发送
    setTimeout(() => {
      allowRequest(reqList, error.config.url)
    }, 1000)
    let {
      message
    } = error;
    console.log(message)
    if (message == 'Request failed with status code 401') {
      let token = localStorage.getItem('token');
      if (token) {
        message = '登入过期，请重新登入'
      } else {
        message = '尚未登入，请登入'
      }
      router.push('/login')
      if (pass) {
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
        setTimeout(function () {
          pass = true;
        }, 2000)
      } else {
        setTimeout(function () {
          pass = true;
        }, 2000)
      }

    } else if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      if (error.response.data.message) {
        message = error.response.data.message
      } else {
        message = "系统接口" + message.substr(message.length - 3) + "异常";
      }
    }
    if (pass) {
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