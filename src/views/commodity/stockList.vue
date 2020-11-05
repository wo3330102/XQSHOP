<template>
  <div class="container">
    <h1 class="title">
      <span>库存列表</span>
      <span style="font-size:0">
        <el-button>导 入</el-button>
        <el-button @click="showExport = true">导 出</el-button> 
      </span>
    </h1>
    <div class="content"> 
      <div class="conditions">
        <div class="inputBox">
          <el-input v-model="inputMin" placeholder="库存最小值" style="width:100px"></el-input>
          <span> - </span>
          <el-input v-model="inputMax" placeholder="库存最大值" style="width:100px"></el-input>
        </div>
        <div class="search-box" style="flex: 1 1 0%; margin-left: 12px;"> 
          <el-input v-model="searchVal" placeholder="请输入商品名称或SKU ">
            <el-button slot="append">搜索</el-button>
          </el-input>
        </div>
      </div> 
      <table-tem :option="'调整库存'" :optionList="['售罄政策','调整库存']" :tableData="tableData" :tableHeader="tableHeader"></table-tem> 
      <export-function :show="showExport" @close="showExport=false"></export-function> 
    </div>
  </div>
</template>
<script>
import exportFunction from '@/components/exportFunction';
import tableTem from '@/components/tableTem';
export default {
  components:{
    exportFunction,
    tableTem
  },
  data() {
    return {  
      inputMin:'',
      inputMax:'',
      searchVal: "",
      tableData: [{
        'categoryName':1,
        'categoryType':2,
        'sku':1,
        'number':123, 
      }],
      tableHeader:[ {
        prop:'categoryName',
        label:'商品规格',  
        width:320,
      },{
        prop:'categoryType',
        label:'售罄政策',  
        width:176,
      },{
        prop:'sku',
        label:'SKU',  
        width:175,
      },{
        prop:'number',
        label:'库存数量', 
        sortable:true,
        width:120,
      }],
      currentPage: 1,
      showExport:false
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

