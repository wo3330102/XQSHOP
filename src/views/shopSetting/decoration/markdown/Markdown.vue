<template>
    <div class="markdown">
        <div class="edit-oper">
            <span class="edit-oper-item" :class="{'active':fontWeight=='bold'}" @click="btnParent('bold')" style="font-weight:bold;">B</span>
            <span class="edit-oper-item" :class="{'active':fontStyle=='italic'}" @click="btnParent('italic')" style="font-style: italic;">/</span>
            <span v-for="(item,index) in colors" :key="index" :class="{'active':color==item}" class="edit-oper-item" @click="btnParent(item)" :style="{'background':item}"></span>
        </div>
        <div>
            <el-input type="textarea" placeholder="请输入内容" @input="btnParent('content')" v-model="content"></el-input>
        </div>   
    </div>
</template>
<script>
//<div style=\"font-weight: bold;font-style: italic;color: #fff;\">Enjoy Free Express Shipping on orders over $29</div>
//<div style=\"\">Enjoy Free Express Shipping on orders over $29</div>
import { isEmpty, isJSON } from "@/utils/index";
export default {
    props:['value'],
    data(){
        let {fontWeight='',fontStyle='',color='',content=''} = isJSON(this.value)?JSON.parse(this.value):{}
        return{
            fontWeight,
            fontStyle,
            color,
            content,
            colors:['#34395d','#fff','#7F7F7F']
        }
    },
    watch:{
        value(val){
           let {fontWeight='',fontStyle='',color='',content=''}=isJSON(val)?JSON.parse(val):{} 
           this.fontWeight = fontWeight
           this.fontStyle = fontStyle
           this.color = color
           this.content = content
        }
    },
    methods:{
        btnParent(val){
            if(val==='bold'){
                this.fontWeight=isEmpty(this.fontWeight)?'bold':''
            }else if(val==='italic'){
                this.fontStyle=isEmpty(this.fontStyle)?'italic':''
            }else if(val==='content'){

            }else{
                this.color=this.color===val?'':val
            }
            let {fontWeight,fontStyle,color,content} = this
            let value={fontWeight,fontStyle,color,content}
            this.$emit('input', JSON.stringify(value))
        }
    }
}
</script>
<style lang="scss" scoped>
.markdown{border: 1px solid #dcdfe6;
   .edit-oper{padding: 5px;height: 24px;line-height: 24px;border-bottom: 1px solid #dcdfe6;
    .edit-oper-item{    
    width: 22px;
    height: 22px;
    cursor: pointer;
    margin-right: 5px;
    position: relative;
    text-align: center;
    border-radius: 3px;
    vertical-align: top;
    display: inline-block;
    border: 1px solid #dcdfe6;}
   }
   .edit-oper-item.active{ border-color: #34395d;} 
   /deep/ .el-textarea__inner{min-height: 115px!important; height: 94px;padding: 5px 8px;border: none;
    border-radius: 0;}
}
</style>