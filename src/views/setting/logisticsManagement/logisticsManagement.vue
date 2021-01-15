<template>
  <div class="container">
    <router-link
      to="/setting"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>设置</span>
    </router-link>
    <h1 class="title">
      <span> 物流管理 </span>
    </h1>
    <div>
      <el-row>
        <el-col :span="16" class="logistics-container">
          <!-- 活动名称 currencyPlan.length == 0 && logisticsList.length == 0-->
          <div class="box" v-if="false">
            <h3 class="title">物流配送方案</h3>
            <div class="content" style="text-align: center">
              <template v-if="logisticsList == 0">
                <h4 class="title" style="font-weight: normal">
                  暂未设置物流配送方案
                </h4>
                <p class="des">没有可选物流配送方案，客户无法完成订单支付</p>
                <el-button
                  type="primary"
                  style="margin-bottom: 80px"
                  @click="SettingLogistics"
                  >设置物流</el-button
                >
              </template>
            </div>
          </div>
          <template v-else>
            <div class="box">
              <div class="box-title">通用物流</div>
              <div
                class="logistics-box"
                v-for="item in currencyPlan"
                :key="item.id"
              >
                <div class="logistics-box-title">
                  <p>
                    通用
                    <span class="sub-title"
                      >全部商品（不包含在自定义物流中的商品）</span
                    >
                    <span
                      class="option textBtn not-pd"
                      @click="EditLogistics(0, item.id)"
                      >编辑</span
                    >
                  </p>
                  <div class="logistics-box-content">
                    <span class="logistics-name">{{ item.count }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="box"
              :class="logisticsList.length == 0 ? 'box-no-content' : ''"
            >
              <div class="box-title">
                <span style="flex: 1">自定义物流</span>
                <span
                  class="option textBtn not-pd"
                  @click="showAddCustom = true"
                  >创建自定义物流</span
                >
              </div>
              <template v-if="logisticsList.length > 0">
                <div
                  class="logistics-box"
                  v-for="item in logisticsList"
                  :key="item.id"
                >
                  <div class="logistics-box-title">
                    <p>
                      {{ item.name }}
                      <span class="product-num"></span>
                      <span class="option textBtn not-pd">编辑</span>
                    </p>
                  </div>
                  <div class="logistics-box-content">
                    <span>{{ item.count }}</span>
                  </div>
                </div>
              </template>
              <div
                v-else
                class="common-logistics-box-content customer-logistics-no-content"
              >
                暂无自定义物流，点击“创建”按钮为特定的商品添加自定义物流方案
              </div>
            </div>
          </template>
        </el-col>
        <el-col :span="8">
          <div class="box-right">
            <p class="infoTip">温馨提示</p>
            <p class="infoContent">
              1.设置店铺可支持的物流配送地区，以及在订单结账页中，提供可供客户选择的物流配送方案。
            </p>
            <p class="infoContent" style="margin-top: 14px">
              2.没有设置物流配送的国家或地区，客户下单时将无法选择这些国家或地区。
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="增加自定义物流" :visible.sync="showAddCustom">
      <el-form :model="formData">
        <el-form-item
          label="名称"
          prop="name"
          :rules="{ require: true, tagget: 'blur' }"
        >
          <el-input
            v-model="formData.name"
            placeholder="自定义物流名称"
            maxlength="100"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="showAddCustom = false">取消</el-button>
        <el-button @click="CreateCustom">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template> 
<script>
import { getPlan, createShipping } from "@/api/logistics";
export default {
  data() {
    return {
      formData: {
        name: "",
      },
      currencyPlan: [],
      logisticsList: [],
      showAddCustom: false,
    };
  },
  created() {
    let par = {
      page: 0,
      size: 10,
    };
    getPlan(par).then((res) => {
      res.map((v) => {
        if (v.type == 0) {
          this.currencyPlan.push(v);
        } else {
          this.logisticsList.push(v);
        }
      });
    });
  },
  methods: {
    SettingLogistics: function () {
      this.$router.push({
        path: "/settingLogistics",
        query: {
          status: 0,
          init: true,
        },
      });
    },
    CreateCustom: function () {
      let par = { name: this.formData.name, type: 1 };
      createShipping(par).then((res) => {
        console.log(res);
      });
      this.showAddCustom = false;
    },
    EditLogistics: function (type, id) {
      this.$router.push({
        path: "/commonLogistics",
        query: {
          status: type,
          id: id,
        },
      });
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
  .title {
    flex: 1;
    line-height: 40px;
  }
}
/deep/.el-row {
  margin: 0 -10px;
  .el-col {
    padding: 0 10px;
  }
}
.logistics-container {
  .box {
    padding-bottom: 0;
    .box-title {
      height: 60px;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      color: #212741;
      margin: -12px -12px 0;
      padding: 0 20px;
      box-sizing: border-box;
      font-weight: 600;
    }
  }
  .logistics-box {
    border-top: 1px solid #dcdfe6;
    margin: 0 -12px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 20px 20px 20px 30px;
    .logistics-box-title {
      margin-bottom: 0;
    }
    .sub-title {
      font-size: 12px;
      margin-left: 8px;
      color: #a4a8b4;
    }
    .option {
      padding: 0;
      text-decoration: underline;
      float: right;
    }
    .logistics-box-content {
      margin-top: 12px;
    }
    .logistics-name {
      font-size: 12px;
      color: #797d8c;
      margin-right: 12px;
      margin-bottom: 12px;
    }
  }
}
.textBtn {
  padding: 10px 0;
  color: #273a8a;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  text-decoration: underline;
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
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 12px;
  }
  .content {
    .title {
      margin-top: 80px;
      line-height: 22px;
      height: 20px;
      font-size: 16px;
    }
    .des {
      color: #5e7185;
      font-size: 12px;
      margin: 12px 0 28px;
    }
  }
}
.box-right {
  margin-bottom: 20px;
  padding: 12px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  overflow: hidden;
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
.pageSaveBtn {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
  text-align: right;
  font-size: 0;
  margin-bottom: 40px;
}
/deep/.el-input-group__prepend {
  background: #fff;
}
/deep/ .el-icon-delete-solid {
  font-size: 18px;
  line-height: 38px;
  cursor: pointer;
}
/deep/.el-input-group__append {
  background: #fff;
}
</style>  