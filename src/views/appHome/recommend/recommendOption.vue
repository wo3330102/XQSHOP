<template>
  <div class="container">
    <router-link
      to="/recommend"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>返回</span>
    </router-link>
    <h1 class="title">推荐商品配置</h1>
    <div style="min-height: 200px">
      <el-row style="margin: 0 -10px">
        <el-col :span="16" style="padding-left: 10px; padding-right: 10px">
          <div class="box">
            <h3 class="title">
              <span>
                显示数量
                <span style="color: #606266; font-weight: normal"
                  >（详情页展示相应数量的推荐商品）</span
                >
              </span>
              <span class="option">效果预览</span>
            </h3>
            <div style="margin-bottom: 20px">
              <el-select v-model="detail.showNum" placeholder="请选择显示数量">
                <el-option :label="6" :value="6"></el-option>
                <el-option :label="12" :value="12"></el-option>
                <el-option :label="20" :value="20"></el-option>
              </el-select>
            </div>
            <h3 class="title">
              <span>
                标题
                <span class="subTitle">{{detail.title?detail.title.length:"0"}}/40</span>
              </span>
            </h3>
            <el-input style="margin-bottom: 20px" v-model="detail.title" placeholder="请输入标题" maxlength="40"></el-input>
            <h3 class="title">
              <span>
                商品名显示方式
                <span style="color: #606266; font-weight: normal"
                  >（推荐商品列表中显示）</span
                >
              </span>
            </h3>
            <div style="margin-bottom: 20px">
              <el-radio-group v-model="detail.nameShowWay">
                <el-radio :label="0">不显示</el-radio>
                <el-radio :label="1">显示两行</el-radio>
                <el-radio :label="2">显示一行</el-radio>
              </el-radio-group>
            </div>
            <h3 class="title">
              <span>
                加购按钮
                <span style="color: #606266; font-weight: normal"
                  >（推荐商品下方显示快速加购按钮）</span
                >
              </span>
            </h3>
            <div style="margin-bottom: 20px">
              <el-radio-group v-model="detail.addButton">
                <el-radio :label="0">显示</el-radio>
                <el-radio :label="1">不显示</el-radio> 
              </el-radio-group>
            </div>
            <h3 class="title">
              <span>
                折扣标签
                <span style="color: #606266; font-weight: normal"
                  >（商品图上显示折扣标签）</span
                >
              </span>
            </h3>
            <div>
              <el-radio-group v-model="detail.discountLabel">
                <el-radio :label="0">显示</el-radio>
                <el-radio :label="1">不显示</el-radio> 
              </el-radio-group>
            </div>
          </div>
          <div class="box">
            <h3 class="title"> 
              <span style="font-weight: 600;">
                不展示推荐列表的商品 
                <span style="color:rgb(151, 153, 162); font-weight: normal"
                  >（以下商品将不会在商品详情页中展示推荐商品模块）</span
                >
              </span>
            </h3>
            <p style="position:relative;" @click.stop="ShowDiglog">
              <el-select style="width:100%" value="" placeholder="请选择一个或多个商品"></el-select>
              <span style="position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; cursor: pointer;"></span>
            </p>
            <div
              class="discountTargetList"
              v-if="detail.noRecommendId && detail.noRecommendId.length > 0"
            >
              <table>
                <tr v-for="(item, index) in detail.noRecommendId" :key="item.id">
                  <td class="img">
                    <div
                      class="small-img"
                      :style="{ backgroundImage: 'url(' + item.image + ')' }"
                      v-show="item.image"
                    ></div>
                  </td>
                  <td class="text">
                    <span>{{ item.title || item.storeName }}</span>
                  </td>
                  <td class="option">
                    <i class="el-icon-delete-solid" @click="Del(index)"></i>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="pageSaveBtn">
        <el-button type="primary" @click="Save">保存</el-button>
      </div>
    </div>
    <!-- 选择商品 -->
    <el-dialog title="请选择商品" width="640px" :visible.sync="shopDialog">
      <div class="search-conditions">
        <!-- 商品标签
            <el-select
              v-model="requestParams.shopLabelValue" 
              placeholder="请选择标签"
              style="width: 200px"
              @change="
                () => {
                  table = [];
                  initData();
                }
              "
            >
              <el-option
                v-for="item in shopLabelList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select> -->
        <!-- 商品分类 -->
        <el-select
          v-model="requestParams.tagId"
          placeholder="请选择分类"
          style="width: 200px;margin-right:10px;"
          clearable
          @change="
            () => {
              table = [];
              initData();
            }
          "
        >
          <el-option
            v-for="item in shopCategoryList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-input
          style="width: 380px"
          v-model="shopContent"
          placeholder="请输入内容"
        >
          <el-button slot="append" @click="Search">查询</el-button>
        </el-input>
      </div>
      <el-table
        v-if="table.length > 0"
        :data="table"
        style="width: 100%;"
        empty-text
        v-el-table-infinite-scroll="load"
        infinite-scroll-delay="200"
        @selection-change="(e) => (selectItem = e)"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="left" width="80" prop="image" label="商品图片">
          <template slot-scope="scope">
            <span
              class="small-img"
              :style="{ backgroundImage: 'url(' + scope.row.image + ')' }"
            ></span>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          prop="storeName"
          label="商品名称"
        ></el-table-column>
      </el-table>
      <div slot="footer">
        <span style="float: left; line-height: 41px"
          >总共{{ tableTotal }}个商品， 已选择{{ selectItem.length }}个</span
        >
        <el-button @click="shopDialog = false">取消</el-button>
        <el-button type="primary" @click="CheckSelectItem">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template> 
