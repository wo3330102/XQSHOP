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
    <h1>{{ detail.id ? "编辑" : "新增" }}优惠券</h1>
    <div class="box">
      <el-form
        :model="detail"
        label-width="150px"
        label-position="left"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="活动名称" prop="activityName">
          <el-input
            v-model="detail.activityName"
            placeholder="请输入活动名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="优惠券名称" prop="title">
          <el-input
            v-model="detail.title"
            placeholder="请输入优惠券名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属会员组">
          <el-select
            style="width: 100%"
            v-model="detail.memberGroupIds"
            clearable
            @clear="detail.memberGroupIds = ''"
            placeholder="请选择所属会员组"
          >
            <el-option
              :label="item.explain"
              :value="item.id"
              v-for="item in groupIdList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="couponStartTime">
          <el-date-picker
            style="width: 100%"
            size="medium"
            v-model="detail.couponStartTime"
            type="date"
            placeholder="请选择活动开始时间"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="timeOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="couponEndTime">
          <el-date-picker
            style="width: 100%"
            size="medium"
            v-model="detail.couponEndTime"
            type="date"
            placeholder="不填则永久有效"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="timeOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="折上折">
          <el-checkbox
            v-model="detail.isCoverDiscount"
            :true-label="1"
            :false-label="0"
            label="允许与活动共同生效"
          ></el-checkbox>
        </el-form-item>
        <el-form-item label="特价叠加">
          <el-checkbox
            v-model="detail.isCoverBargain"
            :true-label="1"
            :false-label="0"
            label="不与特价叠加使用"
          ></el-checkbox>
        </el-form-item>
        <el-form-item label="优惠券类型">
          <el-radio-group v-model="detail.type">
            <el-radio :label="0">通用券（一个券码）</el-radio>
            <el-radio :label="1">私人券（每人单独）</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="优惠券号码" prop="couponNo">
          <el-input
            style="width: 600px"
            v-model="detail.couponNo"
            placeholder="不与特价叠加使用"
          ></el-input>
          <span style="font-size: 12px; color: #c0c4cc; marign-left: 10px">
            (优惠券编码生成后自动加前缀。<span style="color: #ff0000"
              >注意:只能使用英文及数字</span
            >)
          </span>
        </el-form-item>
        <el-form-item label="首单限制">
          <el-radio-group v-model="detail.firstOrderType">
            <el-radio :label="0">不限制</el-radio>
            <el-radio :label="1">首次下单</el-radio>
            <el-radio :label="2">首次支付</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="条件类型">
          <el-radio-group v-model="detail.conditionType">
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">商品分类</el-radio>
            <el-radio :label="2">品牌</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="优惠券规则">
          <div class="box" style="width:800px">
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <el-radio-group
                    v-model="detail.ruleVo.ruleType"
                    class="rule-box"
                  >
                    <el-radio :label="1">
                      <div class="rule-box-item">
                        <span>买满</span>
                        <div>
                          <el-input
                            v-model="ruleForm.minPrice"
                            class="small"
                            size="mini"
                            placeholder="最低金额"
                          ></el-input>
                          -
                          <el-input
                            v-model="ruleForm.maxPrice"
                            class="small"
                            size="mini"
                            placeholder="最高金额"
                          ></el-input>
                        </div>
                      </div>
                    </el-radio>
                    <el-radio :label="2">
                      <div class="rule-box-item">
                        <span>买满</span>
                        <div>
                          <el-input
                            v-model="ruleForm.minNum"
                            class="small"
                            size="mini"
                            placeholder="最低件数"
                          ></el-input>
                          -
                          <el-input
                            v-model="ruleForm.maxNum"
                            class="small"
                            size="mini"
                            placeholder="最高件数"
                          ></el-input>
                          件
                        </div>
                      </div>
                    </el-radio>
                    <el-radio :label="0">无需条件</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <el-radio-group v-model="detail.couponType" class="rule-box">
                    <el-radio :label="0">
                      <div class="rule-box-item">
                        <span>减金额 减</span>
                        <el-input
                          v-model="detail.couponPrice"
                          class="small"
                          size="mini"
                          placeholder="最低金额"
                        ></el-input>
                      </div>
                    </el-radio>
                    <el-radio :label="1">
                      <div class="rule-box-item">
                        <span>打折扣 打</span>
                        <el-input
                          v-model="detail.couponDiscount"
                          class="small"
                          size="mini"
                          placeholder="最低件数"
                        ></el-input>
                      </div>
                    </el-radio>
                    <el-radio :label="2" style="display: inline-block">
                      <span style="line-height: 28px">送礼物</span>
                      <div v-if="detail.couponType == 2">
                        <div style="margin-left: 30px; margin-top: 5px">
                          <span style="margin-right: 10px">礼品件数</span>
                          <el-input
                            size="mini"
                            v-model.number="detail.giftNum"
                            placeholder="请输入礼物件数"
                          ></el-input>
                        </div>
                        <div
                          style="
                            margin-left: 30px;
                            margin-top: 5px;
                            display: flex;
                            align-items: center;
                          "
                        >
                          <div style="margin-right: 10px">
                            <p
                              class="textBtn"
                              @click.stop="showSelectProduct = true"
                            >
                              选择商品
                            </p>
                            <span>(单规格)</span>
                          </div>
                          <p>{{ product.storeName }}</p>
                        </div>
                      </div>
                    </el-radio>
                    <el-radio :label="3">包邮</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item label="优惠券状态">
          <el-radio-group v-model="detail.status">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="前台列表是否显示">
          <el-radio-group v-model="detail.isShow">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动描述">
          <el-input
            v-model="detail.description"
            type="textarea"
            placeholder="请输入活动描述"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="pageSaveBtn">
      <el-button @click="$NavgitorTo('/share')">取消</el-button>
      <el-button
        type="primary"
        @click="Save"
        v-loading="disabled"
        :disabled="disabled"
        >保存</el-button
      >
    </div>
    <select-product
      :visible.sync="showSelectProduct"
      :requestParams="requestParams"
      :productId="detail.giftIds"
      @Result="Result"
    > </select-product>
  </div>
