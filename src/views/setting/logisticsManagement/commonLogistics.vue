<template>
  <div class="container">
    <router-link
      to="/logisticsManagement"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>物流管理</span>
    </router-link>
    <h1 class="title">
      <span> 通用物流 </span>
    </h1>
    <div>
      <el-row>
        <el-col :span="16">
          <div class="box p0">
            <div class="product-title-box p20">
              <p class="product-title">
                全部商品
                <span class="light-title">
                  (不包含在自定义物流方案中的商品，新添加的商品将自动加入到通用物流中)
                </span>
              </p>
              <p class="product-sub-title">
                若要针对特定的商品添加自定义物流方案，请在
                <span class="textBtn not-pd">物流管理</span>
                中创建自定义物流
              </p>
            </div>
            <div class="product-container">
              <table class="product-table">
                <tbody>
                  <tr v-for="(item, index) in commodityList" :key="item.id">
                    <td style="min-width: 44px">{{ index + 1 }}</td>
                    <td>
                      <span
                        class="small-img"
                        :style="{ backgroundImage: 'url(' + item.image + ')' }"
                      ></span>
                    </td>
                    <td>
                      <span class="desc">{{ item.tagName }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="pagination">
                <el-pagination
                  @current-change="CurrentChange"
                  :current-page.sync="currentPage"
                  background
                  :page-size="requestParams.size"
                  layout="total, prev, pager, next"
                  :total="total"
                ></el-pagination>
              </div>
            </div>
          </div>
          <div class="logistics-programme">
            <p class="logistics-programme-title">物流方案</p>
            <span class="fr textBtn no-pd">添加物流方案</span>
          </div>
          <div
            class="box list p0"
            v-for="(item, index) in logisticsPlan"
            :key="index"
          >
            <h3 class="title ptrl-20">
              全球
              <span class="option" style="margin-left: 10px">删除</span>
              <span class="option" @click="EditPlan">编辑</span>
            </h3>
            <p class="desc">{{ item.countries_list }}</p>
            <table class="express-list">
              <tr v-for="(plan, index) in item.expresses" :key="index">
                <td>
                  <p>{{ plan.title }}</p>
                  <p>
                    <template v-if="plan.type == 1">
                      下单金额：${{ plan.minUnit }}
                      {{ plan.maxUnit ? "- $" + plan.maxUnit : "and up" }}
                    </template>
                    <template v-else>
                      下单重量：{{ plan.minUnit }}g
                      {{ plan.maxUnit ? "- " + plan.maxUnit + "g" : "and up" }}
                    </template>
                  </p>
                </td>
                <td>
                  {{ Boolean(plan.isFree) ? "免运费" : "$" + plan.price}}
                </td>
              </tr>
            </table>
          </div>
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
  </div>
</template> 
<script>
import { get } from "@/api/yxStoreProduct";
export default {
  data() {
    return {
      status: 1,
      requestParams: {
        page: 0,
        size: 6,
      },
      total: 0,
      currentPage: 1,
      commodityList: [],
      logisticsPlan: [
        {
          title: "全球",
          countries_list: "全球",
          expresses: [
            {
              title: "测试金额",
              price: 1,
              minUnit: 0.0,
              maxUnit: 10.0,
              isFree: 0,
              type: 1,
            },
            {
              title: "测试金额",
              price: 0,
              minUnit: 10.1,
              maxUnit: "",
              isFree: 1,
              type: 1,
            },
            {
              title: "测试重量",
              price: 0,
              minUnit: 10.1,
              maxUnit: "",
              isFree: 1,
              type: 2,
            },
          ],
        },
      ],
    };
  },
  created() {
    
    get(this.requestParams).then((res) => {
      console.log(res);
      this.commodityList = res.content;
      this.total = res.totalElements;
    });
  },
  methods: {
    // 分页选择
    CurrentChange: function (e) {
      this.currentPage = e;
      this.params.page = e - 1;
      this.getData();
    },
    // 编辑当前物流
    EditPlan:function(){

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
.product-title-box {
  border-bottom: 1px solid #dcdfe6;
  .product-title {
    font-weight: 600;
    color: #1a1d2c;
  }
  .light-title {
    font-weight: 400;
    font-size: 12px;
    color: #a4a8b4;
  }
  .product-sub-title {
    margin-top: 8px;
    font-size: 12px;
    color: #5e7185;
    .textBtn {
      font-size: 12px;
    }
  }
}
.product-table {
  width: 100%;
  tr {
    td {
      padding: 12px 0;
      border-bottom: 1px solid #f4f4f4;
      .desc {
        height: 44px;
        display: -webkit-box;
        overflow: hidden;
        line-height: 22px;
        max-width: 400px;
        width: 400px;
      }
      &:first-child {
        padding-left: 20px;
      }
      &:last-child {
        padding-left: 20px;
        padding-right: 20px;
      }
    }
  }
}
.pagination {
  padding: 14px 0;
  text-align: center;
}
.logistics-programme {
  height: 36px;
  margin-bottom: 12px;
  margin-top: 32px;
  display: flex;
  align-items: center;
  .logistics-programme-title {
    font-size: 18px;
    line-height: 36px;
    color: #1a1d2d;
    flex: 1;
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
.textBtn.not-pd {
  padding: 0;
}
.list {
  color: #5e7185;
  font-size: 12px;
  .desc {
    border-bottom: 1px solid #dcdfe6;
    padding: 0 20px 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 10px;
  }
}
.express-list {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  tr {
    border-bottom: 1px solid #dcdfe6;
  }
  td {
    padding: 20px 0;
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
    &:first-child {
      padding-left: 30px;
      p {
        &:first-child {
          color: rgb(36, 43, 74);
          font-size: 14px;
          margin-bottom: 6px;
          line-height: 20px;
        }
        &:last-child {
          color: rgb(121, 125, 140);
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
    &:last-child {
          padding-right: 20px;
      text-align: right;
      color: rgb(30, 35, 57);
      font-size: 14px;
      line-height: 20px;
    }
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
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 12px;
    color: #1a1d2c;
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
.search-conditions {
  display: flex;
  justify-content: space-between;
}
.p0 {
  padding: 0 !important;
}
.p20 {
  padding: 20px !important;
}
.fr {
  float: right;
}
.ptrl-20 {
  padding: 20px 20px 0 !important;
}
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