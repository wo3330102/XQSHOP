<template>
  <div class="container">
    <router-link
      to="/logisticsManagement"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>物流管理</span>
    </router-link>
    <h1 class="title">
      <span> {{ status == 0 ? "通用物流" : "自定义物流" }} </span>
    </h1>
    <div>
      <el-row>
        <el-col :span="16">
          <!-- 通用物流方案页面 -->
          <div class="box p0" v-if="status == 0">
            <div class="product-title-box p20">
              <p class="product-title">
                全部商品
                <span class="light-title">
                  (不包含在自定义物流方案中的商品，新添加的商品将自动加入到通用物流中)
                </span>
              </p>
              <p class="product-sub-title">
                若要针对特定的商品添加自定义物流方案，请在
                <span
                  class="textBtn not-pd"
                  @click="$NavgitorTo('/logisticsManagement')"
                  >物流管理</span
                >
                中创建自定义物流
              </p>
            </div>
            <div class="product-container">
              <table class="product-table">
                <tbody>
                  <tr v-for="(item, index) in commodityList" :key="item.id">
                    <td style="min-width: 44px">
                      {{ requestParams.page * 6 + index + 1 }}
                    </td>
                    <td>
                      <span
                        class="small-img"
                        :style="{ backgroundImage: 'url(' + item.image + ')' }"
                      ></span>
                    </td>
                    <td>
                      <span class="desc">{{ item.storeName }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="pagination">
                <el-pagination
                  @current-change="CurrentChange"
                  :current-page.sync="currentPage"
                  background
                  :page-size="requestParams.size"
                  layout="total, prev, pager, next"
                  :total="total"
                ></el-pagination>
              </div>
            </div>
          </div>
          <!-- 自定义物流方案页面 -->
          <template v-else>
            <div class="box prl-20">
              <el-form :model="form">
                <el-form-item label="名称" :rules="{ require: true }">
                  <el-input v-model="form.name" placeholder=""></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="box p0">
              <div class="product-title-box p20">
                <p class="product-title">
                  商品
                  <span class="light-title">
                    (添加的商品将在通用物流中移除)
                  </span>
                  <span
                    class="textBtn not-pd"
                    style="float: right"
                    @click="ClickAddProduct"
                    >添加商品</span
                  >
                </p>
              </div>
              <div class="product-container">
                <template v-if="commodityList.length > 0">
                  <table class="product-table">
                    <tbody>
                      <tr v-for="(item, index) in commodityList" :key="item.id">
                        <td style="min-width: 44px">
                          {{ (currentPage - 1) * 6 + index + 1 }}
                        </td>
                        <td>
                          <span
                            class="small-img"
                            :style="{
                              backgroundImage: 'url(' + item.image + ')',
                            }"
                          ></span>
                        </td>
                        <td>
                          <span class="desc">{{ item.storeName }}</span>
                        </td>
                        <td>
                          <span
                            style="
                              color: rgb(193, 194, 204);
                              cursor: pointer;
                              float: right;
                            "
                          >
                            <i
                              class="el-icon-delete"
                              @click="DelProduct(item, index)"
                            ></i>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="pagination">
                    <el-pagination
                      @current-change="CurrentChange"
                      :current-page.sync="currentPage"
                      background
                      :page-size="6"
                      layout="total, prev, pager, next"
                      :total="total"
                    ></el-pagination>
                  </div>
                </template>
                <template v-else>
                  <div class="no-content">
                    没有商品，请点击“添加商品”按钮来为特定的商品设置物流地区与价格
                  </div>
                </template>
              </div>
            </div>
          </template>
          <div class="logistics-programme">
            <p class="logistics-programme-title">物流方案</p>
            <span class="fr textBtn no-pd" @click="AddPlan">添加物流方案</span>
          </div>
          <template v-if="logisticsList && logisticsList.length > 0">
            <div
              class="box list p0"
              v-for="(item, index) in logisticsList"
              :key="index"
            >
              <h3 class="title ptrl-20">
                {{ item.shippingName }}
                <span
                  class="option"
                  style="margin-left: 10px"
                  v-show="logisticsList.length>1"
                  @click="DelPlan(item, index)"
                  >删除</span
                >
                <span class="option" @click="EditPlan(item)">编辑</span>
              </h3>
              <p class="desc">{{ item.countries_list }}</p>
              <table class="express-list">
                <tr v-for="(plan, index) in item.freeInfo" :key="index">
                  <td>
                    <p>{{ plan.name }}</p>
                    <p>
                      <template v-if="plan.type == 1">
                        下单金额：{{ currency.s
                        }}{{ plan.minUnit ? $IsNaN(plan.minUnit) : "0.00" }}
                        {{
                          plan.maxUnit
                            ? "- " + currency.s + $IsNaN(plan.maxUnit)
                            : "and up"
                        }}
                      </template>
                      <template v-else>
                        下单重量：{{ plan.minUnit }}g
                        {{
                          plan.maxUnit ? "- " + plan.maxUnit + "g" : "and up"
                        }}
                      </template>
                    </p>
                  </td>
                  <td>
                    {{
                      plan.price == 0
                        ? "免运费"
                        : currency.s + $IsNaN(plan.price)
                    }}
                  </td>
                </tr>
              </table>
            </div>
          </template>
          <template v-else>
            <div class="box p0">
              <div class="no-content">
                没有物流方案，请点击“添加物流方案”按钮来为特定的商品设置物流地区与价格
              </div>
            </div>
          </template>
        </el-col>
        <el-col :span="8">
          <div class="box-right">
            <p class="infoTip">温馨提示</p>
            <p class="infoContent">
              1.设置店铺可支持的物流配送地区，以及在订单结账页中，提供可供客户选择的物流配送方案。
            </p>
            <p class="infoContent" style="margin-top: 14px">
              2.没有设置物流配送的国家或地区，客户下单时将无法选择这些国家或地区。
            </p>
          </div>
        </el-col>
      </el-row>
      <div class="pageSaveBtn" v-if="status == 1">
        <el-button type="danger" style="float: left" @click="Del"
          >删除</el-button
        >
        <el-button @click="$NavgitorTo('/logisticsManagement')">取消</el-button>
        <el-button type="primary" @click="Save">保存</el-button>
      </div>
    </div>
    <el-dialog title="请选择商品" :visible.sync="shopDialog">
      <div class="search-conditions">
        <template>
          <!-- 商品标签 -->
          <!-- <el-select
              v-model="requestParams.shopLabelValue"
              size
              placeholder="请选择标签"
              style="width: 200px"
              @change="
                () => {
                  table = [];
                  initData();
                }
              "
            >
              <el-option
                v-for="item in shopLabelList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select> -->
          <!-- 商品分类 -->
          <el-select
            v-model="customRequest.tagId"
            size
            placeholder="请选择分类"
            style="width: 200px"
            @change="
              () => {
                table = [];
              }
            "
          >
            <el-option
              v-for="item in shopCategoryList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-input
            style="width: 380px"
            size
            v-model="shopContent"
            placeholder="请输入内容"
          >
            <el-button slot="append" @click="Search">查询</el-button>
          </el-input>
        </template>
      </div>
      <el-table
        v-if="table.length > 0"
        :data="table"
        style="width: 100%"
        empty-text
        v-el-table-infinite-scroll="Load"
        :infinite-scroll-delay="200"
        :infinite-scroll-distance="50"
        @selection-change="
          (e) => {
            selectItem = e;
          }
        "
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="left" width="80" prop="image" label="商品图片">
          <template slot-scope="scope">
            <span
              class="small-img"
              :style="{ backgroundImage: 'url(' + scope.row.image + ')' }"
            ></span>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="storeName" label="商品名称">
          <template slot-scope="scope">
            <p class="preWrap">{{ scope.row.storeName }}</p>
            <span class="sign-span-item" v-if="scope.row.isShow == 0"
              >已下架</span
            >
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer">
        <span style="float: left; line-height: 41px"
          >总共{{ tableTotal }}个商品， 已选择{{ selectItem.length }}个</span
        >
        <el-button @click="shopDialog = false">取消</el-button>
        <el-button type="primary" @click="CheckSelectItem">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template> 
