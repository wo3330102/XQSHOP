<template>
  <div class="container">
    <router-link
      to="/notice"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>通知</span>
    </router-link>
    <h1>
      <span class="title">已发货邮件</span>
      <el-button>预览</el-button>
    </h1>
    <div>
      <!-- 邮件主题 -->
      <div class="box">
        <h3 class="title">邮件主题</h3>
        <el-input
          maxlength="255"
          v-model="email"
          placeholder="Complete your Purchase!"
        ></el-input>
      </div>
      <!-- 邮件预览 -->
      <div class="box">
        <h3 class="title">邮件预览</h3>
        <div class="email">
          <div class="box1">
            <h4 class="title">ddd</h4>
            <p class="order_number">ORDER 66422240C817758F0708BD2D7AD63E76</p>
            <wangeditor ref="editor" v-model="privacyPolicy"></wangeditor>

            <p class="viewOrder">View your order</p>
            <p style="text-align: center; font-size: 16px">
              or
              <a href target="_blank">View our store</a>
            </p>
            <p style="padding-top: 30px">
              Tracking number:
              <a href="##">WL1234567890</a>
            </p>
          </div>
          <div class="box1">
            <p
              style="
                height: 33px;
                font-size: 20px;
                font-family: PingFangSC-Medium;
                color: rgb(51, 51, 51);
                margin-bottom: 8px;
                line-height: 33px;
              "
            >
              Items in this shipment
            </p>
            <p class="goods">Product Name x1</p>
            <p class="goods">Product Name x1</p>
            <div class="main">
              <i class="el-icon-price-tag">Free freight</i>
            </div>
          </div>
          <div style="padding: 30px 23px 80px">
            If you have any questions, reply to this email or contact us at
            <span style="color: rgb(16, 142, 233); cursor: pointer"
              >xxx@gmail.com</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="pageSaveBtn">
      <el-button style="float:left" @click="Init">恢复默认值</el-button>
      <el-button type="primary" @click="Save">保存</el-button>
    </div>
  </div>
</template> 
<script>
const htmlStr = `<p class="thanks title" style="color: #333333; font-size: 24px; line-height: 33px; height: 33px; margin-bottom: 16px;" data-mce-style="color: #333333; font-size: 24px; line-height: 33px; height: 33px; margin-bottom: 16px;">Your order is on the way</p><p style="color: #666666; line-height: 20px;" data-mce-style="color: #666666; line-height: 20px;">Hi {{ first_name }},Your order is on the way. Track your shipment to see the delivery status.</p>`
import { getDetial, editTemp } from "@/api/notice";
import wangeditor from "@/components/wangeditor";
export default {
  components: {
    wangeditor,
  },
  data() {
    return {
      email: "A shipment from order {{ name }} is on the way",
      privacyPolicy: "",
    };
  },
  created() {
    getDetial(this.$route.query.id).then((res) => {
      console.log(res);
      if (res) {
        this.email = res.data.title;
        this.privacyPolicy = res.data.content;
        this.id = res.data.id;
      } else {
        this.privacyPolicy = htmlStr;
        this.email = "A shipment from order {{ name }} is on the way";
      }
    });
  },
  methods: {
    DelMenu: function (index) {
      console.log(index);
      this.selectData.splice(index, 1);
    },
    Init:function(){
      this.privacyPolicy = htmlStr
    },
    Save:function(){
      let par = {
        title:this.email,
        content:this.privacyPolicy, 
        type:3,
        id:this.id
      }
      editTemp(par).then(res=>{
        this.$message.success('修改成功')
        this.$router.go(-1);
      })
    }
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
      padding: 8px 0px;
      color: #333;
    }
    .main {
      margin-top: 12px;
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