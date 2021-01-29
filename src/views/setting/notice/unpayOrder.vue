<template>
  <div class="container">
    <router-link
      to="/notice"
      style="color: #5e7185;margin-bottom:12px;display:inline-block;height:20px;line-height:20px"
    >
      <i class="el-icon-arrow-left"></i>
      <span>设置</span>
    </router-link>
    <h1>通知</h1>
    <div>
      <el-row>
        <el-col :span="16">
          <!-- 顾客通知 -->
          <div class="box">
            <div class="display-flex">
              <h3>基本设置</h3>
              <el-button>发送测试邮件</el-button>
            </div>
            <div class="template-set">
              <label class="template-set-label">邮件主题：</label>
              <div class="template-set-info">
                <el-input v-model="messageSubject" placeholder="请输入邮件主题"></el-input>
              </div>
            </div>
            <div class="template-set">
              <label class="template-set-label">发件人：</label>
              <div class="template-set-info">
                <el-input v-model="messageSubject" placeholder="请输入邮件主题"></el-input>
              </div>
              <label class="template-set-label w120">
                发送时间
                <el-tooltip content="买家填写完收货地址，并提交后开始计算时间" placement="top-start">
                  <i class="el-icon-info"></i>
                </el-tooltip>：
              </label>
              <div class="template-set-info">
                <el-select v-model="sendTime" placeholder="请选择发送时间" style="width:100%">
                  <el-option
                    v-for="item in timeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="template-set">
              <label class="template-set-label">自动应用优惠：</label>
              <div class="template-set-info">
                <el-select v-model="discount" placeholder="请选择优惠码" style="width:100%">
                  <el-option
                    v-for="item in discountList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <label class="template-set-label w100">创建优惠码</label>
              <div class="template-set-info"></div>
            </div>
          </div>
          <div class="box email">
            <div class="display-flex">
              <h3>邮件模版编辑</h3>
              <el-button>预览</el-button>
            </div>
            <div class="content">
              <div class="box1">
                <h4
                  class="title"
                  style="line-height: 45px; font-size: 32px; margin-bottom: 32px;"
                >ddd</h4>
                <wangeditor ref="editor" v-model="privacyPolicy"></wangeditor>
                <p class="viewOrder">Items in your cart</p>
                <p style="text-align: center; font-size: 16px;">
                  or
                  <a href target="_blank">View our store</a>
                </p>
              </div>
              <div class="box1" style="padding-bottom: 10px;">
                <p
                  style="height: 33px; font-size: 20px; font-family: PingFangSC-Medium; color: rgba(0, 0, 0, 0.85); line-height: 33px;"
                >Complete your purchase</p>
                <div class="goods">
                  <table>
                    <tr>
                      <td style="width: 80px; text-align: center;">
                        <img
                          src="https://ddd.xshoppy.shop/static/img/p1.f939320.png"
                          width="60px"
                          height="60px"
                        />
                      </td>
                      <td class="title">
                        <span>Product Name x1</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 80px; text-align: center;">
                        <img
                          src="https://ddd.xshoppy.shop/static/img/p1.f939320.png"
                          width="60px"
                          height="60px"
                        />
                      </td>
                      <td class="title">
                        <span>Product Name x1</span>
                      </td>
                    </tr>
                  </table>
                </div>
                <p style="margin-bottom: 25px;">
                  Don’t want to receive cart reminders from us?
                  <span
                    style="color: rgb(16, 142, 233); cursor: pointer;"
                  >Unsubscribe</span>
                </p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box">
            <p class="infoTip">温馨提示</p>
            <p
              class="infoContent"
            >1. {{'{'+'{first_name}'+'}'}}、{{'{'+'{last_name}'+'}'}}、{{'{'+'{name}'+'}'}}为可用变量，分别可以带入客户的名、姓、姓名可以在标题或正文中添加。</p>
            <p class="infoContent">2. 编辑完模板后可以发送测试邮件查看顾客收到邮件具体效果</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="pageSaveBtn">
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template> 
<script>
import wangeditor from "@/components/wangeditor";
export default {
  components: {
    wangeditor,
  },
  data() {
    return {
      messageSubject: "1627239509@qq.com",
      sendTime: "",
      timeList: [
        {
          value: 1,
          label: "5分钟",
        },
        {
          value: 2,
          label: "10分钟",
        },
        {
          value: 3,
          label: "15分钟",
        },
        {
          value: 4,
          label: "20分钟",
        },
        {
          value: 5,
          label: "25分钟",
        },
        {
          value: 6,
          label: "30分钟",
        },
        {
          value: 7,
          label: "45分钟",
        },
        {
          value: 8,
          label: "1小时",
        },
        {
          value: 9,
          label: "10小时",
        },
        {
          value: 10,
          label: "24小时",
        },
      ],
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
    line-height: 54px;
    display: flex;
    align-items: center;
    height: 20px;
    padding: 0;
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
    margin-top: 14px;
  }
  .display-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    h3 {
      font-size: 1.17em;
    }
  }
  .template-set {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .template-set-label {
      width: 100px;
      text-align: right;
      color: #2f395e;
    }
    .template-set-info {
      width: 100%;
      flex: 1;
    }
    .w120 {
      width: 120px;
      padding-right: 10px;
    }
    .w100 {
      width: 120px;
      text-align: center;
      color: #2c4295;
      cursor: pointer;
    }
  }
}
.email {
  padding: 24px;
  .content {
    width: 100%;
    margin: 0 auto;
    border: 1px solid #d7d7d7;
    border-bottom: none;
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
      }
      .order_number {
        line-height: 20px;
        margin: 32px 0px 16px;
      }
      .viewOrder {
        margin: 33px 0 18px;
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
        padding: 25px 0;
        table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
          border-bottom: 1px solid #d7d7d7;
          tr {
            height: 80px;
          }
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