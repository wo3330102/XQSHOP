<template>
  <div class="container">
    <h1 class="title">
      <span>设置</span>
    </h1>
    <div class="content"> 
      <ul>
        <li v-for="item in settingList" :key="item.id" @click="ToPage(item.url)">
          <img :src="item.icon" alt height="100" />
          <p class="title">{{item.title}}</p>
          <p class="tip">{{item.tip}}</p>
        </li>
      </ul>
    </div> 
  </div>
</template>
<script> 
export default { 
  data() {
    let url = "http://ddd.xshoppy.shop";
    // let url = "@/assets/img/settings"; 
    return {
      settingList: [
        {
          id: 1,
          icon: url + '/static/img/settings/accout.png',
          title: "基础信息",
          tip: "设置店铺的基础信息",
          url: "/userInfo",
        },
        {
          id: 2,
          icon: url + "/static/img/settings/car.png",
          title: "物流管理",
          tip: "管理客户下单时可以选择的物流配送方案",
          url: "/logisticsManagement",
        },
        {
          id: 3,
          icon: url + "/static/img/settings/notice.png",
          title: "通知",
          tip: "自动发送给客户通知",
          url: "/notice",
        },
        // {
        //   id: 4,
        //   icon: url + "/static/img/settings/accout.png",
        //   title: "账户管理",
        //   tip: "管理你的登录密码",
        //   url: "/updataPassword",
        // },
        {
          id: 5,
          icon: url + "/static/img/settings/mode_of_payment.png",
          title: "收款方式",
          tip: "可同时支持Paypal和信用卡供顾客选择",
          url: "/paymentType",
        },
        // {
        //   id: 6,
        //   icon: url + "/static/img/settings/checkout-setting.png",
        //   title: "结账设置",
        //   tip: "自定义客人结账时的流程",
        //   url: "/checkoutSetting",
        // },
        // {
        //   id: 7,
        //   icon: url + "/static/img/settings/paid-bills.png",
        //   title: "账单",
        //   tip: "支持查看你的店铺出账，绑定自动续费，核对账单信息",
        //   url: "",
        // },
        // {
        //   id: 8,
        //   icon: url + "/static/img/settings/employees.svg",
        //   title: "员工账号",
        //   tip: "支持配置员工账号，管理员工在店铺中可查看的内容或执行的操作",
        //   url: "",
        // },
        {
          id: 9,
          icon: url + "/static/img/settings/policyClauses.svg",
          title: "政策条款",
          tip: "设置店铺的常见政策条款",
          url: "/policyClauses",
        },
      ],
    };
  },
  methods: { 
    ToPage:function(url){
      this.$router.push(url)
    }
  },
};
</script>
<style lang="scss" scoped>
h1 { 
  font-size: 24px;
  margin: 0 0 12px;
  font-weight: 400; 
  display: flex;
  justify-items: center;
  justify-content: space-between;
  flex: 1;
  /deep/.el-button,
  .el-button--medium {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
}
.content {
    // padding: 0 23px;
    ul{
        display: flex;
        flex-wrap: wrap;
    }
  li {
    margin-right: 20px;
    margin-bottom: 20px;
    float: left;
    text-align: center;
    width: 260px;
    height: 260px;
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
      0 0 0 1px rgba(67, 67, 145, 0.05);
    border-radius: 4px;
    overflow: auto;
    cursor: pointer;
    &:nth-child(4n){
        margin-right: 0;
    }
    & > img {
      margin-top: 48px;
    }
    .title {
      color: #1a1d2c;
      line-height: 24px;
      margin-bottom: 8px;
    }
    .tip {
      font-size: 12px;
      color: #697c90;
      line-height: 20px;
      padding: 0px 20px;
    }
  }
}
</style>
