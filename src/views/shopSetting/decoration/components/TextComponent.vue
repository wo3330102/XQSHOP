<template>
    <div class="text">
        <div class="text-title" :style="{'color':title.color,'font-style':title.fontStyle?title.fontStyle:'normal','font-weight':title.fontWeight?title.fontWeight:'normal'}">
            {{title.content}}
        </div>
        <div class="text-describe" :style="{'color':content.color,'font-style':content.fontStyle?content.fontStyle:'normal','font-weight':content.fontWeight?content.fontWeight:'normal'}">
            {{content.content}}
        </div>
    </div>
</template>
<script>
import { isEmpty, isJSON } from "@/utils/index";
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState('text',['param'])
    },
    data(){
        return {
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
.text{
    padding: 120px;
    box-sizing: border-box;
   .text-title{
       text-align: center;
        font-size: 20px;
        padding-bottom: 16px;
   }
   .text-describe{
        text-align: center;
        line-height:20px;
   } 
}
</style>