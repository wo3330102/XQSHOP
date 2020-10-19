<template>
  <div class="container">
    <h1 class="title">
      <span>设置</span>
    </h1>
    <div class="themeList" v-if="show">
      <dl
        v-for="(item, index) in themeList"
        :key="item.id"
        @click="ShowDetail(index)"
        class="theme"
      >
        <dt class="img"> 
          <img :src="item.pcImage || ''" class="web" />
        </dt>
        <dd class="desc">
          <h3>{{ item.name }}</h3>
          <p>
            {{ '免费' }}
            <span>包含 1 种风格</span>
          </p>
        </dd>
        <i class="el-icon-success" v-if="item.check"></i>
      </dl>
    </div>
    <el-dialog :visible.sync="showDetail" :title="title">
      <div class="theme-dialog-body">
        <div class="theme-dialog-body-left">
          <div class="pc-img">
            <img class="web" :src="themeList[index].pcImage" />
            <img
              class="mob"
              :src="themeList[index].mobileImage"
            />
            <img
              class="phone"
              src="https://ddd.xshoppy.shop/static/img/phone.png"
            />
          </div>
        </div>
        <div class="theme-dialog-body-right">
          <div class="theme-desc">
            默认模板是我们标志性的模板，非常通用以及简洁，适合大部分风格的店铺。
          </div>
          <div class="theme-style-select">
            <div class="theme-style-select-title">包含1种风格</div>
            <div class="theme-style-select-radio">
              <el-radio-group v-model="radio">
                <el-radio
                  v-for="item in radioList"
                  :key="item.value"
                  :label="item.value"
                  style="width: 100%; margin: 10px 0"
                  >{{ item.label }}</el-radio
                >
              </el-radio-group>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <div>
          <el-button>预览</el-button>
          <el-button type="primary" @click="CheckThemeShop">选中</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getStoreTemplate } from "@/api/home.js";
import {getShopById,changeTem} from '@/api/yxSystemStore';

export default {
  data() {
    return {
      themeList: [{
        pcImage:'',

      }],
      showDetail: false,
      radio: 0,
      radioList: [{
        value:0,
        label:"默认"
      }],
      title: "",
      index: 0,
      detail:{},
      show:false
    };
  },
  created() {
    getStoreTemplate().then((res) => {
      this.themeList = res.content;
      this.show = true;
    });
    let id = localStorage.getItem('storeId');
    getShopById(id).then(res=>{ 
      if(res.tempLink){
        this.themeList.map(i=>{
          if(i.tempLink == res.tempLink){
            i.check = true;
          } 
        })
      }
    })
  },
  methods: {
    ShowDetail: function (index) {
      console.log(index);
      this.showDetail = true;
      this.title = this.themeList[index].name;
      this.index = index;
    },
    CheckThemeShop: function () {
      let that = this; 
      for (var i in that.themeList) {
        that.themeList[i].check = false;
      }
      that.themeList[that.index].check = true;
      that.showDetail = false; 
      let id = that.themeList[that.index].id; 
      let par = {
        tempId:id,
      }
      changeTem(par).then(res=>{
        console.log(res);
        this.$message.success('模板选择成功');
      })
    },
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
.themeList {
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  .theme {
    margin: 0 20px 20px 0;
    flex: 0 0 auto;
    padding: 10px;
    width: 355px;
    height: 278px;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
      0 0 0 1px rgba(67, 67, 145, 0.05);
    border-radius: 4px;
    position: relative;
    transition: all 0.6s;
    & > i {
      font-size: 30px;
      position: absolute;
      top: 10px;
      right: 10px;
      color: #7589f3;
    }
    cursor: pointer;
    .disable {
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 3;
      text-align: center;
      color: #fff;
      line-height: 355px;
    }
    .img {
      margin: -10px -10px 0;
      position: relative;
      font-size: 0;
      height: 220px;
      overflow: hidden;
      .web {
        width: 100%;
        height: 100%;
        border: 1px solid #ebecf3;
        border-bottom: none;
        box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
          0 0 0 1px rgba(67, 67, 145, 0.05);
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        box-sizing: border-box;
        transition: transform 0.33s, -webkit-transform 0.33s;
      }
    }
    .desc {
      height: 56px;
      margin: 2px -10px -20px;
      padding: 4px 16px;
      box-sizing: border-box;
      background: #fefefe;
      box-shadow: 0 0 4px 0 hsla(0, 0%, 87.8%, 0.45),
        0 -1px 8px 0 hsla(0, 0%, 87.8%, 0.47);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      h3 {
        color: #1a1d2c;
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
      }
      p {
        color: #5e7185;
        font-size: 12px;
        line-height: 24px;
        span {
          float: right;
        }
      }
    }
  }
}
.theme-dialog-body {
  display: flex;
  .theme-dialog-body-left {
    width: 640px;
    height: 413px;
    background: #edf0f7;
    border-radius: 8px;
    padding: 16px 16px 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    .pc-img {
      width: 100%;
      height: 100%;
      background: #fff;
      .web {
        width: 100%;
        height: 100%;
        border-bottom: none;
        box-shadow: 0 0 3px 0 rgba(35, 35, 112, 0.2),
          0 0 0 0 rgba(67, 67, 145, 0.05);
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        box-sizing: border-box;
      }
      .mob {
        border: 1px solid #ebecf3;
        border-bottom: none;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        width: 148px;
        height: 212px;
        position: absolute;
        right: 14px;
        bottom: 0;
        z-index: 2;
        box-sizing: border-box;
      }
      .phone {
        width: 162px;
        height: 247px;
        position: absolute;
        bottom: 0;
        right: 7px;
        z-index: 1;
      }
    }
  }
  .theme-dialog-body-right {
    margin-left: 32px;
    width: 272px;
    .theme-desc {
      font-size: 14px;
      font-weight: 400;
      color: #676d83;
      line-height: 22px;
    }
    .theme-style-select {
      margin-top: 32px;
      .theme-style-select-title {
        font-size: 16px;
        font-weight: 400;
        color: #212741;
        line-height: 22px;
      }
      .theme-style-select-radio {
        margin-top: 12px;
      }
    }
  }
}
/deep/.el-dialog {
  width: 980px !important;
}
</style>
