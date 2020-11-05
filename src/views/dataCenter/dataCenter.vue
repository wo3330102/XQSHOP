<template>
  <div class="container">
    <h1 class="title">
      <div>
        数据分析
        <span>(当前为 (GMT+08:00) 北京 时区)</span>
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
    <div class="charts">
      <el-row style="margin-left: -10px; margin-right: -10px">
        <el-col :span="12" style="padding-left: 10px; padding-right: 10px">
          <div class="box">
            <h3 class="title">总销售额</h3>
            <div class="info">
              <span class="value">${{ $toDecimal2(detail.sumPrice) }}</span>
              <span>-</span>
            </div>
            <div class="rate">
              <v-chart ref="totalSales" :options="totalSalesOptions" />
            </div>
          </div>
          <div class="box">
            <h3 class="title">订单数量</h3>
            <div class="info">
              <span class="value">{{ $toDecimal2(detail.sumOrder) }}</span>
              <span>-</span>
            </div>
            <div class="rate">
              <v-chart ref="totalOrder" :options="totalOrderOptions" />
            </div>
          </div>
          <div class="box">
            <h3 class="title">店铺统计分享</h3>
            <div style="width: 100%; height: 327px">
              <v-chart ref="totalOrder" :options="shareOptions" />
            </div>
          </div>
          <div class="box">
            <h3 class="title">访客来源</h3>
            <el-table :data="sourceOfVisitorsList" empty-text="暂无数据">
              <el-table-column
                width="140"
                prop="contry"
                label="国家/地区"
              ></el-table-column>
              <el-table-column
                align="right"
                prop="people"
                label="访客"
              ></el-table-column>
              <el-table-column
                align="right"
                prop="order"
                label="订单"
              ></el-table-column>
              <el-table-column
                align="right"
                prop="baifenbi"
                label="订单转化"
              ></el-table-column>
            </el-table>
          </div>
          <div class="box">
            <h3 class="title">页面排行</h3>
            <el-table :data="pageTopList" empty-text="暂无数据">
              <el-table-column prop="contry" label="页面地址"></el-table-column>
              <el-table-column
                width="100"
                align="right"
                prop="people"
                label="访问次数"
              ></el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="12" style="padding-left: 10px; padding-right: 10px">
          <div class="box">
            <h3 class="title">访客数量</h3>
            <div class="info">
              <span class="value">{{ detail.sumUser }}</span>
              <span>-</span>
            </div>
            <div class="rate">
              <v-chart ref="totalSales" :options="totalVisitorsOption" />
            </div>
          </div>
          <div class="box">
            <h3 class="title">客单价</h3>
            <div class="info">
              <span class="value">${{ $toDecimal2(detail.averagePrice) }}</span>
              <span>-</span>
            </div>
            <div class="rate">
              <v-chart ref="totalOrder" :options="totalOrderOptions" />
            </div>
          </div>
          <div class="box">
            <h3 class="title">
              访客转化率
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content" class="tip">
                  <p>
                    访问店铺：独立访客统计。
                    <br />
                  </p>
                  <p>
                    加购物车：统计点击加购按钮的独立访客数，快速购买不进行加购统计。
                    <br />
                  </p>
                  <p>
                    发起结账：统计进入到结账页的独立访客数。
                    <br />
                  </p>
                  <p>
                    填写顾客信息：统计提交了个人信息的独立访客数。
                    <br />
                  </p>
                  <p>
                    已购买：统计付款成功的独立访客数，已购买访客数可能与订单数不一致。
                    <br />
                  </p>
                </div>
                <i class="el-icon-info"></i>
              </el-tooltip>
            </h3>
            <div class="info conversion">
              <span class="value">{{ paySuccessRate }}</span>
            </div>
            <el-table
              :data="visitorConversionRate"
              empty-text="暂无数据"
              class="no-border"
              :header-row-style="{ 'line-height': '34px' }"
            >
              <el-table-column
                width="140"
                prop="label"
                label="转化行为"
              ></el-table-column>
              <el-table-column
                align="right"
                prop="number"
                label="访客数"
              ></el-table-column>
              <el-table-column
                align="right"
                prop="percentage"
                label="占比"
              ></el-table-column>
            </el-table>
          </div>
          <div class="box">
            <h3 class="title">支付渠道统计</h3>
            <el-table :data="payData" empty-text="暂无数据">
              <el-table-column
                width="120"
                prop="payType"
                label="支付渠道"
              ></el-table-column>
              <el-table-column
                width="190"
                align="right"
                prop="num"
                label="订单数"
              ></el-table-column>
              <el-table-column align="right" prop="payTypeRate" label="占比">
                <template slot-scope="scope">{{
                  Rate(scope.row.payTypeRate)
                }}</template>
              </el-table-column>
            </el-table>
          </div>
          <div class="box">
            <h3 class="title">复购率</h3>
            <el-table :data="repurchaseRateDto" empty-text="暂无数据">
              <el-table-column
                width="150"
                prop="newUser"
                label="新用户"
              ></el-table-column>
              <el-table-column
                width="150"
                align="right"
                prop="oldUser"
                label="老用户"
              ></el-table-column>
              <el-table-column
                align="right"
                prop="repurchaseRate"
                label="复购率"
              >
                <template slot-scope="scope">{{
                  Rate(scope.row.repurchaseRate)
                }}</template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="hot">
      <h3 class="title">热销商品分析</h3>
      <el-table :data="hotShopData" empty-text="暂无数据">
        <el-table-column
          align="center"
          width="55"
          prop="no"
          label="序号"
        ></el-table-column>
        <el-table-column align="center" width="84" prop="no"></el-table-column>
        <el-table-column
          width="290"
          prop="no"
          label="产品名称"
        ></el-table-column>
        <el-table-column
          align="center"
          width="100"
          prop="no"
          label="加购商品数"
        ></el-table-column>
        <el-table-column
          align="center"
          width="110"
          prop="no"
          label="销量"
        ></el-table-column>
        <el-table-column
          prop="no"
          width="120"
          label="净销售额"
        ></el-table-column>
        <el-table-column
          prop="no"
          width="184"
          label="总销售额"
        ></el-table-column>
        <el-table-column prop="no" label="操作"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
