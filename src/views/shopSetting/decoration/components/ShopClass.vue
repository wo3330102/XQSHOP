<template>
<div class="shop-list">
    <h2>
       <span>{{param.title}}</span>
    </h2>
    <ul class="shop-item">
        <li :style="{'width':param.layout===1?'31.3%':'23%'}" v-for="item in 4" :key="item">
            <a href="#">
                <div class="shop-item-img"><img src="https://static-theme.mysail.shop/theme/faker/pic-3.png"></div>
                <div class="shop-item-box"><p>Your product's name</p></div>
            </a>
        </li>
    </ul>
</div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    computed:{
       ...mapState('category',['param']) 
    }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>