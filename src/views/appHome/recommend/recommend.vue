<template>
  <div class="container">
    <router-link
      to="/appHome"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>我的应用</span>
    </router-link>
    <h1 class="title">
      <span class="text">
        推荐商品
        <span
          class="sail-app-status-tag"
          :class="
            detail.status == 1
              ? 'sail-app-status-tag-open'
              : 'sail-app-status-tag-close'
          "
          >{{ detail.status == 1 ? "已开启" : "未开启" }}</span
        >
      </span>
      <span class="options">
        <el-button
          @click="
            detail.status = detail.status === 1 ? 0 : 1;
            Save();
          "
          >{{ detail.status === 1 ? "关闭" : "开启" }}</el-button
        >
        <el-button>配置</el-button>
      </span>
    </h1>
    <div style="min-height: 200px">
      <el-row style="margin: 0 -10px">
        <el-col :span="16" style="padding-left: 10px; padding-right: 10px">
          <!-- 适用对象 -->
          <div class="box">
            <h3 class="title">
              <span>
                建议推荐的商品
                <span style="color: #606266; font-weight: normal"
                  >（以下商品将会在推荐商品列表中被展示）</span
                >
              </span>
            </h3>
            <div class="columns">
              <el-select
                v-model="detail.shopType"
                size="medium"
                style="width:100%"
                @change="detail.list = []"
              >
                <el-option
                :label="item.label"
                :value="item.id"
                v-for="item in list"
                :key="item.id"
              ></el-option>
              </el-select>
              <el-button
                style="margin-left: 20px"
                type="primary"
                size="medium"
                v-if="detail.shopType == 1"
                @click="ShowDiglog"
                >添加商品</el-button
              >
            </div>
            <div
              class="discountTargetList"
              v-if="detail.list && detail.list.length > 0"
            >
              <table>
                <tr v-for="(item, index) in detail.list" :key="item.id">
                  <td class="img"> 
                    <div
                      class="small-img"
                      :style="{ backgroundImage: 'url(' + item.image + ')' }"
                      v-show="item.image"
                    ></div>
                  </td>
                  <td class="text">
                    <span>{{ item.title || item.storeName }}</span>
                  </td>
                  <td class="option">
                    <i class="el-icon-delete-solid" @click="Del(index)"></i>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <!-- <div class="box">
            <h3 class="title">
              <span>
                建议推荐的商品
                <span style="color: #606266; font-weight: normal"
                  >（以下商品将会在推荐商品列表中被展示）</span
                >
              </span>
            </h3>
            <el-select
              v-model="detail.shopType"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                :label="item.label"
                :value="item.id"
                v-for="item in list"
                :key="item.id"
              ></el-option>
            </el-select>
          </div> -->
          <div class="box">
            <div class="tab">
              <div class="fr"></div>
              <div
                class="tab-item"
                v-for="(item, index) in tabNav"
                :key="index"
                :class="active === index ? 'active' : ''"
              ></div>
            </div>
          </div>
        </el-col>
        <el-col :span="8" style="padding-left: 10px; padding-right: 10px">
          <div class="box">
            <p class="infoTip">信息提示</p>
            <p class="infoContent">
              数据统计为推荐商品页面下的展示数据，统计最近30天内的使用推荐商品后反馈的数据。
            </p>
          </div> 
        </el-col>
      </el-row>
      <div class="pageSaveBtn">
        <el-button type="primary" @click="Save">保存</el-button>
      </div>
    </div>
    <!-- 选择商品 -->
    <el-dialog title="请选择商品" :visible.sync="shopDialog">
      <div class="search-conditions">
        <!-- 商品标签
            <el-select
              v-model="requestParams.shopLabelValue" 
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
          v-model="requestParams.tagId"
          placeholder="请选择分类"
          style="width: 200px"
          @change="
            () => {
              table = [];
              initData();
            }
          "
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
          v-model="shopContent"
          placeholder="请输入内容"
        >
          <el-button slot="append" @click="Search">查询</el-button>
        </el-input>
      </div>
      <el-table
        v-if="table.length > 0"
        :data="table"
        style="width: 100%"
        empty-text
        v-el-table-infinite-scroll="load"
        @selection-change="e=>selectItem = e"
      >
        <el-table-column type="selection" width="55"></el-table-column>
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
        <el-button @click="shopDialog = false">取消</el-button>
        <el-button type="primary" @click="CheckSelectItem">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template> 
