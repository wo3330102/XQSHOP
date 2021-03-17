<template>
  <div class="container">
    <router-link
      to="/limitedProduct"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>限量优惠</span>
    </router-link>
    <h1 class="title">
      <span class="text">
        配置 
      </span> 
    </h1>
    <div style="min-height: 200px">
      <el-row style="margin: 0 -10px">
        <el-col :span="16" style="padding-left: 10px; padding-right: 10px">
          <div class="box">
            <h3 class="title">
              <span>
                优惠提醒
                <span style="color: #606266; font-weight: normal"
                  >（开启后会在商品图上显示优惠提示）</span
                >
              </span>
              <span class="option" @click="preview = true">效果预览</span>
            </h3>
            <el-radio-group v-model="detail.rates">
              <el-radio :label="0">开启</el-radio>
              <el-radio :label="1">关闭</el-radio>
            </el-radio-group>
          </div> 
        </el-col> 
        <el-col :span="8" style="padding-left: 10px; padding-right: 10px">
          <div class="box">
            <p class="infoTip">
              温馨提示
            </p> 
            <p class="infoContent">
              用户可在优惠限制内使用优惠价格购买商品，超出限量后的商品只能使用常规商品价格购买。 
            </p>
          </div> 
        </el-col> 
      </el-row>
      <div class="pageSaveBtn">
        <el-button type="primary" @click="Save">保存</el-button>
      </div>
    </div>
    <el-dialog title="效果预览" :visible.sync="preview">
      <div style="text-align: center; width: 100%; max-height: 620px;"> 
        <el-image style="width: 300px;" src="https://alligatoreel-fa.xshoppy.shop/static/img/applications/limit-quantity-discount/limit-quantity-yes.png" ></el-image>
        <p class="discount_tips-text">
            限量优惠开启效果展示
        </p>
      </div> 
    </el-dialog>
  </div>
</template> 
<script>
import { get, add, edit } from "@/api/yxStorePlugRate"; 
export default {
  data() {
    return { 
      detail: {
        rates: 0,
        type: true,
        id: "",
      },
      preview:false,
        
    };
  }, 
  created() {
    this.Init();
  },
  methods: {
    Init: function () {
      get().then((res) => {
        if (res.content.length > 0) {
          this.detail = res.content[0];
          this.detail.type = Boolean(res.content[0].type);
          this.status = res.content[0].status;
        }
      });
    },
    Save: function () {
      let that = this;
      this.detail.status = this.status;
      this.detail.type = Number(this.detail.type);
      if (this.detail.id) {
        edit(this.detail).then(() => {
          Tip();
        });
      } else {
        delete this.detail.id;
        add(this.detail).then(() => {
          Tip();
        });
      }
      function Tip() {
        that.$message.success("修改成功");
        that.Init();
      }
      // this.$router.push('/appHome')
    },
  },
};
</script>
<style lang="scss" scoped> 
h1 {
  height: 40px;
  font-size: 24px;
  margin: 0 0 12px;
  font-weight: 400;
  line-height: 40px;
  display: flex;
  justify-items: center;
  justify-content: space-between;
  flex: 1;
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
  .title {
    color: #1a1d2c;
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 12px;
    .option {
      font-size: 14px;
      color: #273a8a;
      float: right;
      cursor: pointer;
      text-decoration: underline;
      font-weight: 400;
    }
  }
}  
.discount_tips-text{
  width: 100%;
    text-align: center;
    font-size: 14px;
    color: #3d5265;
    margin-bottom: 20px;
}
.infoContent {
  line-height: 18px;
  font-size: 12px;
  color: #606266;
  margin-bottom: 10px;
  &:last-child{
    margin: 0;
  }
}
.infoTip {
  color: #1a1d2c;
  font-size: 14px;
  padding-bottom: 14px;
}
</style> 