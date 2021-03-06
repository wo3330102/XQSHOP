import Vue from 'vue'
import ElementUI, { MessageBox } from 'element-ui';
import App from './App.vue'
import router from './router'
import store from './store'
import enums from './utils/enums'
import 'element-ui/lib/theme-chalk/index.css';
import './element-variables.scss'; 
import VueClipboard from 'vue-clipboard2'
 
Vue.use(VueClipboard)
Vue.prototype.$ELEMENT = {
  size: 'medium'
};  
localStorage.setItem('uploadUrl',process.env.VUE_APP_BASE_API)//'http://192.168.8.254:8001/admin')//)

// 无限滚动（下拉加载）
import infiniteScroll from "vue-infinite-scroll";
Vue.use(infiniteScroll);
Vue.prototype.$enums=enums
// 强制保留两位小数
Vue.prototype.$toDecimal2 = function (e) {
  if(e){ 
    const num = Number(e);
    if (isNaN(num) || num<1) {
      return '0.00';
    } else {
      var f = parseFloat(num);
      if (isNaN(f)) {
        return false;
      }
      var f = Math.round(num * 100) / 100;
      var s = f.toString();
      var rs = s.indexOf(".");
      if (rs < 0) {
        rs = s.length;
        s += ".";
      }
      while (s.length <= rs + 2) {
        s += "0";
      }
      return s; 
    }
  }
};
// 判断是否为数字类型
Vue.prototype.$IsNaN = function (e,max) {  
  if(e){
    const num = Number(e);
    console.log(num);
    if (isNaN(num) || (max?num>max:num<1)) {
      return '';
    } else {
      return parseInt(num);
    }
  }
}
// 全局跳转
Vue.prototype.$NavgitorTo = function (path,par = false) {
  if(par){
    router.push({
    path:path,
    query:par
    })
  } else {
    router.push(path)
  }
}
// 删除操作的提示
Vue.prototype.$DelTip = function(cb){ 
  MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    typeof cb == 'function' && cb();
  }).catch(() => { 
    return false;
  });
}
// 货币符号
Vue.prototype.currency = {
  s:'￥',
  n:'元'
} 

new Vue({ 
  router,
  store,

  render: h => h(App)
}).$mount('#app')