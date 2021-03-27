<template>
  <div class="page" > 
    <el-button @click="handClick">测试</el-button>
    <iframe src="http://192.168.1.125:8014/" width="100%" id='iframe' height="80%"></iframe>
  </div>
</template> 

<script>
export default {
  data() {
    return { 
    };
  },  
  created(){ 
  },
  methods:{ 
    handClick:function(){ 
      let dom = document.getElementById('iframe').contentWindow; 
      // dom.test();
      dom.postMessage('123123123123','http://192.168.1.125:8014/');
    }
  },
  mounted(){
    console.log(123);
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%; 
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
