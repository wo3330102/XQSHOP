import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/editShop',
    name: 'editShop',
    component: () => import( /* webpackChunkName: "editShop" */ '../views/shopSetting/editShop.vue'),
  },
  {
  path: '/',
  name: '首页',
  component: () => import( /* webpackChunkName: "home" */ '../views/home.vue'),
  children: [{
    path: '/',
    name: 'Index',
    component: () => import( /* webpackChunkName: "index" */ '../views/index/index.vue'),
  }, {
    path: 'order',
    name: '订单管理',
    redirect: '/order',
    component: () => import( /* webpackChunkName: "home" */ '../views/Main.vue'),
    children: [{
      path: '/order',
      name: 'Order',
      component: () => import( /* webpackChunkName: "order" */ '../views/order/allOrder/order.vue'),
    }, {
      path: 'edit',
      name: 'EditOrder',
      component: () => import( /* webpackChunkName: "about" */ '../views/order/allOrder/edit.vue'),
    }, {
      path: 'giveUpOrder',
      name: 'GiveUpOrder',
      component: () => import( /* webpackChunkName: "about" */ '../views/order/giveUpOrder.vue'),
    }, ]
  }, {
    path: 'commodityList',
    name: '商品管理',
    redirect: '/commodityList',
    component: () => import( /* webpackChunkName: "home" */ '../views/Main.vue'),
    children: [{
      path: '/commodityList',
      name: 'CommodityList',
      component: () => import( /* webpackChunkName: "about" */ '../views/commodity/commodityList/commodityList.vue'),
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
    }]
  }, {
    path: 'customer',
    name: '顾客',
    component: () => import( /* webpackChunkName: "home" */ '../views/Main.vue'),
    redirect: '/customer',
    children: [{
      path: '/customer',
      name: 'Customer',
      component: () => import( /* webpackChunkName: "about" */ '../views/customer/customer.vue')
    }, {
      path: '/customerDetail',
      name: 'CustomerDetail',
      component: () => import( /* webpackChunkName: "about" */ '../views/customer/customerDetail.vue'),
    }]
  }, {
    path: 'dataCenter',
    name: '数据中心',
    component: () => import( /* webpackChunkName: "home" */ '../views/Main.vue'),
    redirect: '/dataCenter',
    children: [{
      path: '/dataCenter',
      name: 'DataCenter',
      component: () => import( /* webpackChunkName: "about" */ '../views/dataCenter/dataCenter.vue'),
    }]
  }, {
    path: 'discount',
    name: '营销',
    redirect: '/discount',
    component: () => import( /* webpackChunkName: "home" */ '../views/Main.vue'),
    children: [{
      path: '/discount',
      name: 'Discount',
      component: () => import( /* webpackChunkName: "about" */ '../views/marketing/discount/discount.vue'),
    }, {
      path: '/editDiscount',
      name: 'EditDiscount',
      component: () => import( /* webpackChunkName: "about" */ '../views/marketing/discount/editDiscount.vue'),
    }, {
      path: '/activity',
      name: 'Activity',
      component: () => import( /* webpackChunkName: "about" */ '../views/marketing/activity/activity.vue'),
    }, {
      path: '/editActivity',
      name: 'EditActivity',
      component: () => import( /* webpackChunkName: "about" */ '../views/marketing/activity/editActivity.vue'),
    }, {
      path: '/share',
      name: 'Share',
      component: () => import( /* webpackChunkName: "about" */ '../views/marketing/share/share.vue'),
    }, {
      path: '/editShare',
      name: 'EditShare',
      component: () => import( /* webpackChunkName: "about" */ '../views/marketing/share/editShare.vue'),
    }, ]
  }, {
    path: 'appHome',
    name: '应用管理',
    component: () => import( /* webpackChunkName: "home" */ '../views/Main.vue'),
    children: [{
      path: '/appHome',
      name: 'AppHome',
      component: () => import( /* webpackChunkName: "about" */ '../views/appHome/appHome.vue'),
    }, {
      path: '/comment',
      name: 'Comment',
      component: () => import( /* webpackChunkName: "about" */ '../views/appHome/comment/comment.vue'),
    }, {
      path: '/commentDetail',
      name: 'CommentDetail',
      component: () => import( /* webpackChunkName: "about" */ '../views/appHome/comment/commentDetail.vue'),
    }, {
      path: '/shippingInsurance',
      name: 'ShippingInsurance',
      component: () => import( /* webpackChunkName: "about" */ '../views/appHome/shippingInsurance.vue'),
    }, {
      path: '/recommend',
      name: 'Recommend',
      component: () => import( /* webpackChunkName: "about" */ '../views/appHome/recommend/recommend.vue'),
    }, {
      path: '/recommendOption',
      name: 'RecommendOption',
      component: () => import( /* webpackChunkName: "about" */ '../views/appHome/recommend/recommendOption.vue'),
    }]
  }, {
    path: 'shopSetting',
    name: '店铺管理',
    redirect: '/decorationManage',
    component: () => import( /* webpackChunkName: "home" */ '../views/Main.vue'),
    children: [{
      path: '/decorationManage',
      name: 'DecorationManage',
      component: () => import( /* webpackChunkName: "about" */ '../views/shopSetting/decorationManage.vue'),
    },
    {
      path: '/themeShop',
      name: 'ThemeShop',
      component: () => import( /* webpackChunkName: "about" */ '../views/shopSetting/themeShop.vue'),
    },
    {
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
      path: '/homeSwiper',
      name: 'HomeSwiper',
      component: () => import( /* webpackChunkName: "about" */ '../views/shopSetting/homeSwiper/homeSwiper.vue'),
    }, {
      path: '/editHomeSwiper',
      name: 'EditHomeSwiper',
      component: () => import( /* webpackChunkName: "about" */ '../views/shopSetting/homeSwiper/editHomeSwiper.vue'),
    }, ]
  }, {
    path: 'setting',
    name: '设置',
    component: () => import( /* webpackChunkName: "home" */ '../views/Main.vue'),
    redirect: '/setting',
    children: [{
      path: '/setting',
      name: '设置',
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
    }]
  },
   {
    path: '/test',
    name: 'Test',
    component: () => import( /* webpackChunkName: "about" */ '../views/test.vue'),
  }
]
}, {
  path: '/login',
  name: 'Login',
  component: () => import( /* webpackChunkName: "about" */ '../views/login.vue'),
}]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 解决重复跳转路由的报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  // 解决死循环问题（当跳转页面为登入页面时，结束token判断）
  if (Object.is(to.name, 'Login')) {
    next();
    return
  }
  // 判断当前是否含有token
  if (token) {
    localStorage.setItem('router-path', to.path)
    next();
  } else {
    next('/login') // 否则全部重定向到登录页 
  }
})

export default router