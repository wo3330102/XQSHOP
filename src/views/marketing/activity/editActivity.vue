<template>
  <div class="container">
    <router-link
      to="/activity"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>优惠活动</span>
    </router-link>
    <h1 class="title">
      <span class="text">
        {{ id ? detail.discountName : "创建优惠活动" }}
      </span>
      <span class="options">
        <el-dropdown @command="Option" v-if="id > 0">
          <el-button>
            操作
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>标记已完成</el-dropdown-item> -->
            <el-dropdown-item :command="1">{{
              detail.status == 1 ? "关闭" : "开启"
            }}</el-dropdown-item>
            <el-dropdown-item :command="2">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </h1>
    <div>
      <el-row>
        <el-col :span="16">
          <!-- 活动名称 -->
          <div class="box info">
            <h3 class="title">活动名称</h3>
            <div>
              <el-input
                v-model="detail.discountName"
                size="medium"
                placeholder="请输入活动名称"
              ></el-input>
            </div>
          </div>
          <!-- 优惠类型 -->
          <div class="box">
            <h3 class="title">优惠类型</h3>
            <div style="display: flex">
              <el-select
                v-model="detail.discountType"
                size="medium"
                style="width: 180px; margin-right: 20px"
                @change="
                  detail.discountMoney = '';
                  detail.discountQuota = '';
                "
                :disabled="disabled"
              >
                <el-option
                  v-for="item in discountTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <!-- 固定金额 -->
              <el-input
                v-model="detail.discountMoney"
                @change="DiscountPrice"
                v-if="detail.discountType === 0"
                size="medium" 
                @blur="detail.discountMoney = $IsNaN(detail.discountMoney)"
                :maxlength="discountTypeValueOfInfomation[0].maxlength"
                :placeholder="discountTypeValueOfInfomation[0].placeholder"
                style="flex: 1"
              >
                <span slot="prefix" style="line-height: 36px; margin-left: 3px"
                  >{{currency.s}}</span
                >
                <span slot="prepend">{{
                  discountTypeValueOfInfomation[0].prepend
                }}</span>
              </el-input>
              <!-- 折扣 -->
              <el-input
                v-model="detail.discountQuota"
                @change="DiscountPrice"
                v-if="detail.discountType === 1"
                size="medium"
                :maxlength="discountTypeValueOfInfomation[1].maxlength"
                :placeholder="discountTypeValueOfInfomation[1].placeholder"
                style="flex: 1"
              >
                <span slot="suffix" style="line-height: 36px; margin-left: 3px"
                  >%</span
                >
                <span slot="prepend">{{
                  discountTypeValueOfInfomation[1].prepend
                }}</span>
              </el-input>
            </div>
          </div>
          <!-- 适用对象 -->
          <div class="box">
            <h3 class="title">适用对象</h3>
            <div class="columns">
              <el-select
                v-model="detail.applyObject"
                size="medium"
                style="flex: 1"
                @change="detail.list = []"
              >
                <el-option
                  v-for="item in appliedObjectList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-button
                style="margin-left: 20px"
                type="primary"
                size="medium"
                v-if="detail.applyObject == 1 || detail.applyObject == 2"
                @click="ShowDiglog"
                >{{
                  detail.applyObject == 2 ? "添加商品" : "添加分类"
                }}</el-button
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
                      :style="{ backgroundImage: 'url(' + item.pic + ')' }"
                      v-show="item.pic"
                    ></div>
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
          <!-- 生效条件 -->
          <div class="box">
            <h3 class="title">生效条件</h3>
            <div style="display: flex">
              <el-select
                v-model="detail.effectCondition"
                size="medium"
                style="width: 180px; margin-right: 20px"
              >
                <el-option
                  v-for="item in effectConditionsList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <div v-if="detail.effectCondition == 1" style="flex: 1">
                <el-input v-model="detail.effectMoney" @blur="detail.effectMoney = $IsNaN(detail.effectMoney)" maxlength="8" placeholder>
                  <span
                    slot="prefix"
                    style="line-height: 36px; margin-left: 3px"
                    >{{currency.s}}</span
                  >
                </el-input>
                <span
                  v-if="detail.applyObject == 1 || detail.applyObject == 2"
                  style="
                    color: rgb(94, 113, 133);
                    margin-top: 12px;
                    font-size: 12px;
                  "
                  >仅适用于{{
                    appliedObjectList[detail.applyObject].label
                      ? appliedObjectList[detail.applyObject].label
                      : ""
                  }}</span
                >
              </div>
            </div>
          </div>
          <!-- 有效日期 -->
          <div class="box info">
            <h3 class="title">
              有效日期
              <span
                style="
                  color: rgb(194, 195, 205);
                  font-size: 12px;
                  font-weight: 400;
                "
                >（开始时间按设置日期的北京时间0时开始，结束时间按设置日期的北京时间24时结束）</span
              >
            </h3>
            <div style="display: flex">
              <span class="time-group">
                <span class="time-desc">开始日期</span>
                <el-date-picker
                  size="medium"
                  v-model="detail.startTime"
                  type="date"
                  placeholder="请选择活动开始时间"
                  format="yyyy/MM/dd"
                  value-format="timestamp"
                  :picker-options="startOptions"
                ></el-date-picker>
                <!-- :default-time="['00:00:00']" -->
              </span>
              <span class="time-group">
                <span class="time-desc">结束日期</span>
                <el-date-picker
                  size="medium"
                  v-model="detail.endTime"
                  type="date"
                  placeholder="不填则永久有效"
                  format="yyyy/MM/dd"
                  value-format="timestamp"
                  :picker-options="endOptions"
                ></el-date-picker>
                <!-- :default-time="['23:59:59']" -->
              </span>
            </div>
          </div>
          <!-- 优惠码 -->
          <div class="box info">
            <h3 class="title">
              优惠码
              <span class="option" v-if="!id" @click="generateMixed(6)"
                >自动生成优惠码</span
              >
            </h3>
            <div>
              <p style="margin-bottom: 10px">
                <el-checkbox
                  v-model="isAutoApplyOffers"
                  :disabled="disabled"
                  @change="detail.promoCode = ''"
                  >自动应用优惠</el-checkbox
                >
              </p>
              <el-input
                :disabled="isAutoApplyOffers || id !== ''"
                v-model="detail.promoCode"
                size="medium"
                placeholder="请输入优惠码，如：XMAS20OFF"
              ></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box">
            <div class="content">
              <h3 class="title">优惠活动名称</h3>
              <div class="info">
                <p>
                  <span class="title">优惠码</span>
                  <span class="text">{{
                    detail.promoCode ? detail.promoCode : "--"
                  }}</span>
                </p>
                <p style="margin: 14px 0px">
                  <span class="title">优惠类型</span>
                  <span class="text">
                    <template
                      v-if="detail.discountMoney || detail.discountQuota"
                    >
                      <template v-if="detail.discountType === 0">
                        减免{{currency.s+ detail.discountMoney }}
                        <span class="en"
                          >({{ currency.s + detail.discountMoney }} off)</span
                        >
                      </template>
                      <template v-if="detail.discountType === 1">
                        减{{ detail.discountQuota }}%
                        <span class="en"
                          >({{ detail.discountQuota }}% off)</span
                        >
                      </template>
                    </template>
                    <template v-else-if="detail.discountType == 2">
                      免运费
                      <span class="en">(Free shipping)</span>
                    </template>
                    <template v-else>--</template>
                  </span>
                </p>
                <p style="margin-bottom: 22px" v-show="detail.effectMoney">
                  <span class="title">生效条件</span>
                  <span class="text">
                    最低消费金额 {{currency.s+ detail.effectMoney }}
                    <span class="en"
                      >(Mininum purchase of {{currency.s+ detail.effectMoney }})</span
                    >
                  </span>
                </p>
                <p style="margin-bottom: 22px">
                  <span class="title">有效时间</span>
                  <span class="text">
                    <template v-if="detail.startTime"
                      >{{ new Date(detail.startTime).toLocaleDateString() }} 至
                      {{
                        detail.endTime
                          ? new Date(detail.endTime).toLocaleDateString()
                          : "永久有效"
                      }}</template
                    >
                    <template v-else>--</template>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div class="box" v-if="id">
            <h3 class="title">使用情况</h3>
            <div class="used-info">
              <dl>
                <dt>{{ detail.nums || 0 }}</dt>
                <dd>使用次数</dd>
              </dl>
              <dl>
                <dt>{{currency.s}}{{$IsNaN(detail.discountTotal) || '0.00' }}</dt>
                <dd>优惠金额</dd>
              </dl>
              <dl>
                <dt>{{currency.s}}{{$IsNaN(detail.saleTotal) ||'0.00' }}</dt>
                <dd>销售总额</dd>
              </dl>
            </div>
          </div>
          <div class="box">
            <p class="infoTip">温馨提示</p>
            <p class="infoContent">
              折扣码与自动折扣无法同时使用。如果在结账时使用了手动优惠码，那么自动优惠将失效。
            </p>
          </div>
        </el-col>
      </el-row>
      <div class="pageSaveBtn">
        <el-button @click="$NavgitorTo('/activity')">取消</el-button>
        <el-button type="primary" @click="Save">保存</el-button>
      </div>
      <el-dialog title="请选择商品" :visible.sync="shopDialog">
        <div class="search-conditions">
          <template v-if="detail.applyObject === 1">
            <el-input size v-model="shopContent" placeholder="请输入内容">
              <el-button slot="append" @click="Search">查询</el-button>
            </el-input>
          </template>
          <template v-else>
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
              v-model="requestParams.tagId"
              size
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
              size
              v-model="shopContent"
              placeholder="请输入内容"
            >
              <el-button slot="append" @click="Search">查询</el-button>
            </el-input>
          </template>
        </div>
        <el-table
          v-if="table.length > 0"
          :data="table"
          style="width: 100%"
          empty-text
          v-el-table-infinite-scroll="load"
          @selection-change="SelectItem"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <template v-if="detail.applyObject === 1">
            <el-table-column
              align="left"
              width="80"
              prop="pic"
              label="分类图片"
            >
              <template slot-scope="scope">
                <span
                  class="small-img"
                  :style="{ backgroundImage: 'url(' + scope.row.pic + ')' }"
                ></span>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              prop="title"
              label="分类名称"
            ></el-table-column>
          </template>
          <template v-else>
            <el-table-column
              align="left"
              width="80"
              prop="image"
              label="商品图片"
            >
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
          </template>
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
  </div>
