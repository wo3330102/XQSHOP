<template>
  <div class="container">
    <router-link
      to="/activity"
      style="color: #5e7185;margin-bottom:12px;display:inline-block;height:20px;line-height:20px"
    >
      <i class="el-icon-arrow-left"></i>
      <span>优惠活动</span>
    </router-link>
    <h1>创建优惠活动</h1>
    <div>
      <el-row>
        <el-col :span="16">
          <!-- 活动名称 -->
          <div class="box info">
            <h3 class="title">活动名称</h3>
            <div>
              <el-input v-model="activityName" size="medium" placeholder="请输入活动名称"></el-input>
            </div>
          </div>
          <!-- 优惠类型 -->
          <div class="box">
            <h3 class="title">优惠类型</h3>
            <div style="display:flex">
              <el-select
                v-model="discountTypeValue"
                size="medium"
                style="width: 180px; margin-right: 20px;"
                @change="discountPrice = '';tipDiscountPrice = ''"
              >
                <el-option
                  v-for="item in discountTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input
                v-model="discountPrice"
                @change="DiscountPrice"
                v-if="discountTypeValue == 1 || discountTypeValue == 2"
                size="medium"
                :maxlength="discountTypeValueOfInfomation.maxlength"
                :placeholder="discountTypeValueOfInfomation.placeholder"
                style="flex:1"
              >
                <!-- :prefix-icon="discountTypeValue == 1?'el-icon-coin':''"  -->
                <span
                  slot="prefix"
                  style="line-height:36px;margin-left:3px"
                  v-if="discountTypeValue == 1"
                >$</span>
                <span
                  slot="suffix"
                  style="line-height:36px;margin-left:3px"
                  v-if="discountTypeValue == 2"
                >%</span>
                <span slot="prepend">{{discountTypeValueOfInfomation.prepend}}</span>
              </el-input>
            </div>
          </div>
          <!-- 适用对象 -->
          <div class="box" v-if="discountTypeValue == 1||discountTypeValue == 2">
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
          <!-- 生效条件 -->
          <div class="box">
            <h3 class="title">生效条件</h3>
            <div style="display:flex">
              <el-select
                v-model="effectConditionsValue"
                size="medium"
                style="width: 180px; margin-right: 20px;"
              >
                <el-option
                  v-for="item in effectConditionsList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <div v-if="effectConditionsValue == 2" style="flex:1">
                <el-input v-model="effectConditionsPrice" placeholder>
                  <span slot="prefix" style="line-height:36px;margin-left:3px">$</span>
                </el-input>
                <span
                  v-if="appliedObjectValue == 2 || appliedObjectValue == 3"
                  style="color: rgb(94, 113, 133); margin-top: 12px; font-size: 12px"
                >仅适用于{{appliedObjectList[appliedObjectValue-1].label?appliedObjectList[appliedObjectValue-1].label:''}}</span>
              </div>
            </div>
          </div>
          <!-- 有效日期 -->
          <div class="box info">
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
          <!-- 优惠码 -->
          <div class="box info">
            <h3 class="title">
              优惠码
              <span class="option">自动生成优惠码</span>
            </h3>
            <div>
              <p style="margin-bottom: 10px;" v-if="discountTypeValue == 1||discountTypeValue == 2">
                <el-checkbox v-model="isAutoApplyOffers">自动应用优惠</el-checkbox>
              </p>
              <el-input v-model="discountCode" size="medium" placeholder="请输入优惠码，如：XMAS20OFF"></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box">
            <div class="content">
              <h3 class="title">优惠活动名称</h3>
              <div class="info">
                <p>
                  <span class="title">优惠码</span>
                  <span class="text">{{discountCode?discountCode:'--'}}</span>
                </p>
                <p style="margin: 14px 0px;">
                  <span class="title">优惠类型</span>
                  <span class="text">
                    <template v-if="tipDiscountPrice">
                      <template v-if="discountTypeValue == 1">
                        减免${{tipDiscountPrice}}
                        <span class="en">(${{tipDiscountPrice}} off)</span>
                      </template>
                      <template v-if="discountTypeValue == 2">
                        减{{tipDiscountPrice}}%
                        <span class="en">({{tipDiscountPrice}}% off)</span>
                      </template>
                      <template v-if="discountTypeValue == 3">
                        免运费
                        <span class="en">(Free shipping)</span>
                      </template>
                    </template>
                    <template v-else>--</template>
                  </span>
                </p>
                <p style="margin-bottom:22px;">
                  <span class="title">有效时间</span>
                  <span class="text">
                    <template
                      v-if="activityStartDate"
                    >{{activityStartDate}} 至 {{activityEndDate?activityEndDate:'永久有效'}}</template>
                    <template v-else>--</template>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div class="box">
            <p class="infoTip">温馨提示</p>
            <p class="infoContent">折扣码与自动折扣无法同时使用。如果在结账时使用了手动优惠码，那么自动优惠将失效。</p>
          </div>
        </el-col>
      </el-row>
      <div class="pageSaveBtn">
        <el-button>取消</el-button>
        <el-button type="primary">保存</el-button>
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
          <el-table-column prop="prop" label="商品标签" ></el-table-column>
					<el-table-column prop="prop" label="商品分类" ></el-table-column>
					<el-table-column prop="prop" label="内容" ></el-table-column> 
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
					<el-table-column prop="prop" label="内容" ></el-table-column> 
        </el-table>
				<div slot="footer"> 
					<el-button @click="shopCategoryDialog = false">取消</el-button>
					<el-button type="primary">确定</el-button>
				</div>
			</el-dialog>
    </div>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      activityName: "", // 活动名称
      discountTypeValue: 1, // 默认选中的商品属性
      discountTypeList: [
        // 商品属性列表
        {
          value: 1,
          label: "固定优惠",
        },
        {
          value: 2,
          label: "%折扣",
        },
        {
          value: 3,
          label: "免运费",
        },
      ],
      discountTypeValueOfInfomation: {
        maxlength: 8,
        placeholder: "请填写优惠金额",
        prepend: "优惠金额",
      },
      discountPrice: "",
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
      effectConditionsValue: 1, // 生效条件
      effectConditionsList: [
        // 生效条件列表
        {
          value: 1,
          label: "不限",
        },
        {
          value: 2,
          label: "消费满",
        },
      ],
      effectConditionsPrice: "", // 满减下限
      activityStartDate: "", // 活动开始时间
      activityEndDate: "", // 活动结束时间
      isAutoApplyOffers: "", // 是否自动适应优惠
      discountCode: "", // 优惠码
      tipDiscountPrice: "", // 右边显示的优惠类型
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
      this.tipDiscountPrice = price;
      console.log(price);
    },
		AddFun: function () {},
		ShowDiglog:function(){
			switch (this.appliedObjectValue) {
				case 2:
					this.shopCategoryDialog = true
					break; 
				default:
					this.shopDialog = true
					break;
			}
		},
  },
  updated() {
    console.log("更新");
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
.search-conditions {
  display: flex;
  justify-content: space-between;
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