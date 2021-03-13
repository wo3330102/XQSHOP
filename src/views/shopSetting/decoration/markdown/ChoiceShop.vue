<template>
<ul class="aside-item">
    <li>
        <h2>商品数量</h2>
        <div class="aside-item-box">
            <el-slider @input="setTemplateDesign({ productSelected: param })" v-model="param.productNum" :max="24"></el-slider>
        </div>
    </li>
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
            <el-input @input="setTemplateDesign({ productSelected: param })" v-model="param.title" placeholder="请输入内容"></el-input>
        </div>
    </li>
    <li>
        <h2>分类</h2>
        <div class="aside-item-box justify-both">
            <a href="#">点击选择商品</a>
            <i class="el-icon-copy-document"></i>
        </div>
    </li>
    <!-- <li>
        <h2>其他</h2>
        <div class="aside-item-box">
            <el-checkbox v-model="checked">分类商品快捷入口</el-checkbox>
            <el-checkbox v-model="checked">显示购物车按钮</el-checkbox>
            <el-checkbox v-model="checked">显示折扣标签</el-checkbox>
        </div>
    </li> -->
</ul>
</template>
<script>
import {mapActions, mapMutations, mapState} from 'vuex'
export default {
    computed:{
        ...mapState('choice',['param'])
    },
    methods:{
        ...mapActions(['setTemplateDesign']),
        ...mapMutations('choice',['setChoice']),
        selectLyout(layout){
            let {title} = this.param
            this.setChoice({title, layout})
            this.setTemplateDesign({productSelected:{title, layout}})
        }
    }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>