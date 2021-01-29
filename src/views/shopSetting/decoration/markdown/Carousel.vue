<template>
<ul class="aside-item">
    <li>
        <h2>时间间隔</h2>
        <div class="aside-item-box">
            <el-slider v-model="value1" :max="24"></el-slider>
        </div>
    </li>
    <li>
        <CarouselList />
    </li>
    <li>
        <div class="carousel-add"><i class="el-icon-circle-plus-outline"></i>添加（3/4）</div>
    </li>
</ul>
</template>
<script>
import CarouselList from './CarouselList'
export default {
    components: {
        CarouselList
    },
    data(){
        return{
            value1: 6
        }
    }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>