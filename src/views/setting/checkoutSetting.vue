<template>
  <div class="container">
    <router-link
      to="/setting"
      style="color: #5e7185;margin-bottom:12px;display:inline-block;height:20px;line-height:20px"
    >
      <i class="el-icon-arrow-left"></i>
      <span>设置</span>
    </router-link>
    <h1>结账设置</h1>
    <div>
      <el-row>
        <el-col :span="16">
          <!-- 活动名称 -->
          <div class="box info">
            <h3 class="title"> 
                <el-tooltip content="是否需要客户注册为会员才能进行购买？" placement="bottom-start"><span>会员注册</span></el-tooltip>
            </h3>
            <div>
              <el-input v-model="logisticsName" maxlength="30" placeholder="最多输入30个字符"></el-input>
            </div>
          </div>
          <!-- 配送国家/地区 -->
          <div class="box info">
            <h3 class="title">
              配送国家/地区
              <template v-if="countryList.length>0">({{countryList.length}})</template>
              <span class="option">添加国家/地区</span>
            </h3>
            <div class="desc">
              <p class="desc" v-if="countryList.length == 0">添加适合这个物流方案的目的国</p>
              <ul class="countryList showPart">
                <li v-for="(item,index) in countryList" :key="index">
                  <span class="img">
                    <img :src="item.src" style="border: 1px solid rgb(244, 244, 244);" />
                  </span>
                  <span>
                    {{item.name}}
                    <span style="margin-left: 4px; color: rgb(193, 194, 204);">( 中国 )</span>
                  </span>
                  <span class="option">
                    <i class="el-icon-delete-solid"></i>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <!-- 基于订单金额设置物流 -->
          <div class="box info">
            <h3 class="title">
              基于订单金额设置物流
              <span class="option">添加条件</span>
            </h3>
            <div class="desc">
              <p class="desc" v-if="countryList.length == 0">基于客户的订单金额来设置物流选项</p>
            </div>
          </div>
          <!-- 基于商品重量设置物流 -->
          <div class="box info">
            <h3 class="title">
              基于商品重量设置物流
              <span class="option">添加条件</span>
            </h3>
            <div class="desc">
              <p class="desc" v-if="countryList.length == 0">基于客户的订单商品重量来设置物流选项</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box">
            <p class="infoTip">温馨提示</p>
            <p class="infoContent">1.设置店铺可支持的物流配送地区，以及在订单结账页中，提供可供客户选择的物流配送方案。</p>
            <p class="infoContent" style="margin-top: 14px;">2.没有设置物流配送的国家，客户下单时将无法选择这些国家地区。</p>
          </div>
        </el-col>
      </el-row>
      <div class="pageSaveBtn">
        <el-button>取消</el-button>
        <el-button type="primary">保存</el-button>
      </div>
      <el-dialog :visible.sync="showCountry"></el-dialog>
    </div>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      logisticsName: "",
      countryList: [], // 选中的配送国家/地区
      showCountry: false, // 是否显示国家/地区选择下拉框
    };
  },
  methods: {},
  updated() {
    console.log("更新");
  },
};
</script>
<style lang="scss" scoped>
h1 {
  font-size: 24px;
  margin: 0 0 12px;
  font-weight: 400;
  justify-items: center;
  display: flex;
}
/deep/.el-row {
  margin: 0 -10px;
  .el-col {
    padding: 0 10px;
  }
}
.box {
  margin-bottom: 20px;
  padding: 12px;
  padding-bottom: 20px;
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
      color: #273a8a;
      cursor: pointer;
      text-decoration: underline;
      font-size: 12px;
      float: right;
      font-weight: 400;
    }
    .title-des {
      color: #808598;
      font-size: 12px;
    }
  }
  .desc {
    color: #c1c2cc;
  }
  .columns {
    display: flex;
    margin-bottom: 12px;
  }
  & > .infoTip {
    color: #1a1d2c;
    font-size: 14px;
    padding-bottom: 14px;
  }
  .infoContent {
    line-height: 18px;
    font-size: 12px;
    color: #606266;
  }
  .dec {
    font-size: 12px;
    color: #5e7185;
    line-height: 20px;
    margin: 8px 0 20px 24px;
  }
  .time-group {
    line-height: normal;
    display: inline-table;
    width: 294px;
    margin-right: 20px;
    border-collapse: separate;
    border-spacing: 0;
    .time-desc {
      color: #909399;
      vertical-align: middle;
      display: table-cell;
      border: 1px solid #dcdfe6;
      border-right: none;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      padding: 0 8px;
      white-space: nowrap;
      width: 1px;
    }
    /deep/ .el-input__inner {
      padding-left: 26px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    /deep/ .el-input__prefix {
      left: 0;
    }
  }
  .content {
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    padding: 10px;
    & > .title {
      color: #1a1d2c;
      text-align: center;
      font-size: 16px;
      line-height: 22px;
      margin: 10px 0 20px;
    }
    .info {
      color: #212741;
      p {
        display: flex;
        .title {
          width: 56px;
          margin-right: 14px;
        }
        .text {
          flex: 1;
        }
        .en {
          color: #5e7185;
        }
      }
    }
  }
}
.pageSaveBtn {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
  text-align: right;
  font-size: 0;
  margin-bottom: 40px;
}
</style>  