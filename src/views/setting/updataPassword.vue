<template>
  <div class="container">
    <router-link
      to="/setting"
      style="color: #5e7185;margin-bottom:12px;display:inline-block;height:20px;line-height:20px"
    >
      <i class="el-icon-arrow-left"></i>
      <span>设置</span>
    </router-link>
    <h1>账号信息</h1>
    <div>
      <el-row>
        <el-col :span="16">
          <!-- 活动名称 -->
          <div class="box">
            <h3 class="title">登录账号名</h3>
            <div class="content" style="padding-top:17px">
              <el-form :model="formData" :rules="rules" @validate="ValidateFrom">
                <el-form-item prop="oldPassword">
                  <label slot="label">旧密码</label>
                  <el-input v-model="formData.oldPassword" type="password" placeholder="6-20位英文数字组合"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <label slot="label">新密码</label>
                  <el-input v-model="formData.password" type="password" placeholder="6-20位英文数字组合"></el-input>
                </el-form-item>
                <el-form-item prop="againPassword">
                  <label slot="label">确认密码</label>
                  <el-input v-model="formData.againPassword" type="password" placeholder="6-20位英文数字组合"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box-right">
            <p class="infoTip">温馨提示</p>
            <p class="infoContent">1、密码为6-20位英文和数字组合，区分大小写。</p>
          </div>
        </el-col>
      </el-row>
      <div class="pageSaveBtn">
        <el-button @click="Save" type="primary">保存</el-button>
      </div>
    </div>
  </div>
</template> 
<script>
import {updatePass} from '@/api/user'
export default {
  data() {
    var oldPassword = (rule, value, callback, source) => {
      console.log(source);
      if (value == "") {
        callback(new Error("请输入旧密码"));
      } else {
        callback();
      }
    };
    var password = (rule, value, callback) => {  
      if (value == "") {
        callback(new Error("请输入密码"));
      } else if (value.length<6 || value.length>20) {
        callback(new Error("密码长度为6-20位"));
      } else {
        callback();
      } 
    };
    var checkPassword = (rule, value, callback)=>{
      if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value.length<6 || value.length>20) {
          callback(new Error("密码长度为6-20位"));
        } else if (value !== this.formData.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
    }
    return {
      formData: {
        oldPassword: "",
        password: "",
        againPassword: "",
      },
      rules: {
        oldPassword: [{ validator: oldPassword, trigger: "blur" }],
        password: [{ validator: password, trigger: "blur" }],
        againPassword: [{ validator: checkPassword, trigger: "blur" }],
      },
      pass:false,
    };
  },
  methods: {
    ValidateFrom: function (item,boolean) { 
      if(item == 'againPassword'){
        this.pass = boolean
      } 
    },
    ClearValidate:function (el){
      this.clearValidate(el)
    },
    Save:function(e){ 
      let that = this;
      if(this.pass){ 
        let par = {
          oldPass:that.formData.oldPassword,
          newPass:that.formData.password
        }
        updatePass(par).then(res=>{
          that.$message.success('修改成功')
          that.$router.push('/setting')
        })
      }
    }
  },
  updated() {
    console.log("更新");
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
</style>  