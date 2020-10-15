<template>
  <div>
    <div class="table">
      <div class="checkOption" :class="isActive ? 'show' : ''" v-if="optionList.length>0">
        <div class="checkContent">
          <i
            :class="isActive ? 'el-icon-caret-left' : 'el-icon-caret-right'"
            @click.stop="isActive = !isActive"
          ></i>
          <span
            v-for="(item,index) in optionList"
            :key="item"
            @click="DispachSelect(index)"
            class="item"
            :class="selectItem.length == 0 ? 'disable' : ''"
            >{{ item }}</span
          >
        </div>
      </div>
      <el-table
        ref="multipleTable"
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
        empty-text="暂无数据"
        v-loading="loading"
        @select="SelectionChange"
        @select-all="SelectAll"
        @row-click="rowClick"
        :row-style="rowIsClick ? { cursor: 'pointer' } : ''"
      >
        <!-- 是否需要选框 -->
        <el-table-column
          type="selection"
          v-if="selection"
          width="80"
        ></el-table-column> 
        <!-- 表格内容 -->
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
            <span v-if="item.prop == 'image' " class="small-img" :style="{backgroundImage: 'url('+scope.row.image+')'}"></span> 
            <span v-else-if="item.prop == 'pic' " class="small-img" :style="{backgroundImage: 'url('+scope.row.pic+')'}"></span> 
            <span v-else-if="item.prop == 'uploadImage'" class="small-img" ></span> 
            <span v-else-if="item.prop == 'createTime'">{{
              new Date(Number(scope.row.createTime)).toLocaleString()
            }}</span>
            <span v-else-if="item.label.indexOf('金额')>-1">
              {{ scope.row[item.prop]?'$'+scope.row[item.prop] : '' }}
            </span>
            <span v-else-if="item.prop == 'categoryType'">
              手动分类
            </span>
            <span v-else-if="item.prop.indexOf('storeCategory')>-1">
              {{ scope.row.storeCategory.cateName}}
            </span>
            <span v-else-if="requestUrl == 'api/yxStorePageBoard' && item.prop == 'status'">
              {{ scope.row[item.prop] == 1?'可见':'隐藏'}}
            </span> 
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
        <!-- 操作菜单栏 -->
        <el-table-column
          header-align="center"
          align="center"
          label="操作"
          v-if="option == '操作'"
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="Edit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
        <!-- 操作菜单栏（预览） -->
        <el-table-column
          header-align="center"
          align="center"
          label="操作"
          v-if="option == '操作（预览）'"
          @click.prevent="Jump"
        >
          <template slot-scope="scope">
            <span class="textBtn" style="text-decoration: underline">预览</span>
          </template>
        </el-table-column>
        <!-- 操作菜单栏（结果页） -->
        <el-table-column
          header-align="center"
          align="center"
          label="操作"
          v-if="option == '操作（结果页）'"
          @click.prevent="Jump"
        >
          <template slot-scope="scope">
            <span class="textBtn" style="text-decoration: underline"
              >结果页</span
            >
          </template>
        </el-table-column>
        <!-- 调整库存 -->
        <el-table-column
          header-align="center"
          align="center"
          label="调整库存"
          v-if="option == '调整库存'"
        >
          <template slot-scope="scope">
            <el-input style="width: 70px"></el-input>
            <span class="textBtn">确定</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @current-change="CurrentChange"
        :current-page.sync="currentPage"
        background
        :page-size="requestParams.size"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
import qs from 'qs'
export default {
  props: {
    tableHeader: {
      type: Array,
      default: function () {
        return [];
      },
    },
    requestUrl: {
      type: String,
      default: "",
    },
    requestParams: {
      type: Object,
      default: function () {
        return {};
      },
    },
    selectItemArr:{
      type:Array,
      default:function(){
        return [];
      }
    },
    rowIsClick: {
      type: Boolean,
      default: true,
    },
    selection: {
      type: Boolean,
      default: true,
    },
    option: {
      type: String,
      default: "",
    },
    optionList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    tableData:{
      type:Array,
      default: function(){
        return [];
      }
    }
  },
  data() {
    return {
      currentPage: 1, // 当前页码
      isActive: false,  // 批量操作按钮
      data: [], // 表格数据
      params:{}, // 请求参数
      selectItem: [], // 选中的表单数据
      loading: true,  // 加载中
      showImg: false, // 是否显示图片
      total: 0, // 总条目数
    };
  },
  created() { 
    if(this.requestUrl){
      this.getData();
    }
  },
  watch: {
    requestParams: {
      handler: function (val) {
        console.log(JSON.stringify(val));
        this.params = {...val}
        this.getData();
      },
      deep: true,
      immediate:true,
    }, 
    selectItemArr:function(val){
      console.log(val)
      this.selectItem = val;
    },
    tableData:function(val){
      this.data = val;
    }
  },
  methods: {
    // 获取数据
    getData() {
      let that = this;
      that.loading = true;
      console.log(that.params)
      if(that.requestUrl == 'api/yxStorePageBoard'){
        if(that.params.status === 0){
          delete that.params.status
        }
      }


      request({
        url: that.requestUrl + '?' + qs.stringify(that.params, { indices: false }),
        method: "get", 
      }).then((res) => {
        setTimeout(function () {
          that.loading = false;
        }, 200);
        that.data = res.content;
        that.total = res.totalElements;
        if(res.hasOwnProperty('cateList')){
          that.$emit('GetCategory',res.cateList)
        }
        if(that.requestUrl == 'api/yxStoreCategory'){
          
        }
      });
    },
    // 选择单条数据
    SelectionChange: function (e, row) {
      this.selectItem = e;   
      this.$emit("SelectionChange", e);
    },
    // 选择所有数据
    SelectAll: function (e) {
      this.selectItem = e;
      this.$emit("SelectionChange", e);
    },
    // 批量操作
    DispachSelect: function (e) {
      console.log(e);
      this.$emit("BatchOption",e)
    },
    // 修改
    Edit: function (e) {
      console.log(e);
    },
    // 删除
    Delete: function (e) {
      console.log(e);
    },
    // 分页选择
    CurrentChange: function (e) { 
      this.currentPage = e;
      this.params.page = e-1;
      this.getData();
    },
    // 单行点击事件
    rowClick: function (row) {
      this.$emit("rowClick", row);
    },
    Jump:function(e){
      console.log(e);
    }
  },
};
</script>
<style lang="scss" scoped>
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
    left: 0;
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
.small-img {
  display: inline-block;
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 4px;
  border: 1px solid #dadde4;
  background-color: #f7f8fd;
  background-origin: content-box;
  background-position: 50% 50%;
  background-size: contain;
  background-repeat: no-repeat;
  overflow: hidden;
}
.textBtn {
  padding: 10px 0;
  color: #273a8a;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  margin-left: 10px;
}
.pagination {
  padding: 14px 0;
  text-align: center;
}
// 调整表格头部选框位置
/deep/ .el-checkbox:last-of-type {
  margin-left: 13px;
}
/deep/ .el-loading-mask{
  background: #fff;
}
</style>