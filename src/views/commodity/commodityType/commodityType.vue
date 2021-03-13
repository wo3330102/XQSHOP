<template>
  <div class="container">
    <h1 class="title">
      <span>分类列表</span>
      <el-button
        @click="AddCategory"
        style="color: #fff; background-color: #34395d; border-color: #34395d"
        >添加分类</el-button
      >
    </h1>
    <div class="content">
      <div class="conditions">
        <div class="search-box">
          <el-input v-model="searchVal" placeholder="搜索分类名称 ">
            <el-button slot="append" @click="requestParams.title = searchVal"
              >搜索</el-button
            >
          </el-input>
        </div>
      </div>
      <table-tem
        :show-img="true"
        :optionList="['删除']"
        :requestUrl="'api/yxStoreTag'"
        :requestParams="requestParams"
        :tableHeader="tableHeader"
        :isRefresh="isRefresh"
        @rowClick="RowClick"
        @BatchOption="Del"
      >
        <template slot="image" slot-scope="params">
          <span
            class="small-img"
            :style="{ backgroundImage: 'url(' + params.params.pic + ')' }"
          ></span>
        </template>
        <template slot="option" slot-scope="params"> 
          <span
            @click.stop="Preview(params)"
            class="textBtn"
            >预览</span
          >
        </template>
      </table-tem>
    </div>
  </div>
</template>
<script>
import { del } from "@/api/yxStoreCategory";
import tableTem from "@/components/tableTem";
export default {
  components: {
    tableTem,
  },
  data() {
    return {
      isActive: false,
      optionList: ["删除"],
      searchVal: "",
      tableHeader: [
        {
          prop: "pic",
          label: "",
        },
        {
          prop: "title",
          label: "分类名称",
          width: 303,
        },
        {
          prop: "categoryType",
          label: "分类类型",
          align: "center",
          width: 240,
        },
        {
          prop: "count",
          label: "商品数量",
          sortable: true,
          width: 120,
          align: "center",
        },
        {
          prop: "option",
          label: "操作",
          width: 303,
          align: "right",
        },
      ],
      requestParams: {
        page: 0,
        size: 30,
        sort: "sort,desc",
        title: "",
      },
      isRefresh: 0,
      loading: true,
    };
  },
  methods: {
    AddCategory: function () {
      this.$router.push("/addCategory");
    },
    RowClick: function (e) {
      this.$router.push("/editCategory");
      localStorage.setItem("categoryDetail", JSON.stringify(e));
    },
    Del: function (e, selectItem) {
      let that = this;
      let par = [];
      for (var i in selectItem) {
        if (i.count > 0) {
          this.$message.error("所选分类下含有商品，无法删除");
          return false;
        }
        par.push(selectItem[i].id);
      }
      if (par.length > 0) {
        this.$DelTip(function(){
          del(par).then((res) => {
          that.$message.success("删除成功");
          that.isRefresh += 1;
        });
        })
      }
    },
    Preview:function(params){
      // let url = 'https://' + localStorage.getItem('storeUrl') + '/product-list.html?sid=' +  params.params.id + '&titleName=' + encodeURIComponent(params.params.title)
      let url = 'http://' + localStorage.getItem('storeUrl') + '/product-list.html?sid=' +  params.params.id + '&titleName=' + encodeURIComponent(params.params.title)
      window.open(url, '_blank') 
    }
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
  .el-button {
    height: 36px;
    padding: 10px 20px;
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
  .pagination {
    padding: 14px 0;
    text-align: center;
  }
}
</style>
<style lang="scss">
.show {
  width: 100% !important;
}
.table {
  position: relative;
  .checkOption {
    overflow: hidden;
    width: 82px;
    height: 36px;
    line-height: 36px;
    background: #fff;
    padding: 0 12px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    z-index: 1;
    position: absolute;
    left: 8px;
    top: 8px;
    .checkContent {
      width: 100%;
      height: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      color: #273a8a;
      i {
        line-height: 36px;
        margin-left: 24px;
        cursor: pointer;
        color: #c0c4cc;
      }
    }
    .item {
      padding: 10px;
      font-size: 13px;
      cursor: pointer;
    }
    .disable {
      pointer-events: none;
      cursor: not-allowed;
      color: #c0c4cc;
    }
  }
}
// .small-img {
//   display: inline-block;
//   vertical-align: middle;
//   width: 50px;
//   height: 50px;
//   border-radius: 4px;
//   border: 1px solid #dadde4;
//   background-color: #f7f8fd;
//   background-origin: content-box;
//   background-position: 50% 50%;
//   background-size: contain;
//   background-repeat: no-repeat;
//   overflow: hidden;
// }
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
// 调整表格头部选框位置
/deep/ .el-checkbox:last-of-type {
  margin-left: 13px;
}
/deep/ .el-loading-mask {
  background: #fff;
}
</style>
