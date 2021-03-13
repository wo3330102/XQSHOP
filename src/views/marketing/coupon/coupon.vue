<template>
  <div class="container">
    <h1 class="title">
      <span>优惠券列表</span>
      <span style="font-size: 0">
        <el-button type="primary" @click="ToAddShop">添加优惠券</el-button>
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
        <el-input
          v-model="searchVal"
          size="small"
          style="width: 230px"
          suffix-icon="el-icon-search"
          placeholder="请输入优惠券名称或券号"
        ></el-input>
      </div>
      <table-tem
        :selection="false"
        :requestUrl="nav[active].url"
        :requestParams="requestParams"
        :tableHeader="tableHeader"
        :isRefresh="isRefresh"
        :isNewApi="true"
        :rowIsClick="false" 
        @rowClick="toDetail"
        @resultData="TableResult"
      >
        <el-table-column
          v-for="(item) in tableHeader"
          :key="item.id"
          :width="item.width ? item.width : ''"
          :prop="item.prop ? item.prop : ''"
          :label="item.label ? item.label : ''"
          :align="item.align ? item.align : ''"
          :sortable="item.sortable"
        > 
          <template  slot-scope="scope"  v-if="active === 0">
            <template v-if="item.prop == 'perview'">
              <span class="textBtn" @click.stop="Preview">预览</span>
            </template>
            <template v-else-if="item.prop == 'isShow'">
              {{ scope.row.isShow == 1 ? "显示" : "前端隐藏" }}
            </template>
            <template v-else-if="item.prop == 'status'">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </template>
            <template v-else-if="item.prop == 'option'">
              <el-dropdown type="primary" @command.native.stop="Options">
                <el-button size="small">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="edit">编辑</el-dropdown-item>
                  <el-dropdown-item command="copy">复制</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <template v-else>
              <span>{{ scope.row[item.prop] }}</span>
            </template>
          </template>
          <template slot-scope="scope" v-else-if="active === 1">
            <template v-if="item.prop == 'conditionVo.type'">
              {{
                new Object(scope.row.conditionVo).type == 0
                  ? "支付金额"
                  : new Object(scope.row.conditionVo).type == 1
                  ? "下单金额"
                  : "下单时间"
              }}
            </template>
            <template v-else>
              <span>{{ scope.row[item.prop] }}</span>
            </template>
          </template>
          <template slot-scope="scope" v-else-if="active == 2">
            {{ active }}
          </template>
        </el-table-column>
      </table-tem>
    </div>
  </div>
