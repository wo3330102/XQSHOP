<template>
    <ul class="aside-item">
        <li>
            <h2>正文</h2>
            <div class="aside-item-box">
                <div class="aside-item-box-edit">
                   <markdown /> 
                </div>
            </div>
        </li>
        <li>
            <h2>商品</h2>
            <div class="aside-item-box justify-both">
                <a href="#">点击选择商品</a>
                <i class="el-icon-copy-document"></i>
            </div>
        </li>
        <li>
            <h2>其他</h2>
            <div class="aside-item-box">
                <el-checkbox v-model="checked">显示动态结账按钮</el-checkbox><el-tooltip content="动态结账按钮" placement="top">
                    <i class="el-icon-info"></i>
                </el-tooltip>
            </div>
        </li>
    </ul>
</template>
<script>
import Markdown from './Markdown'
export default {
    components:{Markdown},
    data(){
        return{
            checked: true
        }
    }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>