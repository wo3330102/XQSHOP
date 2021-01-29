<template>
  <div class="container">
    <router-link
      to="/order"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>所有订单</span>
    </router-link>
    <h1>
      <span class="text">订单详情</span>
      <span class="options">
        <el-dropdown @command="Del">
          <el-button>
            操作
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>标记已完成</el-dropdown-item> -->
            <el-dropdown-item>取消订单</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          type="primary"
          style="margin-left: 12px"
          v-if="showBtn"
          @click="showDialog = true"
        >
          {{ btnText }}
        </el-button>
      </span>
    </h1>
    <div>
      <el-row>
        <el-col :span="16">
          <!-- 订单总览 -->
          <div class="box product-list">
            <h3 class="title">订单总览</h3>
            <table>
              <thead>
                <tr>
                  <th>商品</th>
                  <th></th>
                  <th>规格</th>
                  <th>售价*数量</th>
                  <th>总售价</th>
                  <th>折扣</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in detail.cartInfoList"
                  :key="item.cartInfoMap.id"
                >
                  <td class="img">
                    <div
                      class="small-img"
                      :style="{
                        backgroundImage:
                          'url(' + item.cartInfoMap.productInfo.image + ')',
                      }"
                    ></div>
                  </td>
                  <td class="desc">
                    <p class="main preview">
                      {{ item.cartInfoMap.productInfo.storeName }}
                    </p>
                    <p class="sku">
                      SKU：{{ item.cartInfoMap.productInfo.attrInfo?item.cartInfoMap.productInfo.attrInfo.sku:'' }}
                    </p>
                  </td>
                  <td class="spec">1</td>
                  <td class="price">
                    {{currency.s}}{{ $IsNaN(item.cartInfoMap.truePrice) }} *
                    {{ item.cartInfoMap.cartNum }}
                  </td>
                  <td class="totalPrice">
                    {{
                      currency.s+$IsNaN(
                        item.cartInfoMap.truePrice * item.cartInfoMap.cartNum
                      )
                    }}
                  </td>
                  <td class="discount">{{currency.s}}{{detail.discount?$IsNaN(detail.discount):'0.00'}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 付款信息 -->
          <div class="box pay-info">
            <h3>付款信息</h3>
            <div class="item">
              <div class="left">小计</div>
              <div class="right">
                <span>{{ detail.totalNum }}项</span>
                <span class="num">{{currency.s}} {{ $IsNaN(detail.totalPrice) }}</span>
              </div>
            </div>
            <div class="item">
              <div class="left">折扣</div>
              <div class="right">
                <span>折扣金额</span>
                <span class="num">{{currency.s}} {{ detail.discount?$IsNaN(detail.discount):'0.00' }}</span>
              </div>
            </div>
            <div class="item">
              <div class="left">运费</div>
              <div class="right">
                <span>Standard Shipping</span>
                <span class="num">{{currency.s}} {{ (detail.payPostage?$IsNaN(detail.payPostage):'0.00') }}</span>
              </div>
            </div>
            <div class="item">
              <div class="left">运费险</div>
              <div class="right">
                <span></span>
                <span class="num">{{currency.s}} {{ (detail.freightPrice?$IsNaN(detail.freightPrice):'0.00') }}</span>
              </div> 
            </div>
            <div class="item">
              <div class="left">总计</div>
              <div class="right">
                <span class="num">{{currency.s}} {{ detail.payPrice }}</span>
              </div>
            </div>
          </div>
          <!-- 收货地址 -->
          <div class="box pay-info">
            <h3>收货地址</h3>
            <div class="item">
              <div class="left">姓名</div>
              <div class="right">
                <span>{{ detail.userDTO.nickname }}</span>
              </div>
            </div>
            <div class="item">
              <div class="left">电话</div>
              <div class="right">
                <span>{{ detail.userDTO.phone }}</span>
              </div>
            </div>
            <div class="item">
              <div class="left">地址</div>
              <div class="right">
                <span>{{ detail.userAddress }}</span>
              </div>
            </div>
            <div class="item">
              <div class="left">邮编</div>
              <div class="right">
                <span>{{detail.postCode}}</span>
              </div>
            </div>
            <div class="item">
              <div class="left">邮箱</div>
              <div class="right">
                <span>{{detail.userDTO.email}}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box order-info"> 
            <h3 class="title">订单信息</h3>
            <div>
              <p class="status">
                <span>订单状态：</span>
                <span>{{ detail.payTypeName }}</span>
              </p>
              <p class="amount">
                <span>订单总额：</span>
                <span class="content">{{ currency.s + detail.payPrice }}</span>
              </p>
            </div>
            <div class="order">
              <p>
                <span>订单编号：</span>
                <span>{{ detail.orderId }}</span>
              </p> 
              <p>
                <span>支付编号：</span>
                <span>{{ detail.payType }}</span>
              </p>
              <p>
                <span>支付渠道：</span>
                <span>{{ detail.payTypeName }}</span>
              </p>
              <p>
                <span>生成时间：</span>
                <span>{{ new Date(detail.createTime).toLocaleString() }}</span>
              </p>
              <p>
                <span>付款时间：</span>
                <span>{{ detail.payTime?new Date(detail.payTime).toLocaleString() : '' }}</span>
              </p>
              <p>
                <span>物流单号：</span>
                <span>{{ detail.deliveryId }}</span>
              </p>
              <p class="logistics_send_time">
                <span>发货时间：</span>
                <span>{{ detail.deliveryTime?new Date(detail.deliveryTime).toLocaleString() : '' }}</span>
              </p>
              <p class="remark">
                <span>买家备注：</span>
                <span>{{ detail.remark }}</span>
              </p>
            </div>
          </div>
          <!-- 时间线 -->
          <!-- <div class="box order-info">
            <el-timeline>
              <el-timeline-item v-for="item in timeLine" :key="item.timestamp" :timestamp="item.timestamp" placement="top">
                <h3></h3>
                <span></span>
              </el-timeline-item>
            </el-timeline>
          </div> -->
        </el-col>
      </el-row>
      <!-- <div class="pageSaveBtn">
        <el-button @click="$NavgitorTo('/order')">取消</el-button>
        <el-button type="primary">保存</el-button>
      </div> -->
    </div>
    <el-dialog title="录入快递" :visible.sync="showDialog"> 
      <el-input v-model="deliveryId" placeholder="请输入快递单号"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="submit" @click="SendCommodity">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template> 
<script>
import { edit, del } from "@/api/order";
export default {
  data() {
    return {
      detail: {},
      type: "",
      deliveryId: "",
      showBtn: false,
      btnText: "发货",
      showDialog: false,
    };
  },
  created() {
    let detail = JSON.parse(localStorage.getItem("shopItem"));
    this.detail = detail;
    if (this.detail.statusName === '未发货' ) {
        this.btnText = "发货";
        this.showBtn = true;
    } else {
      this.showBtn = false;
    }
  },
  methods: {
    SendCommodity: function () {
      this.showDialog = true;
      if (this.deliveryId) {
        this.detail.deliveryId = this.deliveryId;
        this.detail.deliveryName = '427'; 
        edit(this.detail).then(() => {
          this.$router.push("/order");
        });
      }
    },
    Del: function () {
      del(this.detail.id).then(() => {
        this.$router.push("/order");
      });
    },
  },
  updated() {},
};
</script>
<style lang="scss" scoped>
h1 {
  font-size: 24px;
  margin-bottom: 12px;
  font-weight: 400;
  justify-items: center;
  display: flex;
  .options {
    font-size: 0;
  }
  .text {
    line-height: 40px;
    flex: 1;
  }
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
}
.product-list {
  width: 100%;
  table {
    width: 100%;
    border-collapse: collapse;
    tr {
      &:first-child {
        border-bottom: none;
      }
      border-bottom: 1px solid #dcddeb;
      .img {
        padding-left: 0;
        width: 60px;
        .small-img {
          display: inline-block;
          vertical-align: middle;
          width: 50px;
          height: 50px;
          border-radius: 4px;
          border: 1px solid #dadde4;
          background-color: #f7f8fd;
          background-origin: content-box;
          background-position: 50% 50%;
          background-size: contain;
          background-repeat: no-repeat;
          overflow: hidden;
        }
      }
      .desc {
        .main {
          color: #273a8a;
        }
        .preview {
          text-decoration: underline;
          cursor: pointer;
        }
        .sku {
          margin-top: 6px;
          color: #696b74;
        }
      }
      th {
        text-align: left;
        box-sizing: border-box;
        color: #1e2239;
        padding: 12px;
        font-weight: 400;
      }
      td {
        padding: 12px;
        box-sizing: border-box;
        vertical-align: top;
        color: #1c1f32;
        text-align: left;
      }
    }
  }
}
.pay-info {
  .item {
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid #dcddeb;
    color: #2e375e;
    line-height: 44px;
    .left {
      margin-right: 50px;
    }
    .right {
      flex: 1;
      .num {
        float: right;
      }
    }
  }
}
.order-info {
  p {
    display: flex;
    align-items: center;
    color: #242b4a;
    line-height: 20px;
  }
  .status {
    margin: 20px 0;
  }
  .amount {
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #dcddeb;
    .content {
      color: rgb(0, 0, 0);
      font-size: 20px;
      font-weight: bold;
    }
  }
  .order_number {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .order {
    p {
      margin: 20px 0;
    }
    .logistics_send_time {
      margin: 0;
      padding-bottom: 20px;
    }
    .remark {
      margin: 0;
      border-top: 1px solid #dcddeb;
      padding: 20px 0;
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