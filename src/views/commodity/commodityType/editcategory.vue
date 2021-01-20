<template>
  <div class="container">
    <router-link
      to="/commodityType"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>分类列表</span>
    </router-link>
    <h1>添加分类</h1>
    <div>
      <el-row>
        <el-col :span="16">
          <div class="box info">
            <h3 class="title">分类名称</h3>
            <div>
              <div class="el-input el-input--medium el-input--suffix">
                <input
                  type="text"
                  autocomplete="off"
                  placeholder="建议英文且最多255个字符"
                  maxlength="255"
                  v-model="form.title"
                  class="el-input__inner"
                />
              </div>
            </div>
            <h3 class="otherTitle">分类描述</h3>
            <div>
              <tinymce-editor ref="editor" v-model="form.content"></tinymce-editor>
            </div>
            <!-- <h3 class="otherTitle">上级分类</h3>
            <div> 
              <treeselect v-model="form.pid" :options="categotyList" style="width: 370px;" placeholder="选择上级分类" /> 
            </div>  -->
          </div>
          <div class="box image">
            <h3 class="title">分类图片</h3>
            <div class="content">
              <el-upload
                :action="url+'/api/upload'"
                :headers="{
                  Authorization: token,
                }"
                list-type="picture-card"
                :on-preview="PictureCardPreview"
                :on-remove="RemoveImg"
                :on-change="ChangeImg"
                :on-success="UploadSuccess"
                :limit="limit"
                :file-list="imageUrl"
                :class="showUpload ? 'hide' : ''"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="imageUrl" alt />
              </el-dialog>
            </div>
          </div>
          <div class="box category-type" v-if="''">
            <h3 class="title">分类类型</h3>
            <el-radio v-model="categoryType" :label="1">手动分类</el-radio>
            <p class="dec">手动将产品添加到此分类中。</p>
            <el-radio v-model="categoryType" :label="2">自动分类</el-radio>
            <p class="dec">
              自动分类条件一直生效，设置后修改和新建的商品满足条件都会自动加入到该分类。
            </p>
            <div class="rules-box" v-show="categoryType == 2">
              <h3 class="title">分类条件</h3>
              <div class="condition">
                <label>满足条件：</label>
                <el-radio-group v-model="categoryCondition">
                  <el-radio :label="1">所有条件</el-radio>
                  <el-radio :label="2">任一条件</el-radio>
                </el-radio-group>
              </div>
              <el-form :model="formData" @validate="validate" ref="form">
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                  "
                  v-for="(formItem, formIndex) in formData.domains"
                  :key="formItem.key"
                >
                  <!-- 商品属性 -->
                  <el-select
                    v-model="formItem.shopAttributeValue"
                    @change="ChangeShopAttributeValue"
                  >
                    <el-option
                      v-for="item in shopAttributeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <!-- 判断 -->
                  <el-select v-model="formItem.shopJudgeValue">
                    <el-option
                      v-for="item in shopJudgeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-form-item
                    :prop="'domains[' + formIndex + '].value'"
                    :rules="{ validator: validatePass, trigger: 'blur' }"
                  >
                    <el-input
                      v-model="formItem.value"
                      placeholder="最多输入255个字符"
                      v-if="formItem.shopAttributeValue == 1"
                    ></el-input>
                    <el-input
                      v-model="formItem.value"
                      placeholder="最多输入32个字符"
                      v-if="formItem.shopAttributeValue == 2"
                    ></el-input>
                    <el-input
                      v-model.number="formItem.value"
                      placeholder="最多输入8个数字"
                      type="number"
                      v-if="formItem.shopAttributeValue == 3"
                    >
                      <el-button slot="append">{{currency.n}}</el-button>
                    </el-input>
                    <el-input
                      v-model.number="formItem.value"
                      placeholder="最多输入8个数字"
                      type="number"
                      v-if="formItem.shopAttributeValue == 4"
                    >
                      <el-button slot="append">{{currency.n}}</el-button>
                    </el-input>
                    <el-input
                      v-model.number="formItem.value"
                      placeholder="最多输入9个数字"
                      type="number"
                      v-if="formItem.shopAttributeValue == 5"
                    >
                      <el-select
                        v-model="shopWeightSelectValue"
                        class="inputSelect"
                        slot="append"
                      >
                        <el-option
                          v-for="item in shopWeightList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          style="
                            width: 50px;
                            padding: 0 10px;
                            text-align: center;
                          "
                        ></el-option>
                      </el-select>
                    </el-input>
                    <el-input
                      v-model.number="formItem.value"
                      placeholder="最多输入8个数字"
                      type="number"
                      a
                      v-if="formItem.shopAttributeValue == 6"
                    ></el-input>
                  </el-form-item>
                  <i
                    v-show="formData.domains.length > 1"
                    class="el-icon-delete-solid"
                    @click.prevent="RemoveDomain(formItem)"
                  ></i>
                </div>
              </el-form>
              <el-button @click="addFormData">添加条件</el-button>
            </div>
          </div>
          <div class="box concat-product" v-if="''">
            <h3 class="title">
              关联商品
              <span class="title-des" v-if="relationShop == 1"
                >（点击商品，可支持批量调序处理）</span
              >
              <span
                class="option"
                v-if="categoryType == 1"
                @click="showDialog = true"
                >关联商品</span
              >
            </h3>
            <div style="padding: 14px 0">
              排序：
              <el-select v-model="relationShop" placeholder>
                <el-option
                  v-for="item in relationShopList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box">
            <p class="infoTip">信息提示</p>
            <p class="infoContent">
              1.
              分类是展示给顾客看的，挑选一张高质量图片，可以提高顾客的点击率。编辑完成后店铺装修中批量选取分类及商品即可展现给客户。
            </p>
          </div>
        </el-col>
      </el-row>
      <div class="pageSaveBtn">
        <el-button @click="$NavgitorTo('/commodityList')">取消</el-button>
        <el-button @click="Save" type="primary">保存</el-button>
      </div>
    </div>
    <!-- 暂时无用 -->
    <el-dialog title="请选择关联商品" :visible.sync="showDialog">
      <div class="search-conditions">
        <el-select
          v-model="relationShopLabelValue"
          placeholder="请选择标签"
          style="width: 200px"
        >
          <el-option
            v-for="item in relationShopLabelList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          v-model="relationShopTypeValue"
          placeholder="请选择分类"
          style="width: 200px; margin: 0 10px"
        >
          <el-option
            v-for="item in relationShopTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          v-model="relationShopInputValue"
          placeholder="请输入内容"
          style="flex: 1"
        >
          <el-button slot="append">查询</el-button>
        </el-input>
      </div>
      <el-table
        ref="multipleTable"
        :data="relationShopForm"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="ChangeRelationShopForm"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="标签" width="120"></el-table-column>
        <el-table-column prop="name" label="分类" width="120"></el-table-column>
        <el-table-column
          prop="address"
          label="内容"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <span style="float: left; line-height: 41px"
          >总共{{ relationShopNumber }}个商品， 已选择{{
            selectRelationShopNumber
          }}个</span
        >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :disabled="!selectRelationShopNumber"
          @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template> 
