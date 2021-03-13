<template>
    <div class="subscribe">
        <div class="subscribe-title" :style="{'color':title.color,'font-style':title.fontStyle?title.fontStyle:'normal','font-weight':title.fontWeight?title.fontWeight:'normal'}">{{title.content}}</div>
        <div class="subscribe-describe" :style="{'color':content.color,'font-style':content.fontStyle?content.fontStyle:'normal','font-weight':content.fontWeight?content.fontWeight:'normal'}">{{content.content}}</div>
        <div class="subscribe-submit">
            <el-input v-model="text" placeholder="请输入内容"></el-input>
            <el-button type="info">SUBSCRIBE</el-button>
        </div>
    </div>
</template>
<script>
import { isJSON } from "@/utils/index";
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState('sub',['param'])
    },
    data(){
        return{
            text:'',
            title:{
              fontWeight:'normal',
              fontStyle:'normal',
              content:'',
              color:'#fff' 
           },
           content:{
              fontWeight:'normal',
              fontStyle:'normal',
              content:'',
              color:'#fff' 
           }
        }
    },
    watch:{
        'param.title':function(){
            this.getTitleObj(this.param)
        },
        'param.content':function(){
            this.getTitleObj(this.param)
        }
    },
    created(){
        this.getTitleObj(this.param)
    },
    methods:{
        getTitleObj(){
            let {title, content} = this.param
            this.title = isJSON(title)?JSON.parse(title):{}
            this.content = isJSON(content)?JSON.parse(content):{}
        }
    }
}
</script>
<style lang="scss" scoped>
.subscribe{
    box-sizing: border-box;
    padding: 40px 0;
    background-color: #fafafa;
    text-align: center;
    .subscribe-title{
        box-sizing: border-box;
        padding: 40px 0;
        background-color: #fafafa;
        font-size: 20px;
        padding-bottom: 16px;
    }
    .subscribe-describe{
        color: #666;
    }
    .subscribe-submit{
        display: flex;
        margin: 24px auto;
        margin-bottom: 0;
        position: relative;
        background: #fff;
    }
}
</style>