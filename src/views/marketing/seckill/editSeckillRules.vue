<template>
  <div class="container">
    <router-link
      to="/seckill"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>秒杀</span>
    </router-link>
    <h1>编辑秒杀规则</h1>
    <div class="box">
      <el-form
        :model="ruleForm"
        label-width="150px"
        label-position="left"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="商品">
          <div class="product">
            <el-image class="img" :src="productDetail.image"></el-image>
            <div class="info">
              <p>{{ productDetail.storeName }}</p>
              <p>{{ productDetail.skuCode }}</p>
              <p>{{ productDetail.cateId }}</p>
              <p>价格：{{ currency.s + $toDecimal2(productDetail.price) }}</p>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="所属用户">
          <el-select
            style="width: 100%"
            v-model="detail.levelId"
            clearable
            @clear="detail.levelId = ''"
            placeholder="请选择所属用户"
          >
            <el-option label="游客与会员" :value="0"></el-option>
            <el-option
              :label="item.explain"
              :value="item.id"
              v-for="item in groupIdList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="buyNum">
          <template slot="label">
            <el-checkbox
              label="购买件数"
              v-model="ruleForm.isCheckBuy"
              :true-label="1"
              :false-label="0"
            ></el-checkbox>
          </template>
          <el-input
            v-model="ruleForm.buyNum"
            placeholder="请输入购买件数"
            @blur="ruleForm.buyNum = $IsNaN(ruleForm.buyNum)"
          ></el-input>
        </el-form-item>
        <el-form-item prop="prePrice">
          <template slot="label">
            <el-checkbox
              label="秒杀预付款"
              v-model="ruleForm.isCheckPre"
              :true-label="1"
              :false-label="0"
            ></el-checkbox>
          </template>
          <el-input
            v-model="ruleForm.prePrice"
            placeholder="请输入秒杀预付款"
            @blur="ruleForm.prePrice = $toDecimal2(ruleForm.prePrice)"
          ></el-input>
        </el-form-item>
        <el-form-item prop="shareNum">
          <template slot="label">
            <el-checkbox
              label="分享次数"
              v-model="ruleForm.isCheckShare"
              :true-label="1"
              :false-label="0"
            ></el-checkbox>
          </template>
          <el-input
            v-model="ruleForm.shareNum"
            placeholder="该用户需要分享多少次该秒杀商品才能满足享受该商品的秒杀资格"
            @blur="ruleForm.shareNum = $IsNaN(ruleForm.shareNum)"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="pageSaveBtn">
      <el-button @click="$NavgitorTo('/seckill')">取消</el-button>
      <el-button
        type="primary"
        @click="Save"
        v-loading="disabled"
        :disabled="disabled"
        >保存</el-button
      >
    </div>
  </div>
</template> 
<script>
import { getLevels } from "@/api/coupon";
import {
  getSeckillRules,
  editSeckillRules,
  addSeckillRules,
} from "@/api/seckill";
export default {
  data() {
    var required = (rule, value, callback) => {
      console.log(value);
      switch (rule.fullField) {
        case "buyNum":
          console.log(this.ruleForm.isCheckBuy);
          console.log(Boolean(value));
          if (this.ruleForm.isCheckBuy == 1 && Boolean(value) == false) {
            return callback(new Error("请输入购买件数，不能为空且必须大于0"));
          }
          break;
        case "prePrice":
          if (this.ruleForm.isCheckPre && !value) {
            return callback(new Error("请输入预付款价格，不能为空且必须大于0"));
          }
          break;
        case "shareNum":
          if (this.ruleForm.isCheckShare && !value) {
            return callback(new Error("请输入分享次数，不能为空且必须大于0"));
          }
          break;
      }
      callback();
    };
    return {
      detail: {
        levelId: 0,
        seckillId: 0,
        rule: {},
      },
      rules: {
        buyNum: [
          {
            validator: required,
            target: ["change", "blur"],
          },
        ],
        prePrice: [
          {
            validator: required,
            target: ["change", "blur"],
          },
        ],
        shareNum: [
          {
            validator: required,
            target: ["change", "blur"],
          },
        ],
      },
      ruleForm: {
        buyNum: "",
        isCheckBuy: 0,
        isCheckPre: 0,
        isCheckShare: 0,
        prePrice: "",
        shareNum: "",
      },
      groupIdList: [], // 会员分组
      productDetail: {},
      disabled: false,
    };
  },
  created() {
    let storeId = localStorage.getItem("storeId");
    this.detail.storeId = Number(storeId);
    // 获取规则详情
    getSeckillRules(this.$route.query.id).then((res) => {
      if (res.data) {
        // 修改
        this.detail = res.data;
        this.ruleForm = res.data.rule;
      }
      let productDetail = JSON.parse(localStorage.getItem("seckillProduct"));
      this.detail.seckillId = productDetail.id;
      this.productDetail = productDetail;
    });
    // 获取会员组
    getLevels().then((res) => {
      this.groupIdList = res.data;
    });
  },
  methods: {
    Save: function () {
      this.disabled = true;
      let par = this.detail;
      par.rule = { ...this.ruleForm };
      console.log(par);
      this.$refs.form.validator((e) => {
        if (e) {
          if (par.id) {
            editSeckillRules(par)
              .then((res) => {
                if (res) {
                  this.$message.success("修改成功");
                  this.disabled = false;
                  this.$router.push("/seckill");
                }
              })
              .catch((res) => {
                this.disabled = false;
              });
          } else {
            addSeckillRules(par)
              .then((res) => {
                if (res) {
                  this.$message.success("新增成功成功");
                  this.disabled = false;
                  this.$router.push("/seckill");
                }
              })
              .catch((res) => {
                this.disabled = false;
              });
          }
        }
      });
      // return false;
    },
  },
  destroyed() {
    if (localStorage.getItem("seckillProduct")) {
      localStorage.removeItem("seckillProduct");
    }
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
  display: flex;
  justify-content: space-between;
}
.box {
  margin-bottom: 20px;
  padding: 16px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  overflow: hidden;
}
.product {
  display: flex;
  .img {
    width: 100px;
    height: 100px;
    margin-right: 50px;
  }
  .info {
    height: 100px;
    p {
      width: 100%;
      line-height: 14px;
      color: #666666;
      &:first-child {
        margin-top: 9px;
      }
      margin-bottom: 9px;
    }
  }
}
/deep/.el-form-item {
  display: flex;
  align-items: center;
  /deep/.el-form-item__content {
    flex: 1;
    margin-left: 0 !important;
  }
}
/deep/.el-form-item__label {
  color: #1a1d2c;
  font-weight: 400;
}
.pageSaveBtn {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
  text-align: right;
  font-size: 0;
  margin-bottom: 40px;
}
</style>  