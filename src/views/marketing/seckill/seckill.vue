<template>
  <div class="container">
    <h1 class="title">
      <span>秒杀</span>
      <span style="font-size: 0">
        <el-button type="primary" @click="showSelectProduct = true"
          >添加秒杀</el-button
        >
      </span>
    </h1>
    <div class="content">
      <div class="tab">
        <div>
          <div
            v-for="(item, index) in nav"
            :key="item.id"
            class="nav-item"
            :class="active == index ? 'active' : ''"
            @click="ChangeActive(index)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
      <!-- 筛选条件 -->
      <!-- <div class="conditions" v-show="active == 0 || active == 2">
        <el-input
          v-show="active == 0 || active == 2"
          v-model="searchVal"
          size="small"
          suffix-icon="el-icon-search"
          placeholder="请输入优惠券名称或券号"
          @change="Search(1)"
        ></el-input>
        <el-input
          style="margin-left: 15px"
          v-show="active == 2"
          v-model="searchVal2"
          size="small"
          suffix-icon="el-icon-search"
          placeholder="请输入优惠券名称或券号"
          @change="Search(2)"
        ></el-input>
      </div> -->
      <table-tem
        :requestUrl="nav[active].url"
        :optionList="optionList"
        :requestParams="tableParams"
        :tableHeader="tableHeader"
        :isRefresh="isRefresh"
        :isNewApi="true"
        :selection="isNeedSelection"
        @rowClick="toDetail"
        @resultData="TableResult"
        @BatchOption="BatchOption"
      >
        <!-- 外面给判断而不是在循环里面给判断的原因是为了解决el-table-column未重新生成导致页面不刷新的BUG -->
        <template v-if="active !== 2">
          <el-table-column
            v-for="item in tableHeader"
            :key="item.id"
            :width="item.width ? item.width : ''"
            :prop="item.prop ? item.prop : ''"
            :label="item.label ? item.label : ''"
            :align="item.align ? item.align : ''"
            :sortable="item.sortable"
          >
            <template slot-scope="scope">
              <template v-if="item.prop == 'image'">
                <!-- <el-image :src="scope.row.image" class="small-img"></el-image> -->
                <span class="small-img" :style="{'backgroundImage':'url('+scope.row.image+')'}"></span>
              </template>
              <template v-else-if="item.prop == 'info'">
                <div style="text-align: left">
                  <p
                    style="
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    "
                  >
                    {{ scope.row.storeName }}
                  </p>
                  <p
                    style="
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    "
                  >
                    {{ scope.row.skuCode }}
                  </p>
                  <p
                    style="
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    "
                  >
                    {{ scope.row.storeName }}
                  </p>
                </div>
              </template>
              <template v-else-if="item.prop == 'status'">
                <!-- {{scope.row.status == 1?'在线':'下线'}} -->
                <el-switch
                  v-model="scope.row.status"
                  :active-value="1"
                  :inactive-value="0"
                  @change="ChangeStatus(scope.row)"
                ></el-switch>
              </template>
              <template
                v-else-if="item.prop == 'outPrice' || item.prop == 'price'"
              >
                {{ currency.s + $toDecimal2(scope.row[item.prop]) }}
              </template>
              <template v-else-if="item.prop == 'option'">
                <el-dropdown
                  type="primary"
                  @command="
                    (e) => {
                      Options(e, scope.row);
                    }
                  "
                  @click.native.stop=""
                >
                  <el-button size="small">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="edit">编辑规则</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
              <template v-else>
                <span>{{ scope.row[item.prop] }}</span>
              </template>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column
            v-for="item in tableHeader"
            :key="item.id"
            :width="item.width ? item.width : ''"
            :prop="item.prop ? item.prop : ''"
            :label="item.label ? item.label : ''"
            :align="item.align ? item.align : ''"
            :sortable="item.sortable"
          >
            <template slot-scope="scope">
              <template v-if="item.prop == 'image'">
                <!-- <el-image :src="scope.row.image" class="small-img"></el-image> -->
                <span class="small-img" :style="{'backgroundImage':'url('+scope.row.image+')'}"></span>
              </template>
              <template v-else-if="item.prop == 'info'">
                <div style="text-align: left">
                  <p
                    style="
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    "
                  >
                    {{ scope.row.storeName }}
                  </p>
                  <p
                    style="
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    "
                  >
                    {{ scope.row.skuCode }}
                  </p>
                  <p
                    style="
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    "
                  >
                    {{ scope.row.storeName }}
                  </p>
                </div>
              </template>
              <template v-else-if="item.prop == 'status'">
                {{
                  scope.row.status == 0
                    ? "未使用"
                    : scope.row.status == 1
                    ? "已使用"
                    : "已过期"
                }}
              </template>
              <template v-else>
                {{ scope.row[item.prop] }}
              </template>
            </template>
          </el-table-column>
        </template>
      </table-tem>
    </div>
    <select-product
      :visible.sync="showSelectProduct"
      :requestParams="productParams"
      @Result="ToAdd"
    >
    </select-product>
  </div>
