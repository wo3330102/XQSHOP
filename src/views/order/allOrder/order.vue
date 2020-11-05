<template>
  <div class="container">
    <h1 class="title">
      <span>所有订单</span>
      <span style="font-size: 0">
        <el-button @click="RestExportParmas">导出</el-button>
        <!-- <el-button @click="showEdit = true" style="margin-left: 20px;">批量修改订单</el-button> -->
      </span>
    </h1>
    <div class="content">
      <div class="tab">
        <div
          v-for="(item, index) in nav"
          :key="item.id"
          :class="acitve == index ? 'active' : ''"
          @click="ChangeActive(index)"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="conditions">
        <!-- 订单选择 -->
        <!-- <el-select
          v-model="getListParams.orderStatus"
          clearable
          placeholder="全部订单状态"
          @change="(e)=>{e?getListParams.orderStatus = e :getListParams.orderStatus = '';GetList()}"
          style="margin-right: 10px;width: 140px;"
        >
          <el-option
            v-for="item in orderTypeList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select> -->
        <!-- 发货状态 -->
        <!-- <el-select
          v-model="getListParams.orderType"
          clearable
          placeholder="全部发货状态"
          style="margin-right: 10px; width: 140px"
        >
          <el-option
            v-for="item in deliveryTypeList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select> -->
        <!-- 时间选择 -->
        <!-- <el-date-picker
          v-model="getListParams.createTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy/MM/dd"
          value-format="yyyy-MM-dd" 
        ></el-date-picker> -->
        <el-date-picker
          v-model="getListParams.createTime"
          :default-time="['00:00:00', '23:59:59']"
          type="daterange"
          range-separator="至"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 230px; margin-right: 10px"
        />
        <!-- 搜索类型 -->
        <el-select
          v-model="searchType"
          clearable
          placeholder="请选择搜索类型"
          style="margin-right: 10px; width: 140px"
        >
          <el-option
            v-for="item in searchList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="search-box">
          <el-input
            v-model="searchVal"
            clearable
            placeholder="选择搜索类型后输入搜索类容"
          >
            <el-button slot="append" @click="Search">搜索</el-button>
          </el-input>
        </div>
      </div>
      <table-tem 
        :requestUrl="'api/yxStoreOrder'"
        :requestParams="getListParams"
        :tableHeader="tableHeader"
        @SelectionChange="SelectionChange"
        @rowClick="ToDetail"
      >
        <span slot="option" class="textBtn"> 结果页 </span>
      </table-tem>
    </div>
    <!-- 导出 -->
    <export-function
      :show="showExport"
      @CloseDialog="showExport = false"
      :exportParams="exportParams"
      :requestUrl="'api/yxStoreOrder/download'"
    ></export-function>
    <!-- 导入(暂时无用) -->
    <!-- <el-dialog title="导入物流单号" :visible.sync="showEdit" width="40%">
      <el-radio-group
        v-model="checkOrder"
        text-color="#34395d"
        fill="#34395d"
        @change="ChangeEditOrderSelect"
        style="width: 100%"
      >
        <div
          v-for="(item, index) in editList"
          :key="item.id"
          style="
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            justify-content: space-between;
            margin: 20px 0;
          "
        >
          <el-radio :label="item.id" style="min-width: 40%">{{
            item.label
          }}</el-radio>
          <span
            style="
              color: rgb(36, 43, 74);
              font-size: 12px;
              text-decoration: underline;
              cursor: pointer;
            "
            >{{ item.downloadText }}</span
          >
          <p style="width: 100%; margin-top: 10px; margin-left: 20px">
            <el-checkbox
              v-if="index == 0"
              :disabled="isDisabledSendEmailToCustomer"
              v-model="isSendEmailToCustomer"
              >发送发货通知邮件给顾客</el-checkbox
            >
          </p>
        </div>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEdit = false">取 消</el-button>
        <el-button type="primary" @click="showEdit = false">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>
