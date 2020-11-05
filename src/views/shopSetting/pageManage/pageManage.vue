<template>
  <div class="container">
    <h1 class="title">
      <span>页面管理</span>
      <span style="font-size: 0">
        <el-button type="primary" @click="$NavgitorTo('/addPage')"
          >添加页面</el-button
        >
      </span>
    </h1>
    <div class="content">
      <div class="conditions">
        <el-select v-model="requestParams.status" placeholder>
          <el-option
            v-for="item in pageList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="search-box" style="flex: 1 1 0%; margin-left: 12px">
          <el-input v-model="searchVal" placeholder="请输入标题名称">
            <el-button slot="append" @click="requestParams.title=searchVal">搜索</el-button>
          </el-input>
        </div>
      </div>
      <table-tem
        :selection="false" 
        :requestUrl="'api/yxStorePageBoard'"
        :requestParams="requestParams"
        :tableHeader="tableHeader"
        @rowClick="RowClick"
      ></table-tem>
    </div>
  </div>
</template>
<script>
import tableTem from "@/components/tableTem";
export default {
  components: {
    tableTem,
  },
  data() {
    return {
      selectPage: 1,
      pageList: [
        {
          value: 0,
          label: "全部状态",
        },
        {
          value: 1,
          label: "可见",
        },
        {
          value: 2,
          label: "隐藏",
        },
      ],
      searchVal: "", 
      requestParams:{
        page:0,
        size:10,
        status:0,
        title:'',
      },
      tableHeader: [
        {
          prop: "title",
          label: "标题",
          width: 766,
        },
        {
          prop: "status",
          label: "状态",
          width: 180,
        },
        {
          prop: "createTime",
          label: "修改时间",
          width: 180,
        },
      ],
      currentPage: 1,
      showExport: false,
    };
  },
  methods: {
    ChangeActive: function (index) {
      this.acitve = index;
    },
    ChangeSelect: function (e) {
      console.log(e);
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
    RowClick:function(e){
      this.$router.push({
        name: 'AddPage', 
        query: {
          id:e.id
        }
      })
      localStorage.setItem('pageDetail',JSON.stringify(e))
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