</template> 
<script>
var chars = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
import elTableInfiniteScroll from "el-table-infinite-scroll";
import { add, edit, editStatus, del } from "@/api/yxStorePromotions";
import { get } from "@/api/yxStoreProduct";
import { getCates } from "@/api/yxStoreCategory";
// import {}
export default {
  data() {
    return {
      id: "",
      detail: {
        discountType: 0,
        applyObject: 0,
        status: 1, // 0关闭 1开启
        discountQuota: 0, // 默认折扣百分比为0
        startTime: new Date().getTime(),
        effectCondition: 0, // 生效条件
        list: [],
        promoCode: "",
      },
      discountTypeList: [
        // 商品属性列表
        {
          value: 0,
          label: "固定优惠",
        },
        {
          value: 1,
          label: "%折扣",
        },
        {
          value: 2,
          label: "免运费",
        },
      ],
      discountTypeValueOfInfomation: [
        {
          maxlength: 8,
          placeholder: "请填写优惠金额",
          prepend: "优惠金额",
        },
        {
          maxlength: 2,
          placeholder: "如输入12，相当于适用对象八八折",
          prepend: "折扣额度",
        },
      ],
      appliedObjectList: [
        // 商品属性列表
        {
          value: 0,
          label: "整个订单",
        },
        {
          value: 1,
          label: "指定商品分类",
        },
        {
          value: 2,
          label: "指定商品",
        },
      ],
      effectConditionsList: [
        // 生效条件列表
        {
          value: 0,
          label: "不限",
        },
        {
          value: 1,
          label: "消费满",
        },
      ],
      isAutoApplyOffers: false, // 是否自动适应优惠
      disabled: false,
      requestParams: {
        size: 30,
        page: 0,
      },
      shopDialog: false, // 是否显示选择商品对话框
      shopLabelValue: "", // 商品标签
      shopLabelList: [], // 商品标签列表
      shopCategoryValue: "", // 商品分类
      shopCategoryList: [], // 商品分类列表
      shopContent: "", // 商品内容
      table: [], // 表单数据
      tableTotal: 0,
      selectItem: [], // 已选择数据
      startOptions: {
        disabledDate(time) {
          return time.getTime() < new Date().getTime() - 8.64e7;
        },
      },
      endOptions: {},
    };
  },
  directives: {
    "el-table-infinite-scroll": elTableInfiniteScroll,
  },
  watch: {
    discountTypeValue: function (n, o) {
      switch (n) {
        case 1:
          this.discountTypeValueOfInfomation = {
            maxlength: 8,
            placeholder: "请填写优惠金额",
            prepend: "优惠金额",
          };
          break;
        case 2:
          this.discountTypeValueOfInfomation = {
            maxlength: 2,
            placeholder: "如输入12，相当于适用对象八八折",
            prepend: "折扣额度",
          };
          break;
      }
    },
  },
  created() {
    if (this.$route.query.hasOwnProperty("id")) {
      this.id = this.$route.query.id;
      let detail = JSON.parse(localStorage.getItem("activityDetail"));
      detail.list = [];
      switch (detail.applyObject) {
        // 商品分类
        case 1:
          if (detail.tagIds) {
            detail.list = JSON.parse(detail.tagIds);
          }
          break;
        // 商品
        case 2:
          console.log(detail.prodIds)
          if (detail.prodIds) {
            detail.list = JSON.parse(detail.prodIds);
          }
          break;
      }
      if (detail.promoCode) {
        this.isAutoApplyOffers = false;
      } else {
        this.isAutoApplyOffers = true;
      }
      console.log(detail)
      detail.discountMoney = this.$IsNaN(detail.discountMoney)
      detail.effectMoney = this.$IsNaN(detail.effectMoney)
      this.detail = detail;
      this.disabled = true;
    }
    getCates(this.requestParams).then((res) => {
      console.log(res);
      this.shopCategoryList = res.content;
    });
    let that = this;
    this.endOptions = {
      disabledDate(time) {
        return time.getTime() < that.detail.startTime - 8.64e7;
      },
    };
  },
  methods: {
    // 活动操作
    Option: function (e) {
       let that = this;
      let storeId = localStorage.getItem("storeId");
      switch (e) {
        case 1:
          // 开启或关闭
          let par = {
            id: this.id,
            status: this.detail.status === 1 ? 0 : 1,
            storeId: storeId,
          };
          editStatus(par).then((res) => {
            this.$message.success("修改成功");
            this.$router.push("/activity");
          });
          break;
        case 2:
          // 删除
          let pars = [this.id];
          this.$DelTip(function(){
            del(pars).then(() => {
            that.$message.success("删除成功");
            that.$router.push("/activity");
          });
          })
          break;
      }
    },
    DiscountPrice: function (e) {
      let num = this.$toDecimal2(e);
      console.log(num);
      if (this.detail.discountType === 0 && num) {
        this.detail.discountMoney = num;
      } else{
        this.detail.discountMoney = '';
      }
    },
    // 显示对话框
    ShowDiglog: function () {
      this.requestParams = {
        size: 30,
        page: 0,
      };
      this.shopDialog = true;
      this.table = [];
      console.log(this.detail.applyObject);
      this.initData();
    },
    // 加载表单数据
    initData: function () {
      switch (this.detail.applyObject) {
        // 1为商品分类  2为商品
        case 1:
          getCates(this.requestParams).then((res) => {
            console.log(res);
            let arr = this.table.concat(res.content);
            if (arr.length <= res.totalElements) {
              this.table = arr;
            }
            this.tableTotal = res.totalElements;
          });
          break;
        case 2:
          get(this.requestParams).then((res) => {
            console.log(res);
            let arr = this.table.concat(res.content);
            if (arr.length <= res.totalElements) {
              this.table = arr;
            }
            this.tableTotal = res.totalElements;
          });
          break;
      }
    },
    // 加载更多
    load: function (res) {
      this.requestParams.page += 1;
      this.initData();
    },
    SelectItem: function (e) {
      this.selectItem = e;
    },
    CheckSelectItem: function () {
      this.shopDialog = false;
      let arr = [];
      switch (this.detail.applyObject) {
        // 商品分类
        case 1:
          this.selectItem.map((i) => {
            let obj = {
              id: i.id,
              image: i.pic,
              title: i.title,
            };
            arr.push(obj);
          });
          break;
        // 商品
        case 2:
          console.log(2);
          this.selectItem.map((i) => {
            let obj = {
              id: i.id,
              image: i.image,
              title: i.storeName,
            };
            arr.push(obj);
          });
          break;
      }
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
    Del: function (index) {
      console.log(index);
      this.$nextTick(() => {
        this.detail.list.splice(index, 1);
      });
    },
    Search: function () {
      if (this.detail.applyObject == 1) {
        this.requestParams.title = this.shopContent;
        this.table = [];
        this.initData();
      } else {
        this.requestParams.storeName = this.shopContent;
        this.table = [];
        this.initData();
      }
    },
    Save: function () {
      if (this.detail.discountName == "") {
        this.$message.error("请输入活动名称");
        return false;
      }
      if (this.detail.startTime == "" || this.detail.startTime == null) {
        this.$message.error("请选择活动开始时间");
        return false;
      }
      if (this.detail.endTime) {
        this.detail.endTime = this.detail.endTime + 24 * 60 * 60 * 1000 - 1000;
      }
      if (this.detail.discountType === 0) {
        if (this.detail.discountMoney <= 0) {
          this.$message.error("请填写优惠金额，金额必须大于0");
          return false;
        }
      } else {
        if (!this.detail.discountQuota) {
          this.$message.error("请输入优惠折扣");
          return false;
        }
      }
      if (this.detail.effectCondition == 1) {
        if (this.detail.effectMoney <= 0) {
          this.$message.error("请填写生效条件金额，金额必须大于0");
          return false;
        }
      } 
      if (this.detail.list && this.detail.list.length > 0) {
        switch (this.detail.applyObject) {
          // 商品分类
          case 1: 
            this.detail.tagIds = JSON.stringify([...this.detail.list]);
            break;
          // 商品
          case 2:
            this.detail.prodIds = JSON.stringify([...this.detail.list]);
            break;
        }
      } else {
        
        this.detail.prodIds = "";
        this.detail.tagIds = "";
        if(this.detail.applyObject == 1 || this.detail.applyObject == 2){
          this.$message.warning('请选择适用对象')
          return false
        }
      }
      let par = { ...this.detail }; 
      delete par.list;
      console.log(this.detail);
      if (this.id) {
        // 修改
        edit(par).then((res) => {
          this.$message.success("修改成功");
          this.$router.push("/activity");
        });
      } else {
        // 新增
        add(par).then((res) => {
          this.$message.success("新增成功");
          this.$router.push("/activity");
        });
      }
    },
    generateMixed: function (n) {
      var res = "";
      for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
      }
      console.log(res);
      this.$nextTick(() => {
        this.detail.promoCode = res;
      });
    },
  },
  updated() {
    console.log("更新");
  },
};
</script>
<style lang="scss" scoped>
h1 {
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: 400;
  height: 40px;
  line-height: 40px;
  .options {
    float: right;
  }
}
/deep/.el-row {
  margin: 0 -10px;
  .el-col {
    padding: 0 10px;
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
  & > .title {
    color: #1a1d2c;
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 12px;
    .option {
      color: #273a8a;
      cursor: pointer;
      text-decoration: underline;
      font-size: 12px;
      float: right;
      font-weight: 400;
    }
    .title-des {
      color: #808598;
      font-size: 12px;
    }
  }
  .columns {
    display: flex;
    margin-bottom: 12px;
  }
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
  .dec {
    font-size: 12px;
    color: #5e7185;
    line-height: 20px;
    margin: 8px 0 20px 24px;
  }
  .time-group {
    line-height: normal;
    display: inline-table;
    width: 294px;
    margin-right: 20px;
    border-collapse: separate;
    border-spacing: 0;
    .time-desc {
      color: #909399;
      vertical-align: middle;
      display: table-cell;
      border: 1px solid #dcdfe6;
      border-right: none;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      padding: 0 8px;
      white-space: nowrap;
      width: 1px;
    }
    /deep/ .el-input__inner {
      padding-left: 26px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    /deep/ .el-input__prefix {
      left: 0;
    }
  }
  .content {
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    padding: 10px;
    & > .title {
      color: #1a1d2c;
      text-align: center;
      font-size: 16px;
      line-height: 22px;
      margin: 10px 0 20px;
    }
    .info {
      color: #212741;
      p {
        display: flex;
        .title {
          width: 56px;
          margin-right: 14px;
        }
        .text {
          flex: 1;
        }
        .en {
          color: #5e7185;
        }
      }
    }
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
}
.used-info {
  display: flex;
  dl {
    box-sizing: border-box;
    padding: 0 5px;
    flex: 0 0 33.33333333%;
    text-align: center;
    overflow: hidden;
    dt {
      margin-top: 10px;
      color: #1a1d2c;
      font-size: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    dd {
      margin-top: 11px;
      color: #55596a;
      font-size: 12px;
    }
  }
}
.pageSaveBtn {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
  text-align: right;
  font-size: 0;
  margin-bottom: 40px;
}
.search-conditions {
  display: flex;
  justify-content: space-between;
}
// .small-img {
//   display: inline-block;
//   vertical-align: middle;
//   width: 50px;
//   height: 50px;
//   border-radius: 4px;
//   border: 1px solid #dadde4;
//   background-color: #f7f8fd;
//   background-origin: content-box;
//   background-position: 50% 50%;
//   background-size: contain;
//   background-repeat: no-repeat;
//   overflow: hidden;
// }
/deep/.el-input-group__prepend {
  background: #fff;
}
/deep/ .el-icon-delete-solid {
  font-size: 18px;
  line-height: 38px;
  cursor: pointer;
}
/deep/.el-input-group__append {
  background: #fff;
}
</style>  