<script>
import exportFunction from "@/components/exportFunction";
import tableTem from "@/components/tableTem";
export default {
  components: {
    exportFunction,
    tableTem,
  },
  data() {
    return {
      getListParams: {
        // 初始化表格参数
        page: 0,
        size: 30,
        sort: "id,desc",
        orderStatus: -99,
        orderType: 0,
        createTime: "",
        value: "",
        type: "",
      },
      exportParams: {}, // 初始化导出参数
      nav: [
        //头部导航栏
        {
          id: -99,
          label: "全部",
        },
        {
          id: 0,
          label: "未支付",
        },
        {
          id: 1,
          label: "未发货",
        },
        {
          id: 2,
          label: "待收货",
        },
        {
          id: 3,
          label: "待评价",
        },
        {
          id: 4,
          label: "交易完成",
        },
        {
          id: -1,
          label: "退款中",
        },
        {
          id: -2,
          label: "已退款",
        },
      ],
      selectItem: [], // 选中的表单数据
      acitve: 0, // 当前选中
      deliveryTypeList: [
        // 发货状态   || 订单类型
        {
          id: 0,
          label: "所有订单",
        },
        {
          id: 1,
          label: "普通订单",
        },
        {
          id: 2,
          label: "拼团订单",
        },
        {
          id: 3,
          label: "秒杀订单",
        },
        {
          id: 4,
          label: "砍价订单",
        },
      ],
      date: "", //  时间
      searchType: "", // 搜索类型
      searchList: [
        // 搜索类型列表
        {
          value: "orderId",
          label: "订单号",
        },
        {
          value: "realName",
          label: "用户姓名",
        },
        {
          value: "userPhone",
          label: "用户电话",
        },
      ],
      searchVal: "", // 搜索内容
      tableHeader: [
        {
          width: "238",
          prop: "orderId",
          label: "订单编号",
        },
        {
          width: "180",
          prop: "createTime",
          label: "订单时间",
          sortable: true,
        },
        {
          width: "120",
          prop: "payTypeName",
          label: "付款状态",
          align:'center'
        },
        {
          width: "120",
          prop: "statusName",
          label: "物流状态",
          align:'center'
        },
        {
          width: "238",
          prop: "payPrice",
          label: "总金额",
          align:'right'
        },
        {
          width: "150",  
          prop:'option',
          label: "操作",
          align:'right'
        },
      ],
      showExport: false, // 控制导出对话框显示
      showEdit: false, // 控制修改数据对话框显示
      // ************  以下为导入模块  *****************
      // editList: [
      //   // 导入选框
      //   {
      //     id: 1,
      //     label: "导入批量发货文件",
      //     downloadText: "下载发货导入模版",
      //     url: "",
      //   },
      //   {
      //     id: 2,
      //     label: "导入批量取消文件",
      //     downloadText: "下载取消订单导入模版",
      //     url: "",
      //   },
      //   {
      //     id: 3,
      //     label: "导入已付款订单",
      //     downloadText: "下载已付款订单导入模板",
      //     url: "",
      //   },
      // ],
      // checkOrder: 1, // 选中的导入项
      // showExportSelect: 99, // 控制导出邮箱选择
      // emailSuccess: false, // 邮箱是否验证成功
      // btnDisabled: true,
      // isSendEmailToCustomer: true, // 是否同意发送发货通知邮件给顾客,默认为true
      // isDisabledSendEmailToCustomer: false, // 是否禁用发送发货通知邮件给顾客,默认为false
    };
  },
  watch: {
    searchVal: function (val) {
      if (val == "") {
        let par = { ...this.getListParams };
        delete par["orderId"];
        delete par["realName"];
        delete par["userPhone"];
        par.value = "";
        par.type = "";
        this.getListParams = par;
      }
    },
    searchType: function (val) {
      if (val == "") {
        let par = { ...this.getListParams };
        delete par["orderId"];
        delete par["realName"];
        delete par["userPhone"];
        par.value = "";
        par.type = "";
        this.getListParams = par;
      }
    },
  },
  methods: {
    // 搜索对应数据
    Search: function () {
      let obj = { ...this.getListParams };
      // delete 为删除对应key
      delete obj["orderId"];
      delete obj["realName"];
      delete obj["userPhone"];
      if (this.searchType == "") {
        this.getListParams = {
          value: this.searchVal,
          type: this.searchType,
          ...obj,
        };
        console.log("没有搜索条件", this.getListParams);
      } else {
        let searchType = this.searchType;
        this.getListParams = {
          type: searchType,
          value: this.searchVal,
          [searchType]: this.searchVal,
          ...obj,
        };
        console.log("有搜索条件", this.getListParams);
      }
    },
    // 选中的数据
    SelectionChange: function (e) {
      this.exportParams.listContent = [];
      e.map((i) => {
        this.exportParams.listContent.push(i.orderId);
      });
    },
    // 改变头部索引
    ChangeActive: function (index) {
      this.acitve = index;
      this.getListParams.orderStatus = this.nav[index].id;
    },
    // 改变表单的筛选条件
    ChangeSelect: function (e) {
      console.log(e);
    },
    // 订单详情
    ToDetail: function (e) {
      console.log(e);
      localStorage.setItem("shopItem", JSON.stringify(e));
      this.$router.push("/order/edit");
    },
    // 初始化导出参数
    RestExportParmas: function () {
      let obj = {};
      obj = {
        page: 0,
        size: 10000,
        sort: "id,desc",
        orderStatus: this.getListParams.orderStatus,
        orderType: this.getListParams.orderType,
        createTime: this.getListParams.createTime,
      };
      if (this.searchType !== "") {
        obj = {
          [this.searchType]: this.searchVal,
          ...obj,
        };
      }
      this.exportParams = {
        ...obj,
        ...this.exportParams,
      };
      this.showExport = true;
    },
    // ChangeEditOrderSelect: function (e) {
    //   console.log(e);
    //   if (e !== 1) {
    //     this.isDisabledSendEmailToCustomer = true;
    //   } else {
    //     this.isDisabledSendEmailToCustomer = false;
    //   }
    // },
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
  /deep/.el-button,
  .el-button--medium {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
}
.content {
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  background-color: #fff;
  .tab {
    display: flex;
    padding: 0 10px;
    border-bottom: 1px solid #dcdfe6;
    .active {
      border-bottom: 4px solid #f49342;
      color: #1a1d2c;
    }
    & > div {
      display: inline-block;
      padding: 0 10px;
      height: 36px;
      background: #fcfdff;
      font-size: 14px;
      line-height: 36px;
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
      /deep/.el-input-group__append {
        background: #fff;
        color: #000000;
      }
    }
    /deep/ .el-button {
      height: 36px;
      padding: 0 15px;
    }
  }
  .pagination {
    padding: 14px 0;
    text-align: center;
  }
}  
/deep/ .el-dialog__footer {
  border-top: 1px solid #f0f0f0;
  padding: 20px;
}
</style>
