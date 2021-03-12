
<template>
  <div class="home" v-if="pageLoading" v-loading="!pageLoading">
    <!-- <div id="tip">
      <p>您的套餐还剩14天</p>
    </div>-->
    <div id="main">
      <div class="warp-left">
        <div class="logo-wrap">
          <!-- <img style="height:48px;margin:10px;margin-left:-10px;display:block;" src="../assets/logo.png" /> -->
          <span>XQSHOP</span>
        </div>
        <el-menu
          :default-active="openUrl"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          background-color="#34385c"
          text-color="#c1c2cc"
          active-text-color="#8b99f0"
          unique-opened
          router
          style="overflow: auto"
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">主页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/order">所有订单</el-menu-item>
              <!-- <el-menu-item index="/giveUpOrder">弃单</el-menu-item> -->
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-shopping-bag-1"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/commodityList">商品列表</el-menu-item>
              <!-- <el-menu-item index="/stockList">库存列表</el-menu-item> -->
              <el-menu-item index="/commodityType">商品分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/customer">
            <i class="el-icon-s-custom"></i>
            <span slot="title">顾客</span>
          </el-menu-item>
          <el-menu-item index="/dataCenter">
            <i class="el-icon-s-data"></i>
            <span slot="title">数据中心</span>
          </el-menu-item>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-marketing"></i>
              <span>营销</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/activity">优惠活动</el-menu-item>
              <el-menu-item index="/discount">梯度优惠</el-menu-item>
              <el-menu-item index="/share">激励分享</el-menu-item>
              <el-menu-item index="/coupon">优惠券</el-menu-item>
              <el-menu-item index="/seckill">秒杀产品</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/appHome">
            <i class="el-icon-menu"></i>
            <span slot="title">应用中心</span>
          </el-menu-item>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-shop"></i>
              <span>店铺管理</span>
            </template>
            <el-menu-item-group>
              <!-- <el-menu-item index="/decorationManage">店铺装修</el-menu-item> -->
              <el-menu-item index="/homeSwiper">首页轮播图</el-menu-item>
              <el-menu-item index="/pageManage">页面管理</el-menu-item>
              <el-menu-item index="/menuManage">菜单栏</el-menu-item>
              <el-menu-item index="/trackSettings">追踪设置</el-menu-item>
              <el-menu-item index="/domainSettings">域名</el-menu-item>
              <el-menu-item index="/homepageSeo">主页SEO</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="warp-rigth">
        <div class="header">
          <!-- <el-select
            v-model="storeId"
            @change="ChangeShop"
            placeholder="请选择店铺"
            style="margin-right: 10px"
          >
            <el-option
              v-for="item in storeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select> -->
          <el-dropdown class="notice">
            <span class="el-dropdown-link">
              <i class="el-icon-message-solid"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
          <i class="el-icon-help"></i>
          <el-avatar size="small" :src="circleUrl" class="avatar"></el-avatar>
          <el-dropdown trigger="click" @command="Command">
            <span class="el-dropdown-link">
              {{ userName }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-lock" command="topage"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item
                icon="el-icon-notebook-2"
                command="layOut"
                @click="LayOut()"
                >退出登入</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="router-view">
          <transition name="fade" mode="out-in">
            <router-view
              style="padding-bottom: 50px"
              v-if="isRouterAlive"
            ></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getInfo } from "@/api/login";
import { getShop, getShopId } from "@/api/yxSystemStore";
let loadin;
export default {
  name: "home",
  data() {
    
    return {
      userName: "admin",
      transitionName: "fade",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      openUrl: "/home",
      storeId: "",
      storeList: [],
      isRouterAlive: true,
      pageLoading: false, 
    };
  },
  watch: {
    "$store.state.url"(val) {
      this.openUrl = val;
      this.reload();
    },
    "$store.state.reflash"(val) {
      if (val) {
        this.$store.commit("isRefresh", false);
        this.reload();
      }
    },
  },
  beforeCreate() {
    loadin = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
  },
  created() {
    // 获取用户信息
    console.log('第一次加载')

    if(localStorage.getItem('token')){
      getInfo()
      .then((res) => {
        loadin.close();
        this.pageLoading = true;
        this.userName = res.username;
      })
      .catch(() => {
        loadin.close();
        // this.$router.push("/login");
      });
    } else {
      loadin.close();
    }
    // 获取店铺
    const storeId = localStorage.getItem("storeId");
    // getShop().then((res) => {
    //   this.storeList = res.content;
    //   if (storeId) {
    //     for (var i in res.content) {
    //       if (res.content[i].id == storeId) {
    //         this.storeId = res.content[i].name;
    //       }
    //     }
    //   } else {
    //     localStorage.setItem("storeId", res.content[0].id);
    //     this.storeId = res.content[0].name;
    //   }
    // });
    getShopId()
      .then((res) => {
        this.storeId = res.storeID;
        localStorage.setItem("storeId", res.storeID);
        localStorage.setItem("storeUrl", res.storeUrl);
      })
      .catch((res) => {
        localStorage.clear();
        this.$router.push("/login");
      });
    // 设置当前路由
    let path = localStorage.getItem("router-path");
    if (path) {
      this.$store.commit("setUrl", path);
      this.openUrl = path;
    }
  },
  methods: {
    handleOpen: function (index) {
      switch (index) {
        case "2":
          // this.$store.commit("setUrl", "/order");
          this.openUrl = "/order";
          this.$router.push("/order");
          break;
        case "3":
          // this.$store.commit("setUrl", "/commodityList");
          this.openUrl = "/commodityList";
          this.$router.push("/commodityList");
          break;
        case "4":
          // this.$store.commit("setUrl", "/activity");
          this.openUrl = "/activity";
          this.$router.push("/activity");
          break;
        case "5":
          // this.$store.commit("setUrl", "/themeShop");
          // this.openUrl = '/decorationManage';
          // this.$router.push("/decorationManage");
          this.openUrl = "/homeSwiper";
          this.$router.push("/homeSwiper");
      }
    },
    Command: function (e) {
      if (e == "layOut") {
        localStorage.removeItem("token");
        this.$router.push("/login");
      } else {
        this.$NavgitorTo("/updataPassword");
      }
    },
    ChangeShop: function (res) {
      console.log(this.storeId);
      localStorage.setItem("storeId", this.storeId);
      this.reload();
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script> 
<style lang="scss" scoped>
.logo-wrap {
  display: flex;
  align-content: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  span {
    display: inline-block;
    color: #ffffff;
    line-height: 68px;
  }
}
.el-menu {
  border: 0;
  text-align: left;
}
/deep/ .el-menu-item-group .el-menu-item {
  padding-left: 60px !important;
}
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#tip {
  background: #7589f3;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
#main {
  display: flex;
  height: 100%;
}
.warp-left {
  float: left;
  width: 200px;
  height: 100%;
  background: #34385c;
}
.warp-rigth {
  width: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .header {
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.12);
    background: #ffffff;
    position: sticky;
    top: 0;
    .notice {
      font-size: 22px;
    }
    /deep/ .el-dropdown-menu__item {
      line-height: 36px;
    }
    /deep/ .el-dropdown > span {
      cursor: pointer;
    }
    .el-icon-help {
      font-size: 22px;
      margin-right: 20px;
      color: #c1c2cc;
      cursor: pointer;
    }
    .el-icon-help:hover {
      color: #34385c;
    }
    .el-icon-message-solid {
      font-size: 22px;
      margin-right: 20px;
    }
    .avatar {
      margin-right: 10px;
    }
  } 
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>