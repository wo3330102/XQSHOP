import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [{
  path: '/',
  name: 'Home',
  component: () => import( /* webpackChunkName: "home" */ '../views/home.vue'),
  children: [{
    path: '/',
    name: 'Index',
    component: () => import( /* webpackChunkName: "index" */ '../views/index/index.vue'),
  }, {
    path: '/order',
    name: 'Order',
    component: () => import( /* webpackChunkName: "order" */ '../views/order/allOrder/order.vue'),
  }, {
    path: '/order/edit',
    name: 'EditOrder',
    component: () => import( /* webpackChunkName: "about" */ '../views/order/allOrder/edit.vue'),
  }, {
    path: '/giveUpOrder',
    name: 'GiveUpOrder',
    component: () => import( /* webpackChunkName: "about" */ '../views/order/giveUpOrder.vue'),
  }, {
    path: '/commodityList',
    name: 'CommodityList',
    component: () => import( /* webpackChunkName: "about" */ '../views/commodity/commodityList/commodityList.vue'),
  }, {
    path: '/commodity/add',
    name: 'AddCommodity',
    component: () => import( /* webpackChunkName: "about" */ '../views/commodity/commodityList/add.vue'),
  }, {
    path: '/commodity/edit',
    name: 'EditCommodity',
    component: () => import( /* webpackChunkName: "about" */ '../views/commodity/commodityList/edit.vue'),
  }, {
    path: '/commodityType',
    name: 'CommodityType',
    component: () => import( /* webpackChunkName: "about" */ '../views/commodity/commodityType/commodityType.vue'),
  }, {
    path: '/addcategory',
    name: 'Addcategory',
    component: () => import( /* webpackChunkName: "about" */ '../views/commodity/commodityType/addcategory.vue'),
  }, {
    path: '/editcategory',
    name: 'Editcategory',
    component: () => import( /* webpackChunkName: "about" */ '../views/commodity/commodityType/editcategory.vue'),
  }, {
    path: '/stockList',
    name: 'StockList',
    component: () => import( /* webpackChunkName: "about" */ '../views/commodity/stockList.vue'),
  }, {
    path: '/customer',
    name: 'Customer',
    component: () => import( /* webpackChunkName: "about" */ '../views/customer/customer.vue'),
  }, {
    path: '/customerDetail',
    name: 'CustomerDetail',
    component: () => import( /* webpackChunkName: "about" */ '../views/customer/customerDetail.vue'),
  }, {
    path: '/dataCenter',
    name: 'DataCenter',
    component: () => import( /* webpackChunkName: "about" */ '../views/dataCenter/dataCenter.vue'),
  }, {
    path: '/discount',
    name: 'Discount',
    component: () => import( /* webpackChunkName: "about" */ '../views/marketing/discount/discount.vue'),
  }, {
    path: '/addDiscount',
    name: 'AddDiscount',
    component: () => import( /* webpackChunkName: "about" */ '../views/marketing/discount/addDiscount.vue'),
  }, {
    path: '/activity',
    name: 'Activity',
    component: () => import( /* webpackChunkName: "about" */ '../views/marketing/activity/activity.vue'),
  }, {
    path: '/addActivity',
    name: 'AddActivity',
    component: () => import( /* webpackChunkName: "about" */ '../views/marketing/activity/addActivity.vue'),
  }, {
    path: '/share',
    name: 'Share',
    component: () => import( /* webpackChunkName: "about" */ '../views/marketing/share/share.vue'),
  }, {
    path: '/createShare',
    name: 'CreateShare',
    component: () => import( /* webpackChunkName: "about" */ '../views/marketing/share/createShare.vue'),
  }, {
    path: '/themeShop',
    name: 'ThemeShop',
    component: () => import( /* webpackChunkName: "about" */ '../views/shopSetting/themeShop.vue'),
  }, {
    path: '/pageManage',
    name: 'PageManage',
    component: () => import( /* webpackChunkName: "about" */ '../views/shopSetting/pageManage/pageManage.vue'),
  }, {
    path: '/addPage',
    name: 'AddPage',
    component: () => import( /* webpackChunkName: "about" */ '../views/shopSetting/pageManage/addPage.vue'),
  }, {
    path: '/menuManage',
    name: 'MenuManage',
    component: () => import( /* webpackChunkName: "about" */ '../views/shopSetting/menuManage/menuManage.vue'),
  }, {
    path: '/addMenu',
    name: 'AddMenu',
    component: () => import( /* webpackChunkName: "about" */ '../views/shopSetting/menuManage/addMenu.vue'),
  }, {
    path: '/trackSettings',
    name: 'TrackSettings',
    component: () => import( /* webpackChunkName: "about" */ '../views/shopSetting/trackSettings.vue'),
  }, {
    path: '/domainSettings',
    name: 'DomainSettings',
    component: () => import( /* webpackChunkName: "about" */ '../views/shopSetting/domainSettings.vue'),
  }, {
    path: '/homePageSeo',
    name: 'HomePageSeo',
    component: () => import( /* webpackChunkName: "about" */ '../views/shopSetting/homePageSeo.vue'),
  }, {
    path: '/setting',
    name: 'Setting',
    component: () => import( /* webpackChunkName: "about" */ '../views/setting/setting.vue'),
  }, {
    path: '/userInfo',
    name: 'UserInfo',
    component: () => import( /* webpackChunkName: "about" */ '../views/setting/userInfo.vue'),
  }, {
    path: '/logisticsManagement',
    name: 'LogisticsManagement',
    component: () => import( /* webpackChunkName: "about" */ '../views/setting/logisticsManagement/logisticsManagement.vue'),
  }, {
    path: '/settingLogistics',
    name: 'SettingLogistics',
    component: () => import( /* webpackChunkName: "about" */ '../views/setting/logisticsManagement/settingLogistics.vue'),
  }, {
    path: '/notice',
    name: 'Notice',
    component: () => import( /* webpackChunkName: "about" */ '../views/setting/notice/notice.vue'),
  }, {
    path: '/orderCustomer',
    name: 'OrderCustomer',
    component: () => import( /* webpackChunkName: "about" */ '../views/setting/notice/orderCustomer.vue'),
  }, {
    path: '/sendNotice',
    name: 'SendNotice',
    component: () => import( /* webpackChunkName: "about" */ '../views/setting/notice/sendNotice.vue'),
  }, {
    path: '/unpayOrder',
    name: 'UnpayOrder',
    component: () => import( /* webpackChunkName: "about" */ '../views/setting/notice/unpayOrder.vue'),
  }, {
    path: '/newOrder',
    name: 'NewOrder',
    component: () => import( /* webpackChunkName: "about" */ '../views/setting/notice/newOrder.vue'),
  }, {
    path: '/updataPassword',
    name: 'UpdataPassword',
    component: () => import( /* webpackChunkName: "about" */ '../views/setting/updataPassword.vue'),
  }, {
    path: '/paymentType',
    name: 'PaymentType',
    component: () => import( /* webpackChunkName: "about" */ '../views/setting/paymentType/paymentType.vue'),
  }, {
    path: '/checkoutSetting',
    name: 'CheckoutSetting',
    component: () => import( /* webpackChunkName: "about" */ '../views/setting/checkoutSetting.vue'),
  }, {
    path: '/policyClauses',
    name: 'PolicyClauses',
    component: () => import( /* webpackChunkName: "about" */ '../views/setting/policyClauses.vue'),
  }, {
    path: '/test',
    name: 'Test',
    component: () => import( /* webpackChunkName: "about" */ '../views/test.vue'),
  }]
}, {
  path: '/login',
  name: 'Login',
  component: () => import( /* webpackChunkName: "about" */ '../views/login.vue'),
}]

const router = new VueRouter({
  routes
})

// 解决重复跳转路由的报错
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  console.log(to);
  localStorage.setItem('router-path', to.path)
  next() // 必须使用 next ,执行效果依赖 next 方法的调用参数
})

export default router