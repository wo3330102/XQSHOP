<template>
  <div class="container">
    <router-link
      to="/discount"
      style="color: #5e7185;margin-bottom:12px;display:inline-block;height:20px;line-height:20px"
    >
      <i class="el-icon-arrow-left"></i>
      <span>梯度优惠</span>
    </router-link>
    <h1>创建梯度优惠</h1>
    <div>
      <el-row>
        <el-col :span="16">
          <!-- 活动名称 -->
          <div class="box">
            <h3 class="title">
              优惠名称
              <span class="subTitle">{{discountName.length}}/100字符</span>
            </h3>
            <div>
              <el-input
                v-model="discountName"
                size="medium"
                maxlength="100"
                placeholder="请输入活动名称以方便您自己识别"
              ></el-input>
            </div>
          </div>
          <!-- 优惠描述 -->
          <div class="box">
            <h3 class="title">
              优惠描述
              <span class="subTitle">{{discountDes.length}}/40字符</span>
            </h3>
            <div>
              <el-input
                v-model="discountDes"
                size="medium"
                maxlength="40"
                placeholder="请输入英文优惠描述，此信息将在前端展示给用户查看"
              ></el-input>
            </div>
          </div>
          <!-- 优惠条件 -->
          <div class="box">
            <h3 class="title">优惠条件</h3>
            <div>
              <div style="display:flex;justify-content:space-between;">
                <el-select
                  v-model="consumptionValue"
                  style="width:350px"
                  @change="ResetShopDetailSettingList(1)"
                >
                  <el-option
                    v-for="item in consumptionList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="reductionValue"
                  style="width:350px"
                  @change="ResetShopDetailSettingList(2)"
                >
                  <el-option
                    v-for="item in reductionList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <!-- 适用对象 -->
          <div class="box">
            <h3 class="title">适用对象</h3>
            <div class="columns">
              <el-select v-model="appliedObjectValue" size="medium" style="flex:1">
                <el-option
                  v-for="item in appliedObjectList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-button
                style="margin-left:20px"
                type="primary"
                size="medium"
                v-if="appliedObjectValue == 2 || appliedObjectValue == 3"
                @click="ShowDiglog"
              >{{appliedObjectValue == 3?'添加商品':'添加分类'}}</el-button>
            </div>
          </div>
          <!-- 详情设置 -->
          <div class="box">
            <h3 class="title" style="padding-bottom: 20px;">详情设置</h3>
            <div class="detail-list">
              <div class="item" v-for="(item,index) in shopDetailSettingList" :key="index">
                <span>{{consumptionList[consumptionValue-1].label}}</span>
                <el-input
                  v-model="item.consumption"
                  style="width:210px"
                  :maxlength="8"
                  @change="ChangeShopDetailSettingListItem(index)"
                >
                  <template
                    slot="prefix"
                    v-if="consumptionValue == 2"
                    style="line-height:36px;margin-left:3px"
                  >$</template>
                </el-input>
                <span>，{{appliedObjectList[appliedObjectValue-1].label}}减免</span>
                <el-input
                  v-model.number="item.reduction"
                  style="width:210px"
                  :max-length="reductionValue == 1?8:2"
                  @change="ChangeShopDetailSettingListItem(index)"
                >
                  <template
                    slot="prefix"
                    v-if="reductionValue == 1"
                    style="line-height:36px;margin-left:3px"
                  >$</template>
                  <template slot="suffix" v-else style="line-height:36px;margin-left:3px">%</template>
                </el-input>
                <i
                  v-if="shopDetailSettingList.length>1"
                  class="el-icon-delete-solid"
                  @click="DelShopDetailSettingOfItem(item)"
                ></i>
              </div>
            </div>
            <el-button type="primary" @click="AddShopDetailSettingOfItem">添加梯度优惠</el-button>
          </div>
          <!-- 显示配置 -->
          <div class="box">
            <h3 class="title">
              显示配置
              <span class="option" @click="showPage = true">效果预览</span>
            </h3>
            <div class="ext-select-container">
              <el-select
                v-model="isPopup"
                @change="(e)=>{isPopup = e}"
                style="width:100%"
                placeholder="请选择是否显示弹窗"
              >
                <span slot="prefix" class="ext-select-text">弹窗</span>
                <el-option label="显示优惠弹窗" :value="1">显示优惠弹窗</el-option>
                <el-option label="不显示优惠弹窗" :value="2">不显示优惠弹窗</el-option>
              </el-select>
              <el-select
                v-if="isPopup == 1"
                v-model="isShowButton"
                @change="(e)=>{isShowButton = e}"
                style="width:100%"
                placeholder="请选择是否显示按钮"
              >
                <span slot="prefix" class="ext-select-text">按钮</span>
                <el-option label="显示按钮" :value="1">显示按钮</el-option>
                <el-option label="不显示按钮" :value="2">不显示按钮</el-option>
              </el-select>
            </div>
            <div style="display:flex;justify-content:space-between" v-if="isShowButton == 1">
              <div style="padding-right: 15px;width:50%;box-sizing:border-box">
                <span>按钮文案</span>
                <el-input v-model="btnText" placeholder="请输入按钮文案"></el-input>
              </div>
              <div style="width:50%;box-sizing:border-box">
                <span>
                  前往的页面
                  <span class>（点击按钮和优惠横幅）</span>
                </span>
                <el-select v-model="checkPage" placeholder="请选择前往的页面" style="width:100%">
                  <el-option
                    v-for="item in pageList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <!-- 有效日期 -->
          <div class="box">
            <h3 class="title">
              有效日期
              <span
                style="color: rgb(194, 195, 205); font-size: 12px; font-weight: 400;"
              >（开始时间按设置日期的北京时间0时开始，结束时间按设置日期的北京时间24时结束）</span>
            </h3>
            <div style="display:flex">
              <span class="time-group">
                <span class="time-desc">开始日期</span>
                <el-date-picker
                  size="medium"
                  v-model="activityStartDate"
                  type="date"
                  placeholder="请选择活动开始时间"
                  format="yyyy/MM/dd"
                  value-format="yyyy/MM/dd"
                ></el-date-picker>
              </span>
              <span class="time-group">
                <span class="time-desc">结束日期</span>
                <el-date-picker
                  size="medium"
                  v-model="activityEndDate"
                  type="date"
                  format="yyyy/MM/dd"
                  value-format="yyyy/MM/dd"
                  placeholder="不填则永久有效"
                ></el-date-picker>
              </span>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box">
            <h3 class="title">优惠信息</h3>
            <div class="overview">
              <p>
                <span class="title">优惠名称：</span>
                <span class="text">{{discountName?discountName:'--'}}</span>
              </p>
              <p>
                <span class="title">优惠描述：</span>
                <span class="text">{{discountDes?discountDes:'--'}}</span>
              </p>
              <p>
                <span class="title">优惠条件：</span>
                <span
                  class="text"
                >{{consumptionList[consumptionValue-1].label}}，{{appliedObjectList[appliedObjectValue-1].label+reductionList[reductionValue-1].label}}</span>
              </p>
              <p>
                <span class="title">有效日起：</span>
                <span class="text">
                  <template
                    v-if="activityStartDate"
                  >{{activityStartDate}} 至 {{activityEndDate?activityEndDate:'永久有效'}}</template>
                  <template v-else>--</template>
                </span>
              </p>
            </div>
            <div class="detail">
              <p class="title">优惠详情</p>
              <p
                class="item"
                v-for="(item,index) in shopDetailSettingList"
                :key="index"
                v-if="item.consumption && item.reduction"
              >
                消费满
                {{consumptionValue==1?item.consumption+'件':'$'+item.consumption}}，
                {{appliedObjectList[appliedObjectValue-1].label}}
                减免
                {{reductionValue == 1?'$'+item.reduction:item.reduction+'%'}}
              </p>
            </div>
          </div>
          <div class="box">
            <p class="infoTip">温馨提示</p>
            <p class="infoContent">此应用无法与普通优惠同时应用。开启后所有自动应用优惠将失效， 若用户输入了优惠券码，则本梯度优惠失效。</p>
          </div>
        </el-col>
      </el-row>
      <div class="pageSaveBtn">
        <el-button>取消</el-button>
        <el-button type="primary" :disabled="save">保存</el-button>
      </div>
      <el-dialog title="请选择商品" :visible.sync="shopDialog">
        <div class="search-conditions">
          <!-- 商品标签 -->
          <el-select v-model="shopLabelValue" size placeholder="请选择标签" style="width: 200px;">
            <el-option
              v-for="item in shopLabelList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- 商品分类 -->
          <el-select v-model="shopCategoryValue" size placeholder="请选择分类" style="width: 200px;">
            <el-option
              v-for="item in shopCategoryList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input style="width:180px" size v-model="shopContent" placeholder="请输入内容">
            <el-button slot="append">查询</el-button>
          </el-input>
        </div>
        <el-table :data="shopData" style="width: 100%" empty-text>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="prop" label="商品标签"></el-table-column>
          <el-table-column prop="prop" label="商品分类"></el-table-column>
          <el-table-column prop="prop" label="内容"></el-table-column>
        </el-table>
        <div slot="footer">
          <span style="float: left; line-height: 41px;">总共{{0}}个商品， 已选择{{0}}个</span>
          <el-button @click="shopDialog = false">取消</el-button>
          <el-button type="primary">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="请选择商品" :visible.sync="shopCategoryDialog">
        <div class="search-conditions">
          <el-input v-model="shopContent" placeholder="请输入内容">
            <el-button slot="append">查询</el-button>
          </el-input>
        </div>
        <el-table :data="shopData" style="width: 100%" empty-text>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="prop" label="内容"></el-table-column>
        </el-table>
        <div slot="footer">
          <el-button @click="shopCategoryDialog = false">取消</el-button>
          <el-button type="primary">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="showPage">
        <span class="dialog-preview-top-desc">优惠弹窗可以让买家快速的了解优惠内容</span>
        <div
          style="text-align: center; width: 100%; max-height: 620px; overflow: auto; font-size: 0px;"
        >
          <img
            style="width: 300px;"
            :src="isShowButton == 1?'https://ddd.xshoppy.shop/static/img/gradientDiscount/discount-dialog-btn.png':'https://ddd.xshoppy.shop/static/img/gradientDiscount/no-discount-dialog-btn.png'"
          />
        </div>
        <div class="dialog-preview-bottom-desc">效果仅供参考</div>
      </el-dialog>
    </div>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      discountName: "", // 优惠名称
      discountDes: "", // 优惠描述
      consumptionValue: 2, // 默认选中的消费条件
      consumptionList: [
        // 商品属性列表
        {
          value: 1,
          label: "消费满特定件数",
        },
        {
          value: 2,
          label: "消费满特定金额",
        },
      ],
      reductionValue: 2, // 默认选中的减免条件
      reductionList: [
        // 商品属性列表
        {
          value: 1,
          label: "减免固定金额",
        },
        {
          value: 2,
          label: "减免%折扣",
        },
      ],
      appliedObjectValue: 3, // 适用对象
      appliedObjectList: [
        // 商品属性列表
        {
          value: 1,
          label: "整个订单",
        },
        {
          value: 2,
          label: "指定商品分类",
        },
        {
          value: 3,
          label: "指定商品",
        },
      ],
      shopDetailSettingList: [
        {
          consumption: "",
          reduction: "",
        },
      ],
      isPopup: 1, // 是否显示弹窗
      isShowButton: 1, // 是否显示按钮
      btnText: "", // 按钮文案
      checkPage: "", // 选中的模板页面
      pageList: [], // 模板页面列表
      showDiscountDetail: false, // 是否显示右边优惠详情
      save: true,
      showPage: false,

      activityStartDate: "", // 活动开始时间
      activityEndDate: "", // 活动结束时间
      shopDialog: false, // 是否显示选择商品对话框
      shopCategoryDialog: false, // 是否显示选择商品分类对话框
      shopLabelValue: "", // 商品标签
      shopLabelList: [], // 商品标签列表
      shopCategoryValue: "", // 商品分类
      shopCategoryList: [], // 商品分类列表
      shopContent: "", // 商品内容
      shopData: [], // 表单数据
    };
  },
  watch: {
    discountTypeValue: function (n, o) {
      switch (n) {
        case 1:
          this.discountTypeValueOfInfomation = {
            maxlength: 8,
            placeholder: "请填写优惠金额",
            prepend: "优惠金额",
          };
          break;
        case 2:
          this.discountTypeValueOfInfomation = {
            maxlength: 2,
            placeholder: "如输入12，相当于适用对象八八折",
            prepend: "折扣额度",
          };
          break;
      }
    },
  },
  methods: {
    DiscountPrice: function (e) {
      console.log(e);
      let price = this.$toDecimal2(e);
      this.discountPrice = price;
      console.log(price);
    },
    AddFun: function () {},
    ShowDiglog: function () {
      switch (this.appliedObjectValue) {
        case 2:
          this.shopCategoryDialog = true;
          break;
        default:
          this.shopDialog = true;
          break;
      }
    },
    ResetShopDetailSettingList: function (type) {
      this.shopDetailSettingList = [
        {
          consumption: "",
          reduction: "",
        },
      ];
    },
    AddShopDetailSettingOfItem: function (item) {
      this.shopDetailSettingList.push({
        consumption: "",
        reduction: "",
      });
    },
    DelShopDetailSettingOfItem: function (item) {
      this.shopDetailSettingList.splice(
        this.shopDetailSettingList.indexOf(item),
        1
      );
    },
    ChangeShopDetailSettingListItem: function (index) {
      console.log(index);
    },
  },
  updated() {
    console.log("更新");
    this.save = false;
  },
};
</script>
<style lang="scss" scoped>
h1 {
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: 400;
  height: 40px;
  line-height: 40px;
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
    .subTitle {
      font-size: 12px;
      float: right;
      font-weight: 400;
      color: #c1c2cc;
    }
    .option {
      color: #273a8a;
      cursor: pointer;
      text-decoration: underline;
      font-size: 12px;
      float: right;
      font-weight: 400;
    }
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
  .detail-list {
    margin-bottom: 12px;
    border-bottom: 1px solid #dcdfe6;
    .item {
      width: 100%;
      padding: 12px 0;
      border-top: 1px solid #dcddeb;
      display: flex;
      align-items: center;
      flex: 1;
      height: 36px;
      & > span {
        margin-right: 8px;
      }
      /deep/.el-icon-delete-solid {
        margin-left: 20px;
        color: #c1c2cc;
      }
      /deep/ .el-input__prefix {
        line-height: 36px !important;
      }
      /deep/ .el-input__suffix {
        line-height: 36px !important;
      }
    }
  }
  .ext-btn-link-tetx {
    height: 85px;
    padding-top: 20px;
  }
  .ext-select-container {
    .ext-select-text {
      position: absolute;
      left: 8px;
      top: 5px;
      font-size: 12px;
      font-weight: 400;
      color: #808598;
    }
    /deep/.el-select {
      margin-bottom: 12px;
    }
    /deep/.el-input__prefix {
      width: 100%;
      left: 0;
    }
    /deep/.el-input__inner {
      height: 48px;
      padding-top: 15px;
      padding-left: 10px;
    }
    .sub-title {
      font-size: 12px;
      font-weight: 400;
      color: #c2c3cd;
      line-height: 20px;
    }
    .title {
      font-size: 12px;
      font-weight: 400;
      color: #1a1d2c;
      line-height: 20px;
      margin-bottom: 8px;
    }
  }
}
.overview > p {
  padding: 10px 0;
  color: #293154;
  display: flex;
  align-items: flex-start;
  line-height: 20px;
  .title {
    width: 70px;
  }
  .text {
    flex: 1;
  }
}
.detail {
  margin-top: 10px;
  padding-top: 20px;
  border-top: 1px solid #dcddeb;
  .title {
    margin-bottom: 10px;
  }
}
.pageSaveBtn {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
  text-align: right;
  font-size: 0;
  margin-bottom: 40px;
}
.search-conditions {
  display: flex;
  justify-content: space-between;
}
.dialog-preview-top-desc {
  font-size: 14px;
  font-weight: 400;
  color: #1b1d2c;
  line-height: 20px;
  text-align: center;
  margin-bottom: 18px;
  width: 100%;
  display: inline-block;
}
.dialog-preview-bottom-desc {
  font-size: 12px;
  font-weight: 400;
  color: #808598;
  line-height: 20px;
  text-align: center;
  margin-top: 20px;
  width: 100%;
  display: inline-block;
}
/deep/.el-input-group__prepend {
  background: #fff;
}
/deep/ .el-icon-delete-solid {
  font-size: 18px;
  line-height: 38px;
  cursor: pointer;
}
/deep/.el-input-group__append {
  background: #fff;
}
</style>  