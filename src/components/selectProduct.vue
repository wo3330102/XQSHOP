<template>
  <el-dialog
    title="请选择商品"
    :visible.sync="shopDialog"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <div class="search-conditions">
      <!-- 商品标签 -->
      <!-- <el-select
              v-model="requestParams.shopLabelValue"
              size
              placeholder="请选择标签"
              style="width: 200px"
              @change="
                () => {
                  table = [];
                  initData();
                }
              "
            >
              <el-option
                v-for="item in shopLabelList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select> -->
      <!-- 商品分类 -->
      <el-select
        v-model="requestParams.cateId"
        size
        placeholder="请选择分类"
        style="width: 200px"
        clearable
        @change="
          () => {
            requestParams.page = 0;
            table = [];
          }
        "
        @clear="()=>{
          requestParams.page = 0;
          requestParams.cateId = ''
        }"
      >
        <el-option
          v-for="item in shopCategoryList"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-input
        style="width: 380px"
        size
        v-model="shopContent"
        placeholder="请输入内容"
        @change="Search"
      >
        <el-button @click="Search" slot="append">查询</el-button>
      </el-input>
    </div>
    <el-table
      v-if="table.length > 0"
      :data="table"
      style="width: 100%"
      empty-text
      ref="multipleTable"
      v-el-table-infinite-scroll="load"
      @selection-change="SelectItem"
      :infinite-scroll-delay="200"
      :infinite-scroll-distance="100"
    >
      <el-table-column
        type="selection"
        width="55"
        :selectable="selectable"
      ></el-table-column>
      <el-table-column align="left" width="80" prop="image" label="商品图片">
        <template slot-scope="scope">
          <span
            class="small-img"
            :style="{ backgroundImage: 'url(' + scope.row.image + ')' }"
          ></span>
        </template>
      </el-table-column>
      <el-table-column
        align="left"
        prop="storeName"
        label="商品名称"
      ></el-table-column>
    </el-table>
    <div slot="footer">
      <span style="float: left; line-height: 41px"
        >总共{{ tableTotal }}个商品， 已选择{{ selectItem.length }}个</span
      >
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="CheckSelectItem">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import elTableInfiniteScroll from "el-table-infinite-scroll";
import { getCates } from "@/api/yxStoreCategory";
import request from "@/utils/request";
import qs from "qs";
export default {
  directives: {
    "el-table-infinite-scroll": elTableInfiniteScroll,
  },
  props: {
    // 控制是否需要显示
    visible: {
      type: Boolean,
      default: false,
    },
    // 判断可以选择多少个（禁用效果）
    disableNum: {
      type: Number,
      default: 99999999,
    },
    // 请求地址
    requestUrl: {
      type: String,
      default: "",
    },
    // 请求参数
    requestParams: {
      type: Object,
      default: function () {
        return {};
      },
    },
    // 是否需要触底加载
    needLoad: {
      type: Boolean,
      default: true,
    },
    // 是否是新类型API
    isNewApi: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      params: {},
      shopDialog: false,
      shopCategoryList: [],
      shopContent: "",
      table: [],
      selectItem: [],
      tableTotal: 0,
      disableNumber: this.disableNum,
      disable: true,
    };
  },
  watch: {
    requestParams: {
      handler: function (val, old) { 
        this.init();
      },
      deep: true,
      immediate: true,
    },
    visible: function (val) {
      this.shopDialog = val;
      this.selectItem = []; 
      console.log("清空选框");
      if (!val) {
        this.$refs.multipleTable.clearSelection();
      }
    },
    disableNum: function (val) {
      this.disableNumber = val;
    },
    selectItem: function (val) {
      if (val.length >= this.disableNumber) {
        this.disable = false;
      } else {
        this.disable = true;
      }
    },
  },
  created() {
    getCates(this.requestParams).then((res) => {
      this.shopCategoryList = res.content;
    });
  },
  methods: {
    handleClose() {
      this.$emit("update:visible", false);
    },
    init: function () {
      let that = this;
      request({
        url:
          that.requestUrl +
          "?" +
          qs.stringify(that.requestParams, { indices: false }),
        method: "get",
      }).then((res) => {
        if (this.table && this.table.length > 0) {
          if (res.data) {
            if (this.isNewApi) {
              this.table = this.table.concat(res.data.content);
            } else {
              this.table = this.table.concat(res.data);
            }
          }
        } else {
          if (res.data) {
            if (this.isNewApi) {
              this.table = res.data.content;
              this.tableTotal = 0 || res.data.totalElements;
            } else {
              if (res.data) {
                this.table = res.data;
                this.tableTotal = 0 || res.data.length;
              }
            }
          }
        } 
      });
    },
    Search: function () {
      this.table = [];
      this.requestParams.page = 0;
      this.requestParams.storeName = this.shopContent;
    },
    SelectItem: function (e) {
      this.selectItem = e;
      this.$store.commit("changeSelectItem", e);
    },
    CheckSelectItem: function () {
      if (this.selectItem.length > 0) {
        this.$emit("update:visible", false);
        this.$emit("selectItem", [...this.selectItem]);
      } else {
        this.$message.warning("请选择数据");
      }
    },
    // 加载更多
    load: function () {
      if (this.needLoad) {
        this.requestParams.page += 1;
      }
    },
    // 规定禁用功能
    selectable: function (row, index) {
      if (this.selectItem.length >= this.disableNumber) {
        this.selectItem.forEach((item, inx) => {
          if (item) {
            if (row.id == item.id) {
              row = false;
            }
          }
        });
        return !row;
      } else {
        return true;
      }
    },
  },
};
</script>