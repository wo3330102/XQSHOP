<template>
  <div class="login">
    <div class="login-box">
      <div class="form">
        <p class="logo">
          <span style="font-size: 30px">XQSHOP</span>
        </p>
        <p class="desc">{{ findPassword ? "修改密码" : "登录你的店铺" }}</p>
        <div
          class="data"
          style="margin-top: 18px; text-align: center"
          v-if="findPassword == false"
        >
          <!--{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' } -->
          <el-form
            :model="loginData"
            style="width: 366px; margin: 0px auto"
            ref="loginData"
          >
            <el-form-item
              prop="email"
              :rules="[
                {
                  required: true,
                  message: '请输入您的账号',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                v-model="loginData.email"
                placeholder="请输入您的账号"
                style="width: 366px"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              :rules="[
                { required: true, message: '请输入密码', trigger: 'blur' },
              ]"
            >
              <el-input
                type="password"
                v-model="loginData.password"
                placeholder="请输入密码"
                style="width: 366px"
              ></el-input>
            </el-form-item>
            <el-form-item prop="code" style="margin: 0px; padding: 0px">
              <div class="code">
                <el-image :src="codeImg"> </el-image>
                <el-input
                  v-model="loginData.code"
                  placeholder="请输入验证码"
                ></el-input>
              </div>
            </el-form-item>
            <p class="item" style="margin-top: 30px">
              <el-button
                type="primary"
                style="width: 366px; height: 46px"
                @click="submitForm('loginData')"
                :loading="showLoading"
                >登入</el-button
              >
            </p>
            <!-- <p class="item" style="margin-top: 20px; color: rgb(26, 29, 44)">
              <span style="cursor: pointer" @click="findPassword = true"
                >忘记密码</span
              >
            </p> -->
          </el-form>
        </div>
        <div
          class="forgetdata"
          style="margin-top: 48px; text-align: center"
          v-if="findPassword"
        >
          <el-form
            :model="findPasswordData"
            style="width: 366px; margin: 0px auto"
          >
            <el-form-item>
              <el-input
                v-model="loginData.name"
                placeholder="请输入您的邮箱地址"
                style="width: 366px"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="loginData.name"
                placeholder="请输入密码"
                style="width: 366px"
              ></el-input>
            </el-form-item>
            <p class="item" style="margin-top: 30px">
              <el-button type="primary" style="width: 366px; height: 46px"> 
                登入 
              </el-button>
            </p>
            <p class="item" style="margin-top: 20px; color: rgb(26, 29, 44)">
              <span style="cursor: pointer" @click="findPassword = true"
                >忘记密码</span
              >
            </p>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCodeImg, login } from "@/api/login";
import { encrypt } from "@/utils/rsaEncrypt"; 
export default {
  data() {
    return {
      codeImg: "",
      findPassword: false,
      loginData: { email: "", password: "", uuid: "" },
      findPasswordData: {},
      showLoading:false,
    };
  },
  created() {
    this.GetCode();
    let that = this;
    document.onkeydown = function (e) {
      //按下回车提交
      let key = window.event.keyCode;
      //事件中keycode=13为回车事件
      if (key == 13 && that.findPassword == false) {
        // _this.append();
        that.submitForm("loginData");
      }
    };
  },
  methods: {
    GetCode: function () {
      getCodeImg()
        .then((res) => {
          this.codeImg = res.img;
          this.loginData.uuid = res.uuid;
        })
        .catch(() => {
          return false;
        });
    },
    submitForm(formName) {
      console.log("测试");
      let that = this;
      this.showLoading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(
            this.loginData.email,
            encrypt(this.loginData.password),
            this.loginData.code,
            this.loginData.uuid
          )
            .then((res) => {
              localStorage.setItem("token", res.token);
              localStorage.setItem('uploadUrl',process.env.VUE_APP_BASE_API)
              this.showLoading = false;
              
              this.$router.push("/"); 
            })
            .catch((res) => {
              that.GetCode();
              this.showLoading = false;
            });
        } else {
          this.showLoading = false;
          return false;
        }
      });
    },
  },
  beforeDestroy() {
    console.log("销毁");
    document.onkeydown = function(){};
  },
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("https://ddd.xshoppy.shop/static/img/bg.jpg") 50%;
  background-size: contain;
  .login-box {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: relative;
    .form {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -240px;
      margin-left: -300px;
      width: 600px;
      height: 480px;
      background: #fff;
      box-shadow: 0 1px 3px 0 rgba(35, 35, 112, 0.2),
        0 0 0 1px rgba(67, 67, 145, 0.05);
      border-radius: 4px;
      .logo {
        padding: 50px 0 10px;
        text-align: center;
      }
      .desc {
        text-align: center;
        font-size: 24px;
        font-weight: 400;
        color: #1a1d2c;
        line-height: 33px;
      }
      .item {
        text-align: center;
      }
    }
  }
  /deep/.el-input__inner {
    border-color: #1a1d2c;
    height: 46px;
    color: #1a1d2c;
    box-sizing: border-box;
  }
}
.code {
  display: flex !important;
  justify-content: flex-start !important;
}
.code .el-image {
  padding: 0px 20px 0 0;
  width: 40%;
  height: 36px;
}
.code .el-input .el-input--medium {
  width: 100%;
}
</style>