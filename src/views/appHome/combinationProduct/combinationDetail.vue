<template>
  <div class="container">
    <router-link
      to="/combinationProduct"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>组合商品</span>
    </router-link>
    <h1 class="title">
      <span class="text"> 编辑组合商品 </span>
    </h1>
    <div>
      <el-row style="margin: 0 -10px">
        <el-col :span="16" style="padding-left: 10px; padding-right: 10px">
          <div class="box mainProduct">
            <div class="content">
              <div class="left">
                <span
                  class="small-img"
                  :style="{
                    backgroundImage: 'url(' + detail.productImage + ')',
                    width: 60 + 'px',
                    height: 60 + 'px',
                  }"
                ></span>
              </div>
              <div class="right">
                <div>{{ detail.productName }}</div>
                <div>
                  SKU:
                  <template v-if="detail.skus">
                    <span v-for="(item, index) in detail.skus" :key="index">{{
                      item
                    }}</span>
                  </template>
                </div>
                <div>
                  标签:
                  {{ detail.tags ? detail.tags.toString() : "" }}
                </div>
                <div>
                  分类:
                  {{ detail.categories ? detail.categories.toString() : "" }}
                </div>
              </div>
            </div>
          </div>
          <div class="box">
            <h3 class="title">
              商品列表
              <span
                class="option"
                v-show="tableData.length < 2"
                @click="shopDialog = true"
                >添加组合商品</span
              >
            </h3>
            <div class="item-group" v-for="(v, i) in tableData" :key="i">
              <span
                class="small-img"
                :style="{
                  backgroundImage: 'url(' + v.image + ')',
                  width: 60 + 'px',
                  height: 60 + 'px',
                }"
              ></span>
              <span class="ellipsis">{{ v.storeName }}</span>
              <span class="options">
                <i class="el-icon-delete" @click="DelMenu(i)"></i>
              </span>
            </div>
          </div>
        </el-col>
        <el-col :span="8" style="padding-left: 10px; padding-right: 10px">
          <div class="box">
            <p class="infoTip">信息提示</p>
            <p class="infoContent">
              1. 为主商品添加组合商品，最多添加两个，未配置则在模版中不显示。
            </p>
            <p class="infoContent">2.组合商品的加购次数有{{detail.cartNum}}次。</p>
          </div>
        </el-col>
      </el-row>
      <div class="pageSaveBtn">
        <el-button @click="$NavgitorTo('/combinationProduct')">取消</el-button>
        <el-button @click="Save" type="primary">保存</el-button>
      </div>
    </div>
    <selectProduct
      :visible.sync="shopDialog"
      :requestUrl="'api/yxComposeProduct/list/product'"
      :requestParams="requestParams"
      @selectItem="SelectItem"
      :disableNum="disableNum"
      :needLoad="false"
    ></selectProduct>
  </div>
</template> 
<script>
import tableTem from "@/components/tableTem";
import selectProduct from "@/components/selectProduct";
import { getDetail, saveSecond } from "@/api/yxComposeProduct";

export default {
  components: {
    tableTem,
    selectProduct,
  },
  data() {
    return {
      detail: {},
      requestParams: {
        filterType: 0,
        storeName: "",
      },
      tableHeader: [
        {
          label: "产品名称",
          prop: "productImage",
          width: 100,
        },
        {
          label: "",
          prop: "productName",
          width: 294,
        },
        {
          label: "组合商品数量",
          prop: "composeCount",
          width: 140,
        },
        {
          label: "操作",
          prop: "option",
          width: 130,
        },
      ],
      isRefresh: 0,
      shopDialog: false,
      tableData: [], 
    };
  },
  created() {
    getDetail({ id: this.$route.query.id }).then((res) => {
      this.detail = res.data;
      this.tableData = res.data.secondProducts; 
      this.requestParams = {
        filterType: 2,
        composeId: res.data.composeId,
        storeName: "",
      };
    });
  },
  computed: {
    disableNum: function () {
      return 2 - this.tableData.length;
    },
  },
  methods: {
    SelectItem: function (e) {  
      if(this.tableData.length>0){
        if(e.indexOf(this.tableData[0])>-1){
          this.$message.error('已存在该商品') 
          return false;
        }
      } 
      this.tableData = e.concat(this.tableData); 
    },
    DelMenu: function (index) {  
      this.tableData.splice(index, 1); 
    },
    Save: function () {
      let arr = this.tableData.map((item) => {
        return item.id;
      });
      let par = {
        composeId: Number(this.$route.query.id),
        secondIds: arr,
      };
      saveSecond(par).then((res) => {
        this.$message.success("添加成功");
        this.$router.push("/combinationProduct");
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
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
}
.mainProduct {
  .content {
    display: flex;
    flex: 1;
    .left {
      margin-right: 20px;
    }
    .right {
      div {
        margin-bottom: 10px;
        &:last-child {
          margin: 0;
        }
      }
      .title {
        color: #273a8a;
        line-height: 20px;
        cursor: pointer;
      }
    }
  }
}
.item-group {
  border-top: 1px solid #dcdfe6;
  display: flex;
  padding: 10px 0;
  position: relative;
  .ellipsis {
    flex: 1;
    padding-left: 13px;
    display: flex;
    align-items: center;
  }
  .options {
    float: right;
    margin: 0 10px;
    line-height: 62px;
    i {
      margin: 0 5px;
      vertical-align: middle;
      cursor: pointer;
    }
  }
}
.textBtn {
  padding: 0;
  margin-right: 10px;
  color: #273a8a;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
}
.infoContent {
  line-height: 18px;
  font-size: 12px;
  color: #606266;
  margin-bottom: 10px;
  &:last-child {
    margin: 0;
  }
}
.infoTip {
  color: #1a1d2c;
  font-size: 14px;
  padding-bottom: 14px;
}
</style> 