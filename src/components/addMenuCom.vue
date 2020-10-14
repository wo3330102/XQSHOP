<template>
  <div>
    <el-dialog
      title="添加菜单"
      width="40%"
      :visible.sync="showAddMenuCom"
      @close="CloseDialog"
    >
      <p class="title">已选取菜单类别</p>
      <el-input :readonly="true"></el-input>
      <div class="content">
        <ul class="left">
          <li
            v-for="(item, index) in nav"
            :key="item.url"
            :class="active === index ? 'active' : ''"
            @click="getData(index)"
          >
            {{ item.label }}
          </li>
        </ul>
        <div class="el-table">
          <el-table
            border
            height="400px"
            v-el-table-infinite-scroll="load"
            :data="tableData1"
            :show-header="false"
            v-show="active === 0"
          >
            <el-table-column type="selection" width="40"> </el-table-column>
            <el-table-column prop="image" width="80"> </el-table-column>
            <el-table-column prop="title" width="351" > </el-table-column>
          </el-table>
          <el-table
            border
            height="400px"
            v-el-table-infinite-scroll="load"
            :data="tableData2"
            :show-header="false"
            v-show="active === 1"
          >
            <el-table-column prop="date" label="日期" width="180"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
          <el-table
            border
            height="400px" 
            :data="tableData3"
            v-el-table-infinite-scroll="load"
            :show-header="false"
            v-show="active === 2"
          >
            <el-table-column prop="date" label="日期" width="180"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
          <el-table
            border
            height="400px" 
            :data="tableData4"
            v-show="active === 3"
            :show-header="false"
          >
            <el-table-column prop="date" label="日期" width="180"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
          <el-table
            border
            height="400px" 
            :data="tableData5"
            v-show="active === 4"
            :show-header="false"
          >
            <el-table-column prop="date" label="日期" width="180"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </div>
      </div> 
      <span slot="footer" class="dialog-footer">
        <el-button @click="CloseDialog">取 消</el-button>
        <el-button type="submit" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import elTableInfiniteScroll from 'el-table-infinite-scroll';
import request from "@/utils/request";
import qs from 'qs'
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  directives: {
    'el-table-infinite-scroll': elTableInfiniteScroll
  },
  watch: {
    show: function (newVal, oldVal) {
      console.log("newVal", newVal);
      console.log("oldVal", oldVal);
      // this.showAddMenuCom = newVal
    },
  },
  data() {
    return {
      showAddMenuCom: true,
      selectMenu: [],
      nav: [
        {
          label: "分类页",
          url: "api/yxStoreTag",
        },
        {
          label: "商品详情页",
          url: "api/yxStoreProduct",
        },
        {
          label: "自定义页面",
          url: "3",
        },
        {
          label: "自定义链接",
          url: "4",
        },
        {
          label: "政策条款",
          url: "5",
        },
      ],
      active: 0,
      tableData1:[],
      tableData2:[],
      tableData3:[],
      tableData4:[],
      tableData5:[],
      params:{}
    };
  },
  methods: {
    CloseDialog: function () {
      this.$emit("Close", false);
    },
    ChangeActive: function (index) {
      this.active = index;
    },
    SelectChange: function (e) {
      console.log(e);
    },
    submitForm: function (res) {
      console.log(res);
      console.log(this.selectMenu);
      this.$emit("selectData", this.selectMenu);
      this.$emit("Close", false);
    },
    load() {
      this.$message.success('加载下一页');
      let page = this.page +1; 
      // this.tableData = this.tableData.concat();
      
    },
    getData(e){ 
      this.active = e;
      let that = this;
      if(that.nav[e].url){
        request({
          url: that.nav[e].url + '?' + qs.stringify(that.params, { indices: false }),
          method: "get", 
        }).then((res) => {
          console.log(res);
          this['tableData'+e] = res.content
        })
      }
    }
  },
  destroyed() {
    console.log("销毁");
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #202b37;
  line-height: 20px;
  margin-bottom: 12px;
}
.active {
  background: #eef1ff;
}
.content {
  display: flex;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  margin-top: 20px;
  .left {
    height: 350px;
    li {
      padding: 0 10px;
      width: 120px;
      height: 36px;
      line-height: 36px;
      border-bottom: 1px solid #dcdfe6;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
}
</style>