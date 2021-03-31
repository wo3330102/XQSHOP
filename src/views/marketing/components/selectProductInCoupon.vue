<template>
  <el-dialog
    title="选择商品"
    width="770px"
    :visible.sync="dialogVisible"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <div class="p-box">
      <div class="p-menu">
        <el-input
          v-model="requestParams.storeName"
          placeholder="请输入商品名称"
        ></el-input>
        <!-- <el-input v-model="requestParams.storeName" placeholder="请输入商品名称"></el-input> -->
        <el-input
          v-model="requestParams.skuCode"
          placeholder="批量输入商品编号，用逗号隔开"
        ></el-input>
        <!-- 商品分类 -->
        <el-select
          v-model="requestParams.cateId"
          size
          style="width:100%"
          placeholder="请选择分类" 
          clearable
          @change="
            () => {
              requestParams.page = 0;
              table = [];
            }
          "
          @clear="
            () => {
              requestParams.page = 0;
              requestParams.cateId = '';
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
        <el-button @click="Search">搜索</el-button>
        <div class="check-box">
          <span>{{ selectProductId ? "已选中一个商品" : "未选择商品" }}</span>
          <img v-show="selectProduct.image" :src="selectProduct.image" />
          <el-button :disabled="disabled" type="primary" @click="confirm"
            >确认选择</el-button
          >
        </div>
      </div>
      <div class="p-list">
        <el-radio-group v-model="selectProductId">
          <el-radio
            :label="item.id"
            v-for="item in listArr"
            :key="item.id"
            border
          >
            <div class="list-item">
              <el-image :src="item.image"></el-image>
              <div style="width: 190px">
                <p>{{ item.storeName || "" }}</p>
                <!-- <span>{{itme.skuCode || ''}}</span>
                <span>{{itme.cateId || ''}}</span> -->
              </div>
              <h3>{{ currency.s + $toDecimal2(item.price) }}</h3>
              <span
                :class="item.status == 1 ? '' : 'off'"
                style="width: 66px; text-align: center"
                >{{ item.status == 1 ? "在线" : "下架" }}</span
              >
            </div>
          </el-radio>
        </el-radio-group>
        <div class="pagination">
          <el-pagination
            @current-change="CurrentChange"
            background
            :page-size="requestParams.size"
            layout="total, prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { getProductOfCoupon } from "@/api/yxStoreProduct";
import { getCates } from "@/api/yxStoreCategory";
export default {
  name: "DeaultDialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    productId: {
      type: String,
      default: "",
    },
    requestParams: {
      type: Object,
      default: function () {
        return {
          page: 0,
          size: 7,
          skuCode: "",
          cateId: "",
          storeName: "",
        };
      },
    },
  },
  watch: {
    productId: function (val) {
      this.selectProductId = val;
    },
    visible(val) {
      this.dialogVisible = val;
    },
    isRefresh: function (val) {
      this.selectItem = [];
      this.isActive = false;
      this.getData();
    },
    'requestParams.cateId':function(v){
      this.requestParams.page = 0;
      this.init();
    },
    selectProductId: function (val) {
      this.disabled = false;
      this.listArr.forEach((item) => {
        if (item.id == val) {
          this.$nextTick(() => {
            this.selectProduct = item;
          });
          console.log(item);
          return false;
        }
      });
    },
  },
  data() {
    return {
      dialogVisible: false,
      // currentPage: 1,
      disabled: true,
      selectProduct: {},
      selectProductId: "",
      listArr: [],
      shopCategoryList: [],
    };
  },
  created() {
    this.init();
    getCates(this.requestParams).then((res) => {
      this.shopCategoryList = res.content;
    });
  },
  methods: {
    init: function () {
      getProductOfCoupon(this.requestParams).then((res) => {
        this.listArr = res.data.content;
        this.total = res.data.totalElements;
      });
    },
    handleClose() {
      this.$emit("update:visible", false);
    },
    Search: function () {
      this.requestParams.page = 0;
      this.init();
    },
    confirm() {
      this.$emit("update:visible", false);
      this.$emit("Result", this.selectProduct);
    },
    // 分页选择
    CurrentChange: function (e) {
      this.requestParams.page = e - 1;
      this.init();
    },
  },
};
</script>
<style lang="scss" scoped>
.p-box {
  display: flex;
  .p-menu {
    width: 243px;
    padding-right: 23px;
    .check-box {
      border-top: 1px solid #dcdfe6;
      & > img {
        width: 100px;
        height: 100px;
        display: block;
        margin: 0 auto;
      }
      & > button {
        width: 100%;
        margin-top: 20px;
      }
      & > span {
        width: 100%;
        display: inline-block;
        text-align: center;
        line-height: 50px;
      }
    }
    & > button {
      width: 100%;
      margin-bottom: 20px;
    }
    & > div {
      margin-bottom: 10px;
    }
  }
  .p-list {
    position: relative;
    padding-left: 24px;
    flex: 1;
    /deep/.el-radio-group {
      width: 100%;
    }
    /deep/.el-radio {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 6px;
    }
    /deep/.el-radio.is-bordered + .el-radio.is-bordered {
      margin-left: 0 !important;
    }
    /deep/.el-radio--medium.is-bordered {
      padding: 9px 10px !important;
      height: 68px;
    }
    .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .el-image {
        width: 50px;
        height: 50px;
        display: block;
      }
      & > div {
        p {
          display: inline-block;
          width: 170px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      height: 100%;
      border-left: 1px solid #dcdfe6;
    }
  }
}
.off {
  color: #ff0000 !important;
}
.pagination {
  padding: 14px 0;
  text-align: center;
}
</style>
<style>
.el-radio__label {
  width: 100%;
}
</style>