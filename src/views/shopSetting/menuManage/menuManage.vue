<template>
  <div class="container">
    <h1 class="title">
      <span>菜单栏</span>
      <span style="font-size: 0">
        <el-button type="primary" @click="$NavgitorTo('/addMenu')"
          >添加菜单栏</el-button
        >
      </span>
    </h1>
    <div class="content">
      <el-table :data="tableData" style="width: 100%" @row-click="ToDetail">
        <el-table-column
          prop="title"
          label="标题"
          width="260"
        ></el-table-column>
        <el-table-column prop="menuItems" label="菜单项" width="616">
          <template slot-scope="scope">
            {{
              (function () {
                let str = [];
                scope.row.menuItems.map((i) => {
                  str.push(i.name);
                });
                return str.toString();
              })()
            }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="150">
          <template slot-scope="scope">
            {{ scope.row.type === 0 ? "页头" : "页尾" }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <!-- <el-button v-if="scope.row.status === 0" type="text" size="small" @click.stop.prevent="ChangeStatus(scope.$index)">未启用</el-button> 
            <el-button v-else type="text" @click.stop.prevent="ChangeStatus(scope.$index)">已启用</el-button>  -->
            <el-switch  @click.native.stop
              v-model="scope.row.status"
              @change="ChangeStatus(scope.$index)"
              :active-value="1"
              :inactive-value="0"
              active-color="#34395d" 
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { get, changeMenuBarStatus } from "@/api/yxStoreMenubar";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init: function () {
      let par = {
        page: 0,
        size: 20,
      };
      get(par).then((res) => {
        console.log(res);
        this.tableData = res.content;
      });
    },
    ToDetail: function (row) {
      console.log(row);
      localStorage.setItem("menuDetail", JSON.stringify(row));
      this.$router.push({
        path: "/addMenu",
        query: {
          id: row.id,
        },
      });
    },
    ChangeStatus: function (index) {
      let obj = this.tableData;
      let storeId = localStorage.getItem("storeId");
      console.log(index)
      console.log(this.tableData[index].status)
      let par = {
        status: obj[index].status === 1?1:0,
        id: obj[index].id,
        storeId: storeId,
      };
      changeMenuBarStatus(par).then((res) => {
        this.init();
      });
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
  }
  .pagination {
    padding: 14px 0;
    text-align: center;
  }
}  
</style>

