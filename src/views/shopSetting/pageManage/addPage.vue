<template>
  <div class="container">
    <router-link
      to="/pageManage"
      style="color: #5e7185;margin-bottom:12px;display:inline-block;height:20px;line-height:20px"
    >
      <i class="el-icon-arrow-left"></i>
      <span>页面管理</span>
    </router-link>
    <h1>添加页面</h1>
    <div>
      <el-row>
        <el-col :span="16">
          <div class="box info">
            <h3 class="title">标题</h3>
            <div>
              <div class="el-input el-input--medium el-input--suffix">
                <input
                  type="text"
                  autocomplete="off"
                  placeholder="最多255个字符"
                  maxlength="255"
                  class="el-input__inner"
                />
              </div>
            </div>
            <h3 class="otherTitle">内容</h3>
            <div>
              <tinymce-editor ref="editor" v-model="msg"></tinymce-editor>
            </div>
          </div> 
        </el-col>
        <el-col :span="8">
          <div class="box">
            <p class="infoTip">状态</p>
            <p class="infoContent">
                <el-radio label="1" v-model="radio" style="width:100%;margin: 5px 0px">可见</el-radio>
                <el-radio label="2" v-model="radio" style="width:100%;margin: 5px 0px">隐藏</el-radio>
            </p>
          </div>
          <div class="box">
            <p class="infoTip">页面类型</p>
            <p class="infoContent"> </p>
          </div>
        </el-col>
      </el-row>
      <div class="pageSaveBtn"> 
          <el-button @click="$NavgitorTo('/pageManage')">取消</el-button>
        <el-button type="primary" :disabled="save">保存</el-button>
      </div>
    </div> 
  </div>
</template> 
<script>
import tinymceEditor from "@/components/tinymce-editor";
export default {
  components: {
    tinymceEditor, 
  },
  data() {
     
    return {
      msg: "", // 富文本内容
      radio:'1',
      save:true,
    }
  },
  methods: {
     
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
} 
</style>  