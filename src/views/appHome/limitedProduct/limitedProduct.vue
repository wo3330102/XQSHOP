<template>
  <div class="container">
    <router-link
      to="/appHome"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>我的应用</span>
    </router-link>
    <h1 class="title">
      <span class="text">
        限量优惠
        <span
          class="sail-app-status-tag"
          :class="
            status == 1
              ? 'sail-app-status-tag-open'
              : 'sail-app-status-tag-close'
          "
          >{{ status == 1 ? "已开启" : "未开启" }}</span
        >
      </span>
      <span class="options">
        <el-button @click="IsOpen">{{
          status == 1 ? "关闭" : "开启"
        }}</el-button>
        <el-button @click="$NavgitorTo('/limitedProductOption')"
          >配置</el-button
        >
        <el-button type="primary" @click="showAdd = true">新增</el-button>
      </span>
    </h1>
    <div class="content">
      <div class="conditions">
        <!-- 筛选商品 -->
        <div class="search-box">
          <el-input
            v-model="searchVal"
            placeholder="搜索产品名称"
            @change="Search"
          >
            <el-button slot="append" @click="Search">搜索</el-button>
          </el-input>
        </div>
      </div>
      <table-tem
        :optionList="optionList"
        :requestUrl="'api/productLimit/limitedProductList'"
        :requestParams="requestParams"
        :tableHeader="tableHeader"
        :isRefresh="isRefresh"
        :default-sort="{ prop: 'num', order: 'descending' }"
        @BatchOption="BatchOption"
        @resultData="InitStatus"
      >
        <el-table-column
          v-for="(item, index) in tableHeader"
          :key="index"
          :width="item.width ? item.width : ''"
          :prop="item.prop ? item.prop : ''"
          :label="item.label ? item.label : ''"
          :align="item.align ? item.align : ''"
          :sortable="item.sortable"
        >
          <template slot-scope="scope">
            <!-- 图片 -->
            <span
              v-if="item.prop == 'image'"
              class="small-img"
              :style="{ backgroundImage: 'url(' + scope.row.image + ')' }"
            >
            </span>
            <!-- 名称 -->
            <span v-else-if="item.prop == 'name'">
              <div class="handleText">{{ scope.row.name }}</div>
              <div class="discount-spec">规格：{{ scope.row.sku }}</div>
            </span>
            <!-- 价格 -->
            <template v-else-if="item.prop == 'price'">
              {{
                currency.s +
                " " +
                (scope.row.price ? $toDecimal2(scope.row.price) : "0.00")
              }}
            </template>
            <!-- 优惠价格 -->
            <template v-else-if="item.prop == 'preferentialPrice'">
              <el-input
                v-if="scope.row.isEdit"
                v-model="scope.row.editPrice"
                placeholder="输入优惠价格"
                @blur="
                  scope.row.editPrice == ''
                    ? (scope.row.editPrice = $toDecimal2(
                        scope.row.preferentialPrice
                      ))
                    : (scope.row.editPrice = $toDecimal2(scope.row.editPrice))
                "
              ></el-input>
              <span v-else>{{
                currency.s +
                " " +
                (scope.row.preferentialPrice
                  ? $toDecimal2(scope.row.preferentialPrice)
                  : "0.00")
              }}</span>
            </template>
            <!-- 优惠件数 -->
            <template v-else-if="item.prop == 'number'">
              <el-input
                v-if="scope.row.isEdit"
                v-model="scope.row.editNum"
                placeholder="输入优惠件数"
                @blur="
                  scope.row.editNum == ''
                    ? (scope.row.editNum = scope.row.number)
                    : true
                "
              ></el-input>
              <span v-else>{{ scope.row.number }}</span>
            </template>
            <!-- 状态 -->
            <template v-else-if="item.prop == 'status'">
              <el-switch
                v-model="scope.row.status"
                @click.native.stop="Option(scope.row, 'status')"
                :active-value="1"
                :inactive-value="0"
                active-color="#34395d"
                inactive-color="#dcdfe6"
              ></el-switch>
            </template>
            <!-- 操作 -->
            <template v-else-if="item.prop == 'option'">
              <span
                v-if="scope.row.isEdit"
                class="textBtn"
                @click.stop="Option(scope.row, 'save')"
              >
                保存
              </span>
              <span
                v-else
                class="textBtn"
                @click.stop="Option(scope.row, 'edit')"
                >编辑</span
              >
              <span class="textBtn" @click.stop="Option(scope.row, 'del')"
                >删除</span
              >
            </template>
          </template>
        </el-table-column>
      </table-tem>
    </div>
    <!-- 批量修改 -->
    <default-dialog
      :visible.sync="showEdit"
      :title="'批量修改'"
      @toConfirm="SaveChange"
    >
      <el-form :model="form">
        <el-form-item label="优惠价格">
          <el-input
            v-model="form.price"
            @change="form.price = $toDecimal2(form.price)"
            placeholder="请输入优惠价格"
          ></el-input>
        </el-form-item>
        <el-form-item label="优惠数量">
          <el-input v-model="form.num" placeholder="请输入优惠数量"></el-input>
        </el-form-item>
      </el-form>
    </default-dialog>
    <!-- 新增 -->
    <default-dialog
      :visible.sync="showAdd"
      @toConfirm="SaveAdd"
      :setWidth="'800px'"
      class="add-box"
      :disabled="addBtnDisabled"
      :title="'新增限量优惠商品'"
    > 
      <div slot="DIYtitle" style="    line-height: 24px;
    font-size: 18px;
    color: #303133;">
        新增限量优惠商品 <span style=" font-weight: normal;font-size: 12px;color: rgb(150, 167, 183);">（仅展示商品列表前10个商品，若想选择更多商品，请使用搜索功能）</span>
      </div>
      <div>
        <div class="seach-box-list">
          <!-- <div class="seach-box-item">
            <el-select v-model="productListParams.tag" placeholder="请选择标签" style="width: 164px;">
              <el-option
                :label="item"
                :value="item"
                v-for="(item, index) in tagList"
                :key="index"
              ></el-option>
            </el-select>
          </div> -->
          <div class="seach-box-item">
            <el-select
              v-model="productListParams.tagId"
              clearable
              @clear="productListParams.tagId = ''"
              placeholder="请选择分类"
              style="width: 164px"
            >
              <el-option
                :label="item.title"
                :value="item.id"
                v-for="(item, index) in cateList"
                :key="index"
              ></el-option>
            </el-select>
          </div>
          <div class="seach-box-item">
            <el-input
              v-model="productSearchVal"
              @change="productListParams.storeName = productSearchVal"
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
            >
              <el-button slot="append" @click="ProductSearch">搜索</el-button>
            </el-input>
          </div>
        </div>
        <div class="discount-content">
          <el-collapse :value="activeArr">
            <el-collapse-item
              :name="index"
              v-for="(item, index) in productList"
              :key="index"
            >
              <template
                slot="title"
                style="padding-left: 90px; display: flex; align-item: center"
              >
                <el-checkbox
                  v-model="item.isSelect"
                  :indeterminate="item.indeterminate"
                  :disabled="item.disabled"
                  @click.prevent
                  @change="
                    (e) => {
                      CheckMainProduct(e, index, i);
                    }
                  "
                  :label="item.id"
                >
                  <div
                    class="small-img"
                    style="width: 40px; height: 40px"
                    :style="{ 'background-image': 'url(' + item.image + ')' }"
                  ></div>
                  {{ item.storeName }}
                </el-checkbox>
              </template>
              <p class="sku-list-item" v-for="v in item.attrs" :key="v.unique">
                <el-checkbox
                  :indeterminate="false"
                  v-model="v.isSelect"
                  :disabled="v.disabled"
                  style="width: 100%"
                  @change="
                    (e) => {
                      CheckSKU(e, index);
                    }
                  "
                >
                  {{ v.sku }}
                  <span class="price">{{ currency.s + $toDecimal2(v.price) }}</span>
                </el-checkbox>
              </p>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </default-dialog>
  </div>
