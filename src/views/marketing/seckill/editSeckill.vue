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
    <h1>{{ detail.id ? "编辑" : "新增" }}秒杀</h1>
    <div class="box">
      <el-form
        :model="detail"
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
              <p>价格：{{ currency.s + $toDecimal2imal2(productDetail.price) }}</p>
            </div>
          </div>
        </el-form-item>
        <!-- <el-form-item label="所属会员组">
          <el-select
            style="width: 100%"
            v-model="detail.memberGroupIds"
            clearable
            @clear="detail.memberGroupIds = ''"
            placeholder="请选择所属会员组"
          >
            <el-option
              :label="item.explain"
              :value="item.id"
              v-for="item in groupIdList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="开始时间" prop="beginTime">
          <el-date-picker
            style="width: 100%"
            size="medium"
            v-model="detail.beginTime"
            type="date"
            placeholder="请选择活动开始时间"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="timeOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            style="width: 100%"
            size="medium"
            v-model="detail.endTime"
            type="date"
            placeholder="不填则永久有效"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="timeOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="参与商品数量" prop="toStock">
          <el-input
            v-model="detail.toStock"
            placeholder="请输入参与商品数量" 
          ></el-input>
        </el-form-item>
        <el-form-item label="每人限购次数" prop="num">
          <el-input
            v-model="detail.num"
            placeholder="请输入每人限购次数"
          ></el-input>
        </el-form-item>
        <el-form-item label="秒杀类型">
          <div style="display: flex; justify-content: space-between">
            <el-select v-model="detail.priceType">
              <el-option label="秒杀价格" :value="0"></el-option>
              <el-option label="秒杀折扣" :value="1"></el-option>
            </el-select>
            <el-form-item prop="price">
              <el-input
                v-model="detail.price"
                style="width: 720px; float: right"
                placeholder="请输入秒杀价格或折扣"
              ></el-input>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="秒杀库存" prop="stock">
          <el-input
            v-model="detail.stock"
            placeholder="请输入秒杀库存"
          ></el-input>
        </el-form-item>
        <el-form-item label="秒杀排序">
          <el-input
            v-model="detail.couponNum"
            placeholder="请输入秒杀排序"
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
import { addSeckill, editSeckill } from "@/api/seckill";
export default {
  data() {
    return {
      detail: {
        beginTime: "",
        endTime: "",
        num: 1,
        price: '0.00',
        priceType: 0,
        productId: 0,
        sort: 0,
        stock: 0,
        toStock: 0,
      },
      rules: {
        beginTime: [
          {
            required: true,
            message: "请选择开始时间",
            trigger: ["change", "blur"],
          },
        ],
        endTime: [
          {
            required: true,
            message: "请选择结束时间",
            trigger: ["change", "blur"],
          },
        ],
        num: [
          {
            required: true,
            message: "请输入限购数量",
            trigger: ["change", "blur"],
          },
        ],
        price: [
          {
            required: true,
            message: "请输入秒杀价格或折扣",
            trigger: ["change", "blur"],
          },
        ],
        stock: [
          {
            required: true,
            message: "请输入秒杀库存",
            trigger: ["change", "blur"],
          },
        ],
        toStock: [
          {
            required: true,
            message: "请输入参与商品数量",
            trigger: ["change", "blur"],
          },
        ],
      },
      showSelectProduct: false,
      // groupIdList: [], // 会员分组   
      timeOptions: {
        disabledDate(time) {
          return time.getTime() < new Date().getTime() - 8.64e7;
        },
      },
      productDetail: {},
      disabled: false,
    };
  },
  created() {
    if (localStorage.getItem("seckillProduct")) {
      let productDetail = JSON.parse(localStorage.getItem("seckillProduct"));
      this.detail.productId = productDetail.id;
      this.productDetail = productDetail;
    }
    // // 获取会员组
    // getLevels().then((res) => {
    //   this.groupIdList = res.data;
    // });
  },
  methods: {
    Save: function () {
      this.disabled = true;
      this.$refs.form.validate((e) => {
        if (e) {
          if (this.detail.id) {
            editSeckill(this.detail).then((res) => {
              this.$message.success("修改成功");
              this.disabled = false;
            });
          } else {
            addSeckill(this.detail).then((res) => {
              this.$message.success("添加成功");
              this.disabled = false;
            });
          }
        } else {
          this.$message.error("请完善表单数据");
          this.disabled = false;
        }
      });
    },
  },
  destroyed() {
    // if(localStorage.getItem('seckillProduct')){
    //   localStorage.removeItem('seckillProduct')
    // }

    console.log("销毁");
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