<script> 
import { edit, getCates } from "@/api/yxStoreCategory";
import tinymceEditor from "@/components/tinymce-editor";
// import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: {
    tinymceEditor,
    // Treeselect
  },
  data() {
    var validatePass = (rule, value, callback, options) => {
      for (let key in options) {
        var thisShopAttributeValue = key;
      }
      let index = thisShopAttributeValue[8];
      if (value == "") {
        callback(
          new Error(
            "请输入" +
              this.shopAttributeList[
                this.formData.domains[index].shopAttributeValue - 1
              ].label
          )
        );
      }
      let num = "";
      switch (this.shopAttributeValue) {
        case 1:
          if (value.length > 255) {
            callback(new Error("最多输入255个字符"));
          }
          break;
        case 2:
          if (value.length > 32) {
            callback(new Error("最多输入32个字符"));
          }
          break;
        case 3:
          if (value.toString().indexOf(".") > -1) {
            num = value.toString().replace(".", "");
          }
          if (num.length > 8) {
            callback(new Error("最多输入8个数字"));
          }
          break;
        case 4:
          if (value.toString().indexOf(".") > -1) {
            num = value.toString().replace(".", "");
          }
          if (num.length > 8) {
            callback(new Error("最多输入8个数字"));
          }
          break;
        case 5:
          if (value.toString().indexOf(".") > -1) {
            num = value.toString().replace(".", "");
          }
          if (num.length > 9) {
            callback(new Error("最多输入9个数字"));
          }
          break;
        case 6:
          if (value.toString().indexOf(".") > -1) {
            num = value.toString().replace(".", "");
          }
          if (num.length > 8) {
            callback(new Error("最多输入8个数字"));
          }
          break;
        default:
          break;
      }
      callback();
    };
    return {
      url:localStorage.getItem('uploadUrl'),
      token: "",
      form: {}, // 富文本内容 
      categotyList: [], // 分类列表
      upLoadHeaders: {}, // 上传头部字段
      dialogVisible: false, // 上传图片是否显示
      imageUrl: [], // 图片路径
      showUpload: false, // 是否显示上传按钮
      limit: 1, // 最大上传数
      categoryType: 2, // 分类类型（手动/自动）
      categoryCondition: 1, // 满足条件（所有/任一）
      formData: {
        // 分类表单列表
        domains: [
          {
            value: "",
            shopAttributeValue: 1,
            shopJudgeValue: 1,
            key: 0,
          },
        ],
      },
      shopAttributeValue: 1, // 默认选中的商品属性
      shopAttributeList: [
        // 商品属性列表
        {
          value: 1,
          label: "商品名称",
        },
        {
          value: 2,
          label: "标签",
        },
        {
          value: 3,
          label: "商品价格",
        },
        {
          value: 4,
          label: "商品原价",
        },
        {
          value: 5,
          label: "商品重量",
        },
        {
          value: 6,
          label: "商品库存",
        },
      ],
      shopJudgeValue: 1, // 默认选中的商品条件
      shopJudgeList: [
        // 商品条件列表
        {
          value: 1,
          label: "商品标签",
        },
        {
          value: 2,
          label: "标签",
        },
        {
          value: 3,
          label: "商品价格",
        },
        {
          value: 4,
          label: "商品原价",
        },
        {
          value: 5,
          label: "商品重量",
        },
        {
          value: 6,
          label: "商品库存",
        },
      ],
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
      validatePass: validatePass, // 自定义校验规则
      relationShop: 2, // 默认排序
      relationShopList: [
        // 排序方式
        {
          label: "手动排序",
          value: 1,
        },
        {
          label: "按价格从高到低",
          value: 2,
        },
        {
          label: "按价格从低到高",
          value: 3,
        },
        {
          label: "按销量从高到低",
          value: 4,
        },
        {
          label: "按销量从低到高",
          value: 5,
        },
        {
          label: "按商品创建时间倒序",
          value: 6,
        },
        {
          label: "按商品创建时间正序",
          value: 7,
        },
      ],
      showDialog: false, // 是否显示“关联商品”对话框
      relationShopLabelValue: "", // 默认选中的关联商品标签
      relationShopLabelList: [], // 关联商品标签列表
      relationShopTypeValue: "", // 默认选中的关联商品分类
      relationShopTypeList: [], // 关联商品分类列表
      relationShopInputValue: "", // 关联商品输入框
      relationShopForm: [], // 关联表单数据
      selectRelationShopNumber: 0, // 已选中关联商品数量
      relationShopNumber: 0, // 关联商品数量
    };
  },
  created() {
    let form = JSON.parse(localStorage.getItem('categoryDetail'))
    let that = this; 
    this.token = localStorage.getItem("token"); 
    if(form.pic){
      this.imageUrl = [{url:form.pic}]; 
      this.showUpload = true;
    } 
    this.form = form;
  },
  methods: {
    PictureCardPreview(file) {
      this.imageUrl = file.url;
      this.dialogVisible = true;
    },
    ChangeImg(file, fileList) {
      this.showUpload = fileList.length >= this.limit;
    },
    UploadSuccess: function (res, file) { 
      this.imageUrl = [{url:res.link}];
    },
    RemoveImg: function (e) {
      this.showUpload = false;
    },
    validate: function (boolean, object) {
      console.log(boolean);
      console.log(object);
    },
    ChangeShopAttributeValue: function () {
      this.$refs["form"].resetFields();
    }, 
    addFormData: function () { 
      this.formData.domains.push({
        value: "",
        shopAttributeValue: 1,
        shopJudgeValue: 1,
        key: this.formData.domains.length,
      });
    },
    RemoveDomain(item) {
      var index = this.formData.domains.indexOf(item);
      if (index !== -1) {
        this.formData.domains.splice(index, 1);
      }
      // this.
    },
    ChangeRelationShopForm: function () {},
    // 新增
    Save: function () { 
      let imageUrl = '';
      let that = this;
      if(this.imageUrl.length>0){
        imageUrl = this.imageUrl[0].url
        console.log(imageUrl)
      } else {
        imageUrl = ''
      } 
      console.log('测试')
      let par = {  
        ...this.form,
        pic: imageUrl,
      }; 
      edit(par).then((res) => { 
        this.$message.success('修改成功');
        setTimeout(function(){
          that.$router.push('/commodityType')
        },200)
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
  & > .infoTip {
    color: #1a1d2c;
    font-size: 14px;
    padding-bottom: 14px;
  }
  & > .otherTitle {
    margin: 20px 0 12px;
    font-size: 14px;
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
  .rules-box {
    border-top: 1px solid #efecf0;
    padding-top: 8px;
    .condition {
      padding: 12px 0;
    }
    /deep/ .el-form-item__content {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    /deep/.el-input {
      width: 225px;
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
    width: 55px !important;
  } 
}
/deep/.el-input-group__append {
  background: #fff;
}
.search-conditions {
  display: flex;
  justify-content: space-between;
}
/deep/.el-dialog {
  width: 640px;
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