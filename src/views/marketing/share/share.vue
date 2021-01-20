<template>
  <div class="container">
    <h1 class="title">
      <span>激励分享</span>
      <span class="option" v-if="!isShow">
        <el-button>效果预览</el-button>
        <el-button type="primary" @click="toDetail">编辑</el-button>
      </span>
    </h1>
    <div class="content" v-loading="loading" v-if="isShow">
      <div class="not-created">
        <div class="not-created-box">
          <p class="not-created-title">激励分享</p>
          <div class="not-created-content">
            在这里开启一个新的激励分享，使用优惠码来诱导顾客分享我们的商品。朋友之间的互相分享推荐，会表现更高的忠诚度和信任感，并且其他人也会获得折扣，这将为您的店铺引来大量流量，并且这都是免费的！以此提高您的转化率以及投资回报率。
          </div>
          <div class="not-created-btn">
            <el-button type="primary" @click="$NavgitorTo('/editShare')"
              >立即开启</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="created" v-loading="loading" v-else>
      <el-row style="margin-left: -10px; margin-right: -10px">
        <el-col :span="16" style="padding-left: 10px; padding-right: 10px">
          <div class="box active-detail">
            <h4 class="title">
              活动详情
              <span
                class="option"
                :class="detail.status === 0 ? 'close' : ''"
                >{{ detail.status === 0 ? "已关闭" : "已开启" }}</span
              >
            </h4>
            <div class="info">
              <p>
                <span class="title">优惠描述：</span>
                <span class="text">{{ detail.type === 0?detail.title:''}}</span>
              </p>
              <p>
                <span class="title">优惠码：</span>
                <span class="text">{{
                  detail.type === 0?detail.yxStorePromotions.promoCode:'' 
                }}</span>
              </p>
              <p>
                <span class="title">活动内容：</span>
                <span class="text">{{
                  detail.type === 0?detail.yxStorePromotions.discountName:''  
                }}</span>
              </p>
            </div>
          </div>
          <div class="box active-data">
            <h4 class="title">
              <span style="flex: 1">数据统计</span>
              <!-- <span class="option"></span> -->
              <el-date-picker
                v-model="date"
                type="daterange"
                align="right"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy/MM/dd "
                :picker-options="dateOptions"
                :clearable="false"
                style="width: 240px"
              >
              </el-date-picker>
            </h4>
            <div class="data-info">
              <div class="data-info-val-item">
                <span class="data-count">{{ statistics.shareNum || 0 }}</span>
                <el-tooltip placement="bottom-start">
                  <template slot="content">
                    有{{statistics.facebook || 0}}个访客分享到Facebook，{{statistics.twitter || 0}}个分享到Twitter，{{statistics.pinterest || 0}}个分享到Pinterest
                  </template>
                  <span>分享数</span>
                </el-tooltip>
              </div>
              <div class="data-info-val-item">
                <span class="data-count">{{ statistics.shareAccess || 0 }}</span>
                <el-tooltip placement="bottom-start">
                  <template slot="content">
                    有{{ statistics.shareAccess || 0 }}个访客通过分享链接访问了你的店铺
                  </template>
                  <span>分享链接访问数</span>
                </el-tooltip>
              </div>
              <div class="data-info-val-item">
                <span class="data-count">{{ statistics.shareOrderNums || 0 }}</span>
                <el-tooltip placement="bottom-start">
                  <template slot="content">
                    通过分享链接访问店铺后，为您增加了{{statistics.shareOrderNums ||0}}笔订单
                  </template>
                  <span>分享后订单数</span>
                </el-tooltip>
              </div>
              <div class="data-info-val-item">
                <span class="data-count">{{currency.s}}{{ statistics.shareIncome || '0.00' }}</span>
                <el-tooltip placement="bottom-start">
                  <template slot="content">
                    通过分享出去的链接，为您带来了额外增加了{{currency.s}}{{ statistics.shareIncome || '0.00' }}的收入
                  </template>
                  <span>分享收入</span>
                </el-tooltip>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8" style="padding-left: 10px; padding-right: 10px">
          <div class="box">
            <p class="infoTip">信息提示</p>
            <p class="infoContent">
              使用优惠码来诱导顾客分享我们的商品。朋友之间的互相分享推荐，会表现更高的忠诚度和信任感，并且其他人也会获得折扣，这将为您的店铺引来大量流量，并且这都是免费的！以此提高您的转化率以及投资回报率。
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getShare, getStatistics } from "@/api/yxStorePromotionsSharing";

