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
    <h1>新增商品</h1>
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
          <div class="item-margin">
            <span class="text-span">价格</span>
            <el-input
              class="box-item-entry"
              v-model.number="attr.price"
              size="medium"
              placeholder="请输入商品现价"
            >
              <span slot="append">USD</span>
            </el-input>
          </div>
          <div class="item-margin">
            <span class="text-span">库存数量</span>
            <el-input
              v-model.number="attr.stock"
              size="medium"
              placeholder="请输入商品库存"
            ></el-input>
          </div>
          <!-- <div class="item-margin">
            <span class="text-span">商品SKU</span>
            <el-input class="box-item-entry" v-model="detail.price" size="medium" placeholder="请输入商品SKU"></el-input>
          </div> -->
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
              v-model="detail.classIds"
              placeholder="请选择商品分类"
            >
              <el-option
                :disabled="!item.disabled"
                v-for="item in categoryList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="product-right">
          <div class="item-margin">
            <span class="text-span">原价</span>
            <el-input
              class="box-item-entry"
              v-model.number="attr.ot_price"
              size="medium"
              placeholder="请输入商品原价"
            >
              <span slot="append">USD</span>
            </el-input>
          </div>
          <div class="item-margin">
            <span class="text-span">商品重量</span>
            <el-input
              class="box-item-entry"
              v-model.number="attr.weight"
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
          <!-- <div class="item-margin">
            <span class="text-span">标签</span>
            <el-input v-model="shopLabel" size="medium" placeholder="请选择商品标签"></el-input>
          </div> -->
        </div>
      </div>
      <div class="box">
        <h3 class="title">商品详情</h3>
        <div>
          <tinymce-editor
            ref="editor"
            v-model="detail.description"
          ></tinymce-editor>
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
        </h3>
        <div class="content">
          <el-upload
            action="https://admin2.xqkj.top/api/upload"
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
          <div class="spec-category" v-else>
            <div
              v-for="(item, index) in shopAttributeList"
              :key="index"
              class="item"
            >
              <el-input
                v-model="item.value"
                size="medium"
                style="width: 200px"
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
          <div class="table" v-show="table.length > 0">
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
                    <el-image :src="scope.row[item.slot]">
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
                    v-model="scope.row[item.slot]"
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
      <div class=""></div>
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
let storeId = localStorage.getItem("storeId"); // 初始化请求参数