<script>
import {
  getPlanDetail,
  getCommodity,
  getPlanList,
  createShipping,
  getCustomProduct,
  addCustomProduct,
  del,
  delPlan,
  deleteTemplateProudct,
} from "@/api/logistics";
let customProductList = [];
import { getCates } from "@/api/yxStoreCategory";
import elTableInfiniteScroll from "el-table-infinite-scroll";
export default {
  data() {
    return {
      status: 1,
      id: 0,
      requestParams: {
        page: 0,
        size: 6,
        tempId: 0,
      },
      form: {
        name: "",
      },
      total: 0,
      currentPage: 1,
      commodityList: [],
      logisticsList: [],
      shopDialog: false, // 自定义物流时是否显示添加商品弹框
      customRequest: {
        page: 0,
        size: 30,
        shopContent: "",
      },
      shopCategoryList: [], // 分类列表
      shopContent: "",
      table: [], // 自定义物流的可选择商品列表
      tableNum: 0, //
      selectItem: [], // 已选商品列表
    };
  },
  directives: {
    "el-table-infinite-scroll": elTableInfiniteScroll,
  },
  watch: {
    requestParams: {
      handler: function (val) {
        if (this.$route.query.status == 0) {
          this.GetData();
        }
      },
      deep: true,
    },
    customRequest: {
      handler: function (val) {
        console.log("监听");
        this.InitData();
      },
      deep: true,
    },
  },
  created() {
    // localStorage.removeItem("logisticsPlan")  // 清除缓存
    (this.requestParams.tempId = this.$route.query.id),
      (this.status = this.$route.query.status);
    this.id = this.$route.query.id;
    this.form.name = localStorage.getItem("logisticsName");
    //判断物流类型   0为通用物流  1为自定义物流
    if (this.$route.query.status == 0) {
      // 获取除自定义商品外的商品
      getCommodity(this.requestParams).then((res) => {
        this.commodityList = res.content;
        this.total = res.totalElements;
      });
    } else {
      // 获取自定义物流商品
      this.requestParams.size = 99;
      getCommodity(this.requestParams).then((res) => {
        // customProductList为所有的当前自定义物流下已选择的商品数据，commodityList为当前表格展示数据
        customProductList = res.content;
        this.commodityList = res.content.slice(0, 6);
        this.total = res.totalElements;
      });
      // 获取自定义可选商品分类
      getCates({ page: 0, size: 99 }).then((res) => {
        this.shopCategoryList = res.content;
      });
    }
    // 获取物流方案
    let par = {
      tempId: this.$route.query.id,
    };
    getPlanDetail(this.$route.query.id).then((res) => {
      console.log(res);
      res.map((item) => {
        let arr = [];
        // 判断是否有国家选中（无则为整洲配送）
        item.regionInfos.map((val) => {
          if (val.countriess && val.countriess.length > 0) {
            val.countriess.map((v) => {
              arr.push(v.name);
            });
          } else {
            arr.push(val.regionPlate);
          }
        });
        item.countries_list = arr.toString();
      });
      this.logisticsList = res;
    });
  },
  methods: {
    // 分页选择
    CurrentChange: function (e) {
      if (this.$route.query.status == 0) {
        this.currentPage = e;
        this.requestParams.page = e - 1;
      } else {
        this.commodityList = customProductList.slice((e - 1) * 6, e * 6);
        this.currentPage = e;
      }
    },
    // 获取物流商品
    GetData: function () {
      getCommodity(this.requestParams).then((res) => {
        this.commodityList = res.content;
        this.total = res.totalElements;
      });
    },
    // 点击添加商品
    ClickAddProduct: function (res) {
      this.table = [];
      this.customRequest = {
        page: 0,
        size: 20,
      };
      this.shopDialog = true;
    },
    // 加载表单数据
    InitData: function () {
      getCustomProduct(this.customRequest).then((res) => {
        let arr = this.table.concat(res.content);
        if (arr.length <= res.totalElements) {
          this.table = arr;
        }
        this.tableTotal = res.totalElements;
      });
    },
    // 下拉加载商品列表
    Load: function (res) {
      this.customRequest.page += 1;
    },
    // 确认添加商品
    CheckSelectItem: function () {
      let arr = [];
      this.selectItem.map((item) => {
        arr.push(item.id);
      });
      let par = {
        tempId: this.id,
        productIs: arr,
      };
      addCustomProduct(par).then((res) => {
        customProductList = customProductList.concat([...this.selectItem]);
        this.commodityList = [
          ...customProductList.slice(
            (this.currentPage - 1) * 6,
            this.currentPage * 6
          ),
        ];
        this.total = customProductList.length;
        this.$message.success("添加成功");
        this.selectItem = [];
        this.shopDialog = false;
        this.customRequest = {
          page: 0,
          size: 20,
        };
      });
    },
    // 删除当前自定义物流的已配置商品
    DelProduct: function (item, index) {
      let par = {
        productId: item.id,
        tempId: this.id,
      };
      deleteTemplateProudct(par).then((res) => {
        this.$message.success("删除成功");
        if (this.currentPage == 1) {
          customProductList.splice(index, 1);
        } else {
          customProductList.splice((this.currentPage - 1) * 6 + index, 1);
        }
        this.commodityList = customProductList.slice(
          (this.currentPage - 1) * 6,
          this.currentPage * 6
        );
        this.total = customProductList.length;
        this.customRequest = {
          page: 0,
          size: 20,
        };
      });
    },
    // 编辑当前物流
    EditPlan: function (item) {  
      let jsonStr = JSON.stringify(item) 
      localStorage.setItem("logisticsPlan", jsonStr);
      this.$router.push({
        path: "/settingLogistics",
        query: {
          tempId: this.id,
          id: item.id,
          status: this.status,
          type: 1,
        },
      });
    },
    // 新增物流方案
    AddPlan: function () {
      this.$router.push({
        path: "/settingLogistics",
        query: {
          tempId: this.id,
          status: this.status,
        },
      });
    },
    // 删除当前物流方案
    DelPlan: function (item, index) {
      delPlan([item.id]).then((res) => {
        this.$message.success("删除成功");
        this.logisticsList.splice(index, 1);
      });
    },
    // 保存修改
    Save: function () {
      let par = {
        id: this.id,
        name: this.form.name,
        type: 1,
      };
      createShipping(par).then((res) => {
        this.$message.success("修改成功");
      });
    },
    // 删除当前物流
    Del: function () {
      del([this.id]).then((res) => {
        this.$message.success("删除成功");
        this.$router.push("/logisticsManagement");
      });
    },
    // 搜索商品
    Search: function () {
      this.table = [];
      this.tableTotal = 0;
      this.customRequest = {
        page: 0,
        size: 30,
        shopContent: this.shopContent,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
h1 {
  font-size: 24px;
  margin: 0 0 12px;
  font-weight: 400;
  justify-items: center;
  display: flex;
  .title {
    flex: 1;
    line-height: 40px;
  }
}
/deep/.el-row {
  margin: 0 -10px;
  .el-col {
    padding: 0 10px;
  }
}
.product-title-box {
  border-bottom: 1px solid #dcdfe6;
  .product-title {
    font-weight: 600;
    color: #1a1d2c;
  }
  .light-title {
    font-weight: 400;
    font-size: 12px;
    color: #a4a8b4;
  }
  .product-sub-title {
    margin-top: 8px;
    font-size: 12px;
    color: #5e7185;
    .textBtn {
      font-size: 12px;
    }
  }
}
.product-table {
  width: 100%;
  tr {
    td {
      padding: 12px 0;
      border-bottom: 1px solid #f4f4f4;
      .desc {
        height: 44px;
        display: -webkit-box;
        overflow: hidden;
        line-height: 22px;
        max-width: 400px;
        width: 400px;
      }
      &:first-child {
        padding-left: 20px;
      }
      &:last-child {
        padding-left: 20px;
        padding-right: 20px;
      }
    }
  }
}
.pagination {
  padding: 14px 0;
  text-align: center;
}
.logistics-programme {
  height: 36px;
  margin-bottom: 12px;
  margin-top: 32px;
  display: flex;
  align-items: center;
  .logistics-programme-title {
    font-size: 18px;
    line-height: 36px;
    color: #1a1d2d;
    flex: 1;
  }
}
.textBtn {
  padding: 10px 0;
  color: #273a8a;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  text-decoration: underline;
}
.textBtn.not-pd {
  padding: 0;
}
.list {
  color: #5e7185;
  font-size: 12px;
  .desc {
    border-bottom: 1px solid #dcdfe6;
    padding: 0 20px 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 10px;
  }
}
.express-list {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  tr {
    border-bottom: 1px solid #dcdfe6;
  }
  td {
    padding: 20px 0;
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
    &:first-child {
      padding-left: 30px;
      p {
        &:first-child {
          color: rgb(36, 43, 74);
          font-size: 14px;
          margin-bottom: 6px;
          line-height: 20px;
        }
        &:last-child {
          color: rgb(121, 125, 140);
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
    &:last-child {
      padding-right: 20px;
      text-align: right;
      color: rgb(30, 35, 57);
      font-size: 14px;
      line-height: 20px;
    }
  }
}
.no-content {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #c4c7cd;
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
  & > .title {
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 12px;
    color: #1a1d2c;
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
.box-right {
  margin-bottom: 20px;
  padding: 12px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  overflow: hidden;
  & > .infoTip {
    color: #1a1d2c;
    font-size: 14px;
    padding-bottom: 14px;
  }
  .infoContent {
    line-height: 18px;
    font-size: 12px;
    color: #606266;
  }
}
.pageSaveBtn {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
  text-align: right;
  font-size: 0;
  margin-bottom: 40px;
}
.sign-span-item {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  margin-right: 20px;
  display: inline-block;
  &::before {
    top: -1px;
    content: "";
    width: 6px;
    height: 6px;
    margin-right: 4px;
    border-radius: 4px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #8c8c8c;
    background-color: #e4e4e4;
  }
}
.p0 {
  padding: 0 !important;
}
.p20 {
  padding: 20px !important;
}
.fr {
  float: right;
}
.ptrl-20 {
  padding: 20px 20px 0 !important;
}
// .small-img {
//   display: inline-block;
//   vertical-align: middle;
//   width: 50px;
//   height: 50px;
//   border-radius: 4px;
//   border: 1px solid #dadde4;
//   background-color: #f7f8fd;
//   background-origin: content-box;
//   background-position: 50% 50%;
//   background-size: contain;
//   background-repeat: no-repeat;
//   overflow: hidden;
// }
/deep/.el-input-group__prepend {
  background: #fff;
}
/deep/ .el-icon-delete-solid {
  font-size: 18px;
  line-height: 38px;
  cursor: pointer;
}
/deep/.el-input-group__append {
  background: #fff;
}
</style>  