var color = ["#E8E6F0", "#412B92"];
import { getChartCount } from "@/api/getChartCount";
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
      totalSalesOptions: {},
      totalOrderOptions: {},
      shareOptions: {},
      sourceOfVisitorsList: [
        {
          contry: "中国",
          people: 1334,
          order: 123,
          baifenbi: "3.2%",
        },
      ],
      pageTopList: [],
      totalVisitorsOption: {},
      priceOption: {},
      paySuccessRate: "",
      visitorConversionRate: [
        {
          label: "访问店铺",
          number: 0,
          percentage: "0%",
        },
        {
          label: "加购物车",
          number: 0,
          percentage: "0%",
        },
        {
          label: "发起结账",
          number: 0,
          percentage: "0%",
        },
        {
          label: "填写顾客信息",
          number: 0,
          percentage: "0%",
        },
        {
          label: "已付款",
          number: 0,
          percentage: "0%",
        },
      ],
      payData: [],
      repurchaseRateDto: [],
      hotShopData: [],
    };
  },
  created() {
    let that = this;
    this.dateList = [
      new Date().toLocaleDateString(),
      new Date().toLocaleDateString(),
    ];
    this.Init();
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
  mounted() {},
  methods: {
    Init: function () {
      let colors = ["#E8E6F0", "#412B92"];
      // 获取所有表格数据
      let par = {
        beginTime: this.dateList[0].replace(/\//g, "-") + " 00:00:00",
        endTime: this.dateList[1].replace(/\//g, "-") + " 23:59:59",
      };
      getChartCount(par).then((res) => {
        let that = this;
        // 总销售额
        this.detail = res;
        this.ChartsOptions(res.chartPrice, "totalSalesOptions");
        // 访客量
        this.ChartsOptions(res.userNum, "totalVisitorsOption");
        // 订单量
        this.ChartsOptions(res.chartOrder, "totalOrderOptions");
        // 客单价
        this.ChartsOptions(res.chartPrice, "priceOption");
        // 访客转化率
        this.paySuccessRate = that.Rate(res.visitorRateDto.paySuccessRate);
        this.visitorConversionRate = [
          {
            label: "访问店铺",
            number: res.visitorRateDto.sumUser,
            percentage: that.Rate(res.visitorRateDto.sumUserRate),
          },
          {
            label: "加购物车",
            number: res.visitorRateDto.addCart,
            percentage: that.Rate(res.visitorRateDto.addCartRate),
          },
          {
            label: "发起结账",
            number: res.visitorRateDto.pay,
            percentage: that.Rate(res.visitorRateDto.payRate),
          },
          {
            label: "填写顾客信息",
            number: res.visitorRateDto.register,
            percentage: that.Rate(res.visitorRateDto.registerRate),
          },
          {
            label: "已付款",
            number: res.visitorRateDto.paySuccess,
            percentage: that.Rate(res.visitorRateDto.paySuccessRate),
          },
        ];
        // 支付渠道
        this.payData = res.PayTypeList;
        // 复购率
        this.repurchaseRateDto = [res.repurchaseRateDto];
      });
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

