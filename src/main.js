import Vue from 'vue'
import ElementUI, { MessageBox } from 'element-ui';
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import './element-variables.scss';
Vue.use(ElementUI)
Vue.prototype.$ELEMENT = {
  size: 'medium'
}; 
localStorage.setItem('uploadUrl',process.env.VUE_APP_BASE_API)//'http://192.168.8.254:8001/admin')//)
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
// Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$message = Message;
// Vue.prototype.$loading = Loading.service;

// 无限滚动（下拉加载）
import infiniteScroll from "vue-infinite-scroll";
Vue.use(infiniteScroll);

// 强制保留两位小数
Vue.prototype.$toDecimal2 = function (x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  var f = Math.round(x * 100) / 100;
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
};
// 判断是否为数字类型
Vue.prototype.$IsNaN = function (e) {
  console.log(e);
  if(e){
    if (isNaN(e)) {
      return e = '';
    } else {
      var f = parseFloat(e);
      if (isNaN(f)) {
        return false;
      }
      var f = Math.round(e * 100) / 100;
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
}
// 全局跳转
Vue.prototype.$NavgitorTo = function (path) {
  this.$router.push(path)
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')