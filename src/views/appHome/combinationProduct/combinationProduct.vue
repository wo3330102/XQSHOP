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
        组合商品
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
        <el-button
          @click="
            status = status === 1 ? 0 : 1;
            ChangeStatus();
          "
          >{{ status === 1 ? "关闭" : "开启" }}</el-button
        >
        <el-button @click="$NavgitorTo('/combinationOption')">配置</el-button>
        <el-button type="primary" @click="ShowAddMain">添加主商品</el-button>
      </span>
    </h1>
    <div style="min-height: 200px">
      <el-row style="margin: 0 -10px">
        <el-col :span="16" style="padding-left: 10px; padding-right: 10px">
          <div class="box" style="padding: 0">
            <table-tem
              :option-list="['批量添加子商品', '删除']"
              :requestUrl="'api/yxComposeProduct'"
              :requestParams="requestParams"
              :isRefresh="isRefresh"
              :addTableData="addData"
              @rowClick="toDetail"
              @BatchOption="BatchOption"
              @resultData="Init"
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
                  <template v-if="item.prop == 'productImage'">
                    <span
                      class="small-img"
                      :style="{
                        backgroundImage: 'url(' + scope.row.productImage + ')',
                      }"
                    ></span>
                  </template>
                  <template v-else-if="item.prop == 'composeCount'">
                    <span>{{ scope.row.composeCount }}/2</span>
                  </template>
                  <template v-else-if="item.prop == 'option'">
                    <span
                      class="textBtn"
                      @click.stop="Perview(scope.row.productId)"
                      >预览</span
                    >
                    <span class="textBtn">编辑</span>
                  </template>
                  <span v-else>{{ scope.row[item.prop] }}</span>
                </template>
              </el-table-column>
            </table-tem>
          </div>
        </el-col>
        <el-col :span="8" style="padding-left: 10px; padding-right: 10px">
          <div class="box">
            <p class="infoTip">信息提示</p>
            <p class="infoContent">
              1.组合商品的添加方式：先添加一个主商品 ，再添加多个组合商品。
            </p>
            <p class="infoContent">
              2.商店中总共有55个商品。共有12个商品配置了组合商品。
            </p>
            <p class="infoContent">
              3.使用批量添加子商品时，若添加的子商品与主商品重复，则不添加该商品。
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
    <selectProduct
      :visible.sync="shopDialog"
      @selectItem="SelectItem"
      :requestUrl="'api/yxComposeProduct/list/product'"
      :requestParams="getProductListParams"
      :disableNum="disableNum"
      :needLoad="false"
    ></selectProduct>
  </div>
</template> 
<script>
import tableTem from "@/components/tableTem";
import selectProduct from "@/components/selectProduct";
import { addMain, changeStatus, del, addSecond } from "@/api/yxComposeProduct";
var addManyChildrenProduct = [];
export default {
  components: {
    tableTem,
    selectProduct,
  },
  data() {
    return {
      status: 0,
      requestParams: {
        page: 0,
        size: 30,
      },
      getProductListParams: {
        filterType: 1,
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
      addData: [],
      addType: 1, // 1为添加主商品，2为批量添加子商品；
      disableNum: 9999999,
    };
  },
  watch: {
    addType: function (val) {
      val == 1 ? (this.disableNum = 0) : (this.disableNum = 2);
    },
  },
  methods: {
    Perview: function (id) {
      if (this.status == 1) {
        let url =
          process.env.NODE_ENV == "product"
            ? "https://"
            : "http://" +
              localStorage.getItem("storeUrl") +
              "/product-details.html?id=" +
              id;
        window.open(url, "_blank");
      }
    },
    Init: function (e) {
      this.status = e.data.isOpen;
    },
    // 添加主商品
    ShowAddMain: function () {
      this.getProductListParams = {
        filterType: 1,
        storeName: "",
      };
      this.shopDialog = true;
      this.addType = 1;
    },
    toDetail: function (e) {
      this.$router.push({
        path: "/combinationDetail",
        query: {
          id: e.composeId,
        },
      });
      localStorage.setItem("combinationDetail", JSON.stringify(e));
    },
    // 批量操作
    BatchOption: function (index, item) {
      switch (index) {
        case 0:
          addManyChildrenProduct = item.map((i) => {
            return i.composeId;
          });
          this.shopDialog = true;
          this.getProductListParams = {
            filterType: 0,
            storeName: "",
          };
          this.addType = 2;
          break;
        case 1:
          let arr = item.map((i) => {
            return i.composeId;
          });
          del(arr).then((res) => {
            this.$message.success("删除成功");
            this.isRefresh += 1;
          });
      }
    },
    SelectItem: function (e) {
      // this.addData = e;
      let arr = e.map((item) => {
        return item.id;
      });
      let par = {};
      if (this.addType == 1) {
        par = {
          mainIds: arr,
        };
        addMain(par).then((res) => {
          this.$message.success("添加成功");
          this.isRefresh += 1;
        });
      } else {
        par = {
          ids: addManyChildrenProduct,
          secondIds: arr,
        };
        addSecond(par).then((res) => {
          this.$message.success("添加成功");
          this.isRefresh += 1;
        });
      }
    },
    // 修改当前组件开关
    ChangeStatus: function () {
      let par = { isOpen: this.status == 1 ? 1 : 0 };
      changeStatus(par).then((res) => {
        this.$message.success("修改成功");
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
.off-the-shelf {
  color: rgb(202, 203, 214);
  border: 1px solid rgb(202, 203, 214);
  padding: 4px 8px;
  display: inline-block;
  font-size: 12px;
  line-height: 1;
  border-radius: 11px;
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