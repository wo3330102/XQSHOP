<template>
  <div class="container">
    <h1 class="title">
      <span>激励分享</span>
      <span class="option">
        <el-button>效果预览</el-button>
        <el-button type="primary">编辑</el-button>
      </span>
    </h1>
    <div class="content" v-if="shareList.length == 0">
      <div v-if="shareList.length == 0" class="not-created">
        <div class="not-created-box">
          <p class="not-created-title">激励分享</p>
          <div
            class="not-created-content"
          >在这里开启一个新的激励分享，使用优惠码来诱导顾客分享我们的商品。朋友之间的互相分享推荐，会表现更高的忠诚度和信任感，并且其他人也会获得折扣，这将为您的店铺引来大量流量，并且这都是免费的！以此提高您的转化率以及投资回报率。</div>
          <div class="not-created-btn">
            <el-button type="primary" @click="$NavgitorTo('/createShare')">立即开启</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="created" v-else>
      <el-row style="margin-left: -10px; margin-right: -10px;">
        <el-col :span="16" style="padding-left: 10px; padding-right: 10px;">
          <div class="box">
            <h4 class="title">
              活动详情
              <span
                class="option"
                :class="status == 'off'?'close':''"
              >{{status == 'off'?'已关闭':'已开启'}}</span>
            </h4>
            <div class="info">
              <p>
                <span class="title">优惠描述：</span>
                <span class="text"></span>
              </p>
              <p>
                <span class="title">优惠码：</span>
                <span class="text"></span>
              </p>
              <p>
                <span class="title">活动内容：</span>
                <span class="text"></span>
              </p>
            </div>
          </div>
        </el-col>
        <el-col :span="8" style="padding-left: 10px; padding-right: 10px;">
          <div class="box">
            <p class="infoTip">信息提示</p>
            <p
              class="infoContent"
            >使用优惠码来诱导顾客分享我们的商品。朋友之间的互相分享推荐，会表现更高的忠诚度和信任感，并且其他人也会获得折扣，这将为您的店铺引来大量流量，并且这都是免费的！以此提高您的转化率以及投资回报率。</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shareList: [{}],
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
      status: "on",
      currentPage: 1,
    };
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
      console.log(e);
      console.log(e);
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
    /deep/ .el-input__inner {
      padding: 0 8px;
    }
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
  .infoTip {
    color: #1a1d2c;
    font-size: 14px;
    padding-bottom: 14px;
  }
  .infoContent {
    line-height: 18px;
    font-size: 12px;
    color: #606266;
  }
}
.created {
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
/deep/.el-input__inner {
  height: 36px !important;
}
/deep/.el-input__icon {
  line-height: 36px !important;
}
/deep/ .el-range-separator {
  line-height: 35px;
}
/deep/ .el-button--primary {
  color: #fff;
  background-color: #34395d;
  border-color: #34395d;
}
</style>