<script>
import elTableInfiniteScroll from "el-table-infinite-scroll";
import { getCates } from "@/api/yxStoreCategory";
import { get } from "@/api/yxStoreProduct";
import {getConfig,updateConfig } from "@/api/yxStoreProductRecommend"; 
export default {
  data() {
    return { 
      detail: { 
        showNum:6,  // 展示数量
        title:'', // 标题
        nameShowWay:0,
        addButton:0,
        discountLabel:0,
        noRecommendId:[],
      },
      shopDialog: false,
      requestParams: {
        page: 0,
        size: 30,
        tagId: "",
      },
      shopCategoryList: [],
      shopContent: "",
      table: [],
      tableTotal: "",
      selectItem: [],
    };
  },
  directives: {
    "el-table-infinite-scroll": elTableInfiniteScroll,
  },
  created() {
    getCates().then(res=>{
      this.shopCategoryList = res.content
    })
    getConfig().then(res=>{
        console.log(res);
        res.noRecommendId = res.productRecommendInfoVo
        this.detail = res;
      })
  },
  methods: { 
    // 显示对话框
    ShowDiglog: function () {
      this.shopDialog = true;
      this.table = [];
      this.initData();
    },
    // 加载表单数据
    initData: function () { 
      get(this.requestParams).then((res) => { 
        let arr = this.table.concat(res.content);
        if (arr.length <= res.totalElements) {
          this.table = arr;
        }
        this.tableTotal = res.totalElements;
      });
    },
    // 搜索
    Search: function () {
      this.requestParams.storeName = this.shopContent;
      this.table = [];
      this.initData();
    },
    // 加载更多
    load: function (res) {
      this.requestParams.page += 1;
      this.initData();
    },
    // 确认选中
    CheckSelectItem: function () {
      this.shopDialog = false;
      let arr = [];
      this.selectItem.map((i) => {
        let obj = {
          id: i.id,
          image: i.image,
          title: i.storeName,
        };
        arr.push(obj);
      });
      if (this.detail.noRecommendId && this.detail.noRecommendId.length > 0) {
        arr.map((i) => {
          let bool = true;
          this.detail.noRecommendId.map((j) => {
            if (JSON.stringify(i) == JSON.stringify(j)) {
              bool = false;
            }
          });
          if (bool) {
            this.detail.noRecommendId.push(i);
          }
        });
      } else {
        this.detail.noRecommendId = arr;
      }
    },
    // 删除选中商品
    Del: function (index) {
      console.log(this.detail.noRecommendId);
      this.$nextTick(() => {
        this.detail.noRecommendId.splice(index, 1);
      });
    },
    Save: function () {
      let that = this; 
      let arr = [];
      this.detail.noRecommendId.map(i=>{
        arr.push(i.id);
      })
      let par = {
        ...this.detail,
        noRecommendId:arr.toString() 
      } 
      delete par.productRecommendInfoVo
      updateConfig(par).then(res=>{
        that.$message.success("修改成功"); 
      })   
    },
  },
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
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
  .title {
    color: #1a1d2c;
    font-size: 14px;
    font-weight: initial;
    padding-bottom: 12px;
    .option {
      font-size: 14px;
      color: #273a8a;
      float: right;
      cursor: pointer;
      text-decoration: underline;
      font-weight: 400;
    }
    .subTitle{
      font-size: 12px;
    color: #c1c2cc;
    float: right;
    font-weight: 400;
    }
  }
}
.discountTargetList {
  width: 100%;
  padding: 0 12px;
  line-height: 23px;
  margin: 2px 0;
  position: relative;
  box-sizing: border-box;
  table {
    width: 100%;
    position: relative;
    tr {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ececec;
      .img {
        width: 60px;
      }
      .text {
        padding-left: 12px;
        flex: 1;
      }
      .option {
        width: 40px;
        text-align: center;
        color: #c1c2cc;
      }
      i:hover {
        cursor: pointer;
      }
      td {
        padding: 10px 0;
      }
      &:last-child {
        border: none;
      }
    }
  }
  // &::before {
  //   content: "";
  //   left: -12px;
  //   right: -12px;
  //   display: block;
  //   position: absolute;
  //   border-top: 1px solid #eee;
  // }
} 
</style> 