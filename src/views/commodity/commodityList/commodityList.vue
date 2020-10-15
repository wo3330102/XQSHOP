<template>
  <div class="container">
    <h1 class="title">
      <span>商品列表</span>
      <span style="font-size: 0">
        <el-button @click="showImport = true">导入</el-button>
        <!-- <el-button @click="showExport=true">导出</el-button>
        <el-button>Feed导出</el-button> -->
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
        <el-select
          v-model="requestParams.cateId"
          clearable
          placeholder="分类"
          style="margin-right: 10px; width: 210px"
        >
          <el-option
            v-for="item in categoryList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 标签 -->
        <el-select
          v-model="searchType"
          clearable
          placeholder="搜索类型"
          style="margin-right: 10px; width: 210px"
          @change="(e) => {}"
        >
          <el-option label="商品名称" value="storeName"></el-option>
        </el-select>
        <div class="search-box">
          <el-input v-model="searchVal" placeholder="请输入商品名称或SKU ">
            <el-button slot="append" @click="Search">搜索</el-button>
          </el-input>
        </div>
      </div>
      <table-tem
        :showImg="true"
        :option="'操作（预览）'"
        :option-list="[active == 0 ? '下架' : '上架', '删除']"
        :requestUrl="'api/yxStoreProduct'"
        :requestParams="requestParams"
        :tableHeader="tableHeader"
        :selectItemArr="selectItem"
        @GetCategory="
          (e) => {
            categoryList = e;
          }
        "
        @SelectionChange="
          (e) => {
            selectItem = e;
          }
        "
        @rowClick="toDetail"
        @BatchOption="BatchOption"
      ></table-tem>
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
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
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
        <el-button type="primary" @click="showImport = false">确 定</el-button>
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
import { onsale, del } from "@/api/yxStoreProduct";
export default {
  components: {
    exportFunction,
    tableTem,
  },
  data() {
    return {
      requestParams: {
        page: 0,
        size: 10,
        sort: "id,desc",
        isShow: 1,
        isDel: 0,
        cateId: "",
        isrefresh: 0,
      },
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
      searchType: "",
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
      ],
      currentPage: 1,
      showExport: false,
      showImport: false,
      checkImport: true,
      selectItem: [], // 选中的商品
    };
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
      let searchType = this.searchType;
      if (searchType) {
        let par = {
          type: searchType,
          value: searchVal,
          [searchType]: searchVal,
          ...this.requestParams,
        };
        this.requestParams = par;
      } else {
        let par = this.requestParams;
        delete par["storeName"];
        delete par["type"];
        this.requestParams = { ...par };
      }
    },
    // 批量操作
    BatchOption: function (e) {
      console.log(e);
      let that = this;
      // 0为上下架  1为删除
      if (e === 0) {
        // 0为下架  1为上架
        if (this.active == 0) {
          let par = { status: 1 };
          this.selectItem.map((i) => {
            onsale(i.id, par).then(() => {
              that.$message.success("操作成功");
              that.requestParams.isrefresh += 1;
              that.selectItem = [];
            });
          });
        } else {
          let par = { status: 0 };
          this.selectItem.map((i) => {
            onsale(i.id, par).then(() => {
              that.$message.success("操作成功");
              that.requestParams.isrefresh += 1;
              that.selectItem = [];
            });
          });
        }
      } else {
        this.selectItem.map((i) => {
          del(i.id).then(() => {
            that.$message.success("操作成功");
            that.requestParams.isrefresh += 1;
            that.selectItem = [];
          });
        });
      }
    },
    handleSelectionChange: function (e) {
      console.log(e);
    },
    handleEdit: function (e) {
      console.log(e);
    },
    handleDelete: function (e) {
      console.log(e);
    },
    handleSizeChange: function (e) {
      console.log(e);
    },
    handleCurrentChange: function (e) {
      console.log(e);
    },
    ToAddShop: function () {
      this.$router.push("/commodity/add");
    },
    toDetail: function (e) {
      console.log(e);
      this.$router.push({ path: "/commodity/edit", query: { id: e.id } });
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
  /deep/.el-button,
  .el-button--medium {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
  /deep/.el-button + .el-button {
    margin-left: 20px !important;
  }
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
    /deep/ .el-input__inner {
      padding: 0 8px;
    }
    .search-box {
      display: flex;
      flex: 1;
      /deep/.el-input-group__append {
        background: #fff;
        color: #000000;
      }
    }
    /deep/ .el-button {
      height: 36px;
      padding: 0 15px;
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

/deep/.el-input__inner {
  height: 36px !important;
}
/deep/.el-input__icon {
  line-height: 36px !important;
}
/deep/ .el-range-separator {
  line-height: 35px;
}
</style>