</template> 
<script>
import { getLevels, addCoupon, editCoupon } from "@/api/coupon";
import selectProduct from "../components/selectProductInCoupon";
export default {
  components:{selectProduct},
  data() {
    return {
      detail: {
        activityName: "",
        conditionType: 0,
        couponDiscount: 0,
        couponEndTime: "",
        couponNo: "",
        couponStartTime: "",
        couponType: 0,
        description: "",
        firstOrderType: 0,
        giftIds: "",
        giftNum:'',
        isCoverBargain: 0,
        isCoverDiscount: 0,
        isShow: 1,
        memberGroupIds: "",
        productIds: "",
        ruleVo: {
          maxValue: 0,
          minValue: 0,
          ruleType: 1,
        },
        status: 1,
        title: "",
        type: 0,
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入优惠券名称",
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
        couponStartTime: [
          {
            required: true,
            message: "请选择开始时间",
            trigger: ["change", "blur"],
          },
        ],
        couponEndTime: [
          {
            required: true,
            message: "请选择结束时间",
            trigger: ["change", "blur"],
          },
        ],
        couponNo: [
          {
            required: true,
            message: "请输入优惠券号码",
            trigger: ["change", "blur"],
          },
        ],
      },
      showSelectProduct: false,
      groupIdList: [], // 会员分组
      ruleForm: {}, // 优惠券规则左边数据
      timeOptions: {
        disabledDate(time) {
          return time.getTime() < new Date().getTime() - 8.64e7;
        },
      },
      product:{},
      disabled: false, 
    };
  },
  created() {
    if (localStorage.getItem("couponDetail")) {
      let detail = JSON.parse(localStorage.getItem("couponDetail"));
      if (detail.ruleVo.ruleType == 1) {
        this.ruleForm.minPrice = Object(detail.ruleVo).minValue;
        this.ruleForm.maxPrice = Object(detail.ruleVo).maxValue;
      } else if (detail.ruleVo.ruleType == 2) {
        this.ruleForm.minNum = detail.ruleVo.minValue;
        this.ruleForm.maxNum = detail.ruleVo.maxValue;
      }
      this.detail = detail;
    }
    getLevels().then((res) => {
      this.groupIdList = res.data;
    });
  },
  methods: {
    Result:function(e){
      this.product = e;
    },
    Save: function () {
      this.disabled = true;
      this.$refs.form.validate((e) => {
        if (e) {
          // 判断优惠券规则 0-无需条件 1-金额限制 2-数量限制
          if (this.detail.ruleVo.ruleType == 1) {
            if (this.ruleForm.minPrice || this.ruleForm.maxPrice) {
              this.detail.ruleVo.minValue = this.ruleForm.minPrice || "";
              this.detail.ruleVo.maxValue = this.ruleForm.maxPrice || "";
            } else {
              this.$message.warning("请设置优惠最低或最高所需金额");
              this.disabled = false;
              return false;
            }
          } else if (this.detail.ruleVo.ruleType == 2) {
            if (this.ruleForm.minNum || this.ruleForm.maxNum) {
              this.detail.ruleVo.minValue = this.ruleForm.minNum || "";
              this.detail.ruleVo.maxValue = this.ruleForm.maxNum || "";
            } else {
              this.$message.warning("请设置优惠最低或最高所需件数");
              this.disabled = false;
              return false;
            }
          } else {
            this.detail.ruleVo.minValue = "";
            this.detail.ruleVo.maxValue = "";
          }
          // 判断优惠类型:0-满减 1-折扣 2-赠品 3-包邮
          switch (this.detail.couponType) {
            case 0:
              if (this.detail.couponPrice) {
                this.detail.couponDiscount = "";
              } else {
                this.$message.warning("请填写优惠券金额");
                this.disabled = false;
                return false;
              }
              break;
            case 1:
              if (this.detail.couponDiscount) {
                this.detail.couponPrice = "";
              } else {
                this.$message.warning("请填写优惠券折扣");
                this.disabled = false;
                return false;
              }
              break;
            case 2:
              if (!this.product.hasOwnProperty('id')) {
                this.$message.warning("选择赠送的商品");
                this.disabled = false;
                return false;
              } else if(!this.detail.giftNum){
                this.$message.warning("选择赠送的商品数量,最少为1");
                this.disabled = false;
                return false;
              } else {
                this.detail.giftIds = this.product.id
              }
              break;
            default:
              this.detail.couponDiscount = "";
              this.detail.couponPrice = "";
              break;
          }
          this.detail.couponType == 2?'':this.detail.giftNum = '';
          if (this.detail.id) {
            // 修改
            editCoupon(this.detail)
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
            addCoupon(this.detail)
              .then((res) => {
                this.$message.success("新增成功");
                this.disabled = false;
                this.$router.push("/coupon");
              })
              .catch(() => {
                this.disabled = false;
              });
          }
        } else {
          this.$message.error("请完善表单数据");
          this.disabled = false;
        }
      });
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
/deep/.el-form-item{
  display: flex;
  align-items: center;
  /deep/.el-form-item__content{
    flex: 1;
    margin-left: 0 !important;
  }
}
/deep/.el-form-item__label {
  color: #000000;
}
.pageSaveBtn {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
  text-align: right;
  font-size: 0;
  margin-bottom: 40px;
}
</style>  