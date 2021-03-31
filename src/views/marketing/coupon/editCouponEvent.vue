<template>
  <div class="container">
    <router-link
      to="/coupon"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>优惠券</span>
    </router-link>
    <h1>{{ detail.id ? "编辑" : "新增" }}优惠券事件</h1>
    <div class="box">
      <el-form
        :model="detail"
        label-width="150px"
        label-position="left"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="事件名称" prop="eventType">
          <el-select
            style="width: 100%"
            v-model="detail.eventType"
            placeholder="请选择事件名称"
          >
            <el-option
              :label="item.eventName"
              :value="item.eventType"
              v-for="item in eventList"
              :key="item.eventType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属用户">
          <el-select
            style="width: 100%"
            v-model="detail.memberGroupIds"
            clearable
            @clear="detail.memberGroupIds = ''"
            placeholder="请选择所属用户"
          >
            <el-option label="游客与会员" :value="0"></el-option>
            <el-option
              :label="item.explain"
              :value="item.id"
              v-for="item in groupIdList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="eventStartTime">
          <el-date-picker
            style="width: 100%"
            size="medium"
            v-model="detail.eventStartTime"
            type="date"
            placeholder="请选择活动开始时间"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="timeOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="eventEndTime">
          <el-date-picker
            style="width: 100%"
            size="medium"
            v-model="detail.eventEndTime"
            type="date"
            placeholder="不填则永久有效"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="timeOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="事件规则" v-if="detail.eventType != 1 && detail.eventType != 6 && detail.eventType != 8">
          <table class="table" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td>订单限制门槛</td>
              <td>
                <el-radio-group v-model="detail.conditionType">
                  <el-radio :label="0">所有订单</el-radio>
                  <el-radio :label="1">首次下单</el-radio>
                  <el-radio :label="2">首次支付</el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td>
                <el-radio v-model="form.type" :label="0">订单支付金额</el-radio>
              </td>
              <td>
                <el-input
                  v-model="form.minPrice"
                  placeholder="请输入订单最小支付金额"
                  size="mini"
                  style="width: 220px"
                ></el-input>
                -
                <el-input
                  v-model="form.maxPrice"
                  placeholder="请输入订单最大支付金额"
                  size="mini"
                  style="width: 220px"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td>
                <el-radio v-model="form.type" :label="1">订单下单时间</el-radio>
              </td>
              <td>
                <el-date-picker
                  size="mini"
                  v-model="form.orderCreateTimeStart"
                  type="date"
                  placeholder="请选择订单下单时间段"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :picker-options="timeOptions"
                ></el-date-picker>
                -
                <el-date-picker
                  size="mini"
                  v-model="form.orderEndTime"
                  type="date"
                  placeholder="请选择订单下单时间段"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :picker-options="timeOptions"
                ></el-date-picker>
              </td>
            </tr>
            <tr>
              <td>
                <el-radio v-model="form.type" :label="2">订单支付时间</el-radio>
              </td>
              <td>
                <el-date-picker
                  size="mini"
                  v-model="form.payCreatTime"
                  type="date"
                  placeholder="请选择订单支付时间段"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :picker-options="timeOptions"
                ></el-date-picker>
                -
                <el-date-picker
                  size="mini"
                  v-model="form.payEndTime"
                  type="date"
                  placeholder="请选择订单支付时间段"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :picker-options="timeOptions"
                ></el-date-picker>
              </td>
            </tr>
          </table>
        </el-form-item>
        <el-form-item label="评论条件" v-show="detail.eventType == 6">
          <el-radio-group v-model="detail.conditionType">
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">带图</el-radio>
            <el-radio :label="2">不带图</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="赠送优惠券" prop="couponId">
          <el-select
            style="width: 100%"
            v-model="detail.couponId"
            placeholder="请选择私人券"
          >
            <el-option
              :label="item.title"
              :value="item.id"
              v-for="item in personCouponsList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="赠送张数">
          <el-input
            v-model="detail.couponNum"
            placeholder="请输入赠送的优惠券张数"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="pageSaveBtn">
      <el-button @click="$NavgitorTo('/coupon')">取消</el-button>
      <el-button
        type="primary"
        @click="Save"
        v-loading="disabled"
        :disabled="disabled"
        >保存</el-button
      >
    </div>
  </div>
