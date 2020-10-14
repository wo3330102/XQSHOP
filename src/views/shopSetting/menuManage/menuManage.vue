<template>
  <div class="container">
    <h1 class="title">
      <span>菜单栏</span>
      <span style="font-size:0">
        <el-button type="primary" @click="$NavgitorTo('/addMenu')">添加菜单栏</el-button>
      </span>
    </h1>
    <div class="content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题" width="260"></el-table-column>
        <el-table-column prop="menu" label="菜单项" width="866"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { 
      tableData:[
        
      ]
    };
  },
  methods: {
     
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
    /deep/ .el-input__inner {
      padding: 0 8px;
    }
  }
  .pagination {
    padding: 14px 0;
    text-align: center;
  }
} 
/deep/.el-input__icon {
  line-height: 36px !important;
}
/deep/ .el-range-separator {
  line-height: 35px;
}
</style>

