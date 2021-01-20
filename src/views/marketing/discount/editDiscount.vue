<template>
  <div class="container">
    <router-link
      to="/discount"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>梯度优惠</span>
    </router-link>
    <h1 class="title">
      <span class="text">
        {{ id ? "编辑梯度优惠" : "创建梯度优惠" }}
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
          <div class="box">
            <h3 class="title">
              优惠名称
              <span class="subTitle">{{ detail.name.length }}/100字符</span>
            </h3>
            <div>
              <el-input
                v-model="detail.name"
                size="medium"
                maxlength="100"
                placeholder="请输入活动名称以方便您自己识别"
              ></el-input>
            </div>
          </div>
          <!-- 优惠描述 -->
          <div class="box">
            <h3 class="title">
              优惠描述
              <span class="subTitle">{{ detail.title.length }}/40字符</span>
            </h3>
            <div>
              <el-input
                v-model="detail.title"
                size="medium"
                maxlength="40"
                placeholder="请输入英文优惠描述，此信息将在前端展示给用户查看"
              ></el-input>
            </div>
          </div>
          <!-- 优惠条件 -->
          <div class="box">
            <h3 class="title">优惠条件</h3>
            <div>
              <div style="display: flex; justify-content: space-between">
                <el-select
                  v-model="detail.terms1"
                  style="width: 350px"
                  @change="ResetShopDetailSettingList(1)"
                  :disabled="disabled"
                >
                  <el-option
                    v-for="item in consumptionList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="detail.terms2"
                  style="width: 350px"
                  @change="ResetShopDetailSettingList(2)"
                  :disabled="disabled"
                >
                  <el-option
                    v-for="item in reductionList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
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
                @change="detail.list = [];"
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
            <div class="discountTargetList" v-if="Boolean(detail.list)">
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
          <!-- 详情设置 -->
          <div class="box">
            <h3 class="title" style="padding-bottom: 20px">详情设置</h3>
            <div class="detail-list">
              <div
                class="item"
                v-for="(item, index) in shopDetailSettingList"
                :key="index"
              >
                <span>{{ consumptionList[detail.terms1].label }}</span>
                <el-input
                  v-model="item.consumption"
                  style="width: 210px"
                  :maxlength="8"
                  :disabled="disabled" 
                  @blur="detail.terms1 == 1?item.consumption = $IsNaN(item.consumption):''"
                >
                  <template
                    slot="prefix"
                    v-if="detail.terms1 == 1"
                    style="line-height: 36px; margin-left: 3px"
                    >{{currency.s}}</template
                  >
                </el-input>
                <span
                  >，{{ appliedObjectList[detail.applyObject].label }}减免</span
                >
                <el-input
                  v-model="item.reduction"
                  style="width: 210px"
                  :maxLength="detail.terms2 === 0 ? 8 : 2"
                  :disabled="disabled"
                  @blur="detail.terms2 === 0 ? item.reduction = $IsNaN(item.reduction):''"
                >
                  <template
                    slot="prefix"
                    v-if="detail.terms2 === 0"
                    style="line-height: 36px; margin-left: 3px"
                    >{{currency.s}}</template
                  >
                  <template
                    slot="suffix"
                    v-else
                    style="line-height: 36px; margin-left: 3px"
                    >%</template
                  >
                </el-input>
                <i
                  v-if="shopDetailSettingList.length > 1"
                  class="el-icon-delete-solid"
                  @click="DelShopDetailSettingOfItem(item)"
                ></i>
              </div>
            </div>
            <el-button
              type="primary"
              v-if="!disabled"
              @click="AddShopDetailSettingOfItem"
              >添加梯度优惠</el-button
            >
          </div>
          <!-- 显示配置 -->
          <div class="box">
            <h3 class="title">
              显示配置
              <span class="option" @click="showPage = true">效果预览</span>
            </h3>
            <div class="ext-select-container">
              <el-select
                v-model="detail.popUps"
                style="width: 100%"
                placeholder="请选择是否显示弹窗"
              >
                <span slot="prefix" class="ext-select-text">弹窗</span>
                <el-option label="显示优惠弹窗" :value="0"
                  >显示优惠弹窗</el-option
                >
                <el-option label="不显示优惠弹窗" :value="1"
                  >不显示优惠弹窗</el-option
                >
              </el-select>
              <el-select
                v-if="detail.popUps == 0"
                v-model="detail.buttonType"
                style="width: 100%"
                placeholder="请选择是否显示按钮"
              >
                <span slot="prefix" class="ext-select-text">按钮</span>
                <el-option label="显示按钮" :value="0">显示按钮</el-option>
                <el-option label="不显示按钮" :value="1">不显示按钮</el-option>
              </el-select>
            </div>
            <div
              style="display: flex; justify-content: space-between"
              v-if="detail.popUps === 0 && detail.buttonType === 0"
            >
              <div
                style="padding-right: 15px; width: 50%; box-sizing: border-box"
              >
                <span>按钮文案</span>
                <el-input
                  v-model="detail.buttonName"
                  placeholder="请输入按钮文案"
                ></el-input>
              </div>
              <div
                style="
                  width: 50%;
                  box-sizing: border-box;
                  display: flex;
                  flex-wrap: wrap;
                "
              >
                <span style="width: 100%">
                  前往的页面
                  <span class>（点击按钮和优惠横幅）</span>
                </span>
                <el-select
                  v-model="detail.pageType"
                  placeholder="请选择前往的页面"
                  style="flex: 1"
                >
                  <el-option
                    v-for="item in pageList"
                    :key="item.label"
                    :label="item.title"
                    :value="item.label"
                  ></el-option>
                </el-select>
                <span
                  v-show="detail.pageType === 1"
                  class="model-item-href "
                  :class="detail.menuItem?'href-border href':''"
                  @click="showAddMenu = true"
                  :style="{ borderColor: detail.menuItem ? '#dcdfe6;' : '' }" 
                  >
                    {{detail.menuItem?JSON.parse(detail.menuItem)[0].name:'选择页面'}} 
                    <i class="close el-icon-circle-close" @click.stop="detail.menuItem = ''"></i>
                  </span
                > 
              </div>
            </div>
          </div>
          <!-- 有效日期 -->
          <div class="box">
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
              </span>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box">
            <h3 class="title">优惠信息</h3>
            <div class="overview">
              <p>
                <span class="title">优惠名称：</span>
                <span class="text">{{ detail.name ? detail.name : "--" }}</span>
              </p>
              <p>
                <span class="title">优惠描述：</span>
                <span class="text">{{
                  detail.title ? detail.title : "--"
                }}</span>
              </p>
              <p>
                <span class="title">优惠条件：</span>
                <span class="text"
                  >{{ consumptionList[detail.terms1].label }}，{{
                    appliedObjectList[detail.applyObject].label +
                    reductionList[detail.terms2].label
                  }}</span
                >
              </p>
              <p>
                <span class="title">有效日起：</span>
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
            <div class="detail">
              <p class="title">优惠详情</p>
              <p
                class="item"
                v-for="(item, index) in shopDetailSettingList"
                :key="index"
                v-if="item.consumption && item.reduction"
              >
                消费满
                {{
                  detail.terms1 === 0
                    ? item.consumption + "件"
                    : currency.s + $IsNaN(item.consumption)
                }}，
                {{ appliedObjectList[detail.applyObject].label }}
                减免
                {{
                  detail.terms2 === 0
                    ? currency.s + item.reduction
                    : item.reduction + "%"
                }}
              </p>
            </div>
          </div>
          <div class="box useInfo" v-if="id">
            <h3 class="title">使用情况</h3>
            <div class="overview">
              <dl>
                <dt>{{ detail.nums ? detail.nums : "0" }}</dt>
                <dd>使用次数</dd>
              </dl>
              <dl>
                <dt>
                  {{currency.s+ (detail.discountTotal ? $IsNaN(detail.discountTotal) : "0.00") }}
                </dt>
                <dd>优惠金额</dd>
              </dl>
              <dl>
                <dt>{{currency.s+ (detail.saleTotal ? $IsNaN(detail.saleTotal) : "0.00" )}}</dt>
                <dd>销售总额</dd>
              </dl>
            </div>
            <div class="detail-item" v-if="showStatistics">
              <p>
                <span class="label">优惠描述</span>
                <p
                  class="item"
                  style="padding:0"
                  v-for="(item, index) in shopDetailSettingList"
                  :key="index"
                  v-if="item.consumption && item.reduction"
                >
                  消费满
                  {{
                    detail.terms1 === 0
                      ? item.consumption + "件"
                      : currency.s + $IsNaN(item.consumption)
                  }}，
                  {{ appliedObjectList[detail.applyObject].label }}
                  减免
                  {{
                    detail.terms2 === 0
                      ? currency.s + item.reduction
                      : item.reduction + "%"
                  }}</p>
              </p>
              <p>
                <span class="title">使用次数：</span>
                <span class="text">{{ detail.nums ? detail.nums : "0" }}</span>
              </p>
              <p>
                <span class="title">优惠金额：</span>
                <span class="text"
                  >{{
                    currency.s + (detail.discountTotal ? $IsNaN(detail.discountTotal) : "0.00")
                  }}</span
                >
              </p>
              <p>
                <span class="title">销售金额：</span>
                <span class="text"
                  >{{currency.s+ (detail.saleTotal ? $IsNaN(detail.saleTotal) : "0.00") }}</span
                >
              </p>
            </div>
            <div class="toggleTargetList">
              <span class="btn" @click="showStatistics = !showStatistics">
                {{ showStatistics == false ? "展开" : "收起" }}
                <i
                  :class="
                    showStatistics == false
                      ? 'el-icon-caret-bottom'
                      : 'el-icon-caret-top'
                  "
                ></i>
              </span>
            </div>
          </div>
          <div class="box">
            <p class="infoTip">温馨提示</p>
            <p class="infoContent">
              此应用无法与普通优惠同时应用。开启后所有自动应用优惠将失效，
              若用户输入了优惠券码，则本梯度优惠失效。
            </p>
          </div>
        </el-col>
      </el-row>
      <div class="pageSaveBtn">
        <el-button @click="$NavgitorTo('/discount')">取消</el-button>
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
            <el-select
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
            </el-select>
            <!-- 商品分类 -->
            <el-select
              v-model="requestParams.cateId"
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
              style="width: 180px"
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
          ref="table"
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
              label="商品分类"
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
      <el-dialog :visible.sync="showPage">
        <span class="dialog-preview-top-desc"
          >优惠弹窗可以让买家快速的了解优惠内容</span
        >
        <div
          style="
            text-align: center;
            width: 100%;
            max-height: 620px;
            overflow: auto;
            font-size: 0px;
          "
        >
          <img
            style="width: 300px"
            :src="
              detail.buttonType == 1
                ? 'https://ddd.xshoppy.shop/static/img/gradientDiscount/discount-dialog-btn.png'
                : 'https://ddd.xshoppy.shop/static/img/gradientDiscount/no-discount-dialog-btn.png'
            "
          />
        </div>
        <div class="dialog-preview-bottom-desc">效果仅供参考</div>
      </el-dialog>
    </div>
    <add-menu-com
      v-if="showAddMenu" 
      :isRadio="true"
      @Close="(e)=>{showAddMenu = false}"
      @selectData="SetPage"
    ></add-menu-com>
  </div>
