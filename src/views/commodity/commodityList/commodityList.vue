<template>
  <div class="container">
    <h1 class="title">
      <span>商品列表</span>
      <span style="font-size: 0">
        <el-button @click="showImport = true">导入</el-button>
        <el-button @click="showExport = true">导出</el-button>
        <!-- <el-button>Feed导出</el-button> -->
        <el-button type="primary" @click="ToAddShop">添加商品</el-button>
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
        <!-- 分类 --> 
        <el-cascader 
        style="margin-right: 10px; width: 210px"
          v-model="tagId"
          :props="categoryOption"
          :show-all-levels="false"
          clearable
        >
        </el-cascader>
        <!-- 搜索类型 -->
        <el-select
          v-model="searchType" 
          placeholder="搜索类型"
          style="margin-right: 10px; width: 210px"
          @change="(e) => {}"
        >
          <el-option label="商品名称" value="storeName"></el-option>
          <el-option label="商品SKU" value="skuCode"></el-option>
        </el-select>
        <div class="search-box">
          <el-input
            v-model="searchVal"
            placeholder="请输入商品名称或SKU"
            @change="
              (e) => {
                searchType == 'storeName'?requestParams.storeName = e :requestParams.skuCode = e;
              }
            "
          >
            <el-button slot="append" @click="Search">搜索</el-button>
          </el-input>
        </div>
      </div>
      <table-tem
        :option-list="[active == 0 ? '下架' : '上架', '删除']"
        :requestUrl="'api/yxStoreProduct'"
        :requestParams="requestParams"
        :tableHeader="tableHeader"
        :isRefresh="isRefresh"
        @rowClick="toDetail"
        @BatchOption="BatchOption"
      >
        <template slot="image" slot-scope="params">
          <span
            class="small-img"
            :style="{ backgroundImage: 'url(' + params.params.image + ')' }"
          ></span>
        </template>
        <template slot="option" slot-scope="params">
          <span @click.stop="Preview(params)" class="textBtn">预览</span>
        </template>
      </table-tem>
    </div>
    <!-- 导入 -->
    <el-dialog title="使用CSV文件导入商品" :visible.sync="showImport">
      <div>
        选择商品：系统自动识别XShoppy/shopify的商品文件。
        <a
          href="http://xshoppy.ewei.com/new/#/article/detail/361687"
          target="_blank"
          class="download-tpl-link-new"
          >查看模版示例</a
        >
      </div>
      <div style="margin: 30px 0">
        <el-upload class="upload-demo" drag :action="upUrl" multiple>
          <i class="el-icon-upload"></i>
          <div
            class="el-upload__text"
            v-html="
              '选择XShoppy/shopify文件, <br />将文件拖到此处，或<em>点击上传</em>'
            "
          ></div>
        </el-upload>
      </div>
      <el-tooltip
        effect="dark"
        content="handle相同的商品即为重复商品"
        placement="top-start"
      >
        <span>重复商品处理方式：</span>
      </el-tooltip>
      <div style="margin-top: 10px">
        <el-checkbox v-model="checkImport">
          使用导入的商品替换系统中重复的商品，所有内容均以导入的商品为准。
        </el-checkbox>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showImport = false">取 消</el-button>
        <el-button type="primary" @click="ImportProduct">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 导出 -->
    <export-function
      :show="showExport"
      @close="showExport = false"
    ></export-function>
  </div>
