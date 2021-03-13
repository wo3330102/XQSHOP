<template>
  <div class="container">
    <router-link
      to="/customer"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>顾客列表</span>
    </router-link>
    <h1>
      <span class="text">顾客详情</span>
    </h1>
    <div>
      <el-row>
        <el-col :span="16">
          <div class="box customer-info">
            <h3 class="title">
              顾客信息
              <span class="option" @click="showDialog = true">编辑</span>
            </h3>
            <div class="item">
              <div class="left">姓名</div>
              <div class="right">
                <span>{{ detail.realName || detail.nickname }}</span>
                <i v-if="detail.isSubscribe" class="subscribe">已订阅</i>
              </div>
            </div>
            <div class="item">
              <div class="left">电话</div>  
              <div class="right">
                <span>{{ detail.phone }}</span>
              </div>
            </div>
            <div class="item">
              <div class="left">城市</div>
              <div class="right">
                <span>{{ shippingAddress.city || '--'}}</span>
              </div>
            </div>
            <div class="item">
              <div class="left">邮箱</div>
              <div class="right">
                <span>{{ detail.email }}</span>
              </div>
            </div>
            <div class="item">
              <div class="left">加入时间</div>
              <div class="right">
                <span>{{ detail.createTime }}</span>
              </div>
            </div>
            <div class="item">
              <div class="left">总单量</div>
              <div class="right">
                <span>{{ detail.payCount }}</span>
              </div>
            </div>
            <div class="item">
              <div class="left">总花费</div>
              <div class="right">
                <span>{{ detail.sumMoney ? currency.s + detail.sumMoney : currency.s+"0.00" }}</span>
              </div>
            </div>
          </div>
          <!-- 历史订单 -->
          <div class="box historyOrder">
            <h3 class="title">历史订单</h3>
            <template v-if="historyOrderList.length > 0">
              <div
                class="order-list"
                v-for="item in historyOrderList"
                :key="item.orderId"
              >
                <p class="order-info">
                  <span>
                    订单号
                    <span class="handleText">{{ item.orderId }}</span>
                  </span>
                  <span>{{ item.createTime }}</span>
                </p>
                <table class="product-list">
                  <tbody>
                    <tr>
                      <td width="60" style="padding-left: 0px">
                        <div
                          class="small-img"
                          :style="{
                            backgroundImage:
                              'url(' +
                              item.cartInfo[0].productInfo.image_base +
                              ')',
                          }"
                        ></div>
                      </td>
                      <td>
                        <p style="color: rgb(26, 29, 44)">
                          {{ item.cartInfo[0].productInfo.storeName }}
                        </p>
                        <p
                          style="
                            color: rgb(105, 107, 116);
                            margin-top: 13px;
                            font-size: 13px;
                          "
                        >
                          SKU:{{ item.cartInfo[0].productInfo.attrInfo.sku }}
                        </p>
                      </td>
                      <td width="110">{{ item.cartInfo[0].cartNum }}</td>
                      <td width="100" align="right">
                        {{ currency.s + item.cartInfo[0].truePrice }} *
                        {{ item.cartInfo[0].cartNum }}
                      </td>
                      <td width="80" align="right" style="padding-right: 0px">
                        {{ currency.s + item.payPrice }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box address">
            <h3 class="title">收货地址</h3>
            <div class="address-item" style="align-items: center">
              <span class="label">姓名:</span>
              <span class="info">{{
                shippingAddress.realName ? shippingAddress.realName : "--"
              }}</span>
              <span
                v-if="shippingAddress.realName"
                style="
                  padding: 3px 8px;
                  margin-left: 22px;
                  border-radius: 14px;
                  border: 1px solid rgb(61, 138, 39);
                  color: rgb(39, 130, 72);
                  font-size: 12px;
                  font-style: normal;
                "
              >
                默认地址
              </span>
            </div>
            <div class="address-item" style="align-items: center">
              <span class="label">电话:</span>
              <span class="info">{{
                shippingAddress.phone ? shippingAddress.phone : "--"
              }}</span>
            </div>
            <div class="address-item" style="align-items: center">
              <span class="label">地址:</span>
              <span class="info">{{ 
                (function(){
                  if(shippingAddress.province || shippingAddress.city || shippingAddress.district || shippingAddress.detail){
                    return shippingAddress.province +
                shippingAddress.city +
                shippingAddress.district +
                shippingAddress.detail
                  } else {
                    return '--'
                  }
                }()) 
              }}</span>
            </div>
            <div class="address-item" style="align-items: center">
              <span class="label">邮编:</span>
              <span class="info">{{
                shippingAddress.postCode ? shippingAddress.postCode : "--"
              }}</span>
            </div>
            <div class="" v-if="shippingAddress.length > 1"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 编辑顾客信息 -->
    <el-dialog title="编辑顾客信息" :visible.sync="showDialog">
      <el-form :model="detail">
        <el-form-item label="姓名">
          <el-input v-model="detail.realName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="detail.phone" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            v-model="detail.email"
            placeholder=""
            :disabled="Boolean(detail.email)"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="isSubscribe" label="顾客接受订阅"></el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="Save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template> 
<script>
import { edit, del, getUserAddress, historyOrder } from "@/api/yxUser";
export default {
  data() {
    return {
      detail: {},
      type: "",
      deliveryId: "",
      showBtn: false,
      btnText: "发货",
      showDialog: false,
      isSubscribe: false,
      historyOrderList: [], 
      shippingAddressList: [],
      shippingAddress: {},
    };
  },
  created() {
    this.detail = JSON.parse(localStorage.getItem("customerDetail"));
    console.log(this.detail);
    this.detail.isSubscribe = 1;
    historyOrder(this.detail.uid).then((res) => {
      this.historyOrderList = res.data.content;
      res.data.content.map((i) => {
        i.image = i.p;
      }); 
    });
    getUserAddress(this.detail.uid).then((res) => {
      let that = this;
      this.shippingAddressList = res.data.content;
      this.shippingAddress =
        res.data.content.length > 0 ? res.data.content[0] : {};
      res.data.content.map((i) => {
        if (i.isDefault == 1) {
          that.shippingAddress = i;
        }
      });
    });
  },
  methods: {
    Del: function () {
      del(this.detail.id).then(() => {
        this.$router.push("/order");
      });
    },
    Save: function () {
      edit(this.detail).then((res) => {
        this.$message.success("编辑成功");
        this.$router.push("/customer");
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
.customer-info {
  padding-bottom: 0;
  .item {
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid #dcddeb;
    color: #2e375e;
    line-height: 44px;
    &:last-child {
      border-bottom: 0;
    }
    .left {
      // margin-right: 50px;
      width: 70px;
    }
    .right {
      flex: 1;
      .subscribe {
        padding: 3px 8px;
        margin-left: 22px;
        border-radius: 11px;
        border: 1px solid rgb(61, 138, 39);
        color: rgb(39, 130, 72);
        font-size: 12px;
        font-style: normal;
      }
      .num {
        float: right;
      }
    }
  }
}

.historyOrder {
  padding: 12px 0;
  .title {
    padding-left: 12px;
  }
  .order-list {
    &:last-child>.product-list{
      border-bottom: none;
    }
    .order-info {
      padding: 20px 12px 14px;
      display: flex;
      align-items: center;
      color: #909399;
      span {
        .handleText {
          margin-left: 10px;
          color: #273a8a;
          line-height: 20px;
          cursor: pointer;
          text-decoration: none;
        }
        &:first-child {
          flex: 1;
        }
      }
    }
    .product-list {
      padding: 0 12px;
      border-bottom: 1px solid #dcddeb;
      border-top: 1px solid #dcddeb;
      width: 100%; 
      td {
        padding: 20px 6px;
        vertical-align: top;
        color: #1c1f32;
        border-collapse: collapse;
        // .small-img {
        //   display: inline-block;
        //   vertical-align: middle;
        //   width: 50px;
        //   height: 50px;
        //   border-radius: 4px;
        //   border: 1px solid #dadde4;
        //   background-color: #f7f8fd;
        //   background-origin: content-box;
        //   background-position: 50% 50%;
        //   background-size: contain;
        //   background-repeat: no-repeat;
        //   overflow: hidden;
        // }
      }
    }
  }
}
.address {
  padding-bottom: 0;
  .address-item {
    color: #35406a;
    // padding: 0 12px;
    display: flex;
    margin-bottom: 20px;
    align-items: flex-start;
    line-height: 20px;
    .label {
      width: 46px;
    }
    .info {
      flex: 1;
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
/deep/.editFormData .el-form-item__label {
  line-height: 1;
}
</style>  