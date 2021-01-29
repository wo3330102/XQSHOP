<template>
  <div>
    <div class="table">
      <div
        class="checkOption"
        :class="isActive ? 'show' : ''"
        v-if="optionList.length > 0"
      >
        <div class="checkContent">
          <i
            :class="isActive ? 'el-icon-caret-left' : 'el-icon-caret-right'"
            @click.stop="isActive = !isActive"
          ></i>
          <span
            v-for="(item, index) in optionList"
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
        :default-sort="defaultSort"
        @select="SelectionChange"
        @select-all="SelectionChange"
        @row-click="rowClick"
        :row-style="rowIsClick ? { cursor: 'pointer' } : { cursor: 'initial' }"
      >
        <!-- 是否需要选框 -->
        <el-table-column
          type="selection"
          v-if="selection"
          width="80"
        ></el-table-column>
        <slot>
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
              <template
                v-if="
                  item.prop == 'image' ||
                  item.prop == 'pic' ||
                  item.prop == 'uploadImage'
                "
              >
                <slot name="image" :params="scope.row"></slot>
              </template>
              <template v-else-if="item.prop == 'status'">
                <slot name="status" :params="scope.row"></slot>
              </template>
              <template
                v-else-if="
                  item.prop == 'storeName' && requestUrl == 'api/yxStoreProduct'
                "
              >
                <p>{{ scope.row[item.prop] }}</p>
                <p v-if="scope.row.isShow === 0" class="sign-span-item">
                  已下架
                </p>
              </template>
              <template v-else-if="item.prop == 'option'">
                <slot name="option" :params="scope.row"></slot>
              </template>
              <span v-else-if="item.prop == 'createTime'">
                {{
                  new Date(Number(scope.row.createTime)).toLocaleString()
                }}</span
              >
              <span v-else-if="item.label.indexOf('金额') > -1">
                {{
                  scope.row[item.prop] ? currency.s + scope.row[item.prop] : currency.s+"0.00"
                }}
              </span>
              <span v-else-if="item.prop == 'categoryType'">手动分类</span>
              <span v-else-if="item.prop.indexOf('storeCategory') > -1">
                {{ scope.row.storeCategory.cateName }}
              </span>
              <span v-else>{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
        </slot>
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
import qs from "qs";
export default {
  props: {
    tableHeader: {
      type: Array,
      default: function () {
        return [];
      },
    },
    defaultSort: {
      type: Object,
      default: function () {
        return {};
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
    rowIsClick: {
      type: Boolean,
      default: true,
    },
    selection: {
      type: Boolean,
      default: true,
    },
    optionList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    isRefresh: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentPage: 1, // 当前页码
      isActive: false, // 批量操作按钮
      data: [], // 表格数据
      params: {}, // 请求参数
      selectItem: [], // 选中的表单数据
      loading: true, // 加载中 
      total: 0, // 总条目数 
    };
  },
  watch: {
    requestParams: {
      handler: function (val) { 
        this.params = { ...val };
        this.getData();
      },
      deep: true,
      immediate: true,
    },
    tableData: function (val) {
      this.data = val;
    },
    isRefresh: function (val) {
      this.selectItem = [];
      this.isActive = false;
      this.getData();
    },
    selectItem:function(val){
      if(val.length === 0){
        this.isActive = false;
      }
    }
  },
  methods: {
    // 获取数据
    getData() {
      let that = this;
      that.loading = true;
      if (that.requestUrl == "api/yxStorePageBoard") {
        if (that.params.status === 0) {
          delete that.params.status;
        }
      }
      request({
        url:
          that.requestUrl + "?" + qs.stringify(that.params, { indices: false }),
        method: "get",
      }).then((res) => {
        setTimeout(function () {
          that.loading = false;
        }, 200);
        that.data = res.content;
        that.total = res.totalElements; 
        if (res.hasOwnProperty("cateList")) {
          that.$emit("GetCategory", res.cateList);
        } 
        if(that.requestUrl === 'api/getYxStoreProductReplyList'){ 
          this.$emit('GetData',res);
        }
        that.$emit('resultData',res);
      });
    },
    // 选择单条数据
    SelectionChange: function (e, row) {
      this.selectItem = e;  
      this.isActive = true;
      // 用于导出数据
      this.$emit('SelectionChange',e)
    },
    // 批量操作
    DispachSelect: function (e) {
      // 第一个参为当前批量操作对象，第二个是选中的值
      this.$emit("BatchOption", e, this.selectItem);
    }, 
    // 分页选择
    CurrentChange: function (e) {
      this.currentPage = e;
      this.params.page = e - 1;
      this.getData();
    },
    // 单行点击事件
    rowClick: function (row) {
      this.$emit("rowClick", row);
    },
    Jump: function (e) {
      console.log(e);
    },
  },
};
// <!-- 操作菜单栏 -->
//         <el-table-column
//           header-align="center"
//           align="center"
//           label="操作"
//           v-if="option == '操作'"
//         >
//           <template slot-scope="scope">
//             <el-button size="mini" @click="Edit(scope.$index, scope.row)"
//               >编辑</el-button
//             >
//             <el-button
//               size="mini"
//               type="danger"
//               @click="Delete(scope.$index, scope.row)"
//               >删除</el-button
//             >
//           </template>
//         </el-table-column>
//         <!-- 操作菜单栏（预览） -->
//         <el-table-column
//           header-align="center"
//           align="center"
//           label="操作"
//           v-if="option == '操作（预览）'"
//           @click.prevent="Jump"
//         >
//           <template slot-scope="scope">
//             <span class="textBtn" style="text-decoration: underline">预览</span>
//           </template>
//         </el-table-column>
//         <!-- 操作菜单栏（结果页） -->
//         <el-table-column
//           header-align="center"
//           align="center"
//           label="操作"
//           v-if="option == '操作（结果页）'"
//           @click.prevent="Jump"
//         >
//           <template slot-scope="scope">
//             <span class="textBtn" style="text-decoration: underline"
//               >结果页</span
//             >
//           </template>
//         </el-table-column>
//         <!-- 调整库存 -->
//         <el-table-column
//           header-align="center"
//           align="center"
//           label="调整库存"
//           v-if="option == '调整库存'"
//         >
//           <template slot-scope="scope">
//             <el-input style="width: 70px"></el-input>
//             <span class="textBtn">确定</span>
//           </template>
//         </el-table-column>
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
    top: 9px;
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
.sign-span-item {
  font-size: 12px;
  color: #999;
  margin-right: 20px;
  &::before {
    top: -1px;
    content: "";
    width: 6px;
    height: 6px;
    margin-right: 4px;
    border-radius: 4px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #8c8c8c;
    background-color: #e4e4e4;
  }
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
/deep/ .el-loading-mask {
  background: #fff;
}
</style>

 