</template> 
<script> 
let listDetail = ''; // 用于判断是否需要禁用新增按钮
let batchOptionArr = [];  // 用于批量修改；
import tableTem from "@/components/tableTem";
import {
  addLimited,
  delLimited,
  isOpne,
  isStatus,
  updateLimited,
  getOptionalProduct,
} from "@/api/productLimit";
import {getCates} from '@/api/yxStoreCategory'
import defaultDialog from "@/components/defaultDialog.vue";
export default {
  components: {
    tableTem,
    defaultDialog,
  },
  data() {
    
    return {
      status: 1,
      searchVal: "",
      requestParams: {
        page: 0,
        size: 30,
        productName: "",
      },
      isRefresh: 0,
      optionList: ["批量修改", "删除"],
      tableHeader: [
        {
          prop: "image",
          width: "80",
          label: "",
        },
        {
          prop: "name",
          label: "商品名",
          width: "300",
        },
        {
          prop: "price",
          label: "价格（" + this.currency.n + "）",
          width: "136",
          // sortable: true,
          align: "right",
        },
        {
          prop: "preferentialPrice",
          label: "优惠价格（" + this.currency.n + "）",
          align: "right",
        },
        {
          prop: "number",
          label: "优惠数量（件）",
          align: "right",
        },
        {
          prop: "status",
          label: "状态",
          align: "center",
        },
        {
          prop: "option",
          label: "操作",
          width: "125",
          align: "left",
        },
      ],
      showEdit: false,
      form: {
        price: "0.00",
        num: "1",
      },
      showAdd: false,
      productSearchVal: "",
      productListParams: {
        tagId: "",
        storeName: "",
      }, 
      cateList:[],
      productList: [],
      activeArr: [], // 解决新增时的未展开折叠面板的BUG；
      addBtnDisabled: true, // 是否能够点击新增按钮
    };
  },
  watch: {
    form: {
      handler: function (val) {
        console.log(val);
      },
      deep: true,
    },
    productListParams: {
      handler: function () {
        this.GetOptionalProductList();
      },
      deep: true,
    },
    productList: {
      handler:function (val) { 
        let newVal = JSON.stringify(val); 
        if (newVal == listDetail) { 
          this.addBtnDisabled = true;
        } else { 
          this.addBtnDisabled = false;
        }
      },
      deep:true,
    }
  },
  created() {
    getCates().then(res=>{
      this.cateList = res.content
    })
    this.GetOptionalProductList();
  },
  methods: {
    // 控制当前限量优惠状态
    IsOpen: function () {
      let status = this.status == 1 ? 0 : 1;
      let par = {
        isOpen: status,
      };
      isOpne(par).then((res) => {
        this.$message.success("修改成功");
        this.status == 1 ? (this.status = 0) : (this.status = 1);
      });
    },
    // 查看当前限量优惠状态
    InitStatus: function (res) {
      console.log(res);
      this.status = Number(res.data.isOpen);
    },
    // 批量操作
    BatchOption: function (index, selectItem) {
      let that = this;
      let par = selectItem.map((item) => {
        return item.id;
      });
      switch (index) {
        case 0:
          batchOptionArr = [...par];
          this.showEdit = true;
          break;
        case 1:
          delLimited(par).then((res) => {
            this.$message.success("删除成功");
            this.isRefresh += 1;
          });
          break;
      }
    },
    // 搜索
    Search: function () {
      this.requestParams.productName = this.searchVal;
    },
    // 单个评论操作
    Option: function (detail, type) {
      let par = {};
      switch (type) {
        case "status":
          par = {
            id: detail.id,
            status: detail.status,
          };
          isStatus(par).then((res) => {
            this.$message.success("修改成功");
          });
          break;
        case "edit":
          detail.isEdit = true;
          break;
        case "save":
          par = {
            ids: [detail.id],
            num: detail.editNum,
            price: detail.editPrice,
          };
          updateLimited(par).then((res) => {
            detail.number = detail.editNum;
            detail.preferentialPrice = detail.editPrice;
            this.$message.success("修改成功");
            detail.isEdit = false;
          });
          break;
        case "del":
          delLimited([detail.id]).then((res) => {
            this.$message.success("删除成功");
            this.isRefresh += 1;
          });
          break;
      }
    },
    // 保存批量修改
    SaveChange: function (e) {
      console.log(batchOptionArr);
      updateLimited
    },
    // 获取新增产品列表
    GetOptionalProductList: function () {
      getOptionalProduct(this.productListParams).then((res) => { 
        res.data.map((item) => {
          item.isSelect = false;
          item.disabled = false;
          item.indeterminate = false;
          item.attrs.forEach((v) => {
            v.isSelect = Boolean(v.isSelect);
            if (v.isSelect) {
              item.indeterminate = true;
              item.disabled = true;
              v.disabled = true;
            } else {
              v.disabled = false;
            }
          });
        });
        listDetail = JSON.stringify(res.data);
        this.productList = res.data;
      });
    },
    // 选中当前商品
    CheckMainProduct: function (e, index) {   
      if (e) {
        this.productList[index].isSelect = true;
        this.productList[index].indeterminate = false;
        this.activeArr.indexOf(index)>-1?'':this.activeArr.push(index); 
      } else {
        this.productList[index].isSelect = false;
      }
      this.productList[index].attrs.map((v) => {
        if (v.disabled == false) {
          v.isSelect = e;
        }
      });
    },
    // 选中当前商品的某条sku
    CheckSKU: function (e, index) {
      if (this.productList[index].disabled == false) {
        // 判断是否选中当前SKU
        if (e == false) {
          this.productList[index].isSelect = false;
          // 取消选择（判断是否取消父级indeterminate状态）
          this.productList[index].indeterminate = false;
          this.productList[index].attrs.forEach((v) => {
            if (v.isSelect == true) {
              this.productList[index].indeterminate = true;
              return false;
            }
          });
        } else {
          // 确认选中（判断是否取消父级indeterminate状态）
          this.productList[index].indeterminate = false;
          this.productList[index].attrs.forEach((v) => {
            if (v.isSelect == false) {
              this.productList[index].indeterminate = true;
              return false;
            }
          });
          if (this.productList[index].indeterminate == false) {
            this.productList[index].isSelect = true;
          }
          return false;
        }
      }
    },
    // 确认添加
    SaveAdd: function () {
      let par = [];
      this.productList.map((item) => {
        let arr = [];
        item.attrs.map((v) => {
          if (v.disabled == false) {
            if (v.isSelect) {
              arr.push({
                price: v.price,
                unique: v.unique,
              });
            }
          }
        });
        if (arr.length > 0) {
          par.push({
            attrs: arr,
            productId: item.id,
            storeName: item.storeName,
          });
        }
      });
      console.log(par);
      addLimited(par).then((res) => {
        this.showAdd = false;
        this.$message.success("添加成功");
        this.productSearchVal = "";
        this.productListParams = {
          tagId: "",
          storeName: "",
        };
        this.isRefresh += 1;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
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
.content {
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  background-color: #fff;
  .conditions {
    padding: 9px 12px;
    display: flex;
    border-bottom: 1px solid #f1f1f6;
    flex-wrap: wrap;
    .search-box {
      display: flex;
      flex: 1;
    }
  }
  /deep/ tbody input {
    text-align: right;
  }
}
.add-box {
  .seach-box-list {
    display: flex;
    padding: 20px;
    .seach-box-item {
      margin-left: 20px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        width: 100%;
      }
    }
  }
  .discount-content {
    border-top: 1px solid #d9d9e6;
    height: 450px;
    max-height: 450px;
    overflow: auto;
    .sku-list-item {
      height: 50px;
      line-height: 50px;
      margin-left: 45px;
      border-bottom: 1px solid #f4f4f4;
      .price {
        font-size: 13px;
        font-weight: 400;
        color: #4d6173;
        line-height: 18px;
        float: right;
      }
    }
  }
  /deep/.el-dialog__body {
    padding: 0;
  }
  /deep/.el-collapse-item__header {
    padding: 5px 20px;
  }
  /deep/.el-collapse-item__content {
    border-top: 1px solid #f4f4f4;
  }
  /deep/.el-checkbox__label {
    width: 93%;
  }
}

.handleText {
  color: #273a8a;
  line-height: 20px;
  cursor: pointer;
  text-decoration: none;
}
.discount-spec {
  font-size: 13px;
  color: #9ea0a9;
  line-height: 18px;
  margin-top: 4px;
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
.sail-app-status-tag-open {
  border: 2px solid #fff;
  background: #bbe5b3;
  color: #414f3e;
}
.sail-app-status-tag-close {
  background: #dfe3e8;
  border: 2px solid #fff;
  color: #454f5b;
}
.sail-app-status-tag {
  border-radius: 100px;
  width: 60px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 13px;
  text-align: center;
  position: relative;
  top: -4px;
}
.flex {
  display: flex;
  align-items: center;
}
/deep/.el-checkbox__label {
  color: #697c90;
}
</style>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>