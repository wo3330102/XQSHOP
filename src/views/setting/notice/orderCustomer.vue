<template>
  <div class="container">
    <router-link
      to="/notice"
      style="color: #5e7185;margin-bottom:12px;display:inline-block;height:20px;line-height:20px"
    >
      <i class="el-icon-arrow-left"></i>
      <span>通知</span>
    </router-link>
    <h1>
      <span class="title">订单确认</span>
      <el-button>预览</el-button>
    </h1>
    <div>
      <!-- 退款政策 -->
      <div class="box">
        <h3 class="title">邮件主题</h3>
        <el-input v-model="email" placeholder="Complete your Purchase!"></el-input>
      </div>
      <!-- 隐私政策 -->
      <div class="box">
        <h3 class="title">邮件预览</h3>
        <div class="email">
          <div class="box1">
            <h4 class="title">ddd</h4>
            <p class="order_number">ORDER 66422240C817758F0708BD2D7AD63E76</p>
            <tinymce-editor ref="editor" v-model="privacyPolicy"></tinymce-editor>
            <p class="viewOrder">View your order</p>
            <p style="text-align: center; font-size: 16px;">
              or
              <a href target="_blank">View our store</a>
            </p>
            <p style="padding-top: 30px;">
              Tracking number:
              <a href="##">WL1234567890</a>
            </p>
          </div>
          <div class="box1 order" style="padding-bottom: 10px;">
            <h4>Order summary</h4>
            <table class="goods">
              <tr>
                <td style="padding: 8px 0px;">
                  <p>Product Name x 1</p>
                </td>
                <td style>
                  <span style>{{currency.s}}450.00</span>
                </td>
              </tr>
            </table>
            <table class="count" style="margin-top: 10px;">
              <tr style="subtotal">
                <td style="width: 80px;">Subtotal</td>
                <td style="color: rgb(51, 51, 51); font-weight: 600; text-align: right;">{{currency.s}}900.00</td>
              </tr>
              <tr class="discount">
                <td style="width: 80px; vertical-align: top;">Discount</td>
                <td style="display:flex;justify-content:space-between">
                  <span>
                    <i class="el-icon-price-tag"></i>OFF10
                  </span>
                  <span style="color: rgb(51, 51, 51); font-weight: 600;">-{{currency.s}}90.00</span>
                </td>
              </tr>
              <tr class="shipping">
                <td style="width: 80px; padding-bottom: 20px;">Shipping Insurance</td>
                <td
                  style="color: rgb(51, 51, 51); font-weight: 600; text-align: right; padding-bottom: 20px;"
                >+{{currency.s}}5.00</td>
              </tr>
              <tr class="shipping">
                <td style="width: 80px; padding-bottom: 20px;">Shipping</td>
                <td
                  style="color: rgb(51, 51, 51); font-weight: 600; text-align: right; padding-bottom: 20px;"
                >+{{currency.s}}20.00</td>
              </tr>
              <tr class="total">
                <td
                  style="width: 80px; vertical-align: top; border-top: 1px solid rgb(221, 221, 221); padding-top: 20px;"
                >Total</td>
                <td
                  style="color: rgb(51, 51, 51); font-weight: 600; text-align: right; border-top: 1px solid rgb(221, 221, 221); padding-top: 20px;"
                >
                  <p style="line-height: 26px; font-weight: normal;">
                    <span
                      style="height: 23px; font-size: 20px; font-weight: 600; margin-right: 4px; font-family: ArialRoundedMTBold; vertical-align: -2px;"
                    >{{currency.s}}835.00</span>{{currency.n}}
                  </p>
                  <p style="margin-top: 20px; color: rgb(102, 102, 102);">You saved {{currency.s}}90.00</p>
                </td>
              </tr>
            </table>
          </div>
          <div class="box1 customer-information">
            <p
              style="height: 28px; font-size: 20px; font-family: PingFangSC-Medium; font-weight: 500; color: rgb(51, 51, 51); line-height: 28px;"
            >Customer information</p>
            <p class="title">Shipping address</p>
            <p>Green Chuangyungu Building, No. 38, Gaoxin North 6th Road, Nanyuan Street, Nanshan District, Shenzhen,Guangdong, China</p>
            <p class="title">Billing address</p>
            <p>Green Chuangyungu Building, No. 38, Gaoxin North 6th Road, Nanyuan Street, Nanshan District, Shenzhen,Guangdong, China</p>
            <p class="title">Shipping method</p>
            <p>Standard</p>
            <p class="title">Payment method</p>
            <p>Express</p>
          </div>
          <div style="padding: 30px 23px 80px;">
            If you have any questions, reply to this email or contact us at
            <span
              style="color: rgb(16, 142, 233); cursor: pointer;"
            >xxx@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
    <div class="pageSaveBtn">
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template> 
<script>
import tinymceEditor from "@/components/tinymce-editor";
export default {
  components: {
    tinymceEditor,
  },
  data() {
    return {
      email: "Order {{ name }} confirmed",
      privacyPolicy: "",
    };
  },
  methods: {
    DelMenu: function (index) {
      console.log(index);
      this.selectData.splice(index, 1);
    },
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
  .title {
    flex: 1;
    line-height: 40px;
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
  .sub-title {
    margin-bottom: 12px;
    opacity: 0.6;
  }
}
.email {
  width: 598px;
  margin: 0 auto;
  border: 1px solid #d7d7d7;
  font-size: 14px;
  color: #666;
  .box1 {
    padding: 31px 24px;
    border-bottom: 1px solid #d7d7d7;
    p {
      line-height: 20px;
    }
    .title {
      color: #333;
      line-height: 45px;
      font-size: 32px;
    }
    .order_number {
      line-height: 20px;
      margin: 32px 0px 16px;
    }
    .viewOrder {
      margin: 33px 0 18px;
      width: 552px;
      height: 48px;
      line-height: 48px;
      background: #118ee9;
      color: #fff;
      text-align: center;
      cursor: pointer;
      font-size: 18px;
    }
    .order-title {
      height: 33px;
      font-size: 20px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgb(51, 51, 51);
      line-height: 33px;
    }
    .goods {
      width: 100%;
      border-bottom: 1px solid rgb(221, 221, 221);
      margin-top: 12px;
      padding-bottom: 12px;
      border-spacing: 0;
    }
  }
  .order {
    h4 {
      height: 33px;
      font-size: 20px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgb(51, 51, 51);
      line-height: 33px;
    }
    .goods {
      width: 100%;
      border-bottom: 1px solid rgb(221, 221, 221);
      margin-top: 12px;
      padding-bottom: 12px;
      color: #333;
      td {
        &:nth-child(2) {
          text-align: right;
          width: 120px;
          padding: 8px 0px;
          span {
            height: 16px;
            font-size: 14px;
            line-height: 16px;
            font-weight: 600;
          }
        }
      }
    }
    .count {
      margin-top: 10px;
      width: 100%;
      td {
        padding: 10px 0;
      }
    }
  }
  .customer-information {
    p {
      &:nth-child(2n) {
        margin: 16px 0px 8px;
        font-weight: 600;
        color: #333;
        line-height: 20px;
        font-size: 16px;
      }
      .title {
        margin: 16px 0px 8px;
        font-weight: 600;
        color: #333;
        font-size: 16px;
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