</template>
<script>
import tableTem from "@/components/tableTem";
import { getCates } from "@/api/yxStoreCategory";
export default {
  components: {
    tableTem,
  },
  data() {
    return {
      requestParams: {
        page: 0,
        size: 30,
        queryName: "",
      },
      isRefresh: 0,
      nav: [
        {
          id: 0,
          label: "优惠券活动",
          url: "api/coupon",
        },
        {
          id: 1,
          label: "优惠券事件",
          url: "api/coupon/event",
        },
        {
          id: 2,
          label: "优惠券号码",
          url: "api/coupon",
        },
      ],
      active: 0,
      searchVal: "",
      tableHeader: [
        {
          prop: "activityName",
          label: "优惠券活动",
          width: "110",
          align: "center",
        },
        {
          prop: "title",
          label: "券名（前缀、通用券）",
          width: "212",
          align: "center",
        },
        {
          prop: "perview",
          label: "预览",
          width: "70",
          align: "center",
        },
        {
          prop: "useCouponCount",
          label: "已使用",
          width: "120",
          align: "center",
        },
        {
          prop: "couponStartTime",
          label: "开始时间",
          align: "center",
        },
        {
          prop: "couponEndTime",
          label: "结束时间",
          align: "center",
        },
        {
          prop: "isShow",
          label: "前台列表是否显示",
          width: "170",
          align: "center",
        },
        {
          prop: "status",
          label: "状态",
          align: "center",
          width: "80",
        },
        {
          prop: "option",
          label: "操作",
          width: "120",
          align: "center",
        },
      ],
    };
  },
  created() {
    // 获取分类信息
    let par = {
      size: 99,
      page: 0,
    };
    getCates(par).then((res) => {
      this.categoryList = res.content;
    });
  },
  methods: {
    // 表格数据
    TableResult: function (e) {},
    // 针对某个优惠券的操作
    Options: function (e) {
      switch (e) {
        case "edit":
          break;
        case "copy":
          break;
        case "del":
          break;
      }
    },
    // 改变搜索条件
    ChangeActive: function (index) {
      this.active = index;
      switch (index) {
        case 0:
          this.tableHeader = [
            {
              prop: "activityName",
              label: "优惠券活动",
              width: "110",
              align: "center",
            },
            {
              prop: "title",
              label: "券名（前缀、通用券）",
              width: "212",
              align: "center",
            },
            {
              prop: "perview",
              label: "预览",
              width: "70",
              align: "center",
            },
            {
              prop: "useCouponCount",
              label: "已使用",
              width: "120",
              align: "center",
            },
            {
              prop: "couponStartTime",
              label: "开始时间",
              align: "center",
            },
            {
              prop: "couponEndTime",
              label: "结束时间",
              align: "center",
            },
            {
              prop: "isShow",
              label: "前台列表是否显示",
              width: "170",
              align: "center",
            },
            {
              prop: "status",
              label: "状态",
              align: "center",
              width: "80",
            },
            {
              prop: "option",
              label: "操作",
              width: "120",
              align: "center",
            },
          ]
          this.tableHeader.splice(1,0)
          break;
        case 1:
          this.tableHeader = [
            {
              prop: "eventName",
              label: "事件名称",
              width: "110",
              align: "center",
            },
            {
              prop: "memberGroupIds",
              label: "会员组",
              width: "120",
              align: "center",
            },
            {
              prop: "conditionVo.type",
              label: "限制条件",
              width: "210",
              align: "center",
            },
            {
              prop: "couponNum",
              label: "赠送优惠券",
              width: "127",
              align: "center",
            },
            {
              prop: "couponNum",
              label: "券数",
              align: "center",
            },
            {
              prop: "eventStartTime",
              label: "开始时间",
              align: "center",
            },
            {
              prop: "eventEndTime",
              label: "结束时间",
              align: "center",
            },
            {
              prop: "option",
              label: "操作",
              width: "120",
              align: "center",
            },
          ]
          this.tableHeader.splice(1,0)
          break;
        case 2:
          this.tableHeader = [
            {
              prop: "activityName",
              label: "优惠券活动",
              width: "110",
              align: "center",
            },
            {
              prop: "title",
              label: "券名（前缀、通用券）",
              width: "212",
              align: "center",
            },
            {
              prop: "perview",
              label: "预览",
              width: "70",
              align: "center",
            },
            {
              prop: "useCouponCount",
              label: "已使用",
              width: "120",
              align: "center",
            },
            {
              prop: "couponStartTime",
              label: "开始时间",
              align: "center",
            },
            {
              prop: "couponEndTime",
              label: "结束时间",
              align: "center",
            },
            {
              prop: "isShow",
              label: "前台列表是否显示",
              width: "170",
              align: "center",
            },
            {
              prop: "status",
              label: "状态",
              align: "center",
              width: "80",
            },
            {
              prop: "option",
              label: "操作",
              width: "120",
              align: "center",
            },
          ]
          this.tableHeader.splice(1,0)
          break;
      }
    },
    // 搜索
    Search: function () {
      let searchVal = this.searchVal;
      let par = {
        storeName: searchVal,
        ...this.requestParams,
      };
      this.requestParams = par;
    },
    // 批量操作
    // BatchOption: function (e, selectItem) {
    //   console.log(e);
    //   let that = this;
    //   // 0为上下架  1为删除
    //   if (e === 0) {
    //     // 0为下架  1为上架
    //     let arr = [];
    //     let par = {};
    //     selectItem.map((i) => {
    //       arr.push(i.id);
    //     });
    //     if (this.active == 0) {
    //       par = {
    //         ids: arr,
    //         status: 0,
    //       };
    //     } else {
    //       par = {
    //         ids: arr,
    //         status: 1,
    //       };
    //     }
    //     onsaleAll(par).then(() => {
    //       that.$message.success("操作成功");
    //       that.isRefresh += 1;
    //     });
    //   } else {
    //     let arr = [];
    //     selectItem.map((i) => {
    //       arr.push(i.id);
    //     });
    //     this.$DelTip(function () {
    //       delMany(arr).then(() => {
    //         that.$message.success("操作成功");
    //         that.isRefresh += 1;
    //       });
    //     });
    //   }
    // },
    ToAddShop: function () {
      this.$router.push("/commodity/edit");
    },
    toDetail: function (e) {
      this.$router.push({ path: "/commodity/edit", query: { id: e.id } });
    },
    Preview: function (params) {
      let url =
        "https://" +
        localStorage.getItem("storeUrl") +
        "/product-details.html?id=" +
        params.params.id;
      window.open(url, "_blank");
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
    justify-content: space-around;
    border-bottom: 1px solid #f1f1f6;
    flex-wrap: wrap;
    .search-box {
      display: flex;
      flex: 1;
    }
  }
}
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

