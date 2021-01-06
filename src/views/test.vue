<template>
  <div class="page" >
    <div class="box" :style="{'top':top+'px'}"> 
      {{top}}
      <div class="box-item">
        <div class="box-item2"></div> 
      </div>  
    </div>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      top: document.body.clientHeight,
    };
  },  
  created(){
    if(localStorage.getItem('time') === 0){
      localStorage.setItem('time',1)
      //执行方法
      this.Fun();
    }
  },
  methods:{
    Fun(){
      console.log(111)
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  background: red;
  position: relative;
  .box { 
    background: #fff;
    width: 100%;
    height: 900%; 
    position: relative;
    .box-item{
      margin-top: 50px; 
      height: 100%;
      width: 100%;  
    }
    .box-item2{
      width: 100%; 
      height: 60px;
      position:sticky;
      top: 0;
      background: chocolate;
    } 
  }
}
</style> 
