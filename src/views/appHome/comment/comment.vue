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
    <h1 class="title">
      <span class="text">
        商品评论
        <span
          class="sail-app-status-tag"
          :class="
            plugStatus == 1
              ? 'sail-app-status-tag-open'
              : 'sail-app-status-tag-close'
          "
          >{{ plugStatus == 1 ? "已开启" : "未开启" }}</span
        >
      </span>
      <span class="options">
        <el-button @click.stop="IsOpen">{{plugStatus == 1 ? "关闭" : "开启"}}</el-button>
        <!-- <el-button>配置</el-button> -->
      </span>
    </h1>
    <div class="content">
      <div class="tab">
        <div
          v-for="(item, index) in nav"
          :key="item.id"
          :class="active == index ? 'active' : ''"
          @click="ChangeActive(index)"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="conditions">
        <!-- 筛选商品 -->
        <template v-if="active === 0">
          <el-select
            v-model="requestParams.isReply"
            clearable
            placeholder="请选择"
            style="margin-right: 10px; width: 210px"
          >
            <el-option
              v-for="item in typeList"
              :key="item.status"
              :label="item.label"
              :value="item.status"
            ></el-option>
          </el-select>
          <div class="search-box">
            <el-input
              v-model="searchVal"
              placeholder="搜索商品"
              @change="Search"
            >
              <el-button slot="append" @click="Search">搜索</el-button>
            </el-input>
          </div>
        </template>
        <!-- 筛选星级 -->
        <template v-else >
          <span
            @change="CheckAll"
            ><el-checkbox
              :indeterminate="!isCheckAll"
              v-model="isCheckAll"
              @change="CheckAll"
              >全选</el-checkbox
            ></span
          >
          <el-checkbox-group
            v-model="checkedCities"
            @change="
              (e) => {
                requestParams.productScore = e.toString();
              }
            "
          >
            <el-checkbox
              v-for="start in startList"
              :label="start.value"
              :key="start.value"
              >{{ start.label }}</el-checkbox
            >
          </el-checkbox-group>
          <div class="search-box">
            <el-input
              v-model="searchVal"
              placeholder="搜索评论内容"
              @change="Search"
            >
              <el-button slot="append" @click="Search">搜索</el-button>
            </el-input>
          </div>
        </template>
      </div>
      <table-tem
        :selection="isSelection"
        :optionList="optionList"
        :requestUrl="requestUrl"
        :requestParams="requestParams"
        :tableHeader="tableHeader"
        :isRefresh="isRefresh"
        :default-sort="{ prop: 'num', order: 'descending' }"
        @rowClick="ToDetail"
        @BatchOption="BatchOption"
        @resultData="InitStatus"
      >
        <el-table-column
          v-for="(item, index) in tableHeader"
          :key="index"
          :width="item.width ? item.width : ''"
          :prop="item.prop ? item.prop : ''"
          :label="item.label ? item.label : ''"
          :align="item.align ? item.align : ''"
          :sortable="item.sortable"
        >
          <template slot-scope="scope">
            <!-- 图片 -->
            <span
              v-if="
                item.prop == 'image' &&
                requestUrl == '/api/yxStoreProductReplyAll'
              "
              class="small-img"
              :style="{ backgroundImage: 'url(' + scope.row.image + ')' }"
            >
            </span>
            <!-- 图片 -->
            <span
              v-else-if="
                item.prop == 'image' &&
                requestUrl == '/api/yxStoreProductReply' &&
                scope.row.pics
              "
              class="small-img"
              :style="{
                backgroundImage: 'url(' + scope.row.pics + ')',
              }"
            >
            </span>
            <!-- 名称 -->
            <span
              v-else-if="
                item.prop == 'storeName' &&
                requestUrl == '/api/yxStoreProductReply'
              "
            >
              {{ new Object(scope.row.storeProduct).storeName }}
            </span>
            <!-- 评分 -->
            <template v-else-if="item.prop == 'num'">
              <el-rate
                v-model="scope.row.productScore"
                disabled
                text-color="#ff9900"
                style="display: inline-block"
              >
              </el-rate>
              <span
                class="text"
                v-if="requestUrl == '/api/yxStoreProductReplyAll'"
                >{{ scope.row.num }}条评论</span
              >
            </template>
            <!-- 状态 -->
            <template v-else-if="item.prop == 'isShowReply'">
              <el-switch
                v-model="scope.row.isShowReply"
                @click.native.stop="Option(scope.row, 'status')"
                :active-value="1"
                :inactive-value="0"
                active-color="#34395d"
                inactive-color="#dcdfe6"
              ></el-switch>
            </template>
            <!-- 日期 -->
            <span v-else-if="item.prop == 'createTime'">
              {{
                new Date(Number(scope.row.createTime)).toLocaleDateString()
              }}</span
            >
            <!-- 操作 -->
            <template v-else-if="item.prop == 'option'">
              <template v-if="requestUrl == '/api/yxStoreProductReplyAll'">
                <!-- <span
                  class="textBtn"
                  @click.stop="Option(scope.row, 'important')"
                  >速卖通导入</span
                > -->
                <span class="textBtn" @click.stop="Option(scope.row, 'review')"
                  >预览</span
                >
              </template>
              <template v-else>
                <span class="textBtn" @click.stop="Option(scope.row, 'pass')"
                  >通过</span
                >
                <span class="textBtn" @click.stop="Option(scope.row, 'del')"
                  >删除</span
                >
              </template>
            </template>
            <!-- 原样返回 -->
            <template v-else>
              <span style="margin-right: 9px">{{ scope.row[item.prop] }}</span>
            </template>
          </template>
        </el-table-column>
      </table-tem>
    </div>
    <el-dialog title="导入速卖通评论" :visible.sync="showDialog">
      <div class="product flex">
        <span
          class="small-img"
          :style="{ backgroundImage: 'url(' + itemDetail.pics + ')' }"
        >
        </span>
        <p style="flex: 1; padding-left: 14px">
          {{ new Object(itemDetail.storeProduct).storeName }}
        </p>
      </div>
      <el-input
        v-model="form.url"
        style="margin-top: 22px"
        placeholder="在这里输入速卖通的产品地址（URL）"
      ></el-input>
      <el-checkbox
        style="margin-top: 22px"
        label="使用同一的配置文件"
        v-model="form.sameProfile"
      ></el-checkbox>
      <div class="importSettingsContent" v-if="!form.sameProfile">
        <div class="item">
          <p class="label">
            星级选项
            <el-tooltip placement="right">
              <template slot="content">
                勾选后，则导入时将只会拉取五星和四星的评论，<br />若取消勾选了一项，则拉取时不会导入该星级的评论。
                <br />如果没有勾选五星和四星的评论，则会拉取全部评论。
              </template>
              <i class="el-icon-info"></i
            ></el-tooltip>
          </p>
          <el-checkbox-group v-model="form.startList" @change="ChangeStart">
            <el-checkbox label="1">5星评论</el-checkbox>
            <el-checkbox label="2">4星评论</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="item">
          <p class="label">
            评论选项<span style="font-size: 14px; color: rgb(193, 194, 204)"
              >（至少选择一项）</span
            >
            <el-tooltip placement="right">
              <template slot="content">
                勾选后，则导入时将只会拉取五星和四星的评论，<br />若取消勾选了一项，则拉取时不会导入该星级的评论。
                <br />如果没有勾选五星和四星的评论，则会拉取全部评论。
              </template>
              <i class="el-icon-info"></i
            ></el-tooltip>
          </p>
          <el-checkbox-group v-model="form.commentList" @change="ChangeStart">
            <el-checkbox label="1">图片和文字</el-checkbox>
            <el-checkbox label="2">仅图片</el-checkbox>
            <el-checkbox label="3">仅文字</el-checkbox>
            <el-checkbox label="4">无内容</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="item">
          <p class="label">
            导入评论数<span style="font-size: 14px; color: rgb(193, 194, 204)"
              >（最多300条）</span
            >
          </p>
          <!-- <el-input v-model.number="form.important" size="medium" type="number" max="300" min="1"></el-input> -->
          <el-input
            v-model.number="form.important"
            size="medium"
            type="number"
            max="300"
            min="1"
            placeholder="限制1-300条"
            @blur="TestImportant"
          ></el-input>
        </div>
        <div class="item">
          <p class="label">过滤关键词：</p>
          <div style="display: flex; align-items: center; background: #ffffff">
            <el-tag
              :key="index"
              v-for="(item, index) in form.keyword"
              closable
              :disable-transitions="false"
              @close="form.keyword.splice(index, 1)"
            >
              {{ item }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-model="keyword"
              ref="saveTagInput"
              size="medium"
              placeholder="请在此输入内容并按回车键"
              @keyup.enter.native="AddTag"
            ></el-input>
          </div>
        </div>
        <div class="item" style="margin-bottom: 0">
          <el-checkbox label="1">自动将导入的评论翻译成英语</el-checkbox>
        </div>
      </div>
    </el-dialog>
  </div>
</template> 
<script>
import tableTem from "@/components/tableTem";
import { edit, getCates } from "@/api/yxStoreCategory";
import { reviewComment, del, editMainStatus,isOpen } from "@/api/comment";
export default {
  components: {
    tableTem,
  },
  data() {
    return {
      plugStatus: 1,
      nav: [
        {
          id: 0,
          label: "全部",
        },
        {
          id: 1,
          label: "待审核",
        },
      ],
      active: 0,
      typeList: [
        {
          status: "",
          label: "所有商品",
        },
        {
          status: 1,
          label: "有评论的商品",
        },
        {
          status: 0,
          label: "无评论的商品",
        },
      ],
      searchVal: "",
      requestUrl: "/api/yxStoreProductReplyAll",
      requestParams: {
        isReply: "",
        page: 0,
        size: 30,
        storeName: "",
      },
      isRefresh: 0,
      isSelection: false,
      optionList: [],
      tableHeader: [
        {
          prop: "image",
          width: "80",
          label: "商品列表",
        },
        {
          prop: "storeName",
          label: "",
          width: "460",
        },
        {
          prop: "num",
          label: "评论数",
          // width: "276",
          sortable: true,
          align: "left",
        },
        {
          prop: "isShowReply",
          label: "状态",
          width: "140",
          align: "center",
        },
        {
          prop: "option",
          label: "操作",
          width: "180",
          align: "center",
        },
      ],
      showDialog: false,
      itemDetail: {},
      url: "",
      form: {
        startList: [],
        commentList: [],
        keyword: [],
      },
      keyword: "",
      sameProfile: false,
      isCheckAll: false,
      checkedCities: [],
      startList: [
        {
          value: 5,
          label: "5星",
        },
        {
          value: 4,
          label: "4星",
        },
        {
          value: 3,
          label: "3星",
        },
        {
          value: 2,
          label: "2星",
        },
        {
          value: 1,
          label: "1星",
        },
      ],
    };
  }, 
  methods: {
    // 控制当前店铺评论状态
    IsOpen:function(){
      let status = this.plugStatus == 1?0:1
      let par = {
        isOpen:status
      }
      isOpen(par).then(res=>{ 
        this.$message.success('修改成功')
        this.plugStatus == 1?this.plugStatus = 0:this.plugStatus = 1
      })
    },
    // 查看当前店铺评论状态
    InitStatus:function(res){ 
      if(this.active == 0){
        this.plugStatus = Number(res.isOpen)
      }
    },
    // 查询评论类别
    ChangeActive: function (index) {
      this.active = index;
      this.requestParams.status = this.nav[index].id; 
      console.log(this.plugStatus)
      switch (index) {
        case 0:
          this.requestUrl = "/api/yxStoreProductReplyAll";
          this.isSelection = false;
          this.optionList = [];
          this.requestParams = {
            page: 0,
            size: 30,
            isReply: "",
            storeName: "",
          };
          this.tableHeader = [
            {
              prop: "image",
              width: "80",
              label: "商品列表",
            },
            {
              prop: "storeName",
              label: "",
              width: "460",
            },
            {
              prop: "productScore",
              label: "评论数",
              // width: "276",
              sortable: true,
              align: "left",
            },
            {
              prop: "isShowReply",
              label: "状态",
              width: "140",
              align: "center",
            },
            {
              prop: "option",
              label: "操作",
              width: "180",
              align: "center",
            },
          ];
          break;
        case 1:
          this.requestUrl = "/api/yxStoreProductReply";
          this.isSelection = true;
          this.optionList = ["通过", "删除"];
          this.requestParams = {
            page: 0,
            size: 30,
            status: 0,
            comment: "",
            productScore: "",
          };
          this.tableHeader = [
            {
              prop: "storeName",
              label: "商品名称",
              width: "200",
            },
            {
              prop: "productScore",
              label: "评分",
              width: "140",
              sortable: true,
              align: "left",
            },
            {
              prop: "comment",
              label: "内容",
              align: "left",
            },
            {
              prop: "image",
              width: "140",
              label: "图片",
            },
            {
              prop: "createTime",
              label: "日期",
              width: "138",
              align: "left",
            },
            {
              prop: "option",
              label: "操作",
              width: "120",
              align: "left",
            },
          ];
          break;
      }
    },
    // 全选操作（待审核查询条件）
    CheckAll: function (val) {
      this.checkedCities = val ? (this.checkedCities = [5, 4, 3, 2, 1]) : [];
      this.requestParams.productScore = this.checkedCities.toString();
    },
    // 批量操作
    BatchOption: function (index, selectItem) {
      let that= this;
      let par = [];
      selectItem.map((i) => {
        let obj = {};
        obj.replyId = i.id;
        obj.productId = i.productId;
        par.push(obj);
      });
      let inx = index;
      console.log(inx);
      switch (inx) {
        case 0:
          reviewComment(par).then((res) => {
            this.$message.success("操作成功");
            this.isRefresh += 1;
          });
          break;
        case 1:
          this.$DelTip(function(){
            del(par).then((res) => {
            that.$message.success("操作成功");
            that.isRefresh += 1;
          });
          })
          break;
      }
    },
    // 搜索
    Search: function () {
      if (this.requestUrl == "/api/yxStoreProductReplyAll") {
        console.log("搜索商品");
        this.requestParams.storeName = this.searchVal;
      } else {
        console.log("搜索评论");
        this.requestParams.comment = this.searchVal;
      }
    },
    // 详情
    ToDetail: function (e) {
      this.$router.push({
        path: "/commentDetail",
        query: {
          id: e.productId || e.id,
        },
      });
      localStorage.setItem("commentDetail", JSON.stringify(e));
    },
    // 单个评论操作
    Option: function (detail, status) {
      let that = this;
      this.itemDetail = detail; 
      if (this.requestUrl == "/api/yxStoreProductReplyAll") {
        let type = status;
        switch (type) {
          case "important":
            // this.showDialog = true;
            break;
          case "review":
            // 跳转到预览链接
            let url = 'https://' + localStorage.getItem('storeUrl') + '/product-details.html?id=' +  detail.id
            window.open(url, '_blank') 
            break;
          case "status":
            let par = {
              isShowReply: detail.isShowReply == 1 ? 1 : 0,
              productId: detail.id,
            };
            editMainStatus(par).then((res) => {
              this.$message.success("操作成功");
              this.isRefresh += 1;
            });
            break;
        }
      } else {
        let type = status;
        let par = {
          productId: detail.productId,
          replyId: detail.id,
        };
        switch (type) {
          case "pass":
            reviewComment([par]).then((res) => {
              this.$message.success("操作成功");
              this.isRefresh += 1;
            });
            break;
          case "del":
            del([par]).then((res) => {
                that.$message.success("操作成功");
                  that.isRefresh += 1;
              });
            break;
        }
      }
    },
    // 导入配置
    ChangeStart: function (e) {
      console.log(e);
    },
    // 设置导入条数
    TestImportant: function () {
      console.log();
      if (this.form.important > 300) {
        this.form.important = 300;
      } else if (this.form.important < 1) {
        this.form.important = 1;
      }
    },
    // 过滤关键词
    AddTag() {
      let that = this;
      this.keyword = this.keyword.replace(/(^\s*)|(\s*$)/g, ""); // 使用正则去除首尾空格
      if (this.keyword) {
        for (var i in this.form.keyword) {
          if (this.form.keyword[i] == this.keyword) {
            that.$message.error("已存在该标签");
            return false;
          }
        }
        this.form.keyword.push(this.keyword);
        this.keyword = "";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
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
.content {
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  background-color: #fff;
  .tab {
    display: flex;
    padding: 0 10px;
    border-bottom: 1px solid #dcdfe6;
    .active {
      border-bottom: 4px solid #f49342;
      color: #1a1d2c;
    }
    & > div {
      display: inline-block;
      padding: 0 10px;
      height: 36px;
      background: #fcfdff;
      font-size: 14px;
      line-height: 36px;
      border-bottom: 4px solid #fcfdff;
      color: #5e7185;
      cursor: pointer;
    }
  }
  .conditions {
    padding: 9px 12px;
    display: flex;
    // justify-content: space-around;
    border-bottom: 1px solid #f1f1f6;
    flex-wrap: wrap;
    .search-box {
      display: flex;
      flex: 1;
    }
    & > span {
      background: #fff;
      padding: 8px 12px;
      border: 1px solid #dcdfe6;
      margin-right: -5px;
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
      position: relative;
      cursor: pointer;
      /deep/.el-checkbox__input {
        display: none;
      }
      /deep/.el-checkbox__label {
        padding-left: 0;
      }
    }
    .el-checkbox-group {
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      padding: 8px 12px;
      margin-right: 20px;
      color: #697c90;
    }
  }
}
.off-the-shelf {
  color: rgb(202, 203, 214);
  border: 1px solid rgb(202, 203, 214);
  padding: 4px 8px;
  display: inline-block;
  font-size: 12px;
  line-height: 1;
  border-radius: 11px;
}
.textBtn {
  padding: 0;
  margin-right: 10px;
  color: #273a8a;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
}
.sail-app-status-tag-open {
  border: 2px solid #fff;
  background: #bbe5b3;
  color: #414f3e;
}
.sail-app-status-tag-close {
  background: #dfe3e8;
  border: 2px solid #fff;
  color: #454f5b;
}
.sail-app-status-tag {
  border-radius: 100px;
  width: 60px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 13px;
  text-align: center;
  position: relative;
  top: -4px;
}
.flex {
  display: flex;
  align-items: center;
}
.importSettingsContent {
  background: #f7f7f9;
  padding: 12px;
  border-radius: 2px;
  margin-top: 15px;
  color: #1c1f32;
  .item {
    margin-bottom: 20px;
    .label {
      margin-bottom: 12px;
      display: flex;
      justify-content: left;
      align-items: center;
      i {
        color: #c9c9c9;
        margin-left: 8px;
        font-size: 16px;
        height: 16px;
        overflow: hidden;
      }
    }
  }
}
/deep/.el-checkbox__label {
  color: #697c90;
}
</style>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>