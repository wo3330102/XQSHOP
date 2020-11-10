<template>
  <div>
    <el-dialog
      title="添加菜单"
      width="640px"
      :visible.sync="showAddMenuCom"
      @close="CloseDialog"
    >
      <p class="title">已选取菜单类别</p>
      <el-input :readonly="true" v-model="inputValue"></el-input>
      <div class="content">
        <ul class="left">
          <li
            v-for="(item, index) in nav"
            :key="item.label"
            :class="active === index ? 'active' : ''"
            @click="getData(index)"
          >
            {{ item.label }}
          </li>
        </ul>
        <div class="el-table">
          <el-table
            height="400px"
            ref="table"
            v-el-table-infinite-scroll="load"
            :infinite-scroll-delay="100"
            :infinite-scroll-distance="100"
            :data="tableData"
            :show-header="false"
            v-loading="loading"
            @selection-change="SelectionChange"
            @select="Radio"
          >
            <el-table-column
              v-if="tableData.length > 0"
              type="selection"
              width="40"
            ></el-table-column>
            <el-table-column
              v-for="item in tableHeader"
              :key="item.id"
              :prop="item.prop"
              :width="item.width"
            >
              <template slot-scope="scope">
                <span
                  v-if="item.prop == 'image'"
                  class="small-img"
                  :style="{ backgroundImage: 'url(' + scope.row.image + ')' }"
                ></span>
                <span
                  v-else-if="item.prop == 'pic'"
                  class="small-img"
                  :style="{ backgroundImage: 'url(' + scope.row.pic + ')' }"
                ></span>
                <el-input
                  v-else-if="item.prop == 'url'"
                  v-model="url"
                  placeholder="请输入自定义链接"
                ></el-input>
                <span v-else>{{ scope.row[item.prop] }}</span>
              </template>
            </el-table-column>
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
import elTableInfiniteScroll from "el-table-infinite-scroll";
import request from "@/utils/request";
import qs from "qs";
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    index: {
      default: "",
    },
    isRadio: {
      type: Boolean,
      default: false,
    },
  },
  directives: {
    "el-table-infinite-scroll": elTableInfiniteScroll,
  },
  created() {
    if (this.index) {
      this.active = Number(this.index);
      this.getData(this.active);
    } else {
      this.getData(0);
    }
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
          url: "api/yxStorePageBoard",
        },
        {
          label: "自定义链接",
          url: "",
        },
        {
          label: "政策条款",
          url: "",
        },
      ],
      active: 0,
      tableData: [],
      tableHeader: [],
      params: {
        page: 0,
        size: 20,
      },
      subData: [],
      inputValue: "",
      loading: true,
      url: "",
      radio: this.isRadio,
    };
  },
  methods: {
    CloseDialog: function () {
      this.$emit("Close", false);
    },
    Radio: function (e) {
      if (this.radio) {
        this.$refs.table.clearSelection();
        this.$refs.table.toggleRowSelection(e[e.length - 1]);
      }
    },
    SelectionChange: function (e) {
      let that = this;
      let arr = [];
      let input = "";
      // 至此  arr 为需要数据
      if (this.radio) {
        if (e.length > 0) {
          if (e[0]) { 
            let object = {};
            object.name = e[e.length - 1].storeName || e[e.length - 1].title;
            object.id = e[e.length - 1].id;
            object.label = that.active; 
            that.inputValue = object.name;
            this.subData = [object];
          }
        } else {
          that.inputValue = "";
          this.subData = [];
        }
        // 单选规则
      } else {
        //  多选规则
        e.map((j) => {
          let object = {};
          object.name = j.storeName || j.title;
          object.id = j.id;
          object.label = that.active;
          arr.push(object);
        });
        let onOff = false;
        this.subData.map((i) => {
          // 如果当前对象在提交数据变量中，则开关打开
          if (i && i.label == that.active) {
            onOff = true;
            i.data = arr;
          }
        });
        if (!onOff) {
          //提交数据变量中含有不含有该分类数据，新增
          let obj = {
            label: that.active,
            data: arr,
          };
          that.subData.push(obj);
        }
        that.subData.map((i) => {
          if (i.data.length > 0) {
            input += this.nav[i.label].label + "(" + i.data.length + ")，";
          }
        });
        that.inputValue = input;
      }
    },
    submitForm: function () {
      let arr = [];
      if (this.subData.length > 0) {
        if (this.radio) { 
          if (this.subData[0].label === 3) {
            this.subData[0].url = this.url;
          }
          arr = this.subData;
        } else {
          this.subData.map((i) => {
            if (i.label === 3) {
              console.log("自定义链接");
              i.data[0].url = this.url;
            }
            arr = arr.concat(i.data);
          });
        }
        this.$emit("selectData", arr);
        this.$emit("Close", false);
      } else {
        this.$message.warning("请选择页面");
      }
    },
    load() {
      let that = this;
      if (this.params.page === 0) {
        this.params.page += 1;
      } else {
        request({
          url:
            that.nav[that.active].url +
            "?" +
            qs.stringify(that.params, { indices: false }),
          method: "get",
        }).then((res) => {
          let arr = this.tableData.concat(res.content);
          if (arr.length <= res.totalElements) {
            this.tableData = arr;
          }
        });
        this.params.page += 1;
      }
    },
    getData(e) { 
      this.loading = true;
      this.active = e;
      let that = this;
      this.tableData = [];
      this.tableHeader = [];
      this.params.page = 0;
      switch (e) {
        case 0:
          that.tableHeader = [
            {
              prop: "pic",
              width: 80,
            },
            {
              prop: "title",
              label: "标题",
              width: 351,
            },
          ];
          break;
        case 1:
          that.tableHeader = [
            {
              prop: "image",
              width: 80,
            },
            {
              prop: "storeName",
              label: "标题",
              width: 351,
            },
          ];
          break;
        case 2:
          that.tableHeader = [
            {
              prop: "title",
            },
          ];
          break;
        case 3:
          that.tableHeader = [
            {
              prop: "url",
            },
          ];
          break;
      }
      if (that.nav[e].url) {
        request({
          url:
            that.nav[e].url +
            "?" +
            qs.stringify(that.params, { indices: false }),
          method: "get",
        }).then((res) => {
          this.tableData = res.content;
          this.loading = false;
        });
      } else {
        if (e == 3) {
          this.tableData = [
            {
              url: "",
              id: 0,
              title: "External links",
            },
          ];
          this.loading = false;
          console.log("自定义输入框");
        }
      }
    },
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
.el-table {
  border-left: 1px solid #ddd;
  /deep/.cell {
    vertical-align: center;
    text-overflow: initial;
  }
  /deep/ .el-table--enable-row-transition .el-table__body td {
    height: 70px;
  }
  /*滚动条样式*/
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px;
    margin-right: 2px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    background: #d5d5e6;
  }
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 6px;
    background: #f5f5f9;
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
</style>