<template>
  <div class="container">
    <router-link
      to="/setting"
      style="color: #5e7185;margin-bottom:12px;display:inline-block;height:20px;line-height:20px"
    >
      <i class="el-icon-arrow-left"></i>
      <span>设置</span>
    </router-link>
    <h1>政策条款</h1>
    <div>
      <el-row>
        <el-col :span="16">
          <!-- 退款政策 -->
          <div class="box">
            <h3 class="title">退款政策（Refund policy）</h3>
            <div class="sub-title">当您保存政策后，它们会作为链接显示在结账页的页脚中。</div>
            <wangeditor ref="editor" v-model="refundPolicy"></wangeditor>

            <el-button style="margin-top:12px;float:right;">使用模板</el-button>
          </div>
          <!-- 隐私政策 -->
          <div class="box">
            <h3 class="title">隐私政策（Privacy policy）</h3>
            <div class="sub-title">当您保存政策后，它们会作为链接显示在结账页的页脚中。</div>
            <wangeditor ref="editor" v-model="privacyPolicy"></wangeditor>
            <el-button style="margin-top:12px;float:right;">使用模板</el-button>
          </div>
          <!-- 服务条款 -->
          <div class="box">
            <h3 class="title">服务条款（Terms of service）</h3>
            <div class="sub-title">当您保存政策后，它们会作为链接显示在结账页的页脚中。</div>
            <wangeditor ref="editor" v-model="termsOfService"></wangeditor>
            <el-button style="margin-top:12px;float:right;">使用模板</el-button>
          </div>
          <!-- 物流政策 -->
          <div class="box">
            <h3 class="title">物流政策（Shipping policy）</h3>
            <div class="sub-title">当您保存政策后，它们会作为链接显示在结账页的页脚中。</div>
            <wangeditor ref="editor" v-model="shippingPolicy"></wangeditor>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box">
            <p class="infoTip">信息提示</p>
            <p style="margin-top:0" class="infoContent">1、若设置的政策条款信息有内容，则将出现在结账页。</p>
            <p class="infoContent">2、若设置的政策条款信息有内容，则可在设置菜单栏时选择。</p>
            <p class="infoContent">3、使用模板后，请检查并替换模板内信息（如邮箱、地址信息）。</p>
          </div>
        </el-col>
      </el-row>
      <div class="pageSaveBtn">
        <el-button @click="$NavgitorTo('/pageManage')">取消</el-button>
        <el-button type="primary" :disabled="save" @>保存</el-button>
      </div>
    </div>
  </div>
</template> 
<script>
import wangeditor from '@/components/wangeditor' 
export default {
  components: {
    wangeditor,
  },
  data() {
    return {
      refundPolicy: "", // 富文本内容
      privacyPolicy: "",
      termsOfService: "",
      shippingPolicy: "",
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
  & > .infoTip {
    color: #1a1d2c;
    font-size: 14px;
    padding-bottom: 14px;
  }
  & > .otherTitle {
    margin: 20px 0 12px;
    font-size: 14px;
  }
  .infoContent {
    line-height: 18px;
    font-size: 12px;
    color: #606266;
    margin-top: 14px;
  }
  .dec {
    font-size: 12px;
    color: #5e7185;
    line-height: 20px;
    margin: 8px 0 20px 24px;
  }
}
</style>  