<template>
  <div class="container">
    <h1 class="title">
      <span style="flex:1">域名</span>
      <span style="font-size:0">
        <el-button type="primary" @click="showExport = true">添加域名</el-button>
      </span>
    </h1>
    <div>
      <!-- 主域名 -->
      <div class="box-big">
        <h3 class="title">
          <span class="text">主域名</span>
          <span class="option">更换主域名</span>
        </h3>
        <div>
          <el-table :data="mainDomainForm">
            <el-table-column prop="domain" label="域名">
              <template slot-scope="scope">
                <a :href="scope.href"></a>
                <el-button size="mini" type="danger" @click="handleDelete(scope, scope.row)">Delete</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="option" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 其他域名 -->
      <div class="box-big">
        <h3 class="title">
          <span class="text">主域名</span>
          <span class="option">更换主域名</span>
        </h3>
        <div>
          <el-table :data="mainDomainForm">
            <el-table-column prop="domain" label="域名"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="option" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="showExport" title="添加域名">
      <el-input v-model="domain" placeholder></el-input>
      <div slot="footer">
        <el-button @click="showExport = false">取消</el-button>
        <el-button type="primary" :disabled="save">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      mainDomainForm: [],
      save: true,
      showExport: false,
      domain: "",
    };
  },

  methods: {
    handleClick: function (el) {
      console.log(el);
    },
  },
  updated() {
    console.log("更新");
    this.save = false;
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
  .text {
    line-height: 40px;
    flex: 1;
    word-break: break-word;
  }
}
/deep/.el-row {
  margin: 0 -10px;
  .el-col {
    padding: 0 10px;
  }
}
.box-big {
  margin-bottom: 20px;
  padding: 0;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  overflow: hidden;
  .title {
    color: #1a1d2c;
    font-size: 14px;
    font-weight: 600;
    height: 54px;
    line-height: 54px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    .text {
      flex: 1;
    }
    .option {
      color: #273a8a;
      font-size: 14px;
      text-decoration: underline;
      cursor: pointer;
      font-weight: 400;
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
/deep/.el-table td,
/deep/.el-table th.is-leaf {
  border-top: 1px solid #ebeef5;
}
</style>  