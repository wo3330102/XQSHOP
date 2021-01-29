<template>
    <div class="aside-right">
        <component :is="getComponent"></component>
    </div>
</template>
<script>
import Vue from 'vue'
import {mapState, mapActions} from 'vuex'
export default {
    data(){
        let comps=['PageHeader','Carousel','ShopClass','ChoiceShop','SingleShop','SingleImg','TextComponent','Subscription','PageFooter','GoodsList','GoodsDetails','GoodsClass','Cart','Order','Results','Error','Search']
        return{
            getComponent:comps[this.type],
            comps 
        }
    },
    computed:{
        ...mapState(['moduleId','type'])
    },
    created(){
        this.comps.forEach(app => {
            console.log(app);
            Vue.component(app, ()=>import(`./${app}.vue`))
        })
    },
    watch:{
        moduleId(v){
            this.getComponent=this.comps[this.type]
        }
    }
}
</script>
<style lang="scss" scoped>
.aside-right{background:#f7f7f7;}
</style>