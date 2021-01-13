<template>
<el-container style="height:100%;">
  <el-header>
    <div class="header">
      <div class="header-left">设置</div>
      <div class="header-main">
        <i class="el-icon-mobile-phone"></i>
        <i class="el-icon-s-platform"></i>
        <i class="el-icon-s-operation"></i>
      </div>
      <div class="header-right">
        <el-button disabled>已发布</el-button>
        <el-button type="info">保存</el-button>
      </div>
    </div>
  </el-header>
  <el-container>
    <el-aside width="180px">
      <div class="left">
        <ul class="aside-main">
          <li class="page-title">
            <div class="aside-left">
              <span>页面</span>
            </div>
            <div class="aside-right">
              <i class="el-icon-edit-outline"></i>
            </div>
          </li>
          <li>
            <el-select class="page-select" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in [{label:'首页',value:1},{label:'商品分类',value:2},{label:'商品详情',value:3},{label:'结果页',value:4}]"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li class="page-title">
            <div class="aside-left">
              <span>模块</span>
            </div>
          </li>
          <li>
            <div class="aside-left">
              <i class="el-icon-s-grid"></i>
              <span>页面</span>
            </div>
            <div class="aside-right">
              <i class="el-icon-setting"></i>
            </div>
          </li>
          <li>
            <div class="aside-left">
              <i class="el-icon-s-grid"></i>
              <span>页头</span>
            </div>
            <div class="aside-right">
              <i class="el-icon-setting"></i>
            </div>
          </li>
          <li>
            <div class="aside-left">
              <i class="el-icon-s-grid"></i>
              <span>轮播图</span>
            </div>
            <div class="aside-right">
              <i class="el-icon-setting"></i>
            </div>
          </li>
          <li>
            <div class="aside-left">
              <i class="el-icon-s-grid"></i>
              <span>商品分类</span>
            </div>
            <div class="aside-right">
              <i class="el-icon-setting"></i>
            </div>
          </li>
          <li>
            <div class="aside-left">
              <i class="el-icon-s-grid"></i>
              <span>商品分类</span>
            </div>
            <div class="aside-right">
              <i class="el-icon-setting"></i>
            </div>
          </li>
          <li>
            <div class="aside-left">
              <i class="el-icon-s-grid"></i>
              <span>精选商品</span>
            </div>
            <div class="aside-right">
              <i class="el-icon-setting"></i>
            </div>
          </li>
          <li>
            <div class="aside-left">
              <i class="el-icon-s-grid"></i>
              <span>单图</span>
            </div>
            <div class="aside-right">
              <i class="el-icon-setting"></i>
            </div>
          </li>
        </ul>
        <div class="add-page"><i class="el-icon-circle-plus-outline"></i>添加模块</div>
        <div class="add-module">
          <div class="add-module-list">
            <h2>轮播图</h2>
            <div class="add-module-list-box">
              <img src="https://tingdng.xshoppy.shop/static/img/decoration/model/banner.svg">
            </div>
          </div>
          <div class="add-module-list">
            <h2>商品分类</h2>
            <div class="add-module-list-box">
              <img src="https://tingdng.xshoppy.shop/static/img/decoration/model/category.svg">
            </div>
          </div>
          <div class="add-module-list">
            <h2>精选商品</h2>
            <div class="add-module-list-box">
              <img src="https://tingdng.xshoppy.shop/static/img/decoration/model/collection.svg">
            </div>
          </div>
          <div class="add-module-list">
            <h2>单个商品</h2>
            <div class="add-module-list-box">
              <img src="https://tingdng.xshoppy.shop/static/img/decoration/model/single-product.svg">
            </div>
          </div>
          <div class="add-module-list">
            <h2>单图</h2>
            <div class="add-module-list-box">
              <img src="https://tingdng.xshoppy.shop/static/img/decoration/model/single-image.svg">
            </div>
          </div>
          <div class="add-module-list">
            <h2>文本</h2>
            <div class="add-module-list-box">
              <img src="https://tingdng.xshoppy.shop/static/img/decoration/model/text.svg">
            </div>
          </div>
          <div class="add-module-list">
            <h2>订阅</h2>
            <div class="add-module-list-box">
              <img src="https://tingdng.xshoppy.shop/static/img/decoration/model/subscribe.svg">
            </div>
          </div>
        </div>
      </div>
    </el-aside>
    <el-main>Main</el-main>
    <el-aside width="234px">
      <aside-compoent />
    </el-aside>
  </el-container>
</el-container>
</template>
<script>
import asideCompoent from './editShop/index'
export default {
    components:{asideCompoent}
}
</script>
<style lang="scss" scoped>
  .el-header{
    padding:0;
    .header{display: flex;justify-content:space-between;align-items:center;width:100%;height:60px;box-shadow: 0 1px 6px rgba(0,0,0,.15);
      .header-left{width:300px;}
      .header-main{i{font-size: 22px;margin:0 8px;}}
      .header-right{width:200px;margin-right:10px;}
    }
  }
  
  .el-aside {
    .left{width:180px;height:100%;background-color: #f7f7f7;position: relative;
    color: #333;box-shadow:1px 1px 6px rgba(0,0,0,.15);
      .aside-main{width:180px;}
      .page-title{padding-top:12px;}
      .page-title span{margin-left:10px;}
      .page-select{border:0 none;}
      .aside-main li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background:#fff;
        height:40px;
        border-bottom:1px solid #dcdfe6;
      }
      .aside-left{display: flex;
        i{width:30px;height:40px;line-height:40px;text-align: center;}
        span{line-height:40px;}
      }
      .aside-right{margin-right: 10px;}
      .add-page{position: absolute;bottom:0;left:0;width:100%;height:38px;text-align: center;line-height: 38px;color:#273a8a;border-top:2px solid #dcdfe6;cursor: pointer;
        i{margin-right:10px;}
      }
      ::-webkit-scrollbar {width: 6px;margin-right: 2px;background: #f5f5f9;}
      ::-webkit-scrollbar-button {height: 0;width: 0;background-color: #eee;}
      ::-webkit-scrollbar-track {background: #f5f5f9;border-radius: 6px;}
      ::-webkit-scrollbar-thumb {border-radius: 6px;background: #d5d5e6;}
      ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-track {border-radius: 7px;}
      .add-module{width:220px;height:100%;background: #fff;position: fixed;left: 181px;top:60px;overflow-y: scroll;}
      .add-module-list{
        padding:20px 10px 0;
        h2{padding-bottom: 8px;font-size: 14px;color: #2c3e50;font-weight: normal;}
        .add-module-list-box{height:122px;border:1px solid #dadde4;}
      }
    }
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>