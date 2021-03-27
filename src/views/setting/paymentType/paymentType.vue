<template>
  <div class="container">
    <router-link
      to="/setting"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>设置</span>
    </router-link>
    <h1>
      收款方式
      <!-- <el-button style="float: right">配置</el-button> -->
    </h1>
    <div>
      <el-row>
        <el-col :span="16">
          <!-- paypal支付设置 -->
          <div class="box" v-if="false">
            <h3>paypal支付设置</h3>
            <el-form
              class="form"
              ref="payOption"
              :model="payOption"
              label-width="120px"
              style="padding-top: 40px"
            >
              <el-form-item
                label="paypal clientId"
                prop="clientId"
                :rules="[
                  {
                    required: true,
                    message: '请输入paypal clientId',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input v-model="payOption.clientId" style="width: 370px" />
              </el-form-item>
              <el-form-item
                label="paypal secret"
                prop="secret"
                :rules="[
                  {
                    required: true,
                    message: '请输入paypal secret',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input v-model="payOption.secret" style="width: 370px" />
              </el-form-item>
              <el-form-item
                label="返回页面路径"
                prop="domain"
                :rules="[
                  {
                    required: true,
                    message: '请输入返回页面路径',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input v-model="payOption.domain" style="width: 370px" />
              </el-form-item>
              <el-form-item
                label="支付结果路径"
                prop="successUrl"
                :rules="[
                  {
                    required: true,
                    message: '请输入支付结果路径',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input v-model="payOption.successUrl" style="width: 370px" />
              </el-form-item>
              <el-form-item
                label="货币类型"
                prop="currencyCode"
                :rules="[
                  {
                    required: true,
                    message: '请选择货币类型',
                    trigger: 'change',
                  },
                ]"
              >
                <el-select
                  v-model="payOption.currencyCode"
                  placeholder="请选择货币类型"
                >
                  <el-option :label="currency.n" value="currency.n"></el-option>
                  <el-option label="CNY" value="CNY"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="沙盒模式"
                prop="sandBox"
                :rules="[
                  {
                    required: true,
                    message: '请选择是否开启沙盒模式',
                    trigger: 'change',
                  },
                ]"
              >
                <el-select
                  v-model="payOption.sandBox"
                  placeholder="是否开启沙盒模式"
                >
                  <el-option label="否" :value="0"></el-option>
                  <el-option label="是" :value="1"></el-option>
                </el-select>
                <!-- <el-switch v-model="payOption.sandBox"></el-switch> -->
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('payOption')"
                  >保存</el-button
                >
                <el-button @click="$NavgitorTo('/setting')">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- payssion支付设置 -->
          <div class="box">
            <h3>
              <span>payssion支付设置</span>
              <span
                class="sail-app-status-tag"
                :class="
                  payssionOption.status == 1
                    ? 'sail-app-status-tag-open'
                    : 'sail-app-status-tag-close'
                "
                >{{ payssionOption.status == 1 ? "已开启" : "未开启" }}</span
              >
            </h3>
            <el-form
              class="form"
              ref="payssion"
              :model="payssionOption"
              label-width="120px"
              style="padding-top: 40px"
              v-loading="payssionOptionLoading"
            >
              <el-form-item
                label="name"
                prop="name"
                :rules="[
                  {
                    required: true,
                    message: '请输入name',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input v-model="payssionOption.name" style="width: 370px" />
              </el-form-item>
              <el-form-item
                label="apiKey"
                prop="apiKey"
                :rules="[
                  {
                    required: true,
                    message: '请输入apiKey',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input
                  v-model="payssionOption.apiKey"
                  style="width: 370px"
                />
              </el-form-item>
              <el-form-item
                label="secretKey"
                prop="secretKey"
                :rules="[
                  {
                    required: true,
                    message: '请输入secretKey',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input
                  v-model="payssionOption.secretKey"
                  style="width: 370px"
                />
              </el-form-item>
              <el-form-item
                label="返回页面路径"
                prop="urlReturn"
                :rules="[
                  {
                    required: true,
                    message: '请输入返回页面路径',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input
                  v-model="payssionOption.urlReturn"
                  style="width: 370px"
                />
              </el-form-item>
              <el-form-item
                label="支付结果路径"
                prop="urlNotify"
                :rules="[
                  {
                    required: true,
                    message: '请输入支付结果路径',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input
                  v-model="payssionOption.urlNotify"
                  style="width: 370px"
                />
              </el-form-item> 
              <el-form-item>
                <el-button @click="changePayssionStatus()">{{
                  payssionOption.status == 0 ? "开启" : "关闭"
                }}</el-button>
                <el-button type="primary" @click="submitForm('payssion')"
                  >保存</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <!-- 活动名称 -->
          <div class="box" v-if="false">
            <h3 class="title">
              <img
                style="vertical-align: middle"
                src="data:image/png;base64,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"
              />
              <span class="options">
                <span v-if="firstShow == 1" class="options-first">优先</span>
                <span v-else class="options-oper" @click="firstShow = 1"
                  >设置结账页优先展示</span
                >
              </span>
            </h3>
            <div style="padding-top: 22px">
              <el-select v-model="paymentType" placeholder="请选择收款方式">
                <el-option :label="'企业账号收款'" :value="1"
                  >企业账号收款</el-option
                >
                <el-option :label="'个人账号收款'" :value="2"
                  >个人账号收款</el-option
                >
              </el-select>
              <div
                v-if="paymentType == 1"
                style="display: flex; align-items: center"
              >
                <div data-v-66a5aafe style="flex: 1">
                  使用“Checkout with PayPal”按钮接受PayPal作为额外的付款方式。
                </div>
                <el-button type="primary">绑定</el-button>
              </div>
              <div v-else class="payPalFormBox">
                <el-form :model="payPalForm" :hide-required-asterisk="true">
                  <el-form-item
                    label="Merchant ID"
                    style="width: 270px"
                    prop="merchantId"
                    :rules="[
                      {
                        required: true,
                        message: '请输入Merchant ID',
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-input
                      v-model="payPalForm.merchantId"
                      placeholder="请输入Merchant ID"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="Client ID"
                    style="width: 270px"
                    prop="clientId"
                    :rules="[
                      {
                        required: true,
                        message: '请输入Client ID',
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-input
                      v-model="payPalForm.clientId"
                      placeholder="请输入Client ID"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="Secret"
                    style="width: 270px"
                    prop="secret"
                    :rules="[
                      {
                        required: true,
                        message: '请输入Secret秘钥',
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-input
                      v-model="payPalForm.secret"
                      placeholder="请输入Secret"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <el-button type="primary">绑定</el-button>
                <div class="box personal-pay-tip">
                  <p class="personal-pay-tip-title">个人账户指引</p>
                  <div>
                    <p class="infoContent">
                      1、进入
                      <a
                        target="_blank"
                        href="https://developer.paypal.com/developer/applications"
                        >PayPal开发者平台</a
                      >，登录后点击页面上方的Live按钮，登录后点击创建APP
                    </p>
                    <p class="infoContent">
                      2、创建完成后，即可在APP中获取 Client ID 及 Secret
                    </p>
                    <p class="infoContent">
                      3、访问
                      <a href="https://www.paypal.com" target="_blank"
                        >PayPal个人主页</a
                      >
                      ，点击页面右上方的设置按钮，然后在正文中复制MerChant
                      ID（中文名称：商家号）
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 信用卡收款 -->
          <div class="box" v-if="false">
            <h3 class="title">
              <span style="flex: 1">
                信用卡收款
                <span
                  style="
                    font-weight: 400 !important;
                    color: rgb(181, 183, 194) !important;
                  "
                  >（一次只支持使用一种信用卡收款方式）</span
                >
              </span>
              <span class="options">
                <span
                  v-if="firstShow == 1"
                  class="options-oper"
                  @click="firstShow = 2"
                  >设置结账页优先展示</span
                >
                <span v-else class="options-first">优先</span>
              </span>
            </h3>
            <div>
              <p>基于客户的订单金额来设置物流选项</p>
              <p style="text-align: right">
                <el-button type="primary">选择</el-button>
              </p>
            </div>
          </div>
          <!-- 货到付款 -->
          <div class="box"> 
            <h3 class="title">
              <span style="flex: 1">
                货到付款
                <span
                  style="
                    font-weight: 400 !important;
                    color: rgb(181, 183, 194) !important;
                  "
                  >（COD）</span
                >
              </span>
              <span
                class="sail-app-status-tag"
                :class="
                  CODDetail.status == 1
                    ? 'sail-app-status-tag-open'
                    : 'sail-app-status-tag-close'
                "
                >{{ CODDetail.status == 1 ? "已开启" : "未开启" }}</span
              >
            </h3>
            <div>
              <div class="credit-done">
                <p>
                  <el-form
                    :model="CODDetail"
                    class="form"
                    ref="CODFrom"
                    label-width="120px"
                  >
                    <el-form-item
                      label="前台显示名称"
                      prop="name"
                      :rules="[
                        {
                          required: true,
                          message: '请输入前台展示名称',
                          trigger: 'blur',
                        },
                      ]"
                    >
                      <el-input
                        style="width: 370px"
                        v-model="CODDetail.name"
                        placeholder="请输入前台展示名称"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      label="手续费" 
                    >
                      <el-input
                        style="width: 370px"
                        v-model="CODDetail.fees"
                        @blur="CODDetail.fees = Number($toDecimal2(CODDetail.fees))"
                        placeholder="请输入COD手续费"
                        maxlength="8"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button @click="EditCOD('status')">{{
                        CODDetail.status == 0 ? "开启" : "关闭"
                      }}</el-button>
                      <el-button @click="EditCOD" type="primary">保存</el-button>
                    </el-form-item>
                  </el-form>
                </p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box">
            <p class="infoTip">温馨提示</p>
            <p class="infoContent">
              1.我们可以同时支持PAYPAL和信用卡支付方式供顾客选择
            </p>
            <p class="infoContent" style="margin-top: 14px">
              2.您可以配置页脚支付图标与结账页的安全提示，以便于增加顾客信任感。
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template> 
<script>
import { getPayssion, editPayssion, getCOD, editCOD } from "@/api/pay";
export default {
  data() {
    return {
      firstShow: 1,
      paymentType: 1,
      payPalForm: {
        merchantId: "",
        clientId: "",
        secret: "",
      },
      payOption: {},
      payssionOptionLoading: true,
      payssionOption: {
        apiKey: "",
        name: "",
        id: 0,
        secretKey: "",
        status: 1,
        urlNotify: "",
        urlReturn: "",
      },
      CODDetail: {},
    };
  },
  created() {
    this.Init();
  }, 
  methods: {
    Init: function () {
      let storeId = localStorage.getItem("storeId");
      // 获取payssion详情
      getPayssion({ storeId }).then((res) => {
        if (res) {
          console.log(res);
          this.payssionOptionLoading = false;
          this.payssionOption = { ...res.data };
        }
      });
      // 获取COD
      getCOD().then((res) => {
        if (res) {
          this.CODDetail = res.data;
        }
      });
    },
    // 修改payssion是否启用
    changePayssionStatus: function () {
      let par = {
        ...this.payssionOption,
        status: this.payssionOption.status == 0 ? 1 : 0,
      };
      editPayssion(this.payssionOption).then((res) => {
        this.$message.success("修改成功");
        this.payssionOption.status = this.payssionOption.status == 0 ? 1 : 0;
      });
    },
    // 修改COD是否启用
    EditCOD: function (e) { 
      console.log(e);
      this.$refs["CODFrom"].validate((valid) => {
          if (valid) {
            let par = {};
            if(e == 'status'){
              par = {
                ...this.CODDetail,
                status: this.CODDetail.status == 0 ? 1 : 0,
              };
            } else {
              par = {
                ...this.CODDetail
              };
            }
            comment(par); 
          }
        });
      var that = this;
      function comment(detail) { 
        editCOD(detail).then((res) => {
          that.$message.success("修改成功");
          if(e == 'status'){
            that.CODDetail.status = that.CODDetail.status == 0 ? 1 : 0;
          }
        });
      }
    },
    // 保存
    submitForm: function (formName) {
      let that = this;
      let storeId = localStorage.getItem("storeId");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName == "payssion") {
            editPayssion(this.payssionOption).then((res) => {
              this.$message.success("编辑成功");
            });
          } else {
            this.payOption.storeId = storeId;
            EditPay(this.payOption).then((res) => {
              this.$message.success("编辑成功");
              that.showPay = false;
            });
          }
        } else {
          return false;
        }
      });
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
    height: 32px;
    line-height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .options {
      font-size: 14px;
      .options-oper {
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #2c4295;
        line-height: 20px;
        cursor: pointer;
        text-decoration: underline;
      }
      .options-first {
        height: 20px;
        font-size: 12px;
        padding: 2px 12px;
        border-radius: 100px;
        color: #3e4e57;
        font-weight: 400;
        background: #b4e0fa;
        border: 2px solid #fff;
      }
    }
    .title-des {
      color: #808598;
      font-size: 12px;
    }
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
  }
}
.payPalFormBox {
  border: 1px solid #eee;
  background: #f9f9f9;
  padding: 20px;
  margin: 20px 0 10px;
  border-radius: 4px;
  position: relative;
  /deep/.el-form-item__label {
    line-height: 20px;
    color: #242b4a;
    padding-bottom: 10px;
  }
  /deep/.el-form-item {
    margin-bottom: 22px;
  }
  .personal-pay-tip {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    background: #f9f9f9;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0;
    box-shadow: 0 0 0;
    border: 0;
    padding-left: 24px;
    border-left: 1px solid #eee;
    .personal-pay-tip-title {
      line-height: 20px;
      color: #5e5f60;
      font-size: 14px;
    }
    .infoContent {
      line-height: 20px;
      margin-top: 24px;
    }
  }
}
.credit-done {
  margin: 20px 0;
  display: flex;
  align-items: center;
  line-height: 30px;
  color: #a0b0bf;
}
.pageSaveBtn {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
  text-align: right;
  font-size: 0;
  margin-bottom: 40px;
}
.sail-app-status-tag-open {
  border: 2px solid #fff;
  background: #bbe5b3;
  color: #414f3e;
}
.sail-app-status-tag-close {
  background: #dfe3e8;
  border: 2px solid #fff;
  color: #454f5b;
}
.sail-app-status-tag {
  border-radius: 100px;
  width: 60px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 13px;
  text-align: center;
  position: relative;
  top: -4px;
  float: right;
}
</style>  