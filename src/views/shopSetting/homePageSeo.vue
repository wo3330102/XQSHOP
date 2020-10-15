<template>
  <div class="container">
    <h1>主页SEO</h1>
    <div>
      <el-row>
        <el-col :span="16">
          <!-- Facebook Pixel -->
          <div class="box">
            <h3 class="title">搜索引擎列表预览</h3>
            <div>
              <p style="margin :12px 0">
                SEO标题
                <span class="subTitle" style="float:right">{{detail.seoTitle?detail.seoTitle.length : 0}}/70 字符</span>
              </p>
              <el-input v-model="detail.seoTitle" maxlength="70"></el-input>
              <p style="margin :12px 0">
                SEO关键字
                <span class="subTitle" style="float:right">{{detail.seoKeys?detail.seoKeys:0}}/70 字符</span>
              </p>
              <el-input v-model="detail.seoKeys" maxlength="70"></el-input>
              <p style="margin :12px 0">
                SEO详情
                <span class="subTitle" style="float:right">{{detail.seoContent?detail.seoContent.length : 0}}/320 字符</span>
              </p>
              <el-input type="textarea" v-model="detail.seoContent" maxlength="320"></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box">
            <p class="infoTip">温馨提示</p>
            <p class="infoContent">优化主页SEO可以帮助搜索引擎更好的抓取您的网站信息，提高搜索权重。</p>
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
import {get,edit,add} from '@/api/yxSystemStoreTrack'
export default {
  data() {
    return {
      detail:{
        seoTitle:'',
        seoKeys:'',
        seoContent:'', 
      },
      isAdd:true
    };
  }, 
  created(){
    let par = {
      page:0,
      size:10,
    }
    get(par).then(res=>{ 
      if(res.content.length>0){
        this.isAdd = false;
        this.detail = res.content[0];
      } else {
        this.detail = {};
      }
    })
  },
  methods: {
    Save:function(){
      if(this.isAdd){
        add(this.detail).then(res=>{ 
          this.$message.success('新增成功')
        })
      } else {
        edit(this.detail).then(res=>{
          this.$message.success('修改成功')
        })
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
  }
  .subTitle {
    font-size: 12px;
    color: #c1c2cc;
    padding-left: 6px;
    font-weight: 400;
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
}
.pageSaveBtn {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
  text-align: right;
  font-size: 0;
  margin-bottom: 40px;
}
</style>  