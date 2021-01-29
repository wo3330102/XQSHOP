<template>
    <ul class="aside-item">
        <li>
            <h2>标题</h2>
            <div class="aside-item-box">
                <div class="aside-item-box-edit">
                   <markdown v-model="param.title" /> 
                </div>
            </div>
        </li>
        <li>
            <h2>文本</h2>
            <div class="aside-item-box">
                <div class="aside-item-box-edit">
                   <markdown v-model="param.content" /> 
                </div>
            </div>
        </li>
    </ul>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import { isJSON } from "@/utils/index";
import Markdown from './Markdown'
export default {
    components:{Markdown},
    computed:{
       ...mapState('sub',['param']) 
    },
    data(){
        return {
            isTitleFirst: true,
            isContentFirst: true
        }
    },
    watch:{
        'param.title':function(title){
            if(!this.isTitleFirst && isJSON(title)) this.setTemplateDesign({subDto:this.param})
            if(this.isTitleFirst) this.isTitleFirst=false
        },
        'param.content':function(conetnt){
            if(!this.isTitleFirst && isJSON(conetnt)) this.setTemplateDesign({subDto:this.param})
            if(this.isContentFirst) this.isContentFirst=false
        }
    },
    methods:{
        ...mapActions(['setTemplateDesign'])
    }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>