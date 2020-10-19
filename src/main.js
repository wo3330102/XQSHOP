import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'  
Vue.config.productionTip = false 

import 'element-ui/lib/theme-chalk/index.css'; 
import './element-variables.scss'; 
// 提示
import 'echarts/lib/component/tooltip'

// import './assets/img/settings' // icon

import {
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Button,
  Select,
  Option,
  OptionGroup,
  DatePicker,
  Input,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  RadioGroup,
  Radio,
  Form,
  FormItem,
  Checkbox,
  Upload,
  Tooltip,
  Tag,
  Message,
  MessageBox,  
  Loading,
  Image,
  Cascader,
  Switch
} from 'element-ui';
 
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Row);
Vue.use(Col);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Avatar);
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(DatePicker);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Dialog)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Checkbox)
Vue.use(Upload)
Vue.use(Tooltip)
Vue.use(Tag)   
Vue.use(Image)
Vue.use(Cascader)
Vue.use(Loading.directive);
Vue.use(Switch)
 
Vue.prototype.$ELEMENT = { size: 'medium'}; 
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;

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
},
// 全局跳转
Vue.prototype.$NavgitorTo = function(path){
  this.$router.push(path)
} 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')