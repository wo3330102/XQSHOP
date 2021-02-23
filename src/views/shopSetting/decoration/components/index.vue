<template>
    <div class="main-box">
        <div class="main-list" v-for="list in $enums.componentNames()" :key="list.value">
            <component :is="list.label"></component>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    components:{
    },
    data(){
        // let comps=['PageHeaderComp','CarouselComp','ShopClassComp','ChoiceShopComp','SingleShopComp','SingleImgComp','TextComponentComp','SubscriptionComp','PageFooterComp'];
    //     let comps=
        return{
        }
    },
    created(){
        this.$enums.componentNames().forEach(app => {
            let url=app.label.slice(0,-4)
            Vue.component(app.label, ()=>import(`./${url}.vue`))
        })
    }
}
</script>
<style lang="scss" scoped>
.main-box{background:#fff;}
</style>