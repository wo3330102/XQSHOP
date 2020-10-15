<template>
  <div class="container">
    <router-link
      to="/menuManage"
      style="color: #5e7185;margin-bottom:12px;display:inline-block;height:20px;line-height:20px"
    >
      <i class="el-icon-arrow-left"></i>
      <span>菜单栏</span>
    </router-link>
    <h1>添加菜单栏</h1>
    <div>
      <el-row>
        <el-col :span="16">
          <!-- 菜单栏标题 -->
          <div class="box">
            <h3 class="title">菜单栏标题</h3>
            <div>
              <div class="el-input el-input--medium el-input--suffix">
                <input
                  type="text"
                  autocomplete="off"
                  placeholder="最多250个字符"
                  maxlength="250"
                  class="el-input__inner"
                  v-model="detail.title"
                />
              </div>
            </div>
          </div>
          <!-- 编辑菜单项 -->
          <div class="box" style="padding:0">
            <h3 class="title" style="padding: 12px;">编辑菜单项</h3>
            <div class="group" v-if="selectData.length>0">
              <template v-for="(item,index) in selectData">
                <div class="item-group" v-for="(v,i) in item.data" :key="i">
                <span class="ellipsis">{{v.name}}</span>
                <span class="options">
                  <i class="el-icon-delete" @click="DelMenu(index,i)"></i>
                </span>
              </div>
              </template>
            </div>
            <div class="addPage" @click="showAddMenu = true">
              <i class="el-icon-circle-plus-outline"></i>
              添加页面
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box">
            <h3 class="infoTip">菜单栏</h3>
            <p style class="infoContent">1.菜单栏可以在店铺的页头和页脚显示，方便用户在网站中进行页面跳转。</p>
            <p class="infoContent">2.通过点击添加页面来为菜单栏增加页面，按住页面前方按钮可以进行拖拽，为其他页面添加二级菜单。</p>
          </div> 
          <div class="box">
            <h3 class="infoTip">菜单栏位置<span class="infoContent"> (页头页尾只能有一个)</span></h3> 
            <el-select v-model="detail.status" placeholder="">
              <el-option v-for="item in optionList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div> 
          
        </el-col>
      </el-row>
      <div class="pageSaveBtn">
        <el-button @click="$NavgitorTo('/pageManage')">取消</el-button>
        <el-button type="primary" @click="Save">保存</el-button>
      </div>
    </div>
    <add-menu-com
      v-if="showAddMenu"
      :index="index"
      @Close="(e)=>{showAddMenu = false}"
      @selectData="GetData"
    ></add-menu-com>
  </div>
</template> 
<script>
import addMenuCom from "@/components/addMenuCom";
import {add,edit} from '@/api/yxStoreMenubar'
export default {
  components: {
    addMenuCom,
  },
  data() {
    return {
      msg: "", // 富文本内容
      radio: "1",
      save: true,
      showAddMenu: false,
      selectData: [],
      index:'',
      id:'',
      detail:{
        status:0,
      },
      optionList:[{
        label:'默认',
        value:0,
      },{
        label:'页头',
        value:1,
      },{
        label:'页尾',
        value:2,
      }]
    };
  },
  created(){
    if(this.$route.query.hasOwnProperty('id')){
      this.detail = JSON.parse(localStorage.getItem('menuDetail'))
      this.selectData = this.detail.menuItems
    } else {
      
    }
  },
  methods: { 
    DelMenu:function(index,i){ 
      this.selectData[index].data.splice(i,1)  
    },
    GetData:function(e){ 
      this.selectData = e;
      // let arr = this.selectData; 
      // if(arr.length>0){
      //   arr.map(i=>{
      //     console.log(i.label)
      //     e.map(j=>{
      //       console.log(j.label)
      //       if(i.label === j.label){
      //         i.data.concat(j.data) 
      //       }
      //     })
      //   });
      // } else { 
      // }
      // console.log(arr)
    },
    Save:function(){
      if(!this.detail.title){
        this.$message.error('请填写菜单栏标题')
        return false
      }
      if(this.selectData.length == 0){
        this.$message.error('请选择菜单项')
        return false
      }
      this.detail.menuItems = this.selectData
      if(this.id){
        edit(this.detail).then(res=>{
          this.$message.success('修改成功')
        })
      } else {
        add(this.detail).then(res=>{
          this.$message.success('新增成功'),
          this.$router.push('/menuManage')
        })
      }
    }
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
    color: rgb(193, 194, 204);
  }
  .dec {
    font-size: 12px;
    color: #5e7185;
    line-height: 20px;
    margin: 8px 0 20px 24px;
  }
  .addPage {
    border-top: 1px solid #dcdfe6;
    height: 40px;
    line-height: 41px;
    color: #273a8a;
    cursor: pointer;
    &:hover {
      background-color: #f3f3f3;
    }
    i {
      vertical-align: middle;
      padding: 0 13px;
      font-size: 16px;
    }
  }
  .group { 
    .item-group {
      border-top: 1px solid #dcdfe6;
      display: flex;
      padding: 10px 0;
      position: relative;
      .ellipsis {
        flex: 1;
        padding-left: 13px;
      }
      .options {
        float: right;
        margin: 0 10px;
        i {
          margin: 0 5px;
          vertical-align: middle;
          cursor: pointer;
        }
      }
    }
  }
}
</style>  