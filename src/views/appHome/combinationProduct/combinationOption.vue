<template>
  <div class="container">
    <router-link
      to="/combinationProduct"
      style="
        color: #5e7185;
        margin-bottom: 12px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
      "
    >
      <i class="el-icon-arrow-left"></i>
      <span>组合商品</span>
    </router-link>
    <h1 class="title">
      <span class="text"> 配置 </span>
    </h1>
    <div>
      <el-row style="margin: 0 -10px">
        <el-col :span="16" style="padding-left: 10px; padding-right: 10px">
          <div class="box"> 
            <h3 class="title">
              组合商品显示位置
              <span class="option" @click="shopDialog = true"
                >效果预览</span
              >
            </h3>
            <el-radio-group v-model="form.location">
              <p style="margin-bottom: 15px;">
                <el-radio  :label="0">商品详情上方</el-radio>
              </p>
              <p>
                <el-radio  :label="1">商品详情下方</el-radio>
              </p>
            </el-radio-group>
          </div>
          <div class="box">
             <h3 class="title">标题修改</h3>
             <el-input type="textarea" v-model="form.title" placeholder="在此输入标题"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box">
            <p class="infoTip">信息提示</p>
            <p class="infoContent">
              1、组合商品的显示位置不同，可以提高加购和影响转化率。
            </p> 
          </div>
        </el-col>
      </el-row>
      <div class="pageSaveBtn">
        <el-button @click="$NavgitorTo('/combinationProduct')">取消</el-button>
        <el-button @click="Save" type="primary">保存</el-button>
      </div>
    </div> 
  </div>
</template> 
<script> 
import { getOption,saveOption } from "@/api/yxComposeProduct";

export default { 
  data() {
    return {
      form: {
        location:1,
        title:"FREQUENTLY BOUGHT TOGETHER",
      },  
      shopDialog: false, 
    };
  },
  created() {
    getOption().then((res) => { 
      this.form.title = res.data.title;
      this.form.location = res.data.location
    });
  }, 
  methods: { 
    Save:function(){
      saveOption(this.form).then(res=>{
        this.$message.success('修改成功');
        this.$router.push('/combinationProduct')
      })
    }
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
.mainProduct {
  .content {
    display: flex;
    flex: 1;
    .left {
      margin-right: 20px;
    }
    .right {
      div {
        margin-bottom: 10px;
        &:last-child {
          margin: 0;
        }
      }
      .title {
        color: #273a8a;
        line-height: 20px;
        cursor: pointer;
      }
    }
  }
}
.item-group {
  border-top: 1px solid #dcdfe6;
  display: flex;
  padding: 10px 0;
  position: relative;
  .ellipsis {
    flex: 1;
    padding-left: 13px; 
        display: flex;
    align-items: center;
  }
  .options {
    float: right;
    margin: 0 10px;
    line-height: 62px;
    i {
      margin: 0 5px;
      vertical-align: middle;
      cursor: pointer;
    }
  }
}
.textBtn {
  padding: 0;
  margin-right: 10px;
  color: #273a8a;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
}
.infoContent {
  line-height: 18px;
  font-size: 12px;
  color: #606266;
}
.infoTip {
  color: #1a1d2c;
  font-size: 14px;
  padding-bottom: 14px;
}
</style> 