import tinymceEditor from "@/components/tinymce-editor";
import tableTem from "@/components/tableTem";
import { add, edit, getInfo, isFormatAttr } from "@/api/yxStoreProduct";
export default {
  components: {
    tinymceEditor,
    tableTem,
  },
  data() {
    return {
      token: "",
      isGrounding: true,
      attr: {}, // 单规格数据
      shopSku: "",
      // stockTypeValue: 2,
      // stockTypeList: [
      //   {
      //     value: 1,
      //     label: "跟踪商品库存",
      //   },
      //   {
      //     value: 2,
      //     label: "不使用库存",
      //   },
      // ],
      // sellOutPolicyValue: 1, // 售罄政策
      // sellOutPolicyList: [
      //   {
      //     value: 1,
      //     label: "无库存继续出售",
      //   },
      //   {
      //     value: 2,
      //     label: "无库存停止出售",
      //   },
      // ],
      categoryValue: "", // 分类值
      categoryList: [], // 分类列表
      shopLabel: "", // 商品标签
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
      detail: {},
      id: "",
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
          label: "修改库存",
          value: 4,
        },
        {
          label: "修改重量",
          value: 5,
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
      temp_id: "", // 运费模板id（兼容另外一个系统）
      oldTableHeader: [], // 请求头（用于新增）
    };
  },
  created() {
    this.GetInfo();
    this.token = localStorage.getItem("token");
  },
  methods: {
    // 获取信息
    GetInfo() {
      let par = {
        id: 0,
        storeId,
      };
      getInfo(par).then((res) => {
        this.categoryList = res.cateList;
        this.detail = { ...res.productInfo };
        this.temp_id = res.tempList[0].id || "";
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
      this.shopAttributeList.push({
        value: "",
        inputValue: "",
        detail: [],
      });
    },
    // 关闭规格
    CloseOption: function (e) {
      this.shopAttributeList.splice(e, 1);
      this.InitFormatAttr();
    },
    // 新增规格值
    InputConfirm: function (index) {
      let val = this.shopAttributeList[index].inputValue;
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
    },
    // 关闭规格值
    CloseTag: function (item, index) {
      let arr = this.shopAttributeList;
      arr[index].detail.splice(arr[index].detail.indexOf(item), 1);
      if (arr[index].detail.length == 0) {
        arr.splice(index, 1);
        this.InitFormatAttr();
      }
    },
    // 初始化规格
    InitFormatAttr: function () {
      // 多规格时初始化表单
      let arr = [];
      this.shopAttributeList.map((i) => {
        if (i.value && i.detail.length > 0) {
          arr.push(i);
        }
      });
      let par = {
        attrs: arr,
      };
      isFormatAttr(0, par).then((r) => {
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
        this.oldTableHeader = r.header;
        this.tableHeader = arr;
        console.log(r.value);
        r.value.map((v, i) => {
          v.index = i;
        });
        this.table = r.value;
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
      this.optionIndex = e - 1;
      // 1 删除; 2 修改价格; 3 修改原价; 4 修改库存; 5 修改重量
      if (e == 1) {
        let arr = [];
        item.map((i) => {
          table.map((item, inx) => {
            if (item.index == i.index) {
              table.splice(inx, 1);
            }
          });
        });
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
      // 1 删除; 2 修改价格; 3 修改原价; 4 修改库存; 5 修改重量
      switch (this.optionIndex + 1) {
        case 2:
          ChangeTable("price");
          break;
        case 3:
          ChangeTable("ot_price");
          break;
        case 4:
          ChangeTable("stock");
          break;
        case 5:
          ChangeTable("weight");
          break;
      }
      function ChangeTable(e) {
        item.map((i) => {
          table.map((item, inx) => {
            if (item.index == i.index) {
              item[e] = that.batchValue;
            }
          });
        });
        that.batchOperation = false;
      }
    },
    // 选择图片
    SelectPicture: function (index) {
      console.log(index);
      this.tableIndex = index; 
      if (this.table[index].pic) {
        this.showDelImage = true;
      }
      this.showDialog = true;
    },
    // 提交图片
    SubImage: function () {
      let that = this; 
      that.table[that.tableIndex].pic = that.fileList[that.active].response.link;
      this.showDialog = false;
    },
    DelImage: function () {
      this.table[this.tableIndex].pic = "";
      this.showDialog = false;
    },
    // 保存修改
    Save: function () {
      let that = this;
      let attr = this.attr;
      // 判断是否上传图片
      if (this.fileList.length == 0) {
        that.$message.error("请上传商品图片");
        return false;
      } 
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
        store_name: "名称",
        temp_id: that.temp_id,
        unit_name: "",
        ...this.detail,
      };
      if (this.table.length > 0) {
        // 多规格
        data.spec_type = 1;
        data.header = that.oldTableHeader;
        data.items = that.shopAttributeList;
        let arr = that.table;
        arr.map((i) => {
          i.cost = 0;
          i.volume = 0;
        });
        (that.attr = {
          pic: that.fileList[0].response.link,
          price: attr.price,
          cost: 0,
          ot_price: attr.ot_price,
          stock: attr.stock,
          bar_code: "",
          weight: attr.weight,
          volume: 0,
          brokerage: 0,
          brokerage_two: 0,
        }),
          (data.attrs = arr);
      } else {
        data.attrs = [
          {
            pic: that.fileList[0].response.link,
            price: attr.price,
            cost: 0,
            ot_price: attr.ot_price,
            stock: attr.stock,
            bar_code: "",
            weight: attr.weight,
            volume: 0,
            brokerage: 0,
            brokerage_two: 0,
          },
        ];
      }
      data.image = this.fileList[0].response.link;
      // 初始化轮播图
      data.slider_image = [];
      // 如果只有一张图片，则该图片既为主图又为轮播图，否则其他图片作为轮播图
      if (this.fileList.length == 1) {
        data.slider_image.push(this.fileList[0].response.link);
      } else {
        let arr = this.fileList.slice(1, this.fileList.length);
        arr.map((i) => {
          data.slider_image.push(i.response.link);
        });
      }
      add(data).then((res) => {
        that.$message({
          message: "修改成功",
          type: "success",
        });
        that.$router.push("/commodityList");
      });
    },
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
        flex: 1;
        margin: 0 10px;
        display: flex;
        align-items: center;
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        font-size: inherit;
        height: 36px;
        line-height: 40px;
        outline: 0;
        padding: 0 5px;
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        width: 100%;
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
  /deep/.el-input__inner {
    padding: 0 10px !important;
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
    height: 30px;
    line-height: 30px;
    background: #fff;
    padding: 0 12px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    z-index: 1;
    position: absolute;
    left: 0;
    top: 6px;
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