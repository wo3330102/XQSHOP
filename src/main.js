import Vue from 'vue'
import ElementUI from 'element-ui';
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import './element-variables.scss';
Vue.use(ElementUI)
Vue.prototype.$ELEMENT = {
  size: 'medium'
};


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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')