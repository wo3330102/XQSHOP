<template>
  <div class="container">
    <router-link
      to="/dataCenter"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>数据中心</span>
    </router-link>
    <h1 class="title">
      <div>
        商品报告 
      </div>
      <span
        style="
          font-size: 0;
          top: 47px;
          right: 226px;
          width: 240px !important;
          line-height: 28px;
        "
      >
        <el-date-picker
          v-model="dateList"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy/MM/dd"
          value-format="yyyy/MM/dd"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </span>
    </h1>
    <div class="box" style="padding:0">
      <el-table :data="hotShopData" empty-text="暂无数据">
        <el-table-column
          align="center"
          width="55"
          prop="productId"
          label="序号"
        ></el-table-column>
        <el-table-column align="center" width="84" prop="image">
          <template slot-scope="scope">
            <span
              class="small-img"
              :style="{ backgroundImage: 'url(' + scope.row.image + ')' }"
            ></span>
          </template>
        </el-table-column>
        <el-table-column
          width="290"
          prop="productName"
          label="产品名称"
        ></el-table-column>
        <el-table-column
          align="center"
          width="100"
          prop="cartNum"
          label="订单数"
        ></el-table-column>
        <el-table-column
          align="center"
          width=""
          prop="sales"
          label="访客数"
        ></el-table-column>
        <el-table-column
          prop="netSalesPrice"
          width=""
          label="运费险"
        ></el-table-column>
        <el-table-column
          prop="totalSalesPrice"
          width=""
          label="加购商品数"
        ></el-table-column> 
        <el-table-column
          prop="totalSalesPrice"
          width=""
          label="销量"
        ></el-table-column> 
        <el-table-column
          prop="totalSalesPrice"
          width="" 
        >
          <template slot="header"> 
            <span>净销售额   </span>
            <el-tooltip class="item" effect="dark" content="该商品销售额，不计折扣和运费" placement="bottom-end">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </template>
        </el-table-column> 
      </el-table>
    </div>
    <div class="charts">
      <div class="box">
        <h3 class="title">转化率</h3>
        <div class="info">
          <span class="value">${{ $toDecimal2(detail.sumPrice) }}</span> 
        </div>
        <div class="rate">
          <v-chart ref="totalSales" :options="chartData" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var color = ["#E8E6F0", "#412B92"];
import { getChartCount, getHotProduct } from "@/api/getChartCount";
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";

export default {
  components: {
    "v-chart": ECharts,
  },
  watch: {
    dateList: function (val) {
      console.log(val);
      this.Init();
    },
  },
  data() {
    return {
      dateList: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > new Date().getTime();
        },
      },
      detail: {},
      chartData: {}, 
      pageTopList: [],
      totalVisitorsOption: {},
      priceOption: {},  
    };
  },
  created() {
    let that = this;
    this.dateList = [
      new Date().toLocaleDateString(),
      new Date().toLocaleDateString(),
    ];
    // this.Init();
    // 店铺分享统计
    this.shareOptions = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        top: 20,
        data: ["直接访问", "邮件营销", "联盟广告"],
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            { value: 0, name: "直接访问" },
            { value: 0, name: "邮件营销" },
            { value: 0, name: "联盟广告" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  },
  methods: {
    Init: function () {
      // 获取所有表格数据
      let par = {
        beginTime: this.dateList[0].replace(/\//g, "-") + " 00:00:00",
        endTime: this.dateList[1].replace(/\//g, "-") + " 23:59:59",
      };
    },
    ChartsOptions: function (obj, el) {
      let time = [];
      let data = [];
      let that = this;
      obj.map((i) => {
        time.push(i.time);
        data.push(i.num);
      });
      let option = {
        color: "#412B92",
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: time,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: data,
            type: "line",
            smooth: true,
          },
        ],
      };
      that[el] = { ...option };
      // 需要同一个图表有两段数据时使用
      // let chartOption = {
      //   color: ["#E8E6F0", "#412B92"],
      //   xAxis: [
      //     {
      //       type: "category",
      //       boundaryGap: false,
      //       position: "bottom",
      //       axisLine: {
      //         onZero: false,
      //         lineStyle: {
      //           color: "#ffffff",
      //         },
      //       },
      //       axisPointer: {
      //         label: {
      //           formatter: function (params) {
      //             return params.value;
      //           },
      //         },
      //       },
      //       data: [],
      //     },
      //     {
      //       type: "category",
      //       boundaryGap: false,
      //       position: "bottom",
      //       axisLine: {
      //         onZero: false,
      //       },
      //       axisPointer: {
      //         label: {
      //           formatter: function (params) {
      //             return params.value;
      //           },
      //         },
      //       },
      //       data: [],
      //     },
      //   ],
      //   yAxis: {
      //     type: "value",
      //   },
      //   tooltip: {
      //     trigger: "axis",
      //   },
      //   series: [
      //     {
      //       type: "line",
      //       xAxisIndex: 1,
      //       data: [],
      //     },
      //     {
      //       type: "line",
      //       data: [],
      //     },
      //   ],
      // };
    },
    // 辅助函数（用于转换百分比）
    Rate: function (el) {
      return el == 1 ? "100%" : el * 100 + "%";
    },
  },
};
</script>
<style lang="scss" scoped>
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
  div {
    span {
      line-height: 40px;
      font-size: 14px;
      color: #8f91a3;
    }
  }
  /deep/ .el-date-editor--daterange.el-input__inner {
    width: 240px;
  }
  /deep/.el-input__icon {
    line-height: 28px !important;
  }
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
    font-size: 16px;
    color: #212b36;
    font-weight: 600;
    padding-bottom: 12px;
  }
  .info {
    display: flex;
    margin-top: 8px;
    .value {
      flex: 1;
      font-size: 16px;
      font-weight: 700;
    }
  }
}
.rate {
  width: 100%;
  height: 270px;
}
.table-list {
  border-collapse: collapse;
  width: 100%;
  font-size: 13px;
  table-layout: fixed;
  td,
  th {
    & > :first-child {
      padding-left: 0;
    }
    text-align: left;
    font-weight: 400;
    padding: 0 12px;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  tr {
    & > td {
      border-top: 1px solid #ebedf6;
      height: 50px;
    }
    & > th {
      height: 50px;
      color: #212b36;
    }
  }
}
.tip {
  p {
    line-height: 22px;
  }
}
.conversion {
  margin: 0 -12px;
  border-bottom: 1px solid #eaebf5;
  padding: 2px 12px 14px;
  line-height: 32px;
}
.no-border {
  /deep/td {
    border: 0;
  }
}
.hot {
  margin-top: 20px;
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.12),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  .title {
    padding-left: 12px;
    height: 54px;
    line-height: 54px;
    font-size: 16px;
    font-weight: 700;
    border-bottom: 1px solid #eee;
  }
}
</style>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>

