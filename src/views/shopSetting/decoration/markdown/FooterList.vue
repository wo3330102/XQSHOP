<template>
    <div class="footer-list">
        <h2 class="footer-list-title">
            <span><i class="el-icon-s-grid"></i><label>{{typeArr[type]}}</label></span>
            <i class="el-icon-arrow-down"></i>
        </h2>
        <!-- <h2 class="footer-list-title">
            <span><i class="el-icon-s-grid"></i><label>订阅</label></span>
            <i class="el-icon-arrow-down"></i>
        </h2> -->
        <div class="footer-list-box">
            <div class="footer-list-menu">
               
                <div v-if="type==='2'">
                    <h3>
                        <span>选择菜单栏</span><i class="el-icon-edit-outline"></i>
                    </h3>
                    <el-select v-model="value" placeholder="请选择" style="width:100%;">
                        <el-option
                        v-for="item in [{label:'Main menu',value:1},{label:'Footer menu',value:2}]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>  
                </div>
                <div v-else>
                    <h3>
                        <span>标题</span>
                    </h3>
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                    <h3>
                        <span>文本</span>
                    </h3> 
                    <Markdown />    
                </div> 
            </div>
            <div class="footer-list-del">
                <el-button>删除{{typeArr[type]}}</el-button> 
            </div>
        </div>
    </div>
</template>
<script>
import Markdown from './Markdown'
export default {
    components:{Markdown},
    data(){
        return{
            typeArr:['文本', '订阅', '菜单栏']
        }
    },
    props:{
        type: {
            type: String,
            default: '0'
        },
    }
}
</script>
<style lang="scss" scoped>
.footer-list{
background-color: #fff;
border-bottom: 1px solid #dcdfe6;
  .footer-list-title{
    display: flex;justify-content:space-between;
    padding: 5px 10px;
    background-color: #fff;
    border-bottom: 1px solid #dcdfe6;
    font-weight: normal;
    span{
    display: flex;
        i{color: #44505b;
    width: 20px;line-height: 30px;
    display: inline-block;
    vertical-align: top;font-size:20px;}
        label{font-size:14px;color: #666;
    cursor: pointer;
    line-height: 30px;
    display: inline-block;
    vertical-align: top;}
      }
      i{    color: #999;
    width: 30px;
    text-align: center;
    font-size: 18px;
    -webkit-transition: all .3s;
    transition: all .3s;
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);}
  }  
  .footer-list-box{
      padding:0 8px 10px;
      h3{
          display: flex;justify-content: space-between;
        height: 20px;
        color: #637381;
        line-height: 20px;
        padding: 12px 0 8px;
        font-size: 14px;
        font-weight: 400;
      }
      .footer-list-del{margin-top:10px;}
  }
}
</style>