</template>
<script>
import exportFunction from "@/components/exportFunction";
import tableTem from "@/components/tableTem";
import { delMany, onsaleAll } from "@/api/yxStoreProduct";
import {
  getCates,
  getNewCategoryList,
  getNewCategoryListByPid,
} from "@/api/yxStoreCategory";
export default {
  components: {
    exportFunction,
    tableTem,
  },
  data() {
    return {
      tagId: [],
      categoryOption: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;
          if (level == 0) {
            let par = {
              page: 0,
              size: 99,
              pid: 0,
            };
            getNewCategoryList(par).then((res) => {
              if (res.data) {
                resolve(res.data.yxStoreTagList);
              }
            });
          } else {
            getNewCategoryListByPid({ pid: node.data.id }).then((res) => {
              if (res.data) {
                resolve(res.data);
              }
            });
          }
        },
        value: "id",
        label: "title",
        checkStrictly: true,
      },
      requestParams: {
        page: 0,
        size: 30,
        sort: "id,desc",
        isShow: 1,
        isDel: 0,
        tagId:'',
        storeName:'',
        skuCode:'',
      },
      isRefresh: 0,
      nav: [
        {
          id: 1,
          label: "出售中",
        },
        {
          id: 0,
          label: "待上架",
        },
      ],
      active: 0,
      categoryList: [],
      date: "",
      searchType: "storeName",
      searchTypeList: [
        {
          id: 1,
          label: "PayPal",
        },
      ],
      searchVal: "",
      tableHeader: [
        {
          prop: "image",
          label: "",
        },
        {
          prop: "storeName",
          label: "商品名",
          width: "443",
          sortable: true,
        },
        {
          prop: "tagName",
          label: "分类",
          width: "443",
        },
        {
          prop: "option",
          label: "操作",
          width: "80",
        },
      ],
      currentPage: 1,
      showExport: false,
      showImport: false,
      checkImport: true,
      upUrl:
        process.env.VUE_APP_BASE_API +
        "/api/yxStoreProduct/importProduct/" +
        localStorage.getItem("storeId"),
    };
  },
  watch: {
    tagId: {
      handler: function (val) { 
        console.log(val[val.length - 1])
        this.requestParams.tagId = val[val.length - 1];
      }, 
    },
    searchType:function(val){
      if(val == 'storeName'){
        this.requestParams.storeName = this.searchVal
      } else {
        this.requestParams.skuCode = this.searchVal
      }
    }
  },
  methods: {
    // 改变搜索条件
    ChangeActive: function (index) {
      this.active = index;
      this.requestParams.isShow = this.nav[index].id;
    },
    // 搜索
    Search: function () {
      let searchVal = this.searchVal;
      let par = {
        storeName: searchVal,
        ...this.requestParams,
      };
      this.requestParams = par;
    },
    // 批量操作
    BatchOption: function (e, selectItem) {
      console.log(e);
      let that = this;
      // 0为上下架  1为删除
      if (e === 0) {
        // 0为下架  1为上架
        let arr = [];
        let par = {};
        selectItem.map((i) => {
          arr.push(i.id);
        });
        if (this.active == 0) {
          par = {
            ids: arr,
            status: 0,
          };
        } else {
          par = {
            ids: arr,
            status: 1,
          };
        }
        onsaleAll(par).then(() => {
          that.$message.success("操作成功");
          that.isRefresh += 1;
        });
      } else {
        let arr = [];
        selectItem.map((i) => {
          arr.push(i.id);
        });
        this.$DelTip(function () {
          delMany(arr).then(() => {
            that.$message.success("操作成功");
            that.isRefresh += 1;
          });
        });
      }
    },
    ToAddShop: function () {
      this.$router.push("/commodity/edit");
    },
    toDetail: function (e) {
      this.$router.push({ path: "/commodity/edit", query: { id: e.id } });
    },
    Preview: function (params) {
      let url =
        "https://" +
        localStorage.getItem("storeUrl") +
        "/product-details.html?id=" +
        params.params.id;
      window.open(url, "_blank");
    },
    ImportProduct: function () {},
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
    justify-content: space-around;
    border-bottom: 1px solid #f1f1f6;
    flex-wrap: wrap;
    .search-box {
      display: flex;
      flex: 1;
    }
  }
}
.download-tpl-link-new {
  color: #242b4a;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  float: right;
}
.textBtn {
  padding: 10px 0;
  color: #273a8a;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  margin-left: 10px;
  text-decoration: underline;
}
</style>

