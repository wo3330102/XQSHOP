<template>
  <div class="container">
    <router-link
      to="/copyStore"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>复制店铺</span>
    </router-link>
    <h1 class="title">设置</h1>
    <div style="min-height: 200px">
      <el-row style="margin: 0 -10px">
        <el-col :span="16" style="padding-left: 10px; padding-right: 10px">
          <div class="box">
            <h3>选择模块</h3>
            <p class="modulelTitle">请选择您想要复制的模块</p>
            <div class="module-box">
              <el-row>
                <el-col :span="8">
                  <el-checkbox-group v-model="productType">
                    <el-checkbox label="0" :disabled="productType[0] == 2"
                      >全部商品</el-checkbox
                    >
                    <el-checkbox
                      label="1"
                      style="margin-left: 10px; margin-top: 5px"
                      v-show="productType[0] == 0"
                      >商品评论</el-checkbox
                    >
                    <el-checkbox label="2" :disabled="productType[0] == 0"
                      >指定商品</el-checkbox
                    >
                    <el-checkbox
                      label="3"
                      style="margin-left: 10px; margin-top: 5px"
                      v-show="productType[0] == 2"
                      >商品评论</el-checkbox
                    >
                  </el-checkbox-group>
                </el-col>
                <el-col :span="16">
                  <el-checkbox-group v-model="moduleType">
                    <el-checkbox label="0">分类</el-checkbox>
                    <el-checkbox label="1">自定义页面</el-checkbox>
                    <el-checkbox label="2">物流设置</el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="box" v-show="productType[0] == 2">
            <h3 class="title">
              <span>商品列表</span>
              <span class="option" @click="showAdd = true">添加商品</span>
            </h3>
            <table class="list">
              <tr v-for="(item, index) in list" :key="item.id">
                <td class="img">
                  <div
                    class="small-img"
                    :style="{ backgroundImage: 'url(' + item.image + ')' }"
                  ></div>
                </td>
                <td class="text">
                  <span>{{ item.storeName }}</span>
                  <p v-if="item.isShow == 0">已下架</p>
                </td>
                <td class="option">
                  <i class="el-icon-delete" @click="Del(item, index)"></i>
                </td>
              </tr>
            </table>
          </div>
        </el-col>
        <el-col :span="8" style="padding-left: 10px; padding-right: 10px">
          <div class="box">
            <p class="infoTip">信息提示</p>
            <p class="infoContent">
              1、点击复制店铺，选择需要复制的模块，生成密钥后保存。
            </p>
            <p class="infoContent">
              2、打开目标店铺，点击同步店铺，输入源店铺的密钥，即可复制成功。
            </p>
          </div>
        </el-col>
      </el-row>
      <div class="pageSaveBtn">
        <el-button @click="$NavgitorTo('/copyStore')">取消</el-button>
        <el-button type="primary" @click="Save">生成密钥</el-button>
      </div>
      <select-product
        :visible.sync="showAdd"
        :requestParams="requestParams"
        :requestUrl="'api/yxStoreProduct'"
        @selectItem="AddList"
      ></select-product>
    </div>
    <el-dialog title="复制密钥" :visible.sync="showSecret" width="540px">
      <div style="display: flex; justify-content: space-between">
        <span style="line-height: 36px">密钥：</span>
        <el-input
          v-model="secret"
          disabled="true"
          style="width: 363px"
        ></el-input>
        <el-button type="primary" @click="Copy">复制</el-button>
      </div>
      <p style="margin: 20px 0">复制密钥后去目标店铺使用</p>
    </el-dialog>
  </div>
</template> 
<script>
import { createSecret } from "@/api/copyStore.js";
import selectProduct from "@/components/selectProduct.vue";
export default {
  components:{
    selectProduct
  },
  data() {
    return {
      productType: [],
      moduleType: [],
      showAdd: false,
      requestParams: {
        page: 0,
        size: 30,
        storeName: "",
        tagId: "",
      },
      list: [],
      showSecret: false,
      secret: "",
    };
  },
  watch:{
    productType:function(val){
      console.log(val);
      if(val[0] == 1 || val[0] == 3){
        this.productType = [];
      }
    }
  },
  methods: {
    AddList: function (e) {
      this.list = [...e];
    },
    Del: function (item, index) {
      this.list.splice(index, 1);
      this.$store.commit("selectProductList", item);
    },
    Save: function () {
      let par = {
        item: [],
      };
      let obj = {}; 
      if (this.productType[0] == 2) {
        if(this.list.length == 0){
          this.$message.warning('请添加指定商品')
          return false
        }
        obj = {
          target: "product",
          value: this.list.map((item) => {
            return item.id;
          }),
        };
        par.item.push({...obj});
      } else if (this.productType[0] == 0) {
        obj.target = "all-product";
        obj.value = [];
        par.item.push({...obj});
      }  
      if (this.productType[1]) {
        par.item.push({ target: "product_comment",value:[] });
      }
      if (this.moduleType.length > 0) {
        console.log(1111);
        this.moduleType.map((item) => {
          console.log(item)
          switch (item) {
            case '0':
              par.item.push({
                target: "category",
                value:[],
              });
              break;
            case '1':
              par.item.push({
                target: "page",
                value:[],
              });
              break;
            case '2':
              par.item.push({
                target: "express",
                value:[],
              });
              break;
          }
        });
      }
      console.log(par);
      createSecret(par).then((res) => {
        console.log(res);
        this.showSecret = true;
        this.secret = res.data.key;
        // this.$router.push('/copyStore')
      });
    },
    Copy: function () {
      this.$copyText(this.secret).then(() => {
        // 复制成功后操作
        this.$message({
          message: "复制成功",
          type: "success", 
        });
        this.$router.push("/copyStore");
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
h1 {
  height: 40px;
  font-size: 24px;
  margin: 0 0 12px;
  font-weight: 400;
  line-height: 40px;
  display: flex;
  justify-items: center;
  justify-content: space-between;
  flex: 1;
}
.box {
  margin-bottom: 20px;
  padding: 12px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  overflow: hidden;
  .title {
    color: #1a1d2c;
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 12px;
    .option {
      font-size: 14px;
      color: #273a8a;
      float: right;
      cursor: pointer;
      text-decoration: underline;
      font-weight: 400;
    }
  }
  .modulelTitle {
    margin: 8px 0;
  }
  .infoContent {
    line-height: 18px;
    font-size: 12px;
    color: #606266;
    &:last-child {
      margin-top: 10px;
    }
  }
  .infoTip {
    color: #1a1d2c;
    font-size: 14px;
    padding-bottom: 14px;
  }
  /deep/.el-checkbox {
    width: 100%;
    padding: 5px 0;
  }
}
.list {
  margin: 2px 0;
  width: 100%;
  line-height: 23px;
  tr {
    td {
      border-top: 1px solid #ececec;
      padding: 10px 0;
    }
    .img {
      width: 60px;
    }
    .text {
      padding-left: 12px;
    }
    .option {
      width: 40px;
      text-align: center;
      color: #c1c2cc;
      i {
        cursor: pointer;
      }
    }
    &:first-child {
      border: 0;
    }
  }
}
</style> 