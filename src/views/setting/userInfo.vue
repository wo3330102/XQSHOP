<template>
  <div class="container">
    <router-link
      to="/setting"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>设置</span>
    </router-link>
    <h1>基本信息</h1>
    <div>
      <el-row>
        <el-col :span="16">
          <!-- 活动名称 -->
          <div class="box">
            <h3 class="title">
              店铺信息
              <span style="color: rgb(193, 194, 204); font-weight: normal"
                >（设置店铺的联系方式，平台和顾客将通过此信息与你联系）</span
              >
            </h3>
            <div class="content" style="padding-top: 17px">
              <el-form :model="formData" :rules="rules" ref="form">
                <el-form-item prop="name">
                  <label slot="label">店铺名称</label>
                  <el-input
                    v-model="formData.name"
                    placeholder="请输入店铺名称"
                  ></el-input>
                </el-form-item>
                <!-- <el-form-item prop="userEmail">
                  <label slot="label">
                    账户邮箱
                    <span class="des">（接收系统通知的邮箱）</span>
                  </label>
                  <el-input
                    v-model="formData.accountEmail"
                    placeholder="请输入邮箱"
                  ></el-input>
                </el-form-item> -->
                <el-form-item prop="KeFuEmail">
                  <label slot="label">
                    客服邮箱
                    <span class="des">（顾客联系客服的邮箱）</span>
                    <a
                      href="https://help.xshoppy.com/new/#/article/detail/361464"
                      target="_blank"
                      style="
                        color: rgb(39, 58, 138);
                        text-decoration: underline;
                        cursor: pointer;
                        float: right;
                      "
                      >如何创建主域名邮箱？</a
                    >
                  </label>
                  <el-input
                    v-model="formData.contactEmail"
                    placeholder="请输入邮箱"
                  ></el-input>
                </el-form-item>
                <!-- <el-form-item prop="phone">
                  <label slot="label">
                    联系电话 
                  </label>
                  <el-input v-model="formData.phone"  placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item prop="detailedAddress">
                  <label slot="label">
                    店铺地址 
                  </label>
                  <el-input v-model="formData.detailedAddress"  placeholder="请输入店铺地址"></el-input>
                </el-form-item> -->
                <el-form-item>
                  <label slot="label"> 店铺logo<span style="color:rgb(193, 194, 204)">(建议尺寸：200 x 60)</span></label>
                  <el-upload
                    :action="url + '/api/upload'"
                    :headers="{
                      Authorization: token,
                    }"
                    list-type="picture-card"
                    :on-preview="PictureCardPreview"
                    :on-remove="RemoveImg"
                    :on-change="ChangeImg"
                    :on-success="UploadSuccess"
                    :limit="1"
                    :file-list="imageUrl"
                    :class="showUpload ? 'hide' : ''"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog title="查看图片" :visible.sync="dialogVisible">
                    <img width="100%" :src="imageUrl" alt />
                  </el-dialog>
                </el-form-item>
                <el-form-item label="前台货币展示" >
                  <el-select v-model="formData.countryDataIds" filterable multiple placeholder="请选择前台展示的货币" style="width:100%">
                    <el-option :label="item.zh" :value="item.id" v-for="item in countryList" :key="item.id">
                      <span style="float: left">{{ item.zh }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px;margin-right:20px">货币符号：{{ item.currencySymbol }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box-right">
            <p class="infoTip">温馨提示</p>
            <p class="infoContent">
              1、设置店铺的联系方式，平台和顾客将通过此信息与你联系。
            </p>
            <!-- <p class="infoContent">2、完成第一单支付交易后，则不可修改币种。</p>
            <p class="infoContent">1、设置店铺的联系方式，平台和顾客将通过此信息与你联系。</p>-->
          </div>
        </el-col>
      </el-row>
      <div class="pageSaveBtn">
        <el-button type="primary" @click="Save">保存</el-button>
      </div>
    </div>
  </div>
</template> 
<script>
import { getShopById, edit,getContryList } from "@/api/yxSystemStore";
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    return {
      url: localStorage.getItem("uploadUrl"),
      formData: {},
      rules: {
        name: [{ required: true, message: "请填写店铺名称", trigger: "blur" }],
        accountEmail: [{ validator: checkEmail, trigger: "blur" }],
        contactEmail: [{ validator: checkEmail, trigger: "blur" }],
        // phone:[{pattern: /^[1][3456789]\d{9}$/, required:true, message: '请输入正确的手机号码', trigger: 'blur' }],
        // detailedAddress:[{required:true, message: '请填写店铺地址', trigger: 'blur'}],
      },
      pass: false,
      dialogVisible: false, // 上传图片是否显示
      imageUrl: [], // 图片路径
      showUpload: false, // 是否显示上传按钮
      token: localStorage.getItem("token"),
      countryList:[],
    };
  },
  watch: {
    rules: function (val) {
      console.log(val);
    },
  },
  created() {
    let storeId = localStorage.getItem("storeId");
    getContryList().then(res=>{
      res.data.map(item=>{
        item.id = item.id.toString();
      })
      this.countryList = res.data
    })
    getShopById(storeId).then((res) => {
      res.countryDataIds = res.countryDataIds?res.countryDataIds.split(','):''
      this.formData = res;
      if (this.formData.phone == "") {
        this.formData.phone = null;
      }
      console.log(res.countryDataIds)

      if (this.formData.image) {
        this.imageUrl = [{ url: this.formData.image }];
        this.showUpload = true;
      }
    });
  },
  methods: {
    // ValidateFrom: function (boolean, item) {
    //   console.log(boolean, item);
    //   if(item){
    //     this.pass= true;
    //   } else {
    //     this.pass = false;
    //   }
    // },
    PictureCardPreview(file) {
      this.imageUrl = file.url;
      this.dialogVisible = true;
    },
    ChangeImg(file, fileList) {
      this.showUpload = fileList.length >= 1;
    },
    UploadSuccess: function (res, file) {
      this.imageUrl = [{ url: res.link }];
    },
    RemoveImg: function (e) { 
      this.imageUrl = ''; 
      this.showUpload = false;
    },
    Save: function () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 向后台发送请求
          console.log(this.formData)
          let imageUrl = "";
          if (this.imageUrl.length > 0) {
            imageUrl = this.imageUrl[0].url;
          } else {
            imageUrl = "";
            this.$message.error("请上传门店logo");
            return false;
          }
          this.formData.countryDataIds = this.formData.countryDataIds.toString();
          this.formData.image = imageUrl;
          edit(this.formData).then((res) => {
            this.$message.success("编辑成功");
            this.$router.push("/setting");
          });
        } else {
          //就像用户提示发生错误的消息
          this.$message.error("请完善表格数据");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
h1 {
  font-size: 24px;
  margin: 0 0 12px;
  font-weight: 400;
  justify-items: center;
  display: flex;
}
/deep/.el-row {
  margin: 0 -10px;
  .el-col {
    padding: 0 10px;
  }
}
.box {
  margin-bottom: 20px;
  padding: 0;
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
    height: 54px;
    line-height: 54px;
    padding: 0 12px;
    display: flex;
    align-items: center;
  }
  .content {
    border-top: 1px solid #ebeef5;
    /deep/ .el-form-item {
      margin-bottom: 22px;
      padding: 0 12px;
    }
    /deep/ .el-form-item__label {
      color: #242b4a;
      line-height: normal;
      margin-bottom: 12px;
      text-align: left;
      width: 100%;
    }
    .des {
      font-size: 14px;
      color: rgb(193, 194, 204);
    }
  }
}

.box-right {
  margin-bottom: 20px;
  padding: 12px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
    0 0 0 1px rgba(67, 67, 145, 0.05);
  overflow: hidden;
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
/deep/.el-select__input{
  margin-left: 0;
  padding-left: 8px;
}
/deep/ .el-upload-list--picture-card .el-upload-list__item{
  width: 200px;
  height: 60px;
  line-height:60px
}
/deep/ .el-upload--picture-card{
  width: 200px;
  height: 60px;
  line-height:60px
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