export default {
  data() {
    return {
      isShow: true,
      detail: {
        status: 0,
        yxStorePromotions: {
          promoCode: "",
          discountName: "",
        },
      },
      date: "",
      dateOptions: {
        disabledDate(time) {
          return time.getTime() > new Date().getTime();
        },
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      loading: true,
      statistics: {},
    };
  },
  watch: {
    date: function (val) {
      console.log(val);
      this.init();
    },
  },
  created() {
    const end = new Date().toLocaleDateString();
    let start = new Date();
    start = start.getTime() - 3600 * 1000 * 24 * 30;
    this.date = [new Date(start).toLocaleDateString() + " ", end + " "];
    getShare().then((res) => { 
      let that = this;
      if (res.content.length > 0) {
        this.isShow = false;
        this.detail = res.content[0];
        if(res.content[0].yxStorePromotions == null){
          this.detail.yxStorePromotions = {};
        }
      } else {
        this.isShow = true;
        
      } 
      setTimeout((res) => {
        that.loading = false;
      }, 1000);
    });
    this.init();
  },
  methods: {
    toDetail: function () {
      this.$router.push({
        name: "EditShare",
        query: {
          id: this.detail.id,
        },
      });
    },
    init: function () {
      let par = {
        startTime: this.date[0] + '00:00:00',
        endTime: this.date[1] + '23:59:59',
      };
      getStatistics(par).then((res) => {
        console.log(res);
        this.statistics = res;
      });
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
.not-created {
  padding: 60px 138px;
  text-align: center;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  border-radius: 4px;
  .not-created-title {
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 500;
    color: #212743;
    line-height: 20px;
  }
  .not-created-content {
    margin: 20px 0 30px;
    font-size: 14px;
    font-family: PingFangSC;
    font-weight: 400;
    color: #2f395e;
    line-height: 26px;
  }
  .not-create-btn {
    width: 216px;
    height: 50px;
    font-size: 19px;
    font-family: PingFangSC;
    font-weight: 500;
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
  & > .title {
    color: #1a1d2c;
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 12px;
  }
  &>.infoTip {
    color: #1a1d2c;
    font-size: 14px;
    padding-bottom: 14px;
  }
  &>.infoContent {
    line-height: 18px;
    font-size: 12px;
    color: #606266;
  }
}
.active-detail {
  .title {
    .option {
      float: right;
      font-size: 12px;
      font-family: PingFangSC;
      font-weight: 400;
      color: #23773f;
      line-height: 17px;
    }
    .close {
      color: #1a1d2c;
    }
  }
  .info {
    color: #212741;
    border-top: 1px solid #ebeef5;
    margin-left: -12px;
    margin-right: -12px;
    padding: 0 12px;
    p {
      margin-top: 20px;
      display: flex;
      align-items: baseline;
      .title {
        margin-right: 14px;
      }
      .text {
        flex: 1;
      }
      &:last-child {
        margin-bottom: 10px;
      }
    }
  }
  
}
.active-data {
  .title {
    display: flex;
    align-items: center;
  }
  .data-info {
    border-top: 1px solid #ebeef5;
    margin: 0 -12px -12px;
    padding: 0 12px;
    height: 134px;
    display: flex;
    .data-info-val-item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      flex: 1;
      .data-count {
        font-size: 24px;
        font-family: PingFangSC;
        font-weight: 500;
        color: #1a1d2c;
        line-height: 17px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