</template> 
<script>
import elTableInfiniteScroll from "el-table-infinite-scroll";
import addMenuCom from "@/components/addMenuCom";
import { add, edit, changeMenuBarStatus, del } from "@/api/yxStoreGradient";
import { get } from "@/api/yxStoreProduct";
import { getCates } from "@/api/yxStoreCategory";
export default {
  components: {
    addMenuCom,
  },
  data() {
    return {
      requestParams: {
        size: 30,
        page: 0,
      },
      detail: {
        name: "",
        title: "",
        terms1: 1,
        terms2: 1,
        applyObject: 0,
        popUps: 0,
        buttonType: 0,
        buttonName: "Go To Buy",
        startTime: new Date().getTime(),
        list: [],
        status: 1,
        pageType: 0,
      },
      id: "",
      disabled: false,
      consumptionList: [
        // 商品属性列表
        {
          value: 0,
          label: "消费满特定件数",
        },
        {
          value: 1,
          label: "消费满特定金额",
        },
      ],
      reductionList: [
        // 商品属性列表
        {
          value: 0,
          label: "减免固定金额",
        },
        {
          value: 1,
          label: "减免%折扣",
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
      shopDetailSettingList: [
        {
          consumption: "",
          reduction: "",
        },
      ],
      checkPage: "", // 选中的模板页面
      pageList: [
        {
          label: 0,
          title: "优惠列表页",
        },
        {
          label: 1,
          title: "自定义页面",
        },
      ], // 模板页面列表
      showDiscountDetail: false, // 是否显示右边优惠详情
      showPage: false,
      activityStartDate: "", // 活动开始时间
      activityEndDate: "", // 活动结束时间
      shopDialog: false, // 是否显示选择商品对话框
      shopCategoryDialog: false, // 是否显示选择商品分类对话框
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
      showStatistics: false,
      showAddMenu: false,
      index: "",
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
    let that = this;
    // 初始化结束日期规则
    this.endOptions = {
      disabledDate(time) {
        return time.getTime() < that.detail.startTime - 8.64e7;
      },
    };
    // 判断是否为编辑优惠
    if (this.$route.query.hasOwnProperty("id")) {
      this.id = this.$route.query.id;
      let detail = JSON.parse(localStorage.getItem("discountDetail"));
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
          if (detail.prodIds) {
            detail.list = JSON.parse(detail.prodIds);
          }
          break;
      }
      let arr = [];
      detail.yxStoreGradientItems.map((i) => {
        let par = {
          consumption: "",
          reduction: "",
        };
        if (i.reduceDiscount) {
          par.reduction = i.reduceDiscount;
        } else {
          par.reduction = this.$IsNaN(i.reduceMoney);
        }
        if (i.specMoney) {
          par.consumption = this.$IsNaN(i.specMoney);
        } else {
          par.consumption = i.specNums;
        }
        arr.push(par);
      });
      this.detail = detail;
      this.shopDetailSettingList = arr;
      this.disabled = true;
    }
    getCates(this.requestParams).then((res) => {
      console.log(res);
      this.shopCategoryList = res.content;
    });
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
            id: Number(this.id),
            status: this.detail.status === 1 ? 0 : 1,
            storeId: storeId,
          };
          changeMenuBarStatus(par).then((res) => {
            this.$message.success("修改成功");
            this.$router.push("/discount");
          });
          break;
        case 2:
          // 删除
          let pars = [this.id];
          del(pars).then(() => {
            that.$message.success("删除成功");
            that.$router.push("/discount");
          });
          break;
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
      this.initData();
    },
    ResetShopDetailSettingList: function (type) {
      console.log(this.detail);
      // this.shopDetailSettingList = [
      //   {
      //     consumption: "",
      //     reduction: "",
      //   },
      // ];
    },
    AddShopDetailSettingOfItem: function (item) {
      this.shopDetailSettingList.push({
        consumption: "",
        reduction: "",
      });
    },
    DelShopDetailSettingOfItem: function (item) {
      this.shopDetailSettingList.splice(
        this.shopDetailSettingList.indexOf(item),
        1
      );
    },
    // 加载表单数据
    initData: function () {
      let type = this.detail.applyObject;
      switch (type) {
        // 1为商品分类  2为商品
        case 1:
          getCates(this.requestParams).then((res) => {
            let arr = this.table.concat(res.content);
            if (arr.length <= res.totalElements) {
              // this.table = arr;
              this.table.push(...res.content);
            }
            this.tableTotal = res.totalElements;
          });
          break;
        case 2:
          get(this.requestParams).then((res) => {
            let arr = this.table.concat();
            if (arr.length <= res.totalElements) {
              this.table.push(...res.content);
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
    SetPage: function (e) {
      console.log(e);
      this.$nextTick(() => {
        this.detail.menuItem = JSON.stringify(e);
      });
    },
    CheckSelectItem: function (res) {
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
      let that = this;
      if (this.detail.name == "") {
        this.$message.error("请输入优惠名称");
        return false;
      }
      if (this.detail.title == "") {
        this.$message.error("请输入优惠描述");
        return false;
      }
      if (this.detail.startTime == "") {
        this.$message.error("请选择活动开始时间");
        return false;
      }
      if (this.detail.pageType === 1) {
        if (
          this.detail.menuItem == null ||
          this.detail.menuItem == "" ||
          this.detail.menuItem == undefined
        ) {
          this.$message.error("请选择按钮跳转页面");
          return false;
        }
      }
      // 以上为表单验证
      // 处理详情设置开始
      let consumption = "";
      let reduction = "";
      if (this.detail.terms1 === 0) {
        consumption = "specNums";
      } else {
        consumption = "specMoney";
      }
      if (this.detail.terms2 === 0) {
        reduction = "reduceMoney";
      } else {
        reduction = "reduceDiscount";
      }
      let arr = [];
      for (var i in that.shopDetailSettingList) {
        if (
          that.shopDetailSettingList[i].consumption == "" ||
          that.shopDetailSettingList[i].reduction == ""
        ) {
          that.$message.error("请完善详情设置");
          return false;
        } else {
          let j = Number(i) + 1;
          if (j < that.shopDetailSettingList.length) {
            if (
              Number(that.shopDetailSettingList[j].consumption) <
              Number(that.shopDetailSettingList[i].consumption)
            ) {
              console.log(that.shopDetailSettingList[j]);
              console.log(that.shopDetailSettingList[i]);
              this.$message.warning(
                "操作失败，请将消费梯度按照从小到大的顺序排列"
              );
              return false;
            }
            let par = {};
            par[consumption] = that.shopDetailSettingList[i].consumption;
            par[reduction] = that.shopDetailSettingList[i].reduction;
            arr.push(par);
          } else {
            let par = {};
            par[consumption] = that.shopDetailSettingList[i].consumption;
            par[reduction] = that.shopDetailSettingList[i].reduction;
            arr.push(par);
          }
        }
      }
      this.detail.yxStoreGradientItems = arr;
      // 处理详情设置结束
      if (this.detail.endTime) {
        this.detail.endTime = this.detail.endTime + 24 * 60 * 60 * 1000 - 1000;
      }
      // 处理适用对象开始
      if (this.detail.applyObject !== 0) {
        if (this.detail.list && this.detail.list.length > 0) {
          switch (this.detail.applyObject) {
            // 商品分类
            case 1:
              this.detail.tagIds = JSON.stringify([...this.detail.list]);
              delete this.detail.list;
              break;
            // 商品
            case 2:
              this.detail.prodIds = JSON.stringify([...this.detail.list]);
              delete this.detail.list;
              break;
          }
        } else {
          this.$message.warning("请选择适用对象");
          return false;
        }
      } else {
        this.detail.prodIds = "";
        this.detail.tagIds = "";
      }
      // 处理适用对象结束
      if (this.id) {
        // 修改
        edit(this.detail).then((res) => {
          this.$message.success("修改成功");
          this.$router.push("/discount");
        });
      } else {
        // 新增
        add(this.detail).then((res) => {
          this.$message.success("新增成功");
          this.$router.push("/discount");
        });
      }
    },
  },
  updated() {
    console.log("更新");
    this.save = false;
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
    .subTitle {
      font-size: 12px;
      float: right;
      font-weight: 400;
      color: #c1c2cc;
    }
    .option {
      color: #273a8a;
      cursor: pointer;
      text-decoration: underline;
      font-size: 12px;
      float: right;
      font-weight: 400;
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
  .detail-list {
    margin-bottom: 12px;
    border-bottom: 1px solid #dcdfe6;
    .item {
      width: 100%;
      padding: 12px 0;
      border-top: 1px solid #dcddeb;
      display: flex;
      align-items: center;
      flex: 1;
      height: 36px;
      & > span {
        margin-right: 8px;
      }
      /deep/.el-icon-delete-solid {
        margin-left: 20px;
        color: #c1c2cc;
      }
      /deep/ .el-input__prefix {
        line-height: 36px !important;
      }
      /deep/ .el-input__suffix {
        line-height: 36px !important;
      }
    }
  }
  .ext-btn-link-tetx {
    height: 85px;
    padding-top: 20px;
  }
  .ext-select-container {
    .ext-select-text {
      position: absolute;
      left: 8px;
      top: 5px;
      font-size: 12px;
      font-weight: 400;
      color: #808598;
    }
    /deep/.el-select {
      margin-bottom: 12px;
    }
    /deep/.el-input__prefix {
      width: 100%;
      left: 0;
    }
    /deep/.el-input__inner {
      height: 48px;
      padding-top: 15px;
      padding-left: 10px;
    }
    .sub-title {
      font-size: 12px;
      font-weight: 400;
      color: #c2c3cd;
      line-height: 20px;
    }
    .title {
      font-size: 12px;
      font-weight: 400;
      color: #1a1d2c;
      line-height: 20px;
      margin-bottom: 8px;
    }
  }
}
.overview > p,
.detail-item > p {
  padding: 10px 0;
  color: #293154;
  display: flex;
  align-items: flex-start;
  line-height: 20px;
  .title {
    width: 70px;
  }
  .text {
    flex: 1;
  }
}
.useInfo {
  .overview {
    margin-top: 16px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    dl {
      padding: 0 4px;
      flex: 1;
      text-align: center;
      dt {
        font-size: 20px;
        color: #1a1d2c;
        font-weight: 500;
        line-height: 28px;
      }
      dd {
        margin-top: 11px;
        color: #55596a;
        font-size: 12px;
        line-height: 17px;
      }
    }
  }
  .detail-item {
    margin-top: 20px;
    border-top: 1px solid #dcddeb;
    padding: 10px 0;
  }
  .toggleTargetList {
    border-top: 1px solid #dcdfe6;
    text-align: center;
    padding-top: 10px;
    margin-left: -12px;
    margin-right: -12px;
    color: #909399;
    .btn {
      cursor: pointer;
    }
  }
}
.detail {
  margin-top: 10px;
  padding-top: 20px;
  border-top: 1px solid #dcddeb;
  .title {
    margin-bottom: 10px;
  }
}
.model-item-href {
  cursor: pointer;
  text-decoration: underline;
  margin-left: 12px;
  width: 120px;
  padding: 6px;
  display: flex;
  position: relative;
  border-radius: 3px;
  border: 1px solid transparent;
  color: #273a8a;
  .close {
    width: 20px;
    height: 20px;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
    position: absolute;
    top: -10px;
    right: -10px;
    display: none;
    cursor: pointer;
  }
}
.href {
  cursor: pointer;
  color: #273a8a;
  line-height: 20px;
  text-decoration: underline;
  .close {
    display: block;
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
.dialog-preview-top-desc {
  font-size: 14px;
  font-weight: 400;
  color: #1b1d2c;
  line-height: 20px;
  text-align: center;
  margin-bottom: 18px;
  width: 100%;
  display: inline-block;
}
.dialog-preview-bottom-desc {
  font-size: 12px;
  font-weight: 400;
  color: #808598;
  line-height: 20px;
  text-align: center;
  margin-top: 20px;
  width: 100%;
  display: inline-block;
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
  &::before {
    content: "";
    left: -12px;
    right: -12px;
    display: block;
    position: absolute;
    border-top: 1px solid #eee;
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