</template>
<script>
import tableTem from "@/components/tableTem";
import selectProduct from "../components/selectProductInCoupon"; 
import { editSeckillStatus,delSeckill } from "@/api/seckill";
export default {
  components: {
    tableTem,
    selectProduct,
  },
  data() {
    return {
      tableParams: {
        page: 0,
        size: 30,
      },
      productParams: {
        page: 0,
        size: 30,
      },
      isRefresh: 0,
      nav: [
        {
          id: 0,
          label: "商品秒杀",
          url: "api/seckill/Seckill",
        },
        {
          id: 1,
          label: "过期商品秒杀",
          url: "api/seckill/overdueList",
        },
        {
          id: 2,
          label: "秒杀历史",
          url: "api/seckill/historyList",
        },
      ],
      active: 0,
      tableHeader: [
        {
          prop: "image",
          label: "图片",
          width: "80",
          align: "center",
        },
        {
          prop: "info",
          label: "商品名称/编号/分类",
          align: "center",
        },
        {
          prop: "sort",
          label: "排序",
          width: "60",
          align: "center",
        },
        {
          prop: "status",
          label: "状态",
          width: "70",
          align: "center",
        },
        {
          prop: "outPrice",
          label: "价格",
          width: "100",
          align: "center",
        },
        {
          prop: "price",
          label: "秒杀价格",
          width: "100",
          align: "center",
        },
        {
          prop: "num",
          label: "限购数量",
          width: "80",
          align: "center",
        },
        {
          prop: "startTime",
          label: "开始时间",
          align: "center",
          width: "100",
        },
        {
          prop: "stopTime",
          label: "结束时间",
          align: "center",
          width: "100",
        },
        {
          prop: "statusStr",
          label: "活动状态",
          width: "100",
          align: "center",
        },
        {
          prop: "option",
          label: "操作",
          width: "100",
          align: "center",
        },
      ],
      showSelectProduct: false,
      isNeedSelection:true,
      optionList:['取消秒杀']
    };
  },
  methods: {
    // 表格数据
    TableResult: function (e) {},
    // 针对某个优惠券的操作
    Options: function (type, e) {
      console.log(type);
      switch (type) {
        case "edit":
          localStorage.setItem("seckillProduct", JSON.stringify(e));
          // 编辑优惠券
          this.$router.push({
            path: "/editSeckillRules",
            query: {
              id: e.id,
            },
          });
          break;
        case "status":
          console.log("复制");
          break;
        case "del":
          if (this.active == 0) {
            delCoupon([e.id]).then((res) => {
              this.$message.success("删除成功");
              this.isRefresh += 1;
            });
          } else {
            delCouponEvent([e.id]).then((res) => {
              this.$message.success("删除成功");
              this.isRefresh += 1;
            });
          }
          break;
      }
    },
    // 改变搜索条件
    ChangeActive: function (index) {
      this.active = index;
      let par = {
        page: 0,
        size: 30,
      };
      if (this.active == 2) {
        this.isNeedSelection = false;
        this.optionList = []
        this.tableHeader = [
          {
            prop: "image",
            label: "图片",
            width: "80",
            align: "center",
          },
          {
            prop: "info",
            label: "商品名称/编号/分类",
            width:'224',
            align: "left",
          },
          {
            prop: "orderId",
            label: "订单号", 
            align: "center",
            width:'180'
          },
          {
            prop: "truePrice",
            label: "价格", 
            align: "center",
          },
          {
            prop: "realName",
            label: "会员", 
            align: "center",
          },
          {
            prop: "cartNum",
            label: "购买数量", 
            align: "center",
          }, 
          {
            prop: "payTime",
            label: "时间", 
            align: "center",
          }, 
        ]
      } else {
        this.isNeedSelection = true; 
        this.optionList = ['取消秒杀']
        this.tableHeader = [
          {
            prop: "image",
            label: "图片",
            width: "80",
            align: "center",
          },
          {
            prop: "info",
            label: "商品名称/编号/分类",
            align: "center",
          },
          {
            prop: "sort",
            label: "排序",
            width: "60",
            align: "center",
          },
          {
            prop: "status",
            label: "状态",
            width: "70",
            align: "center",
          },
          {
            prop: "outPrice",
            label: "价格",
            width: "100",
            align: "center",
          },
          {
            prop: "price",
            label: "秒杀价格",
            width: "100",
            align: "center",
          },
          {
            prop: "num",
            label: "限购数量",
            width: "80",
            align: "center",
          },
          {
            prop: "startTime",
            label: "开始时间",
            align: "center",
            width: "100",
          },
          {
            prop: "stopTime",
            label: "结束时间",
            align: "center",
            width: "100",
          },
          {
            prop: "statusStr",
            label: "活动状态",
            width: "100",
            align: "center",
          },
          {
            prop: "option",
            label: "操作",
            width: "100",
            align: "center",
          },
        ];
      } 
      this.tableParams = { ...par };
    },
    // 批量操作
    BatchOption: function (e, selectItem) {
      console.log(e);
      let that = this;
      // 取消秒杀
      // 0为下架  1为上架
      let arr = [];
      selectItem.map((i) => {
        arr.push(i.id);
      }); 
      delSeckill(arr).then(() => {
        that.$message.success("删除成功");
        that.isRefresh += 1;
      });
    },
    ToAdd: function (e) {
      localStorage.setItem("seckillProduct", JSON.stringify(e));
      this.$router.push("/editSeckill");
    },
    ChangeStatus: function (e) {
      let par = {
        seckillId: e.id,
        status: e.status,
      };
      editSeckillStatus(par)
        .then((res) => {
          this.$message.success("修改成功");
          this.isRefresh += 1;
        })
        .catch((res) => {
          this.isRefresh += 1;
        });
    },
    toDetail: function (e) {
      console.log(e);
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
  .tab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 45px;
    border-bottom: 1px solid #dcdfe6;
    .active {
      border-bottom: 4px solid #f49342 !important;
      color: #1a1d2c;
    }
    .nav-item {
      display: inline-block;
      padding: 0 10px;
      height: 41px;
      background: #fcfdff;
      font-size: 14px;
      line-height: 41px;
      border-bottom: 4px solid #fcfdff;
      color: #5e7185;
      cursor: pointer;
    }
  }
  .conditions {
    padding: 9px 12px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f1f1f6;
  }
}
// .small-img {
//   width: 80px;
//   height: 80px;
// }
.download-tpl-link-new {
  color: #242b4a;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  float: right;
}
.textBtn {
  // padding: 10px 0;
  color: #273a8a;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  // margin-left: 10px;
  // text-decoration: underline;
}
</style>