</template> 
<script>
import {
  getLevels,
  addCouponEvent,
  editCouponEvent,
  getEvents,
  getPersonCoupons,
} from "@/api/coupon";
export default {
  data() {
    return {
      detail: {
        conditionType: 0,
        conditionVo: {
          type: 0,
        },
        couponId: "",
        couponNum: 1,
        eventEndTime: "",
        eventName: "",
        eventStartTime: "",
        eventType: "",
        memberGroupIds: 0,
      },
      form: {
        type: 0,
      },
      rules: {
        eventType: [
          {
            required: true,
            message: "请输入事件名称",
            trigger: ["change", "blur"],
          },
        ],
        activityName: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: ["change", "blur"],
          },
        ],
        eventStartTime: [
          {
            required: true,
            message: "请选择开始时间",
            trigger: ["change", "blur"],
          },
        ],
        eventEndTime: [
          {
            required: true,
            message: "请选择结束时间",
            trigger: ["change", "blur"],
          },
        ],
        couponId: [
          {
            required: true,
            message: "请选择赠送的优惠券",
            trigger: ["change", "blur"],
          },
        ],
      },
      showSelectProduct: false,
      groupIdList: [], // 会员分组
      eventList: [], // 事件列表
      personCouponsList: [], // 私人券列表
      ruleForm: {}, // 优惠券规则左边数据
      timeOptions: {
        disabledDate(time) {
          return time.getTime() < new Date().getTime() - 8.64e7;
        },
      },
      product: {},
      disabled: false,
    };
  },
  created() {
    if (localStorage.getItem("couponEventDetail")) {
      let detail = JSON.parse(localStorage.getItem("couponEventDetail"));
      switch (detail.conditionVo.type) {
        case 0:
          this.form = {
            type: 0,
            minPrice: detail.conditionVo.minValue,
            maxPrice: detail.conditionVo.maxValue,
          };
          break;
        case 1:
          this.form = {
            type: 1,
            orderCreateTimeStart: detail.conditionVo.minValue,
            orderEndTime: detail.conditionVo.maxValue,
          };
          break;

        case 2:
          this.form = {
            type: 2,
            payCreatTime: detail.conditionVo.minValue,
            payEndTime: detail.conditionVo.maxValue,
          };
          break;
      }
      this.detail = detail;
    }
    // 获取事件类型
    getEvents().then((res) => {
      this.eventList = res.data;
    });
    // 获取会员组
    getLevels().then((res) => {
      this.groupIdList = res.data;
    });
    // 获取私人券列表
    getPersonCoupons().then((res) => {
      this.personCouponsList = res.data;
    });
  },
  watch: {
    "detail.eventType": function (val) {
      this.eventList.forEach((item) => {
        if (item.eventType == val) {
          this.detail.eventName = item.eventName;
        }
      });
    },
  },
  methods: {
    Save: function () {
      this.disabled = true;
      if (this.detail.eventType !== 1) {
        this.$refs.form.validate((e) => {
          if (e) {
            // 判断开始时间是否大于结束时间
            const couponStartTime = new Date(this.detail.eventStartTime + ' 00:00:00').getTime();
            const couponEndTime = new Date(this.detail.eventEndTime + ' 00:00:00').getTime();
            if(couponStartTime>couponEndTime){
              this.$message.error("开始时间不能大于结束时间")
              this.disabled = false;
              return false; 
            }  
            // 判断订单限制门槛:0-支付金额 1-下单时间 2-支付时间
            switch (this.form.type) {
              case 0:
                if (this.form.minPrice || this.form.maxPrice) {
                  this.detail.conditionVo = {
                    minValue: this.form.minPrice || "",
                    maxValue: this.form.maxPrice || "",
                    type: this.form.type,
                  };
                } else {
                  this.$message.warning("请填写订单支付金额限制条件");
                  this.disabled = false;
                  return false;
                }
                break;
              case 1:
                if (this.form.orderCreateTimeStart || this.form.orderEndTime) {
                  this.detail.conditionVo = {
                    minValue: this.form.orderCreateTimeStart || "",
                    maxValue: this.form.orderEndTime || "",
                    type: this.form.type,
                  };
                } else {
                  this.$message.warning("请填写订单下单时间限制条件");
                  this.disabled = false;
                  return false;
                }
                break;
              case 2:
                if (this.form.payCreatTime || this.form.payEndTime) {
                  this.detail.conditionVo = {
                    minValue: this.form.payCreatTime || "",
                    maxValue: this.form.payEndTime || "",
                    type: this.form.type,
                  };
                } else {
                  this.$message.warning("请填写订单支付时间限制条件");
                  this.disabled = false;
                  return false;
                }
                break;
            }
          } else {
            this.$message.error("请完善表单数据");
            this.disabled = false;
            return false;
          }
        });
      }  
      if (this.detail.id) {
        // 修改
        editCouponEvent(this.detail)
          .then((res) => {
            this.$message.success("修改成功");
            this.disabled = false;
            this.$router.push("/coupon");
          })
          .catch(() => {
            this.disabled = false;
          });
      } else {
        // 新增
        addCouponEvent(this.detail)
          .then((res) => {
            this.$message.success("新增成功");
            this.disabled = false;
            this.$router.push("/coupon");
          })
          .catch(() => {
            this.disabled = false;
          });
      }
    },
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
  display: flex;
  justify-content: space-between;
}
.box {
  margin-bottom: 20px;
  padding: 16px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  overflow: hidden;
}
.table {
  border-bottom: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;
  box-sizing: border-box;
  td {
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    border-bottom: 0;
    border-right: 0;
    padding: 0 10px;
  }
}
.rule-box {
  .rule-box-item {
    display: flex;
    align-items: center;
    & > span {
      margin-right: 10px;
    }
  }
  /deep/.el-radio {
    margin-bottom: 10px;
    display: flex;
    min-height: 28px;
    align-items: center;
  }
}
.small {
  width: 110px !important;
}
/deep/.el-form-item__label {
  color: #000000;
}
/deep/ .el-input__prefix{
  left:5px !important;
}
.pageSaveBtn {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
  text-align: right;
  font-size: 0;
  margin-bottom: 40px;
}
</style>  