<template>
  <div class="container">
    <router-link
      to="/appHome"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>我的应用</span>
    </router-link>
    <h1 class="title">复制店铺</h1>
    <div style="min-height: 200px">
      <el-row style="margin: 0 -10px">
        <el-col :span="16" style="padding-left: 10px; padding-right: 10px">
          <div class="box flex" style="padding: 30px 12px">
            <div class="overview" @click="$NavgitorTo('/copyDetail')">
              <i class="el-icon-document-copy"></i>
              <span>复制店铺</span>
            </div>
            <div class="overview" @click="showCopy = true">
              <i class="el-icon-refresh"></i>
              <span>同步店铺</span>
            </div>
          </div>
        </el-col>
        <el-col :span="8" style="padding-left: 10px; padding-right: 10px">
          <div class="box">
            <p class="infoTip">信息提示</p>
            <p class="infoContent">
              1、点击复制店铺，选择需要复制的模块，生成密钥后保存。
            </p>
            <p class="infoContent">
              2、打开目标店铺，点击同步店铺，输入源店铺的密钥，即可复制成功。
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
    <default-dialog
      title="同步店铺"
      :visible.sync="showCopy"
      :setWidth="540 + 'px'"
      @toConfirm="Copy"
    >
      <div class="dialog">
        <h4>请输入密钥</h4>
        <div>
          密钥：<el-input
            v-model="scrate"
            style="width: 363px"
            placeholder="请输入密钥"
          ></el-input>
        </div>
        <p>同步店铺将会覆盖原有的物流设置，重复商品，其余数据均不会替换。</p>
        <!-- <p>
          <el-checkbox v-model="isCoverProduct"
            >使用同步中的商品替换系统重复的商品。</el-checkbox
          >
        </p> -->
      </div>
    </default-dialog>
    <default-dialog
      title="即将同步店铺"
      :visible.sync="showCopyDetail"
      :setWidth="540 + 'px'"
      @toConfirm="CheckCopy"
    >
      <div>
        <p>
          您本次导入将会同步{{ detail.categoryCount||0 }}个分类，{{
            detail.productCount||0
          }}个商品，{{ detail.repliesCount||0 }}条商品评论，{{
            detail.pageBoardCount||0
          }}个自定义页面，{{ detail.shippingCount||0 }}条物流设置。
        </p>
        <p>本次同步覆盖您原有的所有物流设置和重复产品，是否执行导入？</p>
      </div>
    </default-dialog>
  </div>
</template> 
<script>
import { copy, copyDetail } from "@/api/copyStore";
import DefaultDialog from "@/components/defaultDialog.vue";
export default {
  components: {
    DefaultDialog,
  },
  data() {
    return {
      showCopy: false,
      scrate: "",
      isCoverProduct: false,
      showCopyDetail: false,
      detail: {},
    };
  },
  methods: {
    Copy: function () {
      if (this.scrate) {
        copyDetail({
          key: this.scrate,
        }).then((res) => {
          this.showCopy = false;
          this.showCopyDetail = true;
          this.detail = res.data; 
        });
      } else {
        this.$message.warning("请输入密钥");
      }
    },
    CheckCopy: function () {
      let par = {
        isCoverProduct: Number(this.isCoverProduct),
        key: this.scrate,
      };
      copy(par).then((res) => {
        if (res.status == 500) {
          this.$message.error(res.msg);
        } else {
          this.$message.success("复制成功");
          this.showCopyDetail = false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
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
  .overview {
    width: 318px;
    height: 120px;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #c4cdd5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    i {
      font-size: 36px;
    }
    &:last-child {
      margin-left: 20px;
    }
    &:hover {
      background-color: #e1e6ea;
    }
  }
  .infoContent {
    line-height: 18px;
    font-size: 12px;
    color: #606266;
    &:last-child {
      margin-top: 10px;
    }
  }
  .infoTip {
    color: #1a1d2c;
    font-size: 14px;
    padding-bottom: 14px;
  }
}
.dialog {
  h4 {
    margin-bottom: 10px;
  }
  p {
    margin: 15px 0;
  }
}
</style> 