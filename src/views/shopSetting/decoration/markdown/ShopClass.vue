<template>
<ul class="aside-item">
    <!-- <li>
        <h2>商品数量</h2>
        <div class="aside-item-box">
            <el-slider v-model="value1" max="24"></el-slider>
        </div>
    </li> -->
    <li>
        <h2>布局</h2>
        <div class="aside-item-box">
            <div class="aside-item-box-list">
                <dl :class="{'active':param.layout==item.value}" v-for="item in $enums.layouts()" :key="item.value" @click="selectLyout(item.value)">
                    <dt><i class="iconfont iconthree-column" :class="{'iconthree-column':item.value==1,'iconfour-column':item.value==2}"></i></dt>
                    <dd>{{item.label}}</dd>
                </dl>
            </div>
        </div>
    </li>
    <li>
        <h2>标题(请输入英文)</h2>
        <div class="aside-item-box">
            <el-input @input="setTemplateDesign({ productCategory: param })" v-model="param.title" placeholder="请输入内容"></el-input>
        </div>
    </li>
    <!-- <li>
        <h2></h2>
        <div class="aside-item-box">
            <el-checkbox v-model="checked">显示全部分类</el-checkbox>
        </div>
    </li> -->
    <li>
        <h2>分类</h2>
        <div class="aside-item-box justify-both">
            <a href="#">点击选择商品</a>
            <i class="el-icon-copy-document"></i>
        </div>
    </li>
</ul>
</template>
<script>
import {mapActions, mapMutations, mapState} from 'vuex'
export default {
    computed:{
        ...mapState('category',['param'])
    },
    methods:{
        ...mapActions(['setTemplateDesign']),
        ...mapMutations('category',['setProCategory']),
        selectLyout(layout){
            let {title} = this.param
            this.setProCategory({title, layout})
            this.setTemplateDesign({productCategory:{title, layout}})
        }
    }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>