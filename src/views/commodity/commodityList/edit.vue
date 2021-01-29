<template>
  <div class="container">
    <router-link
      to="/commodityList"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>商品列表</span>
    </router-link>
    <h1>编辑商品</h1>
    <div>
      <div class="box info">
        <h3 class="title">商品名称</h3>
        <div>
          <div class="el-input el-input--medium el-input--suffix">
            <input
              type="text"
              autocomplete="off"
              v-model="detail.store_name"
              placeholder="最多255个字符"
              maxlength="255"
              class="el-input__inner"
            />
          </div>
        </div>
      </div>
      <div class="box">
        <h3 class="title">
          商品信息
          <el-checkbox v-model="isGrounding" style="float: right"
            >立即上架，出售商品</el-checkbox
          >
        </h3>
        <div class="product-left">
          <div class="item-margin" v-if="show">
            <span class="text-span">售价</span>
            <el-input
              class="box-item-entry"
              v-model="attr.price"
              maxlength="8"
              size="medium"
              placeholder="请输入商品现价"
              @blur="attr.price = $IsNaN(attr.price)"
            >
              <span slot="append">{{ currency.n }}</span>
            </el-input>
          </div>
          <div class="item-margin" v-if="show">
            <span class="text-span">库存数量</span>
            <el-input
              v-model.number="attr.stock"
              type="number"
              size="medium"
              maxlength="8"
              placeholder="请输入商品库存"
            ></el-input>
          </div>
          <div class="item-margin" v-if="show">
            <span class="text-span">商品SKU</span>
            <el-input
              class="box-item-entry"
              v-model="detail.shopSku"
              size="medium"
              placeholder="请输入商品SKU"
            ></el-input>
          </div>
          <!-- <div class="item-margin">
            <span class="text-span">库存方式</span>
            <el-select class="box-item-entry" size="medium" v-model="stockTypeValue" placeholder>
              <el-option
                v-for="item in stockTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div> -->
          <!-- <div class="item-margin" v-if="stockTypeValue == 1">
            <span class="text-span">售罄政策</span>
            <el-select
              class="box-item-entry"
              size="medium"
              v-model="sellOutPolicyValue"
              placeholder
            >
              <el-option
                v-for="item in sellOutPolicyList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div> -->
          <div class="item-margin">
            <span class="text-span">
              分类
              <span style="color: rgb(153, 155, 161); font-size: 12px"
                >（自动分类不可删除）</span
              >
            </span>
            <el-select
              class="box-item-entry"
              size="medium"
              v-model="tagIds"
              multiple
              placeholder="请选择商品分类"
            >
              <el-option
                v-for="item in categoryList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="product-right">
          <div class="item-margin" v-if="show">
            <span class="text-span">原价</span>
            <el-input
              class="box-item-entry"
              v-model="attr.ot_price"
              maxlength="8"
              size="medium"
              placeholder="请输入商品原价"
              @blur="attr.ot_price = $IsNaN(attr.ot_price)"
            >
              <span slot="append">{{ currency.n }}</span>
            </el-input>
          </div>
          <div class="item-margin" v-if="show">
            <span class="text-span">商品重量</span>
            <el-input
              class="box-item-entry"
              v-model="attr.weight"
              maxlength="8"
              @blur="attr.weight = $IsNaN(attr.weight)"
              size="medium"
              placeholder="请输入商品重量"
            >
              <span slot="append">Kg</span>
              <!-- <el-select v-model="shopWeightSelectValue" >
                <el-option
                  v-for="item in shopWeightList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select> -->
            </el-input>
          </div>
          <div class="item-margin">
            <span class="text-span">标签</span>
            <el-input
              class="input-new-tag"
              v-model="classIds"
              ref="saveTagInput"
              size="medium"
              placeholder="请在此输入内容并按回车键"
              @keyup.enter.native="AddTag"
            ></el-input>
            <el-tag
              :key="index"
              v-for="(item, index) in classList"
              closable
              :disable-transitions="false"
              @close="classList.splice(index, 1)"
            >
              {{ item }}
            </el-tag>
          </div>
        </div>
      </div>
      <div class="box">
        <h3 class="title">商品详情</h3>
        <div>
          <wangeditor ref="editor" v-model="detail.description"></wangeditor>
        </div>
      </div>
      <div class="box image">
        <h3 class="title">
          商品图片
          <span
            style="
              font-weight: normal;
              font-size: 14px;
              color: rgb(162, 163, 172);
            "
            >（{{ fileList.length }}/250）</span
          >
          <span
            style="
              font-weight: normal;
              font-size: 14px;
              color: rgb(162, 163, 172);
            "
            >推荐尺寸 800 * 800</span
          >
        </h3>
        <div class="content">
          <el-upload
            :action="url + '/api/upload'"
            :headers="{
              Authorization: token,
            }"
            list-type="picture-card"
            :multiple="true"
            :on-preview="PictureCardPreview"
            :on-remove="RemoveImg"
            :on-change="ChangeImg"
            :limit="limit"
            :file-list="fileList"
            :class="showUpload ? 'hide' : ''"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="imageUrl" alt />
          </el-dialog>
        </div>
      </div>
      <div class="box">
        <h3 class="title">
          商品规格设置
          <span
            class="option"
            @click="AddOption"
            v-if="shopAttributeList.length == 0"
            >添加规格</span
          >
        </h3>
        <div class="content">
          <div
            style="
              color: rgb(193, 194, 204);
              text-align: center;
              font-size: 12px;
              margin: 10px;
            "
            v-if="shopAttributeList.length == 0"
          >
            多个产品属性在此添加
          </div>
          <div class="spec-category">
            <div
              v-for="(item, index) in shopAttributeList"
              :key="index"
              class="item"
            >
              <el-input
                v-model="item.value"
                size="medium"
                style="width: 200px"
                @change="CheckAttrName(index)"
              ></el-input>
              <div class="detail">
                <el-tag
                  :key="tag"
                  v-for="tag in item.detail"
                  closable
                  @close="CloseTag(tag, index)"
                  >{{ tag }}</el-tag
                >
                <el-input
                  class="input-new-tag"
                  v-model="item.inputValue"
                  ref="saveTagInput"
                  size="medium"
                  placeholder="请在此输入内容并按回车键"
                  @keyup.enter.native="InputConfirm(index)"
                ></el-input>
              </div>
              <i class="el-icon-delete-solid" @click="CloseOption(index)"></i>
            </div>
          </div>
          <el-button
            type="primary"
            v-if="shopAttributeList.length > 0 && shopAttributeList.length < 3"
            @click="AddOption"
            >添加规格</el-button
          >
          <!-- 表格开始 -->
          <div class="table" v-if="table.length > 0">
            <div class="checkOption" :class="isActive ? 'show' : ''">
              <div class="checkContent">
                <i
                  :class="
                    isActive ? 'el-icon-caret-left' : 'el-icon-caret-right'
                  "
                  @click.stop="isActive = !isActive"
                ></i>
                <span
                  v-for="item in optionList"
                  :key="item.value"
                  @click="BatchOperation(item.value)"
                  class="item"
                  :class="selectItem.length == 0 ? 'disable' : ''"
                  >{{ item.label }}</span
                >
              </div>
            </div>
            <el-table
              ref="multipleTable"
              :data="table"
              tooltip-effect="dark"
              style="width: 100%"
              empty-text="暂无数据"
              v-loading="loading"
              @select="SelectionChange"
              @select-all="SelectionChange"
            >
              <el-table-column
                type="selection"
                style="padding-left: 20px !important"
                width="80"
              ></el-table-column>
              <el-table-column
                v-for="(item, index) in tableHeader"
                :key="index"
                :width="item.width ? item.width - 40 : ''"
                :prop="item.slot ? item.slot : ''"
                :label="item.title ? item.title : ''"
                :align="item.align ? item.align : ''"
              >
                <template slot-scope="scope">
                  <div
                    v-if="item.slot === 'pic'"
                    @click.stop="SelectPicture(scope.$index)"
                    class="tableImage"
                  >
                    <el-image
                      :src="scope.row[item.slot]"
                      style="width: 100%; height: 100%"
                    >
                      <div slot="error" class="image-slot">
                        <i
                          class="el-icon-plus"
                          v-if="scope.row[item.slot] == ''"
                          style="margin-top: 14px"
                        ></i>
                      </div>
                    </el-image>
                  </div>
                  <input
                    class="edit-inp"
                    v-model.number="scope.row[item.slot]"
                    @blur="scope.row[item.slot] = $IsNaN(scope.row[item.slot])"
                    v-else-if="
                      item.title == '售价' ||
                      item.title == '原价' ||
                      item.title == '库存' ||
                      item.title == '重量(KG)'
                    "
                  />
                  <span v-else>{{ scope.row[item.slot] }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="box">
        <h3 class="title">
          搜索引擎列表预览
          <span class="option" @click="editSEO = !editSEO">编辑网站SEO</span>
        </h3>
        <div>
          <div
            style="color: rgb(96, 98, 102); font-size: 12px"
            v-show="!editSEO"
          >
            添加标题和说明，以了解此产品在搜索引擎列表中的显示方式。
          </div>
          <template v-if="editSEO">
            <div class="jh-seo-preview">
              <p class="seo-title" v-html="detail.seoTitle"></p>
              <p
                class="seo-link mt8"
                v-html="
                  detail.linkUrl
                    ? detail.linkUrl.lastIndexOf('/') ==
                      detail.linkUrl.length - 1
                      ? detail.linkUrl + detail.seoLink
                      : detail.linkUrl + '/' + detail.seoLink
                    : ''
                "
              ></p>
              <p class="seo-desc mt8" v-html="detail.seo_info"></p>
            </div>
            <div class="seo-form">
              <p>
                SEO标题
                <span class="subTitle fr"
                  >{{ detail.seoTitle.length || 0 }}/70字符</span
                >
              </p>
              <div>
                <el-input
                  v-model="detail.seoTitle"
                  placeholder="请输入SEO标题"
                  maxlength="70"
                ></el-input>
              </div>
              <p>
                SEO详情
                <span class="subTitle fr"
                  >{{ detail.seo_info.length }}/320字符</span
                >
              </p>
              <div>
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model="detail.seo_info"
                  placeholder="请输入SEO详情"
                  maxlength="320"
                ></el-input>
              </div>
              <p>SEO链接</p>
              <div>
                <el-input v-model="detail.seoLink" placeholder="请输入SEO链接">
                  <template slot="prepend">{{
                    detail.linkUrl
                      ? detail.linkUrl.lastIndexOf("/") ==
                        detail.linkUrl.length - 1
                        ? detail.linkUrl
                        : detail.linkUrl + "/"
                      : ""
                  }}</template>
                </el-input>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="pageSaveBtn">
        <el-button @click="$NavgitorTo('/commodityList')">取消</el-button>
        <el-button type="primary" @click="Save">保存</el-button>
      </div>
      <el-dialog
        title="选择图片"
        :visible.sync="showDialog"
        class="selectProPicDialog"
      >
        <div class="sku-picture-list">
          <ul>
            <li
              v-for="(item, index) in fileList"
              :key="item.uid"
              :class="active == index ? 'active' : ''"
              @click="active = index"
            >
              <div
                class="picture-item"
                :style="'backgroundImage:url(' + item.url + ')'"
              ></div>
              <i
                v-show="active == index ? true : false"
                class="el-icon-success"
              ></i>
            </li>
          </ul>
        </div>
        <span slot="footer">
          <el-button
            type="danger"
            style="float: left"
            v-if="showDelImage"
            @click="DelImage"
            >删除图片</el-button
          >
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="SubImage">确定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :title="'批量' + optionList[optionIndex].label"
        :visible.sync="batchOperation"
      >
        <el-input v-model="batchValue" placeholder="请输入修改的值"></el-input>
        <span slot="footer">
          <el-button @click="batchOperation = false">取消</el-button>
          <el-button type="primary" @click="SubBatchOperation">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template> 
<script>
import wangeditor from "@/components/wangeditor";
import tableTem from "@/components/tableTem";
import { add, edit, getInfo, isFormatAttr } from "@/api/yxStoreProduct";
import { getCates } from "@/api/yxStoreCategory";
export default {
  components: {
    tableTem,
    wangeditor,
  },
  data() {
    return {
      url: localStorage.getItem("uploadUrl"),
      id: "",
      isFirst: true,
      token: "",
      isGrounding: true,
      price: "",
      shopSku: "",
      stockTypeValue: 2,
      stockTypeList: [
        {
          value: 1,
          label: "跟踪商品库存",
        },
        {
          value: 2,
          label: "不使用库存",
        },
      ],
      sellOutPolicyValue: 1, // 售罄政策
      sellOutPolicyList: [
        {
          value: 1,
          label: "无库存继续出售",
        },
        {
          value: 2,
          label: "无库存停止出售",
        },
      ],
      categoryValue: "", // 分类值
      tagIds: "",
      categoryList: [], // 分类列表
      classIds: "", // 商品标签
      classList: [], // 商品标签列表
      msg: "", // 富文本内容
      upLoadHeaders: {}, // 上传头部字段
      dialogVisible: false, // 上传图片是否显示
      imageUrl: "", // 图片路径
      showUpload: false, // 是否显示上传按钮
      limit: 250, // 最大上传数
      fileList: [], // 上传图片列表
      shopWeightValue: "", // 输入的商品重量
      shopWeightSelectValue: 1, // 默认选中的商品重量单位
      shopWeightList: [
        // 商品重量单位列表
        {
          value: 1,
          label: "g",
        },
        {
          value: 2,
          label: "kg",
        },
        {
          value: 3,
          label: "lb",
        },
        {
          value: 4,
          label: "oz",
        },
      ],
      shopAttributeList: [],
      showTable: false,
      tableData: [],
      specifications: "", // 规格设置
      detail: {
        store_name: "",
        description: "",
        linkUrl: "",
        seoTitle: "",
        seo_info: "",
      },
      // 表格变量
      isActive: false, // 批量操作按钮是否可以点击
      optionIndex: 0, // 批量修改类型
      optionList: [
        {
          label: "删除",
          value: 1,
        },
        {
          label: "修改价格",
          value: 2,
        },
        {
          label: "修改原价",
          value: 3,
        },
        {
          label: "修改图片",
          value: 4,
        },
        {
          label: "修改库存",
          value: 5,
        },
        {
          label: "修改重量",
          value: 6,
        },
      ],
      requestParams: {},
      tableHeader: [],
      table: [],
      loading: false,
      showDialog: false, //是否显示选择图片弹框
      tableIndex: "", // 选中的表单索引
      active: 0,
      showDelImage: false, //是否显示删除图片
      selectItem: [],
      batchOperation: false, // 是否显示批量修改输入框
      batchValue: "",
      attr: {
        price: "",
        ot_price: "",
        weight: "",
        stock: "",
      }, // 单规格时数据
      // 编辑网站seo
      editSEO: false,
      seoTitle: "",
      seoLink: "",
      seoDesc: "",
      show: true, // 是否显示其他项
    };
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
    } else {
      this.id = 0;
    }
    this.GetInfo();
    this.token = localStorage.getItem("token");
  },
  methods: {
    // 获取信息
    GetInfo() {
      let that = this;
      let storeId = localStorage.getItem("storeId"); // 初始化请求参数
      let par = {
        id: this.id,
        storeId,
      };
      getInfo(par).then((res) => {
        if (that.id === 0) {
          this.temp_id = "";
        } else {
          that.detail = { ...res.productInfo };
          that.tagIds = res.tagList;
          if (res.productInfo.classIds) {
            that.classList = res.productInfo.classIds.split(",");
          }
          that.attr = res.productInfo.attr;
          res.productInfo.attr.price == 0
            ? (that.attr.price = "")
            : (that.attr.price = this.$IsNaN(res.productInfo.attr.price));
          res.productInfo.attr.weight == 0
            ? (that.attr.weight = "")
            : (that.attr.weight = this.$IsNaN(res.productInfo.attr.weight));
          res.productInfo.attr.ot_price == 0
            ? (that.attr.ot_price = "")
            : (that.attr.ot_price = this.$IsNaN(res.productInfo.attr.ot_price));
          res.productInfo.attr.stock === 0 ? (that.attr.stock = "") : "";
          that.detail.cate_id = Number(that.detail.cate_id);
          // 判断是否上架
          that.detail.is_show == Number(that.isGrounding);
          // 判断是单规格还是多规格
          if (res.productInfo.spec_type == 1) {
            // 多规格
            that.shopAttributeList = res.productInfo.items;
            that.InitFormatAttr();
            this.show = false;
          }
          // 初始化图片列表
          let arr = [];
          arr.push({ url: res.productInfo.image });
          res.productInfo.slider_image.map((i) => {
            let obj = {};
            obj.url = i;
            arr.push(obj);
          });
          that.fileList = arr;
        }
      });
      let params = {
        page: 0,
        size: 20,
      };
      getCates(params).then((res) => {
        this.categoryList = res.content;
      });
    },
    PictureCardPreview(file) {
      this.imageUrl = file.url;
      this.dialogVisible = true;
    },
    ChangeImg(file, fileList) {
      this.fileList = fileList;
      this.showUpload = fileList.length >= this.limit;
    },
    RemoveImg: function (e) {
      console.log(e);
      this.fileList.map((v, i) => {
        if (v.uid == e.uid) {
          console.log(i);
          this.fileList.splice(i, 1);
        }
      });
      console.log(this.fileList);
      this.showUpload = false;
    },
    // 添加规格
    AddOption: function () {
      if (this.shopAttributeList.length === 0) {
        this.shopAttributeList.push({
          value: "color",
          inputValue: "",
          detail: [],
        });
      } else if (this.shopAttributeList.length === 1) {
        this.shopAttributeList.push({
          value: "size",
          inputValue: "",
          detail: [],
        });
      } else {
        this.shopAttributeList.push({
          value: "",
          inputValue: "",
          detail: [],
        });
      }
    },
    // 关闭规格
    CloseOption: function (e) {
      console.log(e);
      this.shopAttributeList.splice(e, 1);
      this.InitFormatAttr();
    },
    // 判断属性名称是否一样
    CheckAttrName: function (index) {
      let val = this.shopAttributeList[index].value;
      console.log(val);
      for (var i in this.shopAttributeList) {
        if (this.shopAttributeList[i].value == val && index != i) {
          this.$message.warning("重复属性");
          this.shopAttributeList[index].value = "";
          return false;
        }
      }
    },
    // 新增规格值
    InputConfirm: function (index) {
      let val = this.shopAttributeList[index].inputValue;
      val = val.replace(/(^\s*)|(\s*$)/g, ""); // 使用正则去除首尾空格
      if (val) {
        let detail = this.shopAttributeList[index].detail;
        if (detail.indexOf(val) > -1) {
          this.$message.error("已存在该标签");
          return false;
        } else {
          detail.push(val);
          this.showTable = true;
        }
        // 删除对应存在的规格值
        delete this.shopAttributeList[index].inputValue;
        this.InitFormatAttr();
      } else {
        this.shopAttributeList[index].inputValue = "";
      }
    },
    // 关闭规格值
    CloseTag: function (item, index) {
      let arr = this.shopAttributeList;
      arr[index].detail.splice(arr[index].detail.indexOf(item), 1);
      this.InitFormatAttr();
    },
    // 初始化规格
    InitFormatAttr: function () {
      // 多规格时初始化表单
      let arr = [];
      this.shopAttributeList.map((i) => {
        if (i.detail.length > 0) {
          arr.push(i);
        }
      });
      let par = {
        attrs: arr,
      };
      isFormatAttr(this.id, par).then((r) => {
        let headerData = [...r.header];
        let arr = [];
        r.header.map((v, i) => {
          if (
            v.slot !== "cost" &&
            v.slot !== "volume" &&
            v.slot !== "bar_code" &&
            v.slot !== "action"
          ) {
            arr.push(v);
          }
        });
        this.tableHeader = arr;
        let array = [];
        if (this.id !== "" && this.detail.spec_type == 1 && this.isFirst) {
          this.isFirst = false;
          this.detail.attrs.map((i) => {
            if (i.is_show == 1) {
              array.push(i);
            }
          });
          this.table = array;
        } else {
          r.value.map((v, i) => {
            v.index = i;
            if (v.is_show == 1) {
              array.push(v);
            }
          });
          console.log(array);
          this.table = array;
        }
      });
    },
    // 选择批量操作数据
    SelectionChange: function (e) {
      this.selectItem = e;
    },
    // 批量操作
    BatchOperation: function (e) {
      let item = this.selectItem;
      let table = this.table;
      console.log(e);
      this.optionIndex = e - 1;
      // 1 删除; 2 修改价格; 3 修改原价; 4 修改图片; 5 修改库存; 6 修改重量
      if (e == 1) {
        let arr = [];
        item.map((i) => {
          table.map((item, inx) => {
            if (item.index == i.index) {
              if (this.shopAttributeList.length === 1) {
                this.shopAttributeList[0].detail.splice(
                  this.shopAttributeList[0].detail.indexOf(table[inx].value1),
                  1
                );
              }
              table.splice(inx, 1);
              item.is_show = 0;
            }
          });
        });
      } else if (e == 4) {
        this.showDialog = true;
      } else {
        this.batchOperation = true;
      }
    },
    // 批量修改
    SubBatchOperation: function () {
      let that = this;
      console.log(that.batchValue);
      let item = this.selectItem;
      let table = this.table;
      // 1 删除; 2 修改价格; 3 修改原价; 4 修改图片; 5 修改库存; 6 修改重量
      switch (this.optionIndex + 1) {
        case 2:
          ChangeTable("price");
          break;
        case 3:
          ChangeTable("ot_price");
          break;
        case 5:
          ChangeTable("stock");
          break;
        case 6:
          ChangeTable("weight");
          break;
      }
      function ChangeTable(e) {
        console.log(e);
        item.map((i) => {
          table.map((item, inx) => {
            if (item.index == i.index) {
              item[e] =
                e == "stock" ? that.batchValue : that.$IsNaN(that.batchValue);
            }
          });
        });
        that.batchOperation = false;
      }
    },
    // 选择图片
    SelectPicture: function (index) {
      this.tableIndex = index;
      if (this.table[index].pic) {
        this.showDelImage = true;
      }
      this.showDialog = true;
    },
    // 提交图片
    SubImage: function () {
      let that = this;
      let item = this.selectItem;
      if (that.fileList[that.active].url.indexOf("blob:") === 0) {
        that.fileList[that.active].url =
          that.fileList[that.active].response.link;
      }
      if (that.tableIndex === "") {
        if (item.length > 0) {
          item.map((i) => {
            that.table.map((val, inx) => {
              if (val.index == i.index) {
                val.pic = that.fileList[that.active].url;
              }
            });
          });
        } else {
          that.table.map((i) => {
            i.pic = that.fileList[that.active].url;
          });
        }
      } else {
        that.table[that.tableIndex].pic = that.fileList[that.active].url;
      }
      this.showDialog = false;
      this.tableIndex = "";
    },
    DelImage: function () {
      this.table[this.tableIndex].pic = "";
      this.showDialog = false;
    },
    // 添加商品标签
    AddTag() {
      let that = this;
      this.classIds = this.classIds.replace(/(^\s*)|(\s*$)/g, ""); // 使用正则去除首尾空格
      if (this.classIds) {
        for (var i in this.classList) {
          if (this.classList[i] == this.classIds) {
            that.$message.error("已存在该标签");
            return false;
          }
        }
        this.classList.push(this.classIds);
        this.classIds = "";
      }
    },
    // 保存修改
    Save: function () {
      let that = this;
      // 判断是否输入标题
      if (this.detail.store_name == "" || this.detail.store_name == undefined) {
        that.$message.error("请输入商品名称");
        return false;
      }
      // 判断是否选择分类
      if (!this.tagIds || this.tagIds.length === 0) {
        that.$message.error("请选择商品分类");
        return false;
      }
      // 判断是否有标签
      console.log(this.classList);
      if (this.classList) {
        this.detail.classIds = this.classList.toString();
        console.log(this.detail.classList);
      }
      // 判断是否输入商品详情
      if (!this.detail.description) {
        that.$message.error("请输入商品详情");
        return false;
      }
      // 判断是否上传图片
      if (this.fileList.length <= 0) {
        that.$message.error("请上传商品图片");
        return false;
      }
      // 判断是否有新增图片
      this.fileList.map((i) => {
        if (i.hasOwnProperty("response")) {
          i.url = i.response.link;
        }
      });
      // 初始化轮播图
      this.detail.slider_image = [];
      this.detail.image = this.fileList[0].url;
      // 如果只有一张图片，则该图片既为主图又为轮播图，否则其他图片作为轮播图
      if (this.fileList.length == 1) {
        this.detail.slider_image.push(this.fileList[0].url);
      } else {
        let arr = this.fileList.slice(1, this.fileList.length);
        arr.map((i) => {
          this.detail.slider_image.push(i.url);
        });
      }
      // 判断是否为多规格数据控制库存
      if (this.table.length === 0) {
        // 判断用户是否输入售价
        if (this.attr.price == "" || this.attr.price == 0) {
          that.$message.error("商品售价不能为0");
          return false;
        }
        // 判断是否输入原价
        if (this.attr.ot_price > 0) {
          if (Number(this.attr.price) > Number(this.attr.ot_price)) {
            that.$message.error("商品售价不能大于商品原价");
            return false;
          }
        } else {
          this.attr.ot_price = 0;
        }
        // 判断用户是否输入库存，默认为空
        if (this.attr.stock == "") {
          this.attr.stock = 0;
        }
        // 判断用户是否输入重量，默认为空
        if (this.attr.weight == "") {
          this.attr.weight = 0;
        }
      } else {
        console.log("多商品");
        let arr = this.table;
        for (let i in arr) {
          if (arr[i].price == 0 || arr[i].price == "") {
            that.$message.error("请完善多规格表单，商品售价不能为0");
            return false;
          }
          // 判断是否输入原价
          if (arr[i].ot_price > 0) {
            if (Number(arr[i].price) > Number(arr[i].ot_price)) {
              that.$message.error("商品售价不能大于商品原价");
              return false;
            }
          } else {
            this.attr.ot_price = 0;
          }
          if (arr[i].stock == "") {
            arr[i].stock = 0;
          }
          if (arr[i].weight == "") {
            arr[i].weight = 0;
          }
        }
      }
      // 判断是否修改多规格数据
      if (this.table.length > 0) {
        // 多规格
        this.detail.spec_type = 1;
        this.detail.items = this.shopAttributeList;
        this.detail.header = this.tableHeader;
        // 多规格
        let arr = that.table;
        arr.map((i) => {
          i.cost = 0;
          i.volume = 0;
        });
        this.detail.attrs = arr;
      } else {
        // 单规格
        this.detail.spec_type = 0;
        this.detail.header = [];
        this.detail.items = [];
        this.detail.attrs = [this.attr];
        this.detail.attr = this.attr;
      }
      this.detail.is_show = Number(this.isGrounding);
      this.detail.tagIds = this.tagIds.toString();
      // 基础参数
      let data = {
        ficti: 0,
        id: 0,
        give_integral: 0,
        is_benefit: 0,
        is_best: 1,
        is_good: 0,
        is_hot: 0,
        is_new: 0,
        is_postage: 0,
        is_sub: 0,
        header: [],
        imageArr: [],
        items: [],
        selectRule: "",
        sliderImageArr: [],
        sort: 0,
        spec_type: 0,
        store_info: "",
        temp_id: 0,
        unit_name: "",
        ...this.detail,
      };
      console.log(that.fileList);
      if (that.id === 0) {
        if (this.table.length > 0) {
          // 多规格
          let arr = that.table;
          arr.map((i) => {
            i.cost = 0;
            i.volume = 0;
          });
          data.attr = {
            pic: that.fileList[0].response.link,
            price: that.attr.price,
            cost: 0,
            ot_price: that.attr.ot_price || 0,
            stock: that.attr.stock,
            bar_code: "",
            weight: that.attr.weight,
            volume: 0,
            brokerage: 0,
            brokerage_two: 0,
          };
          data.attrs = arr;
        } else {
          data.attrs = [
            {
              pic: that.fileList[0].response.link,
              price: that.attr.price,
              cost: 0,
              ot_price: that.attr.ot_price || 0,
              stock: that.attr.stock || 0,
              bar_code: "",
              weight: that.attr.weight || 0,
              volume: 0,
              brokerage: 0,
              brokerage_two: 0,
            },
          ];
        }
        add(data).then((res) => {
          that.$message({
            message: "修改成功",
            type: "success",
          });
          that.$router.push("/commodityList");
        });
      } else {
        add(data).then((res) => {
          that.$message({
            message: "修改成功",
            type: "success",
          });
          that.$router.push("/commodityList");
        });
      }
    },
    Error: function (text) {},
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
  }
  .product-left,
  .product-right {
    width: 49%;
    padding-right: 20px;
    vertical-align: top;
    display: inline-block;
    box-sizing: border-box;
  }
  .product-right {
    padding-right: 0;
    padding-left: 20px;
  }
  .text-span {
    line-height: 36px;
    padding-right: 8px;
    display: block;
  }
  .box-item-entry {
    width: 100%;
  }
  .item-margin {
    margin-bottom: 12px;
  }
  .spec-category {
    .item {
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 40px;
      & > .detail {
        display: flex;
        flex: 1;
        margin: 0 10px;
        flex-wrap: wrap;
        align-items: center;
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        font-size: inherit;
        line-height: 36px;
        outline: 0;
        padding: 0 5px;
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        width: 100%;
        /deep/.input-new-tag {
          min-width: 200px;
          flex: 1;
        }
        /deep/ .el-input__inner {
          border: 0;
          height: 34px;
        }
        /deep/ .el-tag {
          margin-right: 5px;
        }
      }
      & > i {
        font-size: 18px;
        width: 60px;
        text-align: center;
      }
    }
  }
}
/deep/ .el-icon-delete-solid {
  font-size: 18px;
  line-height: 38px;
  cursor: pointer;
}
/deep/.inputSelect {
  width: 50px;
  padding: 0 -10px;
  /deep/.el-input--suffix {
    width: 70px !important;
  }
}
/deep/.el-input-group__append {
  background: #fff;
  padding: 0 15px;
  width: 30px;
  color: #000000;
}
.search-conditions {
  display: flex;
  justify-content: space-between;
}
// 控制上传按钮大小
/deep/ .el-upload--picture-card {
  width: 108px;
  height: 108px;
  line-height: 108px;
}
/deep/ .el-upload-list--picture-card > li {
  float: left;
  width: 108px;
  height: 108px;
  &:first-child {
    width: 223px;
    height: 223px;
  }
}
.pageSaveBtn {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
  text-align: right;
  font-size: 0;
  margin-bottom: 40px;
}
// 表格样式
.table {
  position: relative;
  .show {
    width: 100% !important;
  }
  .tableImage {
    width: 42px;
    height: 42px;
    border: 1px solid #dadde4;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 auto;
  }
  .checkOption {
    overflow: hidden;
    width: 82px;
    height: 32px;
    line-height: 30px;
    background: #fff;
    padding: 0 12px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    z-index: 1;
    position: absolute;
    left: 0;
    top: 12px;
    .checkContent {
      width: 100%;
      height: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      color: #273a8a;
      i {
        line-height: 30px;
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
  .edit-inp {
    border: 1px solid #dcdfe6;
    min-width: 80px;
    border-radius: 4px;
    padding: 0 7px;
    height: 36px;
    width: 80px;
  }
  /deep/.has-gutter > tr > th {
    &:first-child {
      padding-left: 15px;
    }
  }
  /deep/ .cell {
    text-overflow: initial;
  }
}
// 选择图片弹框
.selectProPicDialog {
  .sku-picture-list {
    height: 404px;
    overflow: hidden;
    overflow-y: auto;
    padding: 20px 20px 0;
    li {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      margin-right: 6px;
      margin-bottom: 6px;
      cursor: pointer;
      border-radius: 8px;
      border: 4px solid #fff;
      .picture-item {
        width: 84px;
        height: 84px;
        border-radius: 4px;
        border: 1px solid #dadde4;
        background-color: #f7f8fd;
        background-origin: content-box;
        background-position: 50% 50%;
        background-size: contain;
        background-repeat: no-repeat;
      }
      i {
        position: absolute;
        bottom: 4px;
        right: 4px;
        font-size: 18px;
        color: #fff;
      }
    }
    .active {
      border-color: #7e8dda;
    }
  }
  /deep/ .el-dialog__body {
    padding: 0;
  }
}
// seo样式
.jh-seo-preview {
  margin: 0 -12px;
  padding: 0 12px;
  border-bottom: 1px solid #ededf4;
  .mt8 {
    margin-top: 8px;
  }
  .seo-title {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #412b92;
    line-height: 20px;
  }
  .seo-desc,
  .seo-link {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    line-height: 17px;
  }
}
.seo-form {
  margin: 20px -12px 0;
  padding: 0 12px;
  border-top: 0 solid #ededf4;
  .subTitle {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #c1c2cc;
    line-height: 17px;
  }
  .fr {
    float: right;
  }
  p {
    margin: 12px 0px;
  }
}
</style>  
<style>
.hide .el-upload--picture-card {
  display: none !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
</style>