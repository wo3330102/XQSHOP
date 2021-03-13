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
    <h1>通知</h1>
    <div>
      <el-row>
        <el-col :span="16">
          <!-- 顾客通知 -->
          <div class="box">
            <h3 class="title">顾客通知</h3>
            <div>
              <p class="notice_item">
                <span class="notice_view" @click="$NavgitorTo('/orderCustomer',{id:detail[6].typeTemplate})"
                  >订单确认模板</span
                >
                <span class="notice_desc"
                  >顾客付款后，系统会立即发送订单确认邮件，告知顾客订单详情。</span
                >
                <span>
                  <el-switch v-model="detail[6].isOpen" :inactive-value="0" :active-value="1" @change="EditStatus(6)"></el-switch>
                </span>
              </p>
              <p class="notice_item">
                <span class="notice_view" @click="$NavgitorTo('/unpayOrder',{id:detail[5].typeTemplate})"
                  >弃单模板</span
                >
                <span class="notice_desc"
                  >顾客在结账页提交了个人信息，系统会根据设置的时间发送弃单营销邮件</span
                >
                <span>
                  <el-switch v-model="detail[5].isOpen" :inactive-value="0" :active-value="1" @change="EditStatus(5)"></el-switch>
                </span>
              </p>
              <p class="notice_item">
                <span class="notice_view" @click="$NavgitorTo('/sendNotice',{id:detail[4].typeTemplate})"
                  >已发货模板</span
                >
                <span class="notice_desc"
                  >订单状态变更为发货后，系统会立即发送物流通知邮件给顾客</span
                >
                <span>
                  <el-switch v-model="detail[4].isOpen" :inactive-value="0" :active-value="1" @change="EditStatus(4)"></el-switch>
                </span>
              </p>
            </div>
          </div>
          <!-- 卖家通知 -->
          <div class="box">
            <h3 class="title">卖家通知</h3>
            <div>
              <p class="notice_item">
                <span class="notice_view" @click="$NavgitorTo('/newOrder')"
                  >新订单模板</span
                >
                <span class="notice_desc"
                  >当有顾客完成付款，系统将发送邮件到卖家账户邮箱</span
                >
              </p>
              <p class="notice_item">
                <span style="width: 160px">新订单邮箱</span>
                <span class="notice_desc">{{
                  email
                    ? "将新订单邮件发送至 " + email
                    : "您尚未设置新订单通知邮箱"
                }}</span>
                <template v-if="email">
                  <span class="textBtn" @click="changeEmail = true">更换</span>
                  <span class="textBtn" @click="DeleteEmail">删除</span>
                </template>
                <span v-else class="textBtn" @click="changeEmail = true">设置</span>
              </p>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box-right">
            <p class="infoTip">温馨提示</p>
            <p class="infoContent">1. 弃单里增加优惠码可以很大的提升召回水平</p>
            <p class="infoContent" style="margin: 14px 0px">
              2. 顾客的回复将会自动回复到客服邮箱，处理及时可以避免大量客诉
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="设置新订单邮箱" :visible.sync="changeEmail">
      <el-form :model="form" ref="form">
        <el-form-item
          label="电子邮箱地址"
          prop="email"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur'],
            },
          ]"
        >
          <el-input v-model="form.email" placeholder="请输入您的邮箱"></el-input>
        </el-form-item>
      </el-form>
      <p style="color: #8B9DAE">顾客完成付款后，系统将发送通知邮件到该邮箱。</p>
      <div slot="footer"> 
        <el-button @click="changeEmail=false">取消</el-button>
        <el-button type="primary" @click="Save">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template> 
<script>
import { getNotice,editNoticeStatus } from "@/api/notice";
export default {
  data() {
    return {
      changeEmail:false,
      email:'', 
      form: {
        email: "",
      },  
      detail:[{},{},{},{},{},{},{}],
    };
  },
  created() {
    getNotice().then((res) => {
      console.log(res);
      this.detail = res.data
    });
  },  
  watch:{
    changeEmail:function(val){
      if(val){
        this.$refs['form'].resetFields()
      }
    }
  },
  methods: {
    EditStatus:function(e){  
      let par = {
        id:this.detail[e].id, 
      } 
      // 当前isOpen已经改变
      this.detail[e].isOpen === 1?par.isOpen = 1:par.isOpen = 0;  
      editNoticeStatus(par).then(res=>{ 
        this.$message.success('修改成功')
      })
    },
    
    Save:function(){
      this.$refs['form'].validate((valid) => {
          if (valid) {
            let par = {
              account:this.form.email,
              id:4,
              isOpen:1
            }
            editNoticeStatus(par).then(res=>{
              console.log(res);
              this.changeEmail = false;
              this.email = this.form.email;
            })
          } 
        });
    },
    DeleteEmail: function () {
      this.$confirm("删除后，您将接收不到新订单通知。?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$nextTick(()=>{
          this.email = "";
        })
        this.$message({
          type: "success",
          message: "删除成功!",
        });
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
.notice_item {
  padding: 0 12px;
  height: 70px;
  line-height: 70px;
  border-top: 1px solid #ebeef5;
  display: flex;
  .notice_view {
    color: #273a8a;
    cursor: pointer;
    text-decoration: underline;
    width: 160px;
  }
  .notice_desc {
    flex: 1;
    color: #242b4a;
  }
  .textBtn {
    padding: 0;
    margin-left: 10px;
    color: #273a8a;
    font-size: 14px;
    cursor: pointer;
    display: inline-block;
    font-weight: 400;
    float: right;
    text-decoration: underline;
  }
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