<template>
  <div class="container">
    <h1 class="title">
      <span>弃单</span>
      <span style="font-size:0;">
        <el-button @click="showExport = true">导出</el-button>
      </span>
    </h1>
    <div class="content">
      <div class="conditions">
        <!-- 时间选择 -->
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="ChangeSelect"
          format="yyyy/MM/dd"
          value-format="yyyy-MM-dd"
          style="width:230px;margin-right: 10px;"
        ></el-date-picker>
        <!-- 找回状态 -->
        <el-select
          v-model="payType"
          clearable
          placeholder="召回状态"
          @change="ChangeSelect"
          style="margin-right: 10px;width: 194px;"
        >
          <el-option
            v-for="item in payTypeList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
        <div class="search-box">
          <el-input v-model="searchVal" placeholder="请输入订单编号、商品名称、SKU、顾客邮箱查询 ">
            <el-button slot="append">搜索</el-button>
          </el-input>
        </div>
      </div>
      <div class="table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          empty-text="暂无数据"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="no" label="订单编号" width="200" align="center"></el-table-column>
          <el-table-column prop="time" label="时间" width="213" align="center" sortable></el-table-column>
          <el-table-column prop="payType" label="邮件状态" width="211" align="center"></el-table-column>
          <el-table-column prop="payType" label="召回状态" width="211" align="center"></el-table-column>
          <el-table-column prop="payType" label="总金额" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          background
          :page-size="100"
          layout="total, prev, pager, next"
          :total="1000"
        ></el-pagination>
      </div>
    </div>
    <export-function :show="showExport" @close="showExport=false"></export-function>
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
      acitve: 0,
      date: "",
      payType: "",
      payTypeList: [
        {
          id: 1,
          label: "已召回",
        },
        {
          id: 2,
          label: "未召回",
        },
      ],
      searchVal: "",
      tableData: [
        {
          id: 1,
          no: 16456,
          time: "2020-09-09",
          payType: "已付款",
          deliveryType: "已发货",
          price: 2000,
        },
        {
          id: 2,
          no: 16456,
          time: "2020-09-09",
          payType: "已付款",
          deliveryType: "已发货",
          price: 2000,
        },
        {
          id: 3,
          no: 16456,
          time: "2020-09-09",
          payType: "已付款",
          deliveryType: "已发货",
          price: 2000,
        },
      ],
      currentPage: 1,
      showExport: false,
      checkOrder: "",
      showExportSelect: 999, // 控制导出邮箱选择
      exportList: "",
      ruleForm: { email: "" },
      emailSuccess: false, // 邮箱是否验证成功
      btnDisabled: true,
    };
  },
  created() {
    this.exportList = [
      {
        id: 1,
        label: "导出选中",
      },
      {
        id: 2,
        label: "导出所有",
      },
      {
        id: 3,
        label: "导出本页筛选结果",
      },
      {
        id: 4,
        label: "导出全部筛选结果",
      },
    ];
  },
  methods: {
    ChangeActive: function (index) {
      this.acitve = index;
    },
    ChangeSelect: function (e) {
      console.log(e);
    },
    handleSelectionChange: function (e, event) {
      console.log(event);
    },
    handleEdit: function (e) {
      console.log(e);
    },
    handleDelete: function (e) {
      console.log(e);
    },
    handleSizeChange: function (e) {
      console.log(e);
    },
    handleCurrentChange: function (e) {
      // console.log($event)
      console.log(e);
    },
    ChangeExportOrderSelect: function (e) {
      console.log(e);
      if (!this.tableSelect) {
        this.btnDisabled = false;
      }
      if (e == 2 || e == 4) {
        this.showExportSelect = e - 1;
      } else {
        this.showExportSelect = 99;
      }
    },
    // 提交导出
    submitForm(formName) {
      this.showExport = false;
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
</style>
