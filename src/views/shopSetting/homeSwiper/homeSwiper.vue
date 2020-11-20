<template>
  <div class="container">
    <h1 class="title">
      <span>首页轮播图</span>
      <el-button type="primary" @click="$NavgitorTo('/editHomeSwiper')">新增</el-button>
    </h1>
    <div class="content">
      <!-- <div class="conditions"> 
        <div class="search-box" style="flex: 1 1 0%; margin-left: 12px;"> 
          <el-input v-model="searchVal" placeholder="请输入商品名称或SKU ">
            <el-button slot="append">搜索</el-button>
          </el-input>
        </div>
      </div>  -->
      <table-tem
        :requestParams="requestParams"
        :requestUrl="'api/yxSystemGroupData'"
        :tableHeader="tableHeader"
        :optionList="['删除']" 
        @BatchOption="SelectOption"
        @rowClick="RowClick"
        :isRefresh="isRefresh"
      > 
        <el-table-column
          v-for="(item, index) in tableHeader"
          :key="index"
          :prop="item.prop ? item.prop : ''"
          :label="item.label ? item.label : ''"
          :width="item.width ? item.width : ''" 
          :sortable="item.sortable"
        >
          <template slot-scope="scope"> 
            <template v-if="item.prop == 'pic'">
              <span class="small-img" :style="{ backgroundImage: 'url(' + scope.row['map'].pic + ')' }"></span>
            </template>
            <span v-else>{{ scope.row['map'][item.prop] }}</span> 
          </template>
        </el-table-column>
      </table-tem>
      <export-function
        :show="showExport"
        @close="showExport = false"
      ></export-function>
    </div>
  </div>
</template>
<script>
import exportFunction from "@/components/exportFunction";
import tableTem from "@/components/tableTem";
import {del} from "@/api/yxSystemGroupData"
export default {
  components: {
    exportFunction,
    tableTem,
  },
  data() {
    return {
      requestParams: {
        page: 0,
        size: 30,
        groupName: "xqshop_home_banner",
      },
      tableHeader: [
        {
          prop: "pic",
          label: "",
          width:90,
        },
        {
          prop: "name",
          label: "标题", 
          sortable:true
        },
        {
          prop: "url",
          label: "链接", 
        },
        {
          prop: "status",
          label: "状态",
          width: 175,
        }
      ],
      currentPage: 1,
      showExport: false,
      isRefresh:0,
    };
  },
  methods: {  
    RowClick:function(e){
      localStorage.setItem('swiperDetail',JSON.stringify(e))
      this.$router.push({
        name:'EditHomeSwiper',
        query:{
          id:e.id
        }
      })
    },
    SelectOption:function(index,item){ 
      let that = this;
      item.map(i=>{
        del(i.id).then(res=>{
          that.$message.success('删除成功')
          that.isRefresh += 1; 
        })
      })
      
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