<script> 
import elTableInfiniteScroll from "el-table-infinite-scroll";
import { getCates } from "@/api/yxStoreCategory";
import { get } from "@/api/yxStoreProduct";
// import { get}
export default {
  data() {
    return {
      detail: {
        status: 0,
        shopType: 0,
        list:[],
      },
      list: [
        {
          id: 0,
          label: "全部商品",
        },
        {
          id: 1,
          label: "指定商品",
        },
        {
          id: 2,
          label: "同类商品",
        },
      ],
      shopDialog: false,
      requestParams: {
        page: 0,
        size: 30,
        tagId: "",
      },
      shopCategoryList: [],
      shopContent: "",
      table:[],
      tableTotal:'',
      selectItem:[], 
      active: 0,
      tabNav: ["点击次数", "加购次数", "购买次数"],
    };
  },
  directives: {
    "el-table-infinite-scroll": elTableInfiniteScroll,
  },
  created() {
    this.Init();
    getCates(this.requestParams).then((res) => {
      console.log(res);
      this.shopCategoryList = res.content;
    });
  },
  methods: {
    Init: function () {
      // get().then((res) => {
      //   if (res.content.length > 0) {
      //     this.detail = res.content[0];
      //     this.detail.type = Boolean(res.content[0].type); 
      //   }
      // });
    },
    // 显示对话框
    ShowDiglog: function () {
      this.shopDialog = true;
      this.table = [];
      this.initData();
    },
    // 加载表单数据
    initData: function () {
      get(this.requestParams).then((res) => {
        console.log(res);
        let arr = this.table.concat(res.content);
        if (arr.length <= res.totalElements) {
          this.table = arr;
        }
        this.tableTotal = res.totalElements;
      });
    },
    // 搜索
    Search: function () {
      this.requestParams.storeName = this.shopContent;
      this.table = [];
      this.initData();
    },
    // 加载更多
    load: function (res) {
      this.requestParams.page += 1;
      this.initData();
    }, 
    // 确认选中
    CheckSelectItem: function () {
      this.shopDialog = false;
      let arr = [];
      this.selectItem.map((i) => {
        let obj = {
          id: i.id,
          image: i.image,
          title: i.storeName,
        };
        arr.push(obj);
      });
      if (this.detail.list && this.detail.list.length > 0) {
        arr.map((i) => {
          let bool = true;
          this.detail.list.map((j) => {
            if (JSON.stringify(i) == JSON.stringify(j)) {
              bool = false;
            }
          });
          if (bool) {
            this.detail.list.push(i);
          }
        });
      } else {
        this.detail.list = arr;
      }
    },
    // 删除选中商品
    Del: function (index) { 
      console.log(this.detail.list)
      this.$nextTick(() => {
        this.detail.list.splice(index, 1);
      });
    },
    Save: function () {
      let that = this;
      this.detail.status = this.status;
      this.detail.type = Number(this.detail.type);
      if (this.detail.id) {
        edit(this.detail).then(() => {
          Tip();
        });
      } else {
        delete this.detail.id;
        add(this.detail).then(() => {
          Tip();
        });
      }
      function Tip() {
        that.$message.success("修改成功");
        that.Init();
      }
      // this.$router.push('/appHome')
    },
  },
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
}

h1 {
  height: 40px;
  font-size: 24px;
  margin: 0 0 12px;
  font-weight: 400;
  line-height: 40px;
  display: flex;
  justify-items: center;
  justify-content: space-between;
  flex: 1;
}
.sail-app-status-tag-open {
  border: 2px solid #fff;
  background: #bbe5b3;
  color: #414f3e;
}
.sail-app-status-tag-close {
  background: #dfe3e8;
  border: 2px solid #fff;
  color: #454f5b;
}
.sail-app-status-tag {
  border-radius: 100px;
  width: 60px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 13px;
  text-align: center;
  position: relative;
  top: -4px;
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
  .title {
    color: #1a1d2c;
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 12px;
    .option {
      font-size: 14px;
      color: #273a8a;
      float: right;
      cursor: pointer;
      text-decoration: underline;
      font-weight: 400;
    }
  }
}
.columns {
    display: flex;
    margin-bottom: 12px;
  }
.discountTargetList {
    width: 100%;
    padding: 0 12px;
    line-height: 23px;
    margin: 2px 0;
    position: relative;
    box-sizing: border-box;
    table {
      width: 100%;
      position: relative;
      tr {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ececec;
        .img {
          width: 60px;
        }
        .text {
          padding-left: 12px;
          flex: 1;
        }
        .option {
          width: 40px;
          text-align: center;
          color: #c1c2cc;
        }
        i:hover{
          cursor: pointer;
        }
        td {
          padding: 10px 0;
        }
        &:last-child {
          border: none;
        }
      }
    }
    &::before {
      content: "";
      left: -12px;
      right: -12px;
      display: block;
      position: absolute;
      border-top: 1px solid #eee;
    }
  }
// .off-the-shelf {
//   color: rgb(202, 203, 214);
//   border: 1px solid rgb(202, 203, 214);
//   padding: 4px 8px;
//   display: inline-block;
//   font-size: 12px;
//   line-height: 1;
//   border-radius: 11px;
// }
// .textBtn {
//   padding: 0;
//   margin-right: 10px;
//   color: #273a8a;
//   font-size: 14px;
//   cursor: pointer;
//   display: inline-block;
//   font-weight: 400;
// }
</style> 