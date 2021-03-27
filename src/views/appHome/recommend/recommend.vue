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
            detail.isOpen == 1
              ? 'sail-app-status-tag-open'
              : 'sail-app-status-tag-close'
          "
          >{{ detail.isOpen == 1 ? "已开启" : "未开启" }}</span
        >
      </span>
      <span class="options">
        <el-button
          @click="ChangeStatus()"
          >{{ detail.isOpen === 1 ? "关闭" : "开启" }}</el-button
        >
        <el-button @click="$NavgitorTo('/recommendOption')">配置</el-button>
      </span>
    </h1>
    <div style="min-height: 200px">
      <el-row style="margin: 0 -10px">
        <el-col :span="16" style="padding-left: 10px; padding-right: 10px">
          <!-- 建议推荐的商品 -->
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
                v-model="detail.recommendType"
                size="medium"
                style="width: 100%"
                @change="detail.productRecommendInfoVo = []"
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
                v-if="detail.recommendType == 1"
                @click="ShowDiglog"
                >添加商品</el-button
              >
            </div>
            <div
              class="discountTargetList"
              v-if="
                detail.productRecommendInfoVo &&
                detail.productRecommendInfoVo.length > 0
              "
            >
              <table>
                <tr
                  v-for="(item, index) in detail.productRecommendInfoVo"
                  :key="item.id"
                >
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
          <div class="box" style="padding-top: 0px">
            <div class="tab">
              <div class="fr">
                <el-date-picker
                  v-model="date"
                  type="daterange"
                  align="right"
                  unlink-panels
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  :default-time="['00:00:00', '23:59:59']"
                  style="width: 240px;"
                >
                </el-date-picker>
              </div>
              <div
                class="tab-item"
                v-for="(item, index) in tabNav"
                :key="index"
                :class="active === index ? 'active' : ''"
                @click="ChangeType(index)"
              >
                <span>{{ item }}</span>
              </div>
            </div>
            <el-table :data="data[active]">
              <el-table-column prop="image" label="商品" width="86">
                <template slot-scope="scope">
                  <span
                    class="image"
                    :style="{ backgroundImage: 'url(' + scope.row.image + ')' }"
                  ></span>
                </template>
              </el-table-column>
              <el-table-column prop="storeName" label=""></el-table-column>
              <el-table-column prop="totalNum" label="次数" align="right" width="100"> 
              </el-table-column>
            </el-table>
            <el-pagination
              style="text-align: center;margin-left:-10px;margin-top:10px"
              @current-change="CurrentChange"
              :current-page.sync="currentPage"
              background
              :page-size="requestParams.size"
              layout="total, prev, pager, next"
              :total="total"
            ></el-pagination>
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
    <el-dialog title="请选择商品" width="640px" :visible.sync="shopDialog">
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
          v-model="requestParamsTable.tagId"
          placeholder="请选择分类"
          clearable
          style="width: 200px; margin-right: 10px"
          @change="
            () => {
              table = [];
              selectItem = [];
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
          @change="Search"
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
        infinite-scroll-delay="200"
        @selection-change="(e) => (selectItem = e)"
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
import { getlist, getInfo, edit, editStatus } from "@/api/yxStoreProductRecommend";
// import { get}
export default {
  data() {
    return {
      detail: {
        recommendType: 0,
        list: [],
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
      requestParamsTable: {
        page: 0,
        size: 30,
        tagId: "",
      },
      shopCategoryList: [],
      shopContent: "",
      table: [],
      tableTotal: "",
      selectItem: [],
      active: 0,
      tabNav: ["点击次数", "加购次数", "购买次数"],
      data: [],
      date: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      requestParams: {
        beginTime: "",
        endTime: "",
        size: 10,
        page: 0,
        count: 0,
        click: 0,
        countType:0,
      },
      currentPage:0,
      total:0,

    };
  },
  directives: {
    "el-table-infinite-scroll": elTableInfiniteScroll,
  },
  watch: {
    date: function (val) {
      this.requestParams.beginTime = val[0];
      this.requestParams.endTime = val[1];
      this.requestParams.count = this.active;
      this.requestParams.click = 0;
      this.data = [];
      this.GetList();
    },
  },
  created() {
    this.Init();
    getCates().then((res) => {
      this.shopCategoryList = res.content;
    });  
    let time = new Date().toLocaleDateString();
    this.date = [
      // '2020-10-11 00:00:00',
      time.replace(/\//g, "-") + " 00:00:00",
      time.replace(/\//g, "-") + " 23:59:59",
    ];
  },
  methods: {
    Init: function () {
      getInfo().then((res) => {
        this.detail = res;
      });
    },
    ChangeType: function (e) {
      this.table = [];
      this.active = e;
      this.requestParams.countType = e;
      this.requestParams.count = e;
      this.requestParams.click = 0;
      this.GetList();
    },
    GetList: function () {
      getlist(this.requestParams).then((res) => {
        this.data[0] = res.browseNumList
        this.data[1] = res.toCartNumList
        this.data[2] = res.buyNumList  
        this.total = res.totalElements; 
      });
    },
    // 分页选择
    CurrentChange: function (e) { 
      this.currentPage = e;
      this.requestParams.page = e - 1;
      this.GetList();
    },
    // 显示对话框
    ShowDiglog: function () {
      this.shopDialog = true;
      this.table = []; 
      this.requestParamsTable={
        page: 0,
        size: 30,
        tagId: "",
      },
      this.initData();
    },
    // 加载表单数据
    initData: function () { 
      get(this.requestParamsTable).then((res) => {
        let arr = this.table.concat(res.content);
        if (arr.length <= res.totalElements) {
          this.table = arr;
        } 
        this.tableTotal = res.totalElements; 
      });
    }, 
    // 搜索
    Search: function () {
      this.requestParamsTable.storeName = this.shopContent;
      this.table = [];
      this.selectItem = [];
      this.initData();
    },
    // 加载更多
    load: function (res) {
      this.requestParamsTable.page += 1;
      this.initData();
    },
    // 确认选中
    CheckSelectItem: function () {
      this.shopDialog = false; 
      if (
        this.detail.productRecommendInfoVo &&
        this.detail.productRecommendInfoVo.length > 0
      ) {
        this.selectItem.map((i) => {
          let bool = true;
          this.detail.productRecommendInfoVo.map((j) => {
            if (i.id == j.id) {
              bool = false;
            }
          });
          if (bool) {
            this.detail.productRecommendInfoVo.push(i);
          }
        });
      } else {
        this.detail.productRecommendInfoVo = this.selectItem;
      }
    },
    // 删除选中商品
    Del: function (index) {
      console.log(this.detail.productRecommendInfoVo);
      this.$nextTick(() => {
        this.detail.productRecommendInfoVo.splice(index, 1);
      });
    },
    // 控制当前应用是否开启
    ChangeStatus:function(){ 
      let par = {
        storeId:localStorage.getItem('storeId'), 
      } 
      this.detail.isOpen === 1?par.isOpen = 0:par.isOpen = 1; 
      editStatus(par).then((res)=>{
        this.$message.success("修改成功");
        this.Init(); 
      })
    },  
    Save: function () {
      let that = this;
      let arr = [];
      this.detail.productRecommendInfoVo.map((i) => {
        arr.push(i.id);
      });
      if(this.detail.recommendType == 1){
        if(arr.length<1){
          this.$message.error('请选择指定商品');
          return false;
        }
      }
      let par = {
        recommendType: this.detail.recommendType,
        appointProductId: arr.toString(),
      };
      edit(par).then(() => {
        that.$message.success("修改成功");
        that.Init(); 
      });  
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
.tab {
  position: relative;
  &::after {
    content: "";
    left: -12px;
    right: -12px;
    display: block;
    position: absolute;
    z-index: 1;
    border-bottom: 1px solid #eee;
  }
  .fr {
    float: right;
    margin-top: 10px;
  }
  .active {
    color: #1a1d2c !important;
    border-bottom: 4px solid #f49342 !important;
  }
  .tab-item {
    display: inline-block;
    padding: 0 10px;
    height: 50px;
    font-size: 14px;
    line-height: 50px;
    border-bottom: 4px solid #fcfdff;
    color: #5e7185;
    cursor: pointer;
  }
}
.image {
  border-radius: 4px;
  width: 60px;
  height: 60px;
  display: inline-block;
  border: 1px solid #dadde4;
  background-color: #f7f8fd;
  background-origin: content-box;
  background-position: 50% 50%;
  background-size: contain;
  background-repeat: no-repeat;
  overflow: hidden;
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
      i:hover {
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