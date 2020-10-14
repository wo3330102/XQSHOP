<template>
  <div class="container">
    <router-link
      to="/notice"
      style="color: #5e7185;margin-bottom:12px;display:inline-block;height:20px;line-height:20px"
    >
      <i class="el-icon-arrow-left"></i>
      <span>通知</span>
    </router-link>
    <h1>下单通知</h1>
    <div>
      <!-- 顾客通知 -->
      <div class="box">
        <h3 class="title">邮件预览</h3>
        <div class="email">
          <div class="box1">
            <p>您好，Name</p>
            <p>2020年9月3日17:00，Customer Name 在您的店铺下了订单</p>
            <div class="goods">
              <table>
                <tr>
                  <td style="width: 80px;">
                    <img
                      src="https://ddd.xshoppy.shop/static/img/p1.f939320.png"
                      width="60px"
                      height="60px"
                    />
                  </td>
                  <td class="title">
                    <span>
                      1x （Buy 2 FREE Shipping）Best Xmas
                      Gifts-BoneTech Earphones Non Ear Plug Headphones - ONYX BLACK (SKU: HB21822641HEI3) for
                      $16.99 each
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="width: 80px;">
                    <img
                      src="https://ddd.xshoppy.shop/static/img/p1.f939320.png"
                      width="60px"
                      height="60px"
                    />
                  </td>
                  <td class="title">
                    <span>
                      1x （Buy 2 FREE Shipping）Best Xmas
                      Gifts-BoneTech Earphones Non Ear Plug Headphones - ONYX BLACK (SKU: HB21822641HEI3) for
                      $16.99 each
                    </span>
                  </td>
                </tr>
              </table>
            </div>
            <p style="margin-bottom: 15px;">
              <span
                style="color: rgb(28, 143, 255); text-decoration: underline; font-size: 16px; cursor: pointer;"
              >查看订单</span>
            </p>
            <div class="list">
              <h3>Payment processing method:</h3>
              <p>Paypal</p>
              <h3>Delivery method:</h3>
              <p>Standard Shipping (12-20 days)</p>
              <h3>Shipping address:</h3>
              <p>
                Kerry Halling 11709 E10th Ave Spikane,
                Washington 99206 United States (509) 230-2027
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      messageSubject: "1627239509@qq.com",
      sendTime: "",

      discount: "",
      discountList: [],
      privacyPolicy: "",
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
  line-height: 31px;
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
}
.email {
  background: #fff;
  width: 100%;
  margin: 0 auto;
  border: 1px solid #d7d7d7;
  border-bottom: none;
  font-size: 14px;
  color: #666;
  box-sizing: border-box;
  .box1 {
    padding: 31px 36px;
    border-bottom: 1px solid #d7d7d7;
    & > p:first-child {
      height: 24px;
      font-size: 17px;
      font-family: PingFangSC-Medium;
      color: rgba(0, 0, 0, 0.85);
      line-height: 33px;
    }
    & > p:nth-child(2) {
      margin-top: 16px;
      font-size: 16px;
      color: rgb(51, 51, 51);
    }
    p {
      line-height: 20px;
    }
    .goods {
          margin-top: 25px;
      table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        tr {
          height: 90px;
          td:first-child {
            width: 80px;
          }
        }
        .title {
          font-weight: bold;
          color: rgb(51, 51, 51);
        }
      }
    }
    .list {
      color: rgb(51, 51, 51);
      h3 {
          font-size: 1.17em;
        line-height: 22px;
      }
      p {
        margin: 8px 0px 16px;
        &:last-child {
          width: 240px;
          line-height: 32px;
        }
      }
    }
  }
}
</style>  