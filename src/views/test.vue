<template>
  <div class="">
    <el-select
      v-model="list.value"
      placeholder="选择关系" 
      clearable
      @visible-change="BeforeOpen"
      popper-class="xuanxiang"
    >
      <el-option
        v-for="(v, i) in option"
        :key="i"
        :label="v.label"
        :value="v.id"
        v-show="v.show"
      >
        <span style="float: left;width:100%" @mouseenter="SelectFun(v)" @mouseleave="show = false">{{v.label}}</span>
      </el-option>
      <div class="warp" v-show="show" >
        <div>
          <p>当前选中：<span>{{hoverItem.label}}</span></p> 
        </div>
      </div>
    </el-select>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      option: [
        {
          id: 1,
          label: "父亲",
          show: true,
        },
        {
          id: 2,
          label: "母亲",
          show: true,
        },
        {
          id: 3,
          label: "兄弟",
          show: true,
        },
        {
          id: 4,
          label: "姐妹",
          show: true,
        },
        {
          id: 5,
          label: "姐妹",
          show: true,
        },
        {
          id: 6,
          label: "姐妹",
          show: true,
        },
        {
          id: 7,
          label: "姐妹",
          show: true,
        },
        {
          id: 8,
          label: "姐妹",
          show: true,
        },
        {
          id: 9,
          label: "姐妹",
          show: true,
        },
      ],
      list:{
        value:'',
      },
      show:false,
      hoverItem:{},
    };
  },
  methods: { 
    SelectFun(e){ 
      this.show = true;
      this.hoverItem = e;
    },
    BeforeOpen(){
      // this.show = true; 
    }
  },
};
</script>

<style lang="scss" scoped>
.warp{
  position: absolute;
  top: 0;
  right: 0px;
  width: 180px;
  height: 100%;
  background: #ffffff;
  border-radius: 10px;
  z-index: 1;  
} 
</style>
<style>
.xuanxiang{
  width: 500px !important;
  /* 取消原先下拉框的阴影 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); 